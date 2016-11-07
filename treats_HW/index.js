// load modules
var express = require('express');
var hbs = require('express-handlebars');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');


// load .env
require('dotenv').config();

// create app
var app = express();
var PORT = process.env.PORT || 8081;


// set cookieSecret in .env
app.use(session({
    secret: process.env.cookieSecret,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: false,
    saveUninitialized: true,
    // add session store
    store: new MongoStore({
      url: process.env.DB_URL
    })
  }
));

// attach req.session.flash to res.locals
app.use(function(req, res, next) {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

// init handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(cookieParser());

//add form fields to req.body, i.e. req.body.username
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

mongoose.connect(process.env.DB_URL);

var options = {};
var auth = require('./lib/auth')(app, options);
auth.init();
auth.registerRoutes();

// home page

app.get('/', function(req, res) {
  if (req.session.treat) {
   return res.render('view', {
     msg: 'You have some candy: ' + treats
   }); 
  }
  return res.render('view', {
    msg: 'No treats.'
  });
});


app.get('/candycorn', function(req, res) {
  req.session.treat = ' candy corn';
  treats.push(req.session.treat);
  req.session.flash = {
    type: 'positive',
    header: 'You got a treat',
    body: 'The treat is ' + req.session.treat
  };
//  req.cookie('treat', 'candy corn', {
//    httpOnly: true,
//    signed: true
//  });
  res.redirect('/');
});


app.get('/chocolate', function(req, res) {
  req.session.treat = ' chocolate';
  treats.push(req.session.treat);
  req.session.flash = {
    type: 'positive',
    header: 'You got a treat',
    body: 'The treat is ' + req.session.treat
  };
//  req.cookie('treat', 'candy corn', {
//    httpOnly: true,
//    signed: true
//  });
  res.redirect('/');
});

app.get('/lollipop', function(req, res) {
  req.session.treat = ' lollipop';
  treats.push(req.session.treat);
  req.session.flash = {
    type: 'positive',
    header: 'You got a treat',
    body: 'The treat is ' + req.session.treat
  };
//  req.cookie('treat', 'candy corn', {
//    httpOnly: true,
//    signed: true
//  });
  res.redirect('/');
});

app.get('/bubblegum', function(req, res) {
  req.session.treat = ' bubblegum';
  treats.push(req.session.treat);
  req.session.flash = {
    type: 'positive',
    header: 'You got a treat',
    body: 'The treat is ' + req.session.treat
  };
//  req.cookie('treat', 'candy corn', {
//    httpOnly: true,
//    signed: true
//  });
  res.redirect('/');
});

app.get('/clear', function(req, res) {
//  res.clearCookie('treat');
  delete req.session.treat;
  treats = [];
  req.session.flash = {
    type: 'negative',
    header: 'No treat',
    body: 'Your bag is empty'
  };
  res.redirect('/');
});


// start server
app.listen(PORT, function() {
  console.log('listening on port ', PORT);
});