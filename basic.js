'use strict';

const dataLoader = require('dataloader');

const db = [
    'Alice',
    'Bob',
    'Charlie',
    'Danielle',
    'Ernst'
];

const batchGetUserById = async (ids) => {
    console.log('Called once per tick:', ids);
    return ids.map(id => db[id - 1]);
};
const userLoader = new dataLoader(batchGetUserById);

console.log('\nEvent loop tick 1');
userLoader.load(1);
userLoader.load(2).then(console.log);

setTimeout(() => {
    console.log('\nTick 2');
    userLoader.load(3);
    userLoader.load(4);
}, 1000);

setTimeout(() => {
    console.log('\Tick 3');
    userLoader.load(5);
    userLoader.load(6);
}, 2000);
