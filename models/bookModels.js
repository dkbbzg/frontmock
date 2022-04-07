const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  "bookName": String,
  "bookId": String,
  "bookBg": String,
  "author": String,
  "status": String,
  "category": String,
  "update_time": String,
  "description": String,
  "latestChapterName": String,
  "latestChapterUrl": String,
  "latestvisited": Date,
});
const BookModels = mongoose.model('book', BookSchema, 'books');
module.exports = BookModels
