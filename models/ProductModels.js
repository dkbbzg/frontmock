const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    "category": String,
    "category_No": Number,
    "product": {
      "name": String,
      "order": Number,
      "pic": String,
      "description": String,
      "parameter": {
        "head": Array,
        "data": Array
      }
    }
});

const ProductModels = mongoose.model('product', ProductSchema, 'products')

module.exports = ProductModels