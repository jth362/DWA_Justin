

var express = require('express');
var router = express.Router();

var path = require('path');

router.get('/', function(req, res){
    res.render('search');
});

router.find('/' + category, function(req, res) {
    Deal.findOne({category: req.params.category}, function(err, data) {
    var pageData = {
      deals: [data]
    };
    res.render('deals', pageData);
  });
});

    
module.exports = router;



                                                                                                                                     
                                                                                                                                    

