// 原料 业务
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TileBuySchema = new Schema({
    "date": Date, //  日期
    "from": {
        type: Schema.Types.ObjectId,
        ref: 'supplier',
        _id: false
    },      //  购入单位
    "products": [{
        "product": {
            type: Schema.Types.ObjectId,
            ref: 'tile_category',
            _id: false
        },
        "count": Number,
        "unitPrice": Number,
    }],      //  品名
    "amount": Number, //  金额
    "payStatus": Number,    //  付款情况
    "warehouse": {
        type: Schema.Types.ObjectId,
        ref: 'warehouse_management',
        _id: false
    },      //  所在仓库
    "remark": String,       //  备注
}, {
    versionKey: false
});

const TileBuyModels = mongoose.model('tile_buy', TileBuySchema, 'tile_buys');

module.exports = TileBuyModels