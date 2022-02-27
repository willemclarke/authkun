import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createPool } from 'slonik';
import { Config, fromEnv } from './config/config';
import jwt from 'jsonwebtoken';
import { Database } from './database/Database';
import { createJwt } from './crypto';

const config: Config = fromEnv();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

const pool = createPool(config.databaseUrl);
const database = new Database(pool);

app.get('/', (req, res) => {
  res.status(200).send('Welcome sire');
});

app.post('/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const writeUser = await database.writeUser({ username, password });

  if (!writeUser) {
    return res.status(200).json(`Username ${username} already exists`);
  }

  const jwt_ = createJwt(writeUser, config.authSecret);
  return res.status(200).send(jwt_);
});

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await database.verifyUserForLogin({ username, password });

  if (!user) {
    return res.status(200).send(`Incorrect password, please try again`);
  }

  const jwt_ = createJwt(user, config.authSecret);
  return res.status(200).send(jwt_);
});

app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`));
