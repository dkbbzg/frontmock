const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ViewSchema = new Schema({
    "_id": String,
    "user_name": String,
    "user_pwd": String,
    "user_jurisdiction": Number
});

const ViewModels = mongoose.model('view', ViewSchema)

module.exports = ViewModels