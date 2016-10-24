var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
  name: String,
  coordinates: {type: Object, required: true}
});

var Address = mongoose.model('Address', addressSchema);

module.exports = Address;