const Word        = require('../app/models/word');
const querystring = require('querystring');
const https       = require('https');


module.exports = getRandomWord;


async function getRandomWord() {
  let unusedWords = await Word.find({used: 0});
  return unusedWords[Math.floor(Math.random() * unusedWords.length)];
}


function getRandomWordOld() {
  return new Promise((resolve, reject) => {const host     = 'od-api.oxforddictionaries.com';
    const port = 443;
    const qs   = {
      exclude: 'lexicalCategory=Conjunction,Determiner,Interjection,Preposition,Pronoun',
      word_length: '>4,<8&exact=false',
    };
    const path    = '/api/v1/wordlist/en/registers%3DRare?' + querystring.stringify(qs);
    const headers = {
      app_id:  process.env.OXFORD_ID,
      app_key: process.env.OXFORD_KEY,
    };

    https.get(
      {
        host,
        port,
        path,
        headers,
        method:  'GET',
      },
      (res) => {
        let stream = [];

        res
          .on('data', function(chunk) {
            stream.push(chunk);
          })
          .on('end', function() {
            let data       = JSON.parse(Buffer.concat(stream).toString());
            let results    = data.results;
            let chosenWord = results[Math.floor(Math.random() * results.length)];
            resolve(chosenWord);
          });
      }
    ).on('error', (e) => {
      reject(e);
    });
  });
}
