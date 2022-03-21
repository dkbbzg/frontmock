// 原料品类
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TileCategorySchema = new Schema({
    "name": String,
    "specifications": String,
    "supplier": {
        type: Schema.Types.ObjectId,
        ref: 'supplier',
        _id: false
    }, 
    "remark": String,
}, {
    versionKey: false
});

const TileCategoryModels = mongoose.model('tile_category', TileCategorySchema, 'tile_categorys')

module.exports = TileCategoryModels