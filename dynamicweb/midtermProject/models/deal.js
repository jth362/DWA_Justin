var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var dealSchema = new Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: String, required: true},
  category: {type: String, required: true},
  imageFilename: String
});

dealSchema.plugin(URLSlugs('name', {field: 'slug'}));

var Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;