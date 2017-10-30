const renderWord  = require('./render-word');
const renderLogin = require('./render-login');

module.exports = async function(req, res, next) {
  if (req.isAuthenticated()) {
    renderWord(req, res);
  } else {
    renderLogin(req, res);
  }
};
