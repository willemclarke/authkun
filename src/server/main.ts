import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

// `/register` will be the register page, which will take user input from form (username, pw)
// and write to database
app.post('/register', async (req, res) => {});

app.listen(PORT, () => console.log(`App listening on Port: ${PORT}`));
