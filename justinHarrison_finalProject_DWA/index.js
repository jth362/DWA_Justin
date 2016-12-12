//load and start modules
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var passport = require('passport');


require('dotenv').config();
Mongoose.connect(process.env.DB_URL);

var app = express();
var portNum = 1234;
app.set('port', portNum);

//create session
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

// tell express to use handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser('mysecret'));

var options = {};
var auth = require('./routes/auth')(app, options);
auth.init();
auth.registerRoutes();

//set routes
var deal = require('./routes/deals');
app.use('/deals', deal);

var map = require('./routes/map');
app.use('/map', map);

var search = require('./routes/search');
app.use('/search', search);

var profile = require('./routes/profile');
app.use('/profile', profile);

app.post('/login', function(req, res){
     var User = require('./models/user');
    User.findByIdAndUpdate(req.user._id, function(err, user){
        if(err){
            res.status('500').json({
                status: 'error'
            });
        }
    });
});

app.use( express.static('public') );

//user auth
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// start server
app.listen(portNum, function() {
  console.log('listening on port ', portNum);
});