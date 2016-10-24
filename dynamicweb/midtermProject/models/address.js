var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
  name: String,
  address: Object
});

var Address = mongoose.model('Address', addressSchema);

module.exports = Address;