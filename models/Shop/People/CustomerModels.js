// 客户
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    "name": String,         //  名称
    "intention": String,         //  意向
    "address": String,      //  地址
    "phone": String,        //  联系方式
    "remark": String,       //  备注
    "record": [],           //  记录
}, {
    versionKey: false
});

const CustomerModels = mongoose.model('customer', CustomerSchema, 'customers');

module.exports = CustomerModels