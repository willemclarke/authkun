import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createPool } from 'slonik';
import { Config, fromEnv } from '../common/config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const config: Config = fromEnv();

const app = express();
const PORT = 8080;

app.use(cors({ origin: 'http://localhost:8081' }));
app.use(bodyParser.json());

(async () => {
  const pool = createPool(config.databaseUrl, { ssl: { rejectUnauthorized: false } });
  console.log(crypto.randomBytes(20).toString('hex'));
  /**
   * Placeholder `/` home route
   */
  app.get('/', (req, res) => {
    res.status(200).send('Welcome sire');
  });

  /**
   * `/register` will be route which recieves a `username` and `password` from the front end
   */
  app.post('/register', async (req, res) => {
    // const username = req.params.username;
    // const password = req.params.password;
  });

  /**
   * `/login` will be a route which recieves a `username` and `password` and checks if it already exists
   */
  app.post('/login', (req, res) => {});

  app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`));
})();
