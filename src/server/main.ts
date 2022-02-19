import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;

app.use(cors({ origin: 'http://localhost:8081' }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome sire');
});

/**
 * `/register` will be route which recieves a `username` and `password` from the front end
 */
app.post('/register', async (req, res) => {});

/**
 * `/login` will be a route which recieves a `username` and `password` and checks if it already exists
 */
app.post('/login', (req, res) => {});

app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`));
