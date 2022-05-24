const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    "title": String,
    "href": String,
    "user": String,
});

const CollectionModels = mongoose.model('collection', CollectionSchema)

module.exports = CollectionModels