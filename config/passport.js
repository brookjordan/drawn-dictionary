const LocalStrategy = require('passport-local').Strategy;
const User          = require('../app/models/user');


module.exports = checkPassport;


function checkPassport(passport) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  passport.use('local', new LocalStrategy(
    {
      usernameField:     'username',
      passwordField:     'password',
      passReqToCallback: true,
    },

    (req, username, password, done) => {
      if (!username || !username.trim()) {
        return done(null, false, req.flash('loginMessage', 'No username provided.'));
      }

      process.nextTick(function() {
        User.findOne({ 'local.username' :  username }, function(err, user) {
          if (err) { return done(err); }

          if (user) {
            if (user.validPassword(password)) {
              if (!user.displayname && req.body && req.body.displayname) {
                user.displayname = req.body.displayname;
              }
              if (!user.email && req.body && req.body.email) {
                user.email = req.body.email;
              }
              user.save(e => {
                done(null, user);
              });
            } else {
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            }
          } else {
            var newUser = new User();

            newUser.local.username = username;
            newUser.local.password = newUser.generateHash(password);

            if (req.body && req.body.displayname) {
              newUser.displayname = req.body.displayname;
            }
            if (req.body && req.body.email) {
              newUser.email = req.body.email;
            }

            newUser.save(err => {
              if (err) { throw err; }
              return done(null, newUser);
            });
          }
        });
      });
    }
  ));
};
