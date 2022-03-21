// 原料商
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    "category": String, //  单位类别
    "name": String, //  单位名称
    "address": String, //  单位地址
    "phone": String, //  联系方式
    "remark": String, //  备注
}, {
    versionKey: false
});

const SupplierModels = mongoose.model('supplier', SupplierSchema, 'suppliers');

module.exports = SupplierModels