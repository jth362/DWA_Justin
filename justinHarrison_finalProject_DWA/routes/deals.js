var express = require('express');
var router = express.Router();

var User = require('../models/user');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer');
var uploadPath = path.join(__dirname, '../public/uploads');
var upload = multer({ dest: uploadPath});

var Deal = require('../models/deal');

router.get('/add', function(req, res) {
  res.render('new-deal');
});


router.post('/add', upload.single('image'), function(req, res) {
    var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAavTu3nfGQoWONeqH4g6RE2nW7P0TXZEQ'
    });
    
googleMapsClient.geocode({address: req.body.address}, function(err, response) {
  if (!err) {
  var deal = new Deal({
    name: req.body.name,
    slug: slugify(req.body.name),
    address: req.body.address,
    coordinates: response.json.results[0].geometry.location[0],
    description: req.body.description,
    price: req.body.price,
    category: req.body.tags,
    imageFilename: req.file.filename
  });
     
  deal.save(function(err, data) {
    if (err) {
      console.log(err);
      return res.redirect(303, '/deals');
    }   
    return res.redirect(303, '/deals');
  });     
  }
});
});


router.get('/', function(req, res) {
  var query = {};
  if (req.query.name) {
    query = {name: req.query.name};
  }
  Deal.find(query, function(err, data) {
    var pageData = {
      deals: data
    };
    res.render('deals', pageData);
  });

});

router.get('/:dealSlug', function(req, res) {
    Deal.findOne({slug: req.params.dealSlug}, function(err, data) {
    var pageData = {
      deals: [data]
    };
    console.log[data];
    res.render('singleDeal', pageData);
  });
});

router.get('/:dealSlug/update', function(req, res) {
    Deal.findOne({slug: req.params.dealSlug}, function(err, data) {
    var pageData = {
      deals: [data]
    };
    console.log[data];
    res.render('updateDeal', pageData);
  });
});

  
module.exports = router;


// via https://gist.github.com/mathewbyrne/1280286
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
