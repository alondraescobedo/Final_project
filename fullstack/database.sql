-- Create database
CREATE DATABASE IF NOT EXISTS final_project;

-- Use the database
USE final_project;

-- Create tasks table
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    genre ENUM('Fiction', 'Non-Fiction', 'Poetry','Novel','Mistery','Fantasy','Science Fiction','Thriller') NOT NULL,
    inLibrary BOOLEAN DEFAULT true,
    lent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    returned_to TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some sample data (optional)
INSERT INTO books ( name, genre, inLibrary) VALUES
('The Da Vinci Code','Thriller', true),
('Harry Potter and the Philosophers Stone','Fantasy', false)
('Pride and Prejudice','Novel', true);