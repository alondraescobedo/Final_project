# Full-Stack Library Application

A full-stack web application designed for managing a library collection. This project features a robust Node.js and Express backend connected to a MySQL database, paired with JavaScript and HTML frontend. 

The application is configured for cloud deployment, utilizing Render for the Backend API, Railway for the MySQL Database, and Vercel for the Frontend hosting.

## Project Structure

fullstack/
  backend/
    app.js
    server.js
    config/
      db.js
    controllers/
      booksController.js
    middlewares/
      bookValidation.js
    routes/
      bookRoutes.js
  frontend/
    app.js
    index.html
  .env
  package.json
  README.md
  database.sql
  Procfile
  package-lock.json
  railway.json
  .gitignore

## Prerequisites

- Node.js & npm installed locally
- MySQL Server installed locally
- Git

## Stack
- Node.js (CommonJS)
- Express
- MySQL (mysql2)
- dotenv
- CORS
Bootstrap 5 + Bootstrap Icons

## Features
- List books
- Add books to the library
- Edit books
- Remove books
- Backend and frontend validations

## Requirements
- Node.js 18+
- MySQL 8+

## Installation
1. Navigate to the project directory:
      cd fullstack
2. Install dependencies:
      npm install
3. Create a .env file in the root directory of fullstack:
      DB_HOST=localhost
      DB_PORT=3306
      DB_USER=root
      DB_PASSWORD=your_password
      DB_NAME=task_manager

## Railway Configuration (MySQL)
      DB_HOST=host
      DB_PORT=port
      DB_USER=username
      DB_PASSWORD=password
      DB_NAME=database
## Database
CREATE DATABASE IF NOT EXISTS final_project;
USE final_project;
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    genre ENUM('Fiction', 'Non-Fiction', 'Poetry','Novel','Mistery','Fantasy','Science Fiction','Thriller') NOT NULL,
    inLibrary BOOLEAN DEFAULT true,
    lent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    returned_to TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO books ( name, genre, inLibrary) VALUES
('The Da Vinci Code','Thriller', true),
('Harry Potter and the Philosophers Stone','Fantasy', false),
('Pride and Prejudice','Novel', true);

## Validations
- Backend
  - id: positive integer
  - name: required, string, not empty
  - genre: must be one of Fiction, Non-Fiction, Poetry, Novel, Mistery, Fantasy, Science Fiction, Thriller
  - inLibrary (in PUT): boolean
- Frontend
  - Validation for empty Book Name field before submission
  - Server error handling by displaying a message in a Toast
## Endpoints
- GET /api/books/
- GET /api/books/:id
- POST /api/books/
- PUT /api/books/:id
- DELETE /api/books/:id

## Explanation

This application utilizes a modern multi-cloud architecture to separate the database, API, and client interface for optimal performance and scalability:

1. **Database (Railway):** The MySQL relational database is hosted on Railway using their managed MySQL plugin. Railway exposes a public TCP proxy endpoint that allows the backend to securely connect to the database from anywhere.
2. **Backend API (Render):** The Node.js/Express server is deployed as a Web Service on Render. Render automatically pulls the latest code from the `master` branch in GitHub, installs all dependencies (`npm install`), and starts the server. It securely connects to the Railway database using injected Environment Variables (`DB_HOST`, `DB_PASSWORD`, etc).
3. **Frontend Client (Vercel):** The static HTML, CSS (Bootstrap), and JavaScript files are hosted on Vercel's Edge Network. Vercel acts as a global CDN, delivering the frontend instantly to users without the need for a server. The frontend's `app.js` is configured to communicate with the Render API via RESTful requests, with CORS policies properly configured.