const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NovelSchema = new Schema({
    "bookName": String,
    "bookId": String,
    "CharacterId": Number,
    "title": String,
    "href": String,
    "content": String,
    "no": Number,
});
const NovelModels = mongoose.model('novel', NovelSchema, 'novels');
module.exports = NovelModels
