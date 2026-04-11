const express = require('express');
const cors = require('cors');
const booksRoutes = require('./routes/booksRoutes');

const app = express();

app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Library API is running.' });
});

app.use('/api/books', booksRoutes);

module.exports = app;