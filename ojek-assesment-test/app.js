var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var drivers = require('./routes/drivers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('mamboSecret', 'ayamGor3ngH4l4l');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ojek-assesment-test');


app.use('/', index);
app.use(function(req, res, next) {
    var token = req.body.access || req.query.access || req.headers['x-access-access'];
    if (token) {

        jwt.verify(token, app.get('mamboSecret'), function(err, decoded) {
            if (err) {
                res.status(404)
                    .send('Not found')
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(404)
            .send('Not found')
    }
});
app.use('/drivers', drivers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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

module.exports = app;
