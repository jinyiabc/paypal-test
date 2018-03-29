var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./routes/api');
var mongoose = require('mongoose');
var session = require('express-session');
// var braintree = require('braintree');
require('dotenv').load();
var cors = require('cors');
// var paypal = require('paypal-rest-sdk');
// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': process.env.client_id,
//   'client_secret': process.env.secret
// });


var app = express();
app.use(cors())

// connect to mongoDB
// mongoose.connect('mongodb://localhost/users');
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));
// app.use('/login',function(req,res){
//     res.sendFile(__dirname + '/dist/index.html');
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));



app.get('/test',function(req,res){
    console.log('GET WORKS');
    // res.send({"data":"test"})
    res.redirect('https://www.google.com/');

})
    .post('/test', function(req,res){
        console.log('TEST WORKS');
        // res.send('test works!')
        // res.redirect('https://www.google.com');
        res.redirect('https://www.google.com/');

    });

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/dist/index.html');
});

// initialize the routes
app.use('/api',api);


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
