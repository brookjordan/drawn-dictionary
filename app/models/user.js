const mongoose = require('mongoose');
const crypto   = require('crypto');

const userSchema = mongoose.Schema({
    local: {
        username:     String,
        password:     String,
    },

    currentword: String,
    email:       String,
    displayname: String,
});

userSchema.methods.generateHash = encryptPassword;
userSchema.methods.validPassword = comparePassword;


const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;


function encryptPassword(password) {
  return crypto.pbkdf2Sync(password, 'ImOneHelluvaSaltyBeast!', 1e5, Math.pow(2,9), 'sha512').toString('hex');
}

function comparePassword(password) {
  return this.local.password === encryptPassword(password);
}
