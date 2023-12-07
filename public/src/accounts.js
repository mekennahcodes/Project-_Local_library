// Finding an account by ID
function findAccountById(accounts, id) {
  // Use find() to search for an account by its ID
  return accounts.find(account => account.id === id); 
}

// Sort accounts by last name
function sortAccountsByLastName(accounts) {
    return accounts.sort((accountA, accountB) => {
        // Convert last names to lowercase for case-insensitive sorting
       // then use a comparison function within sort() to arrange accounts by last name
        const lastNameA = accountA.name.last.toLowerCase();
        const lastNameB = accountB.name.last.toLowerCase();
        return lastNameA > lastNameB ? 1 : -1;
    });
}

// Get the total number of borrows for an account
function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  // Use reduce() to count the number of times an account has borrowed a book
  // Then filter the book's borrows array to count borrow occurrences matching the account ID
  return books.reduce((acc, book) => {
      const borrowCount = book.borrows.filter(borrow => borrow.id === accountId).length;
      return acc + borrowCount;
  }, 0);
}

// Get books possessed by an account
function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id; 
  // Filter books that are currently borrowed by the account
   // Then use filter() and some() to find unreturned borrowings by the account
  const borrowedBooks = books.filter(book => {
    const isBorrowed = book.borrows.some(borrow => borrow.id === accountId && !borrow.returned); 
    return isBorrowed; 
  }); 

  // Attach author information to borrowed books
  borrowedBooks.forEach(book => { 
    // Match each borrowed book's author using find() on the authors array
    const author = authors.find(author => author.id === book.authorId); 
    book['author'] = author; // Attach author information to the book
  }); 
  return borrowedBooks; 
}

// Export all helper functions
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
}; 
