import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createPool } from 'slonik';
import { Config, fromEnv } from './config/config';
import jwt from 'jsonwebtoken';
import { DatabaseService } from './services/database.service';
import { UserService } from './services/user.service';
import { createJwt } from './crypto';

const config: Config = fromEnv();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

const pool = createPool(config.databaseUrl);
const databaseService = new DatabaseService(pool);
const userService = new UserService(databaseService);

app.get('/', (req, res) => {
  res.status(200).send('Welcome sire');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const registerUser = await userService.register(username, password);
    const jwt_ = createJwt({ registerUser }, config.authSecret);

    res.status(200).json(jwt_);
  } catch (err) {
    console.log({ err });
    res.status(200).send(err instanceof Error ? err.message : 'fuck me dead');
  }
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

app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`));
