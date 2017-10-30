const addRenderData = require('./add-render-data');

module.exports = function(req, res) {
  res.render('login', addRenderData(res, {
    title:  'Login',
    message: req.flash('loginMessage'),
  }));
};
