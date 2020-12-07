// 原料品类
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawMaterialCategorySchema = new Schema({
    "id": String,
    "name": String,
    "remark": String,
}, {
    versionKey: false
});

const RawMaterialCategoryModels = mongoose.model('rawMaterial_category', RawMaterialCategorySchema, 'rawMaterial_categorys')

module.exports = RawMaterialCategoryModels