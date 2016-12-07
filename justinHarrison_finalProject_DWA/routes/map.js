var express = require('express');
var router = express.Router();

var path = require('path');

var Deal = require('../models/deal');



router.get('/', function(req, res) {
    Deal.find({}, function(err, results){
        console.log(results);
        res.render('map', {places : results});
    });
            
        });

    
module.exports = router;



                                                                                                                                     
                                                                                                                                    

