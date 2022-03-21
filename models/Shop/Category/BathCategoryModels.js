// 原料品类
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BathCategorySchema = new Schema({
    "name": String,
    "category": String,
    "supplier": {
        type: Schema.Types.ObjectId,
        ref: 'supplier',
        _id: false
    }, 
    "remark": String,
}, {
    versionKey: false
});

const BathCategoryModels = mongoose.model('bath_category', BathCategorySchema, 'bath_category')

module.exports = BathCategoryModels