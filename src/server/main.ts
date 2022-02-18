import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

/**
 * `/register` will be route which recieves a `username` and `password` from the front end
 */
app.post('/register', async (req, res) => {});

app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`));
