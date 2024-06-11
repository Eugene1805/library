const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Configurar body-parser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a la base de datos SQLite
let db = new sqlite3.Database('./libros.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the libros database.');
});

// Crear la tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS books (
    ISBN TEXT PRIMARY KEY,
    Title TEXT NOT NULL,
    Author TEXT NOT NULL,
    Editorial TEXT,
    Year INTEGER,
    numberOfPages INTEGER,
    price REAL
)`, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Table created or already exists.');
    }
});

// Ruta para mostrar el formulario (sirve el archivo HTML)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar la entrada de datos del formulario
app.post('/add-book', (req, res) => {
    const { isbn, title, autor, editorial, year, pages, price } = req.body;
    db.run(`INSERT INTO books (ISBN, Title, Author, Editorial, Year, numberOfPages, price) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
           [isbn, title, autor, editorial, year, pages, price], 
           (err) => {
        if (err) {
            console.error(err.message);
            res.send('Error occurred while adding the book.');
        } else {
            res.send('Book added successfully.');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

