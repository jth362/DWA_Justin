var express = require('express');
var router = express.Router();
var geocoder = require('geocoder');
var User = require('../models/user');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer');
var uploadPath = path.join(__dirname, '../public/uploads');
var upload = multer({ dest: uploadPath});
var slug;

var Deal = require('../models/deal');

//renders new deal page
router.get('/add', function(req, res) {
  res.render('new-deal');
});

//add new deal to database
router.post('/add', upload.single('image'), function(req, res) {
    var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyB8U0bbIoGos3lwzUiuNYWAUaKxNOXFMG0'
    });
    
    geocoder.geocode(req.body.address, function(err, data){
    var deal = new Deal({
    name: req.body.name,
    slug: slugify(req.body.name),
    address: req.body.address,
    coordinates: data.results[0].geometry.location,
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
  }); 
});

//loads all deals on database
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

//opens single deal page and creates variable for current information in case of update
router.get('/:dealSlug', function(req, res) {
     slug = req.params.dealSlug;
    Deal.findOne({slug: req.params.dealSlug}, function(err, data) {
    var pageData = {
      deals: [data]
    };
    name = pageData.deals[0].name;
    address = pageData.deals[0].address;
    price = pageData.deals[0].price;
    category = pageData.deals[0].tags;
    description = pageData.deals[0].description;
    res.render('singleDeal', pageData);
  });
});

//opens update page and renders previous data in form
router.get('/:dealSlug/update', function(req, res) {
    Deal.findOne({slug: req.params.dealSlug}, function(err, data) {
    var pageData = {
      deals: [data]
    };
    res.render('updateDeal', pageData);
  });
});

//checks to see if information has been update, and then updates on database where necessary
router.post('/:dealSlug/update', function(req, res){
    if (req.body.name != ''){
        name = req.body.name;
    }
    if (req.body.address != ''){
        address = req.body.address;
    }
    if (req.body.price != ''){
        price = req.body.price;
    }
    if (req.body.tags != ''){
        category = req.body.tags;
    }
    if (req.body.description != ''){
        description = req.body.description;
    }
    
    Deal.findOneAndUpdate({slug: slug}, {$set: {name: name, address: address, price: price, category: category, description: description }}, function(err, deal){
        
    });
    res.redirect('/deals')
    });

//not currently working
router.delete('/:dealSlug/update', function(req, res){
    Deal.findOneAndDelete({slug: slug}, function(err, deal){
        
    });
    res.redirect('/deals')
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
