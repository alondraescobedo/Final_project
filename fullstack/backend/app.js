const express = require('express');
const cors = require('cors');
const path = require('path');
const booksRoutes = require('./routes/booksRoutes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Library API is running.' });
});

app.use('/api/books', booksRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

module.exports = app;