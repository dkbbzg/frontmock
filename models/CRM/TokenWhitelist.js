const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenWhitelistSchema = new Schema({
    "token": String
}, {versionKey: false});

const TWLModels = mongoose.model('tokenWhitelist', tokenWhitelistSchema)

module.exports = TWLModels