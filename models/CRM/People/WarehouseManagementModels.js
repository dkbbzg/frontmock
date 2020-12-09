// 胚布品类
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WarehouseManagementSchema = new Schema({
    "id": String,       //  仓库编号
    "name": String,     //  仓库名称
    "address": String,  //  仓库地址
    "phone": String,    //  联系方式
    "remark": String,   //  备注
    "products": [
        {
            "_id": Schema.Types.ObjectId,
            "id": String,
            "category": String,
            "name": String,
            "remark": String,
            "now_count": Number,
            "out_count": Number,
            "in_count": Number,
        }
    ]
}, {
    versionKey: false
});

const WarehouseManagementModels = mongoose.model('warehouse_management', WarehouseManagementSchema, 'warehouse_managements');

module.exports = WarehouseManagementModels