const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    "user_name": String,
    "user_pwd": String,
    "user_role": String,
    "token": String
}, {
    versionKey: false
});

const UserModels = mongoose.model('user', UserSchema)

module.exports = UserModels