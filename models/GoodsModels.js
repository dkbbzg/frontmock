const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
    "name": String,     //  名称
    "category": Number,   //  类别
    "files": [],    //  图片
    "original": Number,   //  原价
    "current": Number,   //  现价
    "from": String,   //  发货地
    "express": Number,   //  快递方式
    "desc": String,   // 描述
}, {
    versionKey: false
});

const GoodsModels = mongoose.model('good', GoodsSchema, 'goods')

module.exports = GoodsModels