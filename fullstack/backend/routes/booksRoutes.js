const express = require('express');
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    removeBook
} = require('../controllers/booksController');
const {
    validateId,
    validateBookBody,
    validateInLibrary
} = require('../middlewares/bookValidation');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', validateId, getBookById);
router.post('/', validateBookBody, createBook);
router.put('/:id', validateId, validateBookBody, validateInLibrary, updateBook);
router.delete('/:id', validateId, removeBook);

module.exports = router;