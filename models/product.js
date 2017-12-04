var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  product_name: String,
  category: String,
  description: String,
  product_image: String,
  price: Number
});

module.exports = mongoose.model('Product', ProductSchema);