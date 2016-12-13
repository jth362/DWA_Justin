var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    role: String,
    deals: [String]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);