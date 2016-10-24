var express = require('express');
var router = express.Router();

var path = require('path');
var Address = require('../models/address');


router.get('/', function(req, res) {
    var mLab = require('mongolab-data-api')('e4eQCof181-TqsPLNg0K6qP6evW05fy_');
        
        var options = {
        database: 'dynamic_web',
        collectionName: 'addresses',
            };
 
        mLab.listDocuments(options, function (err, data) {
            var pageData = {
                data
            }
            //=> [ { _id: 1234, ...  } ] 
            console.log(pageData.data);
              res.render('map');
        });
});


    
module.exports = router;



                                                                                                                                     
                                                                                                                                    

