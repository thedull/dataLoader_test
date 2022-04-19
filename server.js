const express = require('express');
const axios = require('axios');

const getCharactersByEpisode = require('./localResolver');
const data = require('./rmData').results;

const app = express();

app.get('/', async (req, res) => {
    res.send(await getCharactersByEpisode());
});

app.get('/data', async (req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.send(data);
})

app.get('/sum', async (req, res) => {
    const res1 = await axios.get('http://localhost:3000/random');
    const res2 = await axios.get('http://localhost:3000/random');
    res.setHeader('Content-type', 'application/json');
    const result = res1.data?.number + res2?.data?.number;
    res.send({ result });
})

app.get('/random', async (req, res) => {
    const result = { number: Math.ceil(Math.random()*10) };
    res.setHeader('Content-type', 'application/json');
    res.send(result);
})

app.get('/mul', async (req, res) => {
    const res1 = await axios.get('http://localhost:3000/random');
    const res2 = await axios.get('http://localhost:3000/random');
    res.setHeader('Content-type', 'application/json');
    const result = res1.data?.number * res2?.data?.number;
    res.send({ result });
})

app.get('/calc', async (req, res) => {
    const res1 = await axios.get('http://localhost:3000/sum');
    const res2 = await axios.get('http://localhost:3000/mul');
    res.setHeader('Content-type', 'application/json');
    const result = { sum: res1.data?.result, mul: res2?.data?.result };
    res.send(result);
})


app.listen(3000, () => {
    console.log('Listening on localhost:3000');
});
