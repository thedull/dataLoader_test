const express = require('express');
const getCharactersByEpisode = require('./localResolver');

const app = express();

app.get('/', async (req, res) => {
    res.send(await getCharactersByEpisode());
});

app.listen(3000, () => {
    console.log('Listening on localhost:3000');
});
