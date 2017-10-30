const User          = require('../../app/models/user');
const addRenderData = require('./add-render-data');

module.exports = async function(req, res, next) {
  if (!req.session.passport) { next(); }

  let user = await User.findOne({ '_id' :  req.session.passport.user })
  .catch(e => res.render('login', { message: req.flash('loginMessage') }));

  if (user) {
    res.locals.user = user;

    addRenderData(res, {
      currentwordid: user.currentword,
      displayname:   user.displayname,
      email:         user.email,
      username:      user.local.username,
    });
  }

  next();
};
