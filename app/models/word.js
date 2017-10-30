const mongoose = require('mongoose');

const wordSchema = mongoose.Schema({
  _id:  String,
  word: String,
  used: Number,
});


const WordModel = mongoose.model('Word', wordSchema);
module.exports = WordModel;
