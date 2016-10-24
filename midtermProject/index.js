var express = require('express');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');

var app = express();

require('dotenv').config();

Mongoose.connect(process.env.DB_URL);

var portNum = 1234;
app.set('port', portNum);

// tell express to use handlebars
app.engine('handlebars', hbs({defaultLayout: 'main'}) );
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var deal = require('./routes/deals');
app.use('/deals', deal);

var map = require('./routes/map');
app.use('/map', map);

var search = require('./routes/search');
app.use('/search', search);


app.use( express.static('public') );

// start server
app.listen(portNum, function() {
  console.log('listening on port ', portNum);
});