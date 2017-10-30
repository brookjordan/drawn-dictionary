const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  location: String,
  src:      String,
  word:     String,
  wordid:   String,
  username: String,
});


const ImageModel = mongoose.model('Image', imageSchema);
module.exports = ImageModel;
