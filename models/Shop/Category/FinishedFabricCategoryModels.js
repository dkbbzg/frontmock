// 胚布品类
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinishedFabricCategorySchema = new Schema({
    "id": String,       //  编号
    "name": String,     //  名称
    "remark": String,   //  备注
    "weight": Number,   //  克重
    "width": Number,    //  幅宽
}, {
    versionKey: false
});

const FinishedFabricCategoryModels = mongoose.model('finished_fabric_category', FinishedFabricCategorySchema, 'finished_fabric_categorys')

module.exports = FinishedFabricCategoryModels