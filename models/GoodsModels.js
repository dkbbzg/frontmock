const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
    "name": String,     //  名称
    "category": Number,   //  类别
    "files": [],    //  图片
    "original": Number,   //  原价
    "current": Number,   //  现价
}, {
    versionKey: false
});

const GoodsModels = mongoose.model('good', GoodsSchema, 'goods')

module.exports = GoodsModels