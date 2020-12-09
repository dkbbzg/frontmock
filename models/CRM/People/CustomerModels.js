// 胚布品类
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    "id": String,           //  单位编号
    "name": String,         //  单位名称
    "address": String,      //  单位地址
    "phone": String,        //  联系方式
    "remark": String,       //  备注
    "bankAccount": String,  //  银行账号
}, {
    versionKey: false
});

const CustomerModels = mongoose.model('customer', CustomerSchema, 'customers');

module.exports = CustomerModels