const User          = require('../app/models/user');
const session       = require('express-session');
const fs            = require('fs');
const multer        = require('multer');
const upload        = multer({ dest: './tmp/' });

const renderDictionary = require('./routing/render-dictionary');
const getUserData      = require('./routing/get-user-data');
const renderHome       = require('./routing/render-home');
const uploadImage      = require('./routing/upload-image');
const logout           = require('./routing/log-out');
const renderUserCheck  = require('./routing/render-user-check');

module.exports = initRoutes;

function initRoutes(app, passport) {
  app.get('/',
    getUserData,
    renderHome);

  app.get('/dictionary',
    renderDictionary);

  app.post('/',
    getUserData,
    upload.single('image'),
    uploadImage,
    renderHome);

  app.post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/',
      failureFlash:    true,
    }));

  app.get('/login',
    logout);

  app.get('/logout',
    logout);


  app.post('/check-user',
    renderUserCheck);
};
