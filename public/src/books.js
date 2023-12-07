// Find an author by ID
function findAuthorById(authors, id) {
  // Use find() to search for an author by their ID
  return authors.find(author => author.id === id); 
}

// Find a book by ID
function findBookById(books, id) {
  // Use find() to search for a book by its ID
  return books.find(book => book.id === id); 
}

// Partition books based on borrowed status
function partitionBooksByBorrowedStatus(books) {
    // Separate books into borrowed and returned categories
    const borrowedBooks = books.filter(book => !book.borrows[0].returned); // Books currently borrowed
    const returnedBooks = books.filter(book => book.borrows[0].returned); // Books that have been returned
    return [borrowedBooks, returnedBooks]; 
}

// Borrower information for a specific book
function getBorrowersForBook(book, accounts) {
    const { borrows } = book;
    // Extract borrower information for the given book, limit to 10 borrowers
    const borrowersInfo = borrows.slice(0, 10).map(borrow => {
        // Find the account details of each borrower for the book
        const account = accounts.find(acc => acc.id === borrow.id);
        return {
            ...account,
            returned: borrow.returned 
        };
    });
    return borrowersInfo; 
}

// Export all helper functions
module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
}; 
