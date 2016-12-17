var express = require('express');
var router = express.Router();
var geocoder = require('geocoder');
var path = require('path');
var Deal = require('../models/deal');
var User = require('../models/user');



router.get('/', function(req, res) {
    Deal.find({}, function(err, results){
        
        res.render('map', {places : results});
        });     
     });

    
module.exports = router;



                                                                                                                                     
                                                                                                                                    

