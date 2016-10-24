var express = require('express');
var router = express.Router();

var path = require('path');

var multer = require('multer');
var uploadPath = path.join(__dirname, '../public/uploads');
var upload = multer({ dest: uploadPath});

var Deal = require('../models/deal');
var Address = require('../models/address');

router.get('/add', function(req, res) {
  res.render('new-deal');
});



router.post('/add', upload.single('image'), function(req, res) {
  var address = req.body.address;
  var deal = new Deal({
    name: req.body.name,
    slug: slugify(req.body.name),
    address: req.body.address,
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
    
     var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAavTu3nfGQoWONeqH4g6RE2nW7P0TXZEQ'
});

googleMapsClient.geocode({
  address: req.body.address
}, function(err, response) {
  if (!err) {
       var address = new Address
  ({
      name: req.body.name,
      address: response.json.results[0].geometry.location
  });
    
  address.save(function(err, data){
      if (err){
          console.log(err);
      }
  });
  }
});
  
  }
 );


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
    res.render('deals', pageData);
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
