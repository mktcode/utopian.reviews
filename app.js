let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config');

let index = require('./routes/landingpage/index');
let backend = require('./routes/backend');
let users = require('./routes/users');
let oauth = require('./routes/oauth');

let app = express();
app.disable('x-powered-by');

app.set('trust proxy', 1);

app.use((req,res,next) => {
    res.header("X-Powered-By","@wehmoen");
next()
});

app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {path: '/'}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/v', backend);
app.use('/auth', oauth);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('unhandledRejection', function(err, promise) {
    console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
});

module.exports = app;
