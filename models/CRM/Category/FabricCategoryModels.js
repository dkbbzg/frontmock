// 胚布品类
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FabricCategorySchema = new Schema({
    "id": String,       //  编号
    "name": String,     //  名称
    "remark": String,   //  备注
    "weight": Number,   //  克重
    "width": Number,    //  幅宽
}, {
    versionKey: false
});

const FabricCategoryModels = mongoose.model('fabric_category', FabricCategorySchema, 'fabric_categorys')

module.exports = FabricCategoryModels