const dataLoader = require('dataloader');

const booksDB = [
    { title: 'Book 1', author_id: 1 },
    { title: 'Book 2', author_id: 2 },
    { title: 'Book 3', author_id: 3 },
    { title: 'Book 4', author_id: 3 },
    { title: 'Book 5', author_id: 2 }
];

const batchGetBooksByAuthorId = async (ids) => {
    const books = ids.map(authorId => {
        return booksDB.filter(book => book.author_id === authorId);
    });
    console.log('Fired only once');
    return books;
};
const bookLoader = new dataLoader(batchGetBooksByAuthorId);

for (let i = 1; i <= 3; i++) {
    bookLoader.load(i).then(res => {
        console.log(`\nAuthor Id:${i} books:`);
        console.log(res);
    });
}

setTimeout(() => {
    console.log('\nNext tick');
    const books = bookLoader.loadMany([1,3]).then(console.log);
});
