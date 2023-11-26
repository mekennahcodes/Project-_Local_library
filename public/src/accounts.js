function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id); 
}

function sortAccountsByLastName(accounts) {
    return accounts.sort((accountA, accountB) => {
        const lastNameA = accountA.name.last.toLowerCase();
        const lastNameB = accountB.name.last.toLowerCase();
        return lastNameA > lastNameB ? 1 : -1;
    });
}


function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((acc, book) => {
      const borrowCount = book.borrows.filter(borrow => borrow.id === accountId).length;
      return acc + borrowCount;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id; 
  const borrowedBooks = books.filter(book => { 
    const isBorrowed = book.borrows.some(borrow => borrow.id === accountId && !borrow.returned); 
    return isBorrowed; 
}); 

  borrowedBooks.forEach(book => { 
    const author = authors.find(author => author.id === book.authorId); 
    book['author'] = author; 
  }); 
  return borrowedBooks; 
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
