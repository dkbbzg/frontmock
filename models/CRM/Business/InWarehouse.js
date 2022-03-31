// 仓库管理
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InWarehouseSchema = new Schema({
    "id": String, //  入库单编号
    "product_category": String, //  货物类别
    "product_id": Schema.Types.ObjectId, //  货物编号
    "product_color": Schema.Types.ObjectId, //  货物颜色(仅在货物类别为成品布时存在)
    "warehouse_id": Schema.Types.ObjectId, //  仓库编号
    "inWarehouse_count": Number, //  入库数量
    "status": Number, //  状态
}, {
    versionKey: false
});

const InWarehouseModels = mongoose.model('in_warehouse', InWarehouseSchema, 'in_warehouses');

module.exports = InWarehouseModels