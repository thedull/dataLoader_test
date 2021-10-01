let knex = null;

async function startDatabase() {
    if (!knex) {
        knex = require('knex')({
            client: 'sqlite3',
            connection: {
                filename: 'db.sqlite'
            }
        });
        await createDatabase(knex);
        console.log('DB initialized');
    }
    return knex;
}

async function createDatabase(knex) {
    await knex.schema
        .createTable('authors', table => {
            table.increments('id');
            table.string('name');
        })
        .createTable('books', table => {
            table.increments('id');
            table.string('title');
            table.integer('author_id').unsigned().references('authors_id');
        })
        .createTable('libraries', table => {
            table.increments('id');
            table.string('name');
            table.string('description');
        })
        .createTable('libraries_books', table => {
            table.increments('id');
            table.integer('library_id').unsigned().references('libraries_id');
            table.integer('book_id').unsigned().references('books_id');
        });

    await knex('authors').insert([
        { id: 1, name: 'Mary Shelley' },
        { id: 2, name: 'H. P. Lovecraft' },
        { id: 3, name: 'Edgar Allan Poe' },
    ]);

    await knex('books').insert([
        { id: 1, title: 'Frankenstein', author_id: 1 },
        { id: 2, title: 'The Raven and Other Poems', author_id: 3 },
        { id: 3, title: 'Reanimator', author_id: 2 },
        { id: 4, title: 'Ligeia', author_id: 3 },
    ]);

    await knex('libraries').insert({
        id: 1,
        name: 'Favorite books',
        description: 'Lorem ipsum dolor sit amet'
    });

    await knex('libraries_books').insert([
        { library_id: 1, book_id: 1 },
        { library_id: 1, book_id: 3 }
    ]);

    return true;
}

module.exports = startDatabase;
