import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createPool } from 'slonik';
import { Config, fromEnv } from './config/config';
import { DatabaseService } from './services/database.service';
import { UserService } from './services/user.service';
import { createJwt } from './crypto';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();
const config: Config = fromEnv();
const PORT = 8080;

const pool = createPool(config.databaseUrl);
const databaseService = new DatabaseService(pool);
const userService = new UserService(databaseService);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome sire');
});

//TODO: currently getting socket hangup error when posting from postman to `/register`, find fix
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const registerUser = await userService.register(username, password);
  const jwt_ = createJwt({ registerUser }, config.authSecret);

  res.status(200).json(jwt_);
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const isValidUser = await userService.verifyUserCredentials(username, password);

  if (isValidUser) {
    const user = userService.getUser(username);
    const jwt_ = createJwt({ user }, config.authSecret);
    return res.status(200).json(jwt_);
  }
  return res.status(200).json(`Invalid username`);
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`));
