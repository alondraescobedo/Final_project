const VALID_PRIORITIES = ['Fiction', 'Non-Fiction', 'Poetry', 'Novel', 'Mistery', 'Fantasy', 'Science Fiction', 'Thriller'];

const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'El parámetro "id" debe ser un número entero positivo.'
        });
    }
    next();
};

const validateBookBody = (req, res, next) => {
    const { name, genre } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            error: 'El campo "name" es requerido y no puede estar vacío.'
        });
    }

    if (!genre || !VALID_PRIORITIES.includes(genre)) {
        return res.status(400).json({
            error: `El campo "genre" debe ser uno de: ${VALID_PRIORITIES.join(', ')}.`
        });
    }
    next();
};

const validateInLibrary = (req, res, next) => {
    const { inLibrary } = req.body;

    if (typeof inLibrary !== 'boolean') {
        return res.status(400).json({
            error: 'El campo "inLibrary" debe ser un booleano.'
        });
    }
    next();
};

module.exports = {
    VALID_PRIORITIES,
    validateId,
    validateBookBody,
    validateInLibrary
};