async function getBooks(_, {}, { knex }) {
    if (!knex) throw new Error('Not connected to DB');

    return await knex('books').select();
}

async function getAuthor({ author_id: authorId }, {}, { knex, loaders }) {
    if (!knex) throw new Error('Not connected to DB');
    
    //console.log('DB called', authorId);
    return await loaders.author.load(authorId);
}

async function getLibrary(_, { id }, { knex }) {
    if (!knex) throw new Error('Not connected to DB');
    
    const library = await knex('libraries').where('id', id).select();

    if (!library.length) throw new Error('Library not found');

    return library[0];
}

async function getBooksByLibrary({ id }, {}, { knex }) {
    if (!knex) throw new Error('Not connected to DB');

    return await knex('libraries_books')
        .where('library_id', id)
        .join('books', 'libraries_books.book_id', 'books.id')
        .select('books.*');
}

async function getBookjsByAuthor({ id }, {}, { knex }) {
    if (!knex) throw new Error('Not connected to DB');

    return await knex('books').where('author_id', id);
}

async function getBook(_, { id }, { knex }) {
    if (!knex) throw new Error('Not connected to DB');
    
    const book = await knex('books').where('id', id).select();

    if (!book) throw new Error('Book not found');

    return book[0];
}

const resolvers = {
    Book: {
        author: getAuthor
    },
    Library: {
        books: getBooksByLibrary
    },
    Author: {
        books: getBookjsByAuthor
    },
    Query: {
        books: getBooks,
        book: getBook,
        library: getLibrary
    }
};

module.exports = resolvers;

