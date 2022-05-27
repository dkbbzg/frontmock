const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
    "name": String,     //  名称
    "region": String,   //  所处学校
    "category": [],   //  类别
    "files": [],    //  图片
    "original": Number,   //  原价
    "current": Number,   //  现价
    "delivery": Boolean,   //  快递方式
    "desc": String,   // 描述
    "userId": Schema.Types.ObjectId, //用户
}, {
    versionKey: false
});

const NewGoodsModels = mongoose.model('newgood', GoodsSchema, 'newgoods')

module.exports = NewGoodsModels