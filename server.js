const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Configurar body-parser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

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

app.get('/books/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    db.get('SELECT * FROM books WHERE ISBN = ?', [isbn], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error occurred while fetching the book.');
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).send('Book not found.');
        }
    });
});

app.get('/books/title/:title', (req, res) => {
    const title = req.params.title;
    db.all('SELECT * FROM books WHERE Title LIKE ?', [`%${title}%`], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error occurred while fetching the books.');
        } else if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).send('No books found with the given title.');
        }
    });
});

app.get('/books/author/:autor', (req, res) => {
    const autor = req.params.autor;
    db.all('SELECT * FROM books WHERE Author LIKE ?', [`%${autor}%`], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error occurred while fetching the books.');
        } else if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).send('No books found with the given author.');
        }
    });
});

app.get('/books', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error occurred while fetching the books.');
        } else {
            res.json(rows);
        }
    });
});

app.put('/books/:isbn', (req, res) => {
    const { title, autor, editorial, year, pages, price } = req.body;
    const isbn = req.params.isbn;

    db.run(`UPDATE books SET Title = ?, Author = ?, Editorial = ?, Year = ?, numberOfPages = ?, price = ? WHERE ISBN = ?`, 
           [title, autor, editorial, year, pages, price, isbn], 
           (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error occurred while updating the book.');
        } else {
            res.send('Book updated successfully.');
        }
    });
});

app.delete('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    db.run('DELETE FROM books WHERE ISBN = ?', [isbn], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error occurred while deleting the book.');
        } else {
            res.send('Book deleted successfully.');
        }
    });
});


// Ruta para mostrar el formulario (sirve el archivo HTML)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar la entrada de datos del formulario
app.post('/server', (req, res) => {
    const { isbn, title, autor, editorial, year, pages, price } = req.body;
    console.log(req.body);
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