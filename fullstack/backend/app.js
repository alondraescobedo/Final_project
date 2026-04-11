const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/booksRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost',
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Library API is running.' });
});

app.use('/api/books', booksRoutes);

module.exports = app;