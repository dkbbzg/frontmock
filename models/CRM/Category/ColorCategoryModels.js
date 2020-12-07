// 胚布品类
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColorCategorySchema = new Schema({
    "id": String,       //  色号
    "name": String,     //  名称
    "remark": String,   //  备注
}, {
    versionKey: false
});

const ColorCategoryModels = mongoose.model('color_category', ColorCategorySchema, 'color_categorys')

module.exports = ColorCategoryModels