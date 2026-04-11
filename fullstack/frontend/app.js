const API_URL = 'http://127.0.0.1:3000/api/books/';

let toDoList = [];
let editBookModal;

const showToast = (message, type = 'success') => {
    const toastEl = document.getElementById('appToast');
    const toastMsg = document.getElementById('appToastMessage');

    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastMsg.textContent = message;

    bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 }).show();
};

async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        toDoList = data;
        renderBooks();
    } catch (error) {
        console.error('Error fetching books:', error);
        showToast('Could not load books from the server.', 'danger');
    }
}

const renderBooks = () => {
    const booksList = document.getElementById('books_list');

    booksList.innerHTML = '';

    toDoList.forEach((book) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.genre}</td>
            <td>${book.inLibrary}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="openEditBookModal(${book.id})"><i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-sm btn-danger" onclick="removeBook(${book.id})"><i class="bi bi-trash-fill"></i></button>
            </td>
        `;

        booksList.appendChild(row);
    });
};

window.openEditBookModal = (id) => {
    const book = toDoList.find((item) => item.id === id);

    if (!book) {
        return;
    }

    document.getElementById('edit-book-id').value = book.id;
    document.getElementById('edit-book-name').value = book.name;
    document.getElementById('edit-book-genre').value = book.genre;
    document.getElementById('edit-book-in-library').checked = Boolean(book.inLibrary);

    editBookModal.show();
};

const bookForm = document.getElementById('book-form');

bookForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('book-name').value.trim();
    const genre = document.getElementById('book-genre').value;

    if (!name) {
        showToast('El campo "Book Name" no puede estar vacío.', 'warning');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, genre })
        });

        if (response.ok) {
            await fetchBooks();
            showToast('Book added successfully!');
            bookForm.reset();
            return;
        }

        const data = await response.json();
        showToast(data.error || 'Error adding book.', 'danger');
    } catch (error) {
        console.error('Error adding book:', error.message);
        showToast('Could not connect to the server.', 'danger');
    }
});

window.removeBook = async (id) => {
    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await fetchBooks();
            showToast('Book removed successfully!');
            return;
        }

        const data = await response.json();
        showToast(data.error || 'Error removing book.', 'danger');
    } catch (error) {
        console.error('Error removing book:', error.message);
        showToast('Could not connect to the server.', 'danger');
    }
};

const editBookForm = document.getElementById('edit-book-form');

editBookForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('edit-book-id').value;
    const name = document.getElementById('edit-book-name').value.trim();
    const genre = document.getElementById('edit-book-genre').value;
    const inLibrary = document.getElementById('edit-book-in-library').checked;

    if (!name) {
        showToast('El campo "Book Name" no puede estar vacío.', 'warning');
        return;
    }

    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, genre, inLibrary })
        });

        if (response.ok) {
            await fetchBooks();
            editBookModal.hide();
            showToast('Book updated successfully!');
            return;
        }

        const data = await response.json();
        showToast(data.error || 'Error updating book.', 'danger');
    } catch (error) {
        console.error('Error updating book:', error.message);
        showToast('Could not connect to the server.', 'danger');
    }
});

const editBookModalElement = document.getElementById('editBookModal');

editBookModal = new bootstrap.Modal(editBookModalElement);

fetchBooks();