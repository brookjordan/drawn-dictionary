require('dotenv').config()

const express           = require('express');
const app               = express();
const port              = process.env.PORT || 3400;
const path              = require('path');
const mongoose          = require('mongoose');
const passport          = require('passport');
const flash             = require('connect-flash');
const sassMiddleware    = require('node-sass-middleware');
const postcssMiddleware = require('postcss-middleware');
const autoprefixer      = require('autoprefixer');
const morgan            = require('morgan');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const session           = require('express-session');
const destPath          = path.join(__dirname, 'public');

var configDB = require('./config/database.js');

// view engine setup ===========================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// configuration ===============================================================
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url, {
  useMongoClient: true,
});
require('./config/passport')(passport); // pass passport for configuration

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src:  destPath,
  dest: destPath,
  sourceMap: true
}));
//app.use(postcssMiddleware({
//  plugins: [
//    autoprefixer({
//      /* Options */
//    }),
//  ],
//  src: req => {
//    return path.join(destPath, req.url);
//  },
//}));
app.use(express.static(destPath));

// passport
app.use(session({
  secret:            'ilovescotchscotchyscotchscotch',
  resave:            true,
  saveUninitialized: true,
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport);

module.exports = app;


app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
