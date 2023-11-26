function findAuthorById(authors, id) {
  return authors.find(authors => authors.id === id); 
}

function findBookById(books, id) {
  return books.find(book => book.id === id); 
}

function partitionBooksByBorrowedStatus(books) {
    const borrowedBooks = books.filter(book => !book.borrows[0].returned);
    const returnedBooks = books.filter(book => book.borrows[0].returned);
    return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
    const { borrows } = book;
    const borrowersInfo = borrows.slice(0, 10).map(borrow => {
        const account = accounts.find(acc => acc.id === borrow.id);
        return {
            ...account,
            returned: borrow.returned
        };
    });
    return borrowersInfo;
}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
