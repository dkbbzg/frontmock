// 原料 业务
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawMaterialBusinessSchema = new Schema({
    "id": Schema.Types.ObjectId, //  业务编号
    "date": String, //  日期
    "from": {
        type: Schema.Types.ObjectId,
        ref: 'rawMaterial_supplier',
        _id: false
    },      //  购入单位
    "productName": {
        type: Schema.Types.ObjectId,
        ref: 'rawMaterial_category',
        _id: false
    },      //  品名
    "count": String, //  数量
    "unitPrice": String, //  单价
    "amount": String, //  金额
    "to": {
        type: Schema.Types.ObjectId,
        ref: 'weaving_mill',
        _id: false
    },      //  加工单位
    "usedTo": String,   //  用途
    "payStatus": Number,    //  付款情况
    "rawMaterialCount": [{
        "product": {
            type: Schema.Types.ObjectId,
            ref: 'fabric_category'
        },
        "count": Number,
        "total": Number,
    }], //  用料情况
    "warehouse": {
        type: Schema.Types.ObjectId,
        ref: 'warehouse_management',
        _id: false
    },      //  所在仓库
    "KP": Number,   //    KP
}, {
    versionKey: false
});

const RawMaterialBusinessModels = mongoose.model('rawMaterial_business', RawMaterialBusinessSchema, 'rawMaterial_business');

module.exports = RawMaterialBusinessModels