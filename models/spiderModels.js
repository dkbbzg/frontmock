const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  "bookName": String,
  "bookId": String,
  "author": String,
  "status": String,
  "latestUpdate": String,
  "wordNumber": String,
  "latestChapterName": String,
  "latestChapterUrl": String,
  "isExist": Boolean,
});
const BookModels = mongoose.model('book', BookSchema, 'books');
module.exports = BookModels
