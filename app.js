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
var paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.client_id,
  'client_secret': process.env.secret
});


var app = express();
app.use(cors())

// connect to mongoDB
// mongoose.connect('mongodb://localhost/users');
mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));


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





app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/paypal/payment/create', function(req, res){

    // console.log(req.body.user.name);
    // console.log(req.body.user.email);
// Build PayPal payment request
var payReq = JSON.stringify({
  intent:'sale',
  payer:{
    payment_method:'paypal'
  },
  redirect_urls:{
    return_url: process.env.app_url + '/api/paypal/payment/execute',
    cancel_url: process.env.app_url + '/cancel'
  },
  transactions:[{
    amount:{
      total:'10',
      currency:'USD'
    },
    description:'This is the payment transaction description.'
  }]
});

paypal.payment.create(payReq, function(error, payment){
  var links = {};

  if(error){
    console.error(JSON.stringify(error));
  } else {
    // Capture HATEOAS links
    payment.links.forEach(function(linkObj){
      links[linkObj.rel] = {
        href: linkObj.href,
        method: linkObj.method
      };
    })

    // If redirect url present, redirect user
    if (links.hasOwnProperty('approval_url')){
      //REDIRECT USER TO links['approval_url'].href
      console.log('approval_url:',links['approval_url']);

      res.redirect(links['approval_url'].href);
    } else {
      console.error('no redirect URI present');
    }
  }
});

});  // end of creation on paypal payment

app.use('/api/paypal/payment/execute',function(req,res){
    console.log('PayerID:',req.query.PayerID);
    console.log('paymentId:',req.query.paymentId);
    // res.send('works!');
    var execute_payment_json = {
        "payer_id": req.query.PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    };
    var paymentId = req.query.paymentId;
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.send(JSON.stringify(payment));
        }
    });

})



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
