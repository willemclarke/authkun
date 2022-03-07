import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createPool } from 'slonik';
import { Config, fromEnv } from './config/config';
import { DatabaseService } from './services/database.service';
import { UserService } from './services/user.service';
import { createJwt } from './crypto';
import { errorMiddleware } from './middleware/error.middleware';
import { AuthkunError, AuthkunErrorType } from './AuthkunError';
import jwt from 'jsonwebtoken';

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

/**
 * Contents for JWT:
 * `username`, `id`, `expiry`, `issuer`
 */

app.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    await userService.register(username, password);
    const userJwtPayload = await userService.getUserForJWT(username);

    if (!userJwtPayload) {
      throw new AuthkunError({
        type: AuthkunErrorType.NoRowFound,
        message: `Error retrieving user: ${username}'s data from database`,
      });
    }

    const jwt_ = createJwt(userJwtPayload, config.authSecret);

    res.status(200).json(jwt_);
  } catch (error) {
    next(error);
  }
});

app.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isValidUser = await userService.verifyUserCredentials(username, password);

    if (!isValidUser) {
      throw new AuthkunError({
        type: AuthkunErrorType.InvalidUserLogin,
        message: `Failed to login user: ${username}. Ensure username and password are correct`,
      });
    }

    const userJwtPayload = await userService.getUserForJWT(username);

    if (!userJwtPayload) {
      throw new AuthkunError({
        type: AuthkunErrorType.NoRowFound,
        message: `Error retrieving user: ${username}'s data from database`,
      });
    }

    const jwt_ = createJwt(userJwtPayload, config.authSecret);

    return res.status(200).json(jwt_);
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);
app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`));
