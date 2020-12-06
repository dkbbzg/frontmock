// 胚布品类
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FabricCategorySchema = new Schema({
    "id": String,       //  编号
    "name": String,     //  名称
    "remark": String,   //  备注
    "weight": Number,   //  克重
    "width": Number,    //  幅宽
    "warp": Number,     //  经纱，用于表示密度-经纱*纬纱
    "weft": Number,     //  纬纱，用于表示密度-经纱*纬纱
}, {
    versionKey: false
});

const FabricCategoryModels = mongoose.model('fabric_category', FabricCategorySchema, 'fabric_categorys')

module.exports = FabricCategoryModels