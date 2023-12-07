// Total count of books
function getTotalBooksCount(books) {
  return books.length; 
}

// Total count of accounts
function getTotalAccountsCount(accounts) {
  return accounts.length; 
}

// A function to count the number of borrowed books
function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => { 
    // Count the number of books that are currently borrowed and not yet returned
    const borrowedCount = !book.borrows[0].returned ? 1 : 0; 
    return acc + borrowedCount; // Accumulate the count of borrowed books
  }, 0); 
}

// Find the most common genres among books
function getMostCommonGenres(books) {
    if (!books || books.length === 0) {
        return []; 
    }

    const genresCount = {};

    books.forEach(book => {
        const { genre } = book;
        if (genre) {
            // Count how often you see each genre
            genresCount[genre] = (genresCount[genre] || 0) + 1;
        }
    });

    // Sort genres by count in descending order and return the top 5 most common genres
    const sortedGenres = Object.entries(genresCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return sortedGenres;
}

// Find the most popular books based on borrow count
function getMostPopularBooks(books) {
    // Map books with borrow count and sort in descending order to find the top 5 most popular books
    const booksWithBorrowCount = books.map(book => ({
        name: book.title,
        count: book.borrows.length
    }));
    const sortedBooks = booksWithBorrowCount.sort((bookA, bookB) => {
        return bookB.count - bookA.count;
    });

    return sortedBooks.slice(0, 5);
}

// Find the most popular authors based on total borrow count
function getMostPopularAuthors(books, authors) {
  const authorBorrows = books.reduce((acc, { authorId, borrows }) => {
    const author = authors.find(author => author.id === authorId);
    const authorName = `${author.name.first} ${author.name.last}`;

    if (!acc[authorName]) {
        acc[authorName] = 0;
    }
    acc[authorName] += borrows.length; // Accumulate borrow count for each author
    return acc;
  }, {});

  // Sort authors by borrow count in descending order and return the top 5 most popular authors
  return Object.entries(authorBorrows)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

// Export all helper functions
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
