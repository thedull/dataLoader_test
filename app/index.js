const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const DataLoader = require('dataloader');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const startDatabase = require('./database');

const PORT = 3001;

const dataLoaders = async () => {
    const db = await startDatabase();

    return {
        author: new DataLoader(ids => {
            console.log('DB queried', ids);

            return db('authors').whereIn('id', ids).select();
        })
    };
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
        const knex = await startDatabase();
        const loaders = await dataLoaders();

        return { knex, loaders };
    }
});

const app = express();

(async () => {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`GraphQL available at http://localhost:${PORT}/${server.graphqlPath}`);
    });
})();
