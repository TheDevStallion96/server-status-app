const express = require('express');
const router = express.Router();

// host system information
let HostInformation = [
  {
    systemInfo: {
      manufacturer: 'Dell',
      model: 'Inspiron 15',
      serialNumber: 'ABC123',
    },
    osInfo: {
      platform: 'Linux',
      distribution: 'Ubuntu',
      kernelVersion: '5.4.0-53-generic',
    },
    memoryInfo: {
      totalMemory: 16384,
      freeMemory: 8192,
      usedMemory: 8192,
    },
  },
];

// Dummy collection of books
let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
];

// GET /books - Get all books
router.get('/host-device', (req, res) => {
  res.json(HostInformation);
});

// GET /books/:id - Get a specific book
router.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

// POST /books - Create a new book
router.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book
router.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const updatedBook = { id: bookId, title, author };
  books[bookIndex] = updatedBook;

  res.json(updatedBook);
});

// DELETE /books/:id - Delete a book
router.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books[bookIndex];
  books.splice(bookIndex, 1);

  res.json(deletedBook);
});

module.exports = router;
