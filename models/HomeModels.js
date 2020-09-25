const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
    "swiper_title": String,
    "swiper_word": String,
    "swiper_bgimg": String,
    "swiper_remarks": String,
    "type": String,
    "introduction": String,
    "introduction_bg": String
});

const HomeModels = mongoose.model('home', HomeSchema, 'homes')

module.exports = HomeModels