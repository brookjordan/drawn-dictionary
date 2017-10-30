const Word          = require('../../app/models/word');
const addRenderData = require('./add-render-data');
const getRandomWord = require('../../app/get-word');

module.exports = async function(req, res) {
  if (res.locals.setNewWord || !res.locals.user.currentword) {
    let newWord = await getRandomWord();
    res.locals.user.currentword = newWord.id;
    await res.locals.user.save();
  }

  let currentWord = await Word.findOne({ _id: res.locals.user.currentword });

  res.render('word', addRenderData(res, {
    title:       `${ currentWord.word.slice(0,1).toUpperCase() }${ currentWord.word.slice(1) }`,
    currentword: `${ currentWord.word.slice(0,1).toUpperCase() }${ currentWord.word.slice(1) }`,
  }));
};
