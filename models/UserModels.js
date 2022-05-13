const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    "user_name": String,
    "user_pwd": String,
    "user_jurisdiction": Number
});

const UserModels = mongoose.model('user', UserSchema)

module.exports = UserModels