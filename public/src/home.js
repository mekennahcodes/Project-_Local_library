function getTotalBooksCount(books) {
  return books.length; 
}

function getTotalAccountsCount(accounts) {
  return accounts.length; 
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => { 
    const borrowedCount = !book.borrows[0].returned ? 1 : 0; 
    return acc + borrowedCount; 
  }, 0); 
}

function getMostCommonGenres(books) {
    if (!books || books.length === 0) {
        return [];
    }

    const genresCount = {};

    books.forEach(book => {
        const { genre } = book;
        if (genre) {
            genresCount[genre] = (genresCount[genre] || 0) + 1;
        }
    });

    const sortedGenres = Object.entries(genresCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    return sortedGenres;
}



function getMostPopularBooks(books) {
    const booksWithBorrowCount = books.map(book => {
        return {
            name: book.title,
            count: book.borrows.length
        };
    });
    const sortedBooks = booksWithBorrowCount.sort((bookA, bookB) => {
        return bookB.count - bookA.count;
    });

    return sortedBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrows = books.reduce((acc, { authorId, borrows }) => {
    const author = authors.find(author => author.id === authorId);
    const authorName = `${author.name.first} ${author.name.last}`;

    if (!acc[authorName]) {
        acc[authorName] = 0;
    }
    acc[authorName] += borrows.length;
    return acc;
}, {});

return Object.entries(authorBorrows)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
