const db = require('../config/db');

const getDatabaseErrorMessage = (error) => {
    return error.message || error.code || error.sqlMessage || 'Database error';
};

const getAllBooks = async (req, res) => {
    try {
        const [books] = await db.query('SELECT * FROM books');
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const getBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const [books] = await db.query('SELECT * FROM books WHERE id = ?', [id]);

        if (books.length === 0) {
            return res.status(404).json({ error: `Book with id ${id} not found.` });
        }

        res.json(books[0]);
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const createBook = async (req, res) => {
    const query = 'INSERT INTO books(name, genre, inLibrary) VALUES(?, ?, ?)';
    const { name, genre } = req.body;

    try {
        const [result] = await db.query(query, [name.trim(), genre, true]);
        res.status(201).json({
            id: result.insertId,
            name: name.trim(),
            genre: genre,
            inLibrary: true
        });
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { name, genre, inLibrary } = req.body;
    const query = 'UPDATE books SET name = ?, genre = ?, inLibrary = ? WHERE id = ?';

    try {
        const [result] = await db.query(query, [name.trim(), genre, inLibrary, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Book with id ${id} not found.` });
        }

        res.json({
            id: Number(id),
            name: name.trim(),
            genre: genre,
            inLibrary
        });
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const removeBook = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Book with id ${id} not found.` });
        }

        res.json({ message: `Book with id ${id} removed` });
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    removeBook
};