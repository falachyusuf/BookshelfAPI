const { nanoid } = require('nanoid');
const books = require('./books');

// To do 1 : add Book handler
const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  // To do 3 : add book without name
  if (!name) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400);
    return response;
  }

  // To do 4 : add book fail if readPage > pageCount
  if (readPage > pageCount) {
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  // To do 2 : Add book finsihed reading
  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  }
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const Success = books.filter((book) => book.id === id).length > 0;
  if (Success) {
    const response = h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      .code(201);
    return response;
  }
  const response = h
    .response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    })
    .code(500);
  return response;
};
// To do 5 : Get All Books
const getAllBooksHandler = (request, h) => {
  let allBooks = books;
  let { name, reading, finished } = request.query;

  // [Optional 1] : Get All Books Contains 'Dicoding'
  if (name !== undefined) {
    name = name.toLowerCase();
    allBooks = allBooks.filter((book) => book.name.toLowerCase().includes(name));
  }

  //  [Optional 2] : Get All Books Readings
  if (reading !== undefined) {
    reading = !!Number(reading);
    allBooks = allBooks.filter((book) => book.reading === reading);
  }

  //  [Optional 3] : Get All Books
  if (finished !== undefined) {
    finished = !!Number(finished);
    allBooks = allBooks.filter((book) => book.finished === finished);
  }

  const response = h
    .response({
      status: 'success',
      data: {
        books: allBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    })
    .code(200);
  return response;
};
// To do 6 & 7: Get All Books by Id (detail book) & detail book id finished
const getAllBooksByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    const response = h
      .response({
        status: 'success',
        data: {
          book,
        },
      })
      .code(200);
    return response;
  }
  // To do 8 : Response for Get book fail (Invalid ID)
  const response = h
    .response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404);
  return response;
};
// To do 9 : Update Book By Id
const updateBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();
  const i = books.findIndex((book) => book.id === id);

  // Validate finished
  let finished = false;
  if (pageCount === readPage) {
    finished = true;
  }

  if (i !== -1) {
    // To do 10 : Update Book Fail if not contain name
    if (!name) {
      const response = h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);
      return response;
    }
    // To do 11 : add book fail if readPage > pageCount
    if (readPage > pageCount) {
      const response = h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
      return response;
    }

    books[i] = {
      ...books[i],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);
    return response;
  }
  // To do 12 : Response for Put new book fail (Invalid ID)
  const response = h
    .response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404);
  return response;
};
// To do 13 & 14 : Delete books by Id & Finished book
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const i = books.findIndex((b) => b.id === id);
  if (i !== -1) {
    books.splice(i, 1);
    const response = h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);
    return response;
  }
  // To do 15 : Response for Add book fail
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);

  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getAllBooksByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
