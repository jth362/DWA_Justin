var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../models/user');
var Deal = require('../models/deal');


router.get('/', function(req, res) {
    res.render('user-profile');
  });

module.exports = router;