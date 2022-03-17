import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createPool } from 'slonik';
import { Config, fromEnv } from './config/config';
import { DatabaseService } from './services/database.service';
import { UserService } from './services/user.service';
import { createJwt } from './crypto';
import { errorMiddleware } from './middleware/error.middleware';
import { authMiddleware } from './middleware/auth.middleware';
import { AuthkunError, AuthkunErrors } from './AuthkunError';

const app = express();
const config: Config = fromEnv();

const PORT = 4000;

const pool = createPool(config.databaseUrl);
const databaseService = new DatabaseService(pool);
const userService = new UserService(databaseService);

app.use(cors());
app.use(bodyParser.json());

app.get('/protected', authMiddleware, async (req, res, next) => {
  try {
    const allUsers = await userService.getUsers();

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

app.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    await userService.register(username, password);
    const userJwtPayload = await userService.getUserForJWT(username);

    if (!userJwtPayload) {
      throw new AuthkunError({
        type: AuthkunErrors.NoRowFound,
        message: `Error retrieving user: ${username}'s data from database`,
      });
    }

    const jwt = createJwt(userJwtPayload, config.authSecret);

    res.status(200).json(jwt);
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
        type: AuthkunErrors.InvalidUserLogin,
        message: `Invalid credentials, ensure username and password are correct`,
        metadata: {
          fields: {
            username: 'Ensure username is correct',
            password: 'Ensure password is correct',
          },
        },
      });
    }

    const userJwtPayload = await userService.getUserForJWT(username);

    if (!userJwtPayload) {
      // Once I have withConn function this error can go
      throw new AuthkunError({
        type: AuthkunErrors.NoRowFound,
        message: `Error retrieving user: ${username}'s data from database`,
      });
    }

    const jwt = createJwt(userJwtPayload, config.authSecret);

    return res.status(200).json(jwt);
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`));
