const dataLoader = require('dataloader');
const data = require('./rmData').results;

const batchGetCharactersByEpisode = async (episodeList) => {
    const characterList = episodeList.map(epId => ({
        epId,
        characters: data.filter(char => char.episode.includes(`https://rickandmortyapi.com/api/episode/${epId}`)).map(char => char.name)
    }));
    //console.log('Fired once');
    return characterList;
}
const characterLoader = new dataLoader(batchGetCharactersByEpisode);

async function getCharactersByEpisode() {
    return new Promise((resolve, reject) => {
        const promiseArray = [];
        for (let i = 0; i < 5; i++) {
            const id = Math.ceil(Math.random()*20);
            promiseArray.push(characterLoader.load(id));
        }
        Promise.all(promiseArray).then(values => {
            //console.log(values); 
            resolve(values);
        });
    })
}

module.exports = getCharactersByEpisode;

