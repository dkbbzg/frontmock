// 胚布品类
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RawMaterialSupplierSchema = new Schema({
    "id": String, //  单位编号
    "name": String, //  单位名称
    "address": String, //  单位地址
    "phone": String, //  联系方式
    "remark": String, //  备注
    "products": [{
        "product": {
            type: Schema.Types.ObjectId,
            ref: 'rawMaterial_category'
        },
        _id: false
    }]
}, {
    versionKey: false
});

const RawMaterialSupplierModels = mongoose.model('rawMaterial_supplier', RawMaterialSupplierSchema, 'rawMaterial_suppliers');

module.exports = RawMaterialSupplierModels