const { addBookHandler, getAllBooksHandler, getAllBooksByIdHandler, updateBookByIdHandler, deleteBookByIdHandler } = require('./handler');

const routes = [
  // Post Books Methods
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  // Get books (ALL)
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  // Get books (by ID)
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getAllBooksByIdHandler,
  },
  // Put books (by ID)
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBookByIdHandler,
  },
  // Delete books (by ID)
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },

];

module.exports = { routes };
