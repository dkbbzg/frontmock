// 织造厂
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeavingMillSchema = new Schema({
    "id": String, //  单位编号
    "name": String, //  单位名称
    "address": String, //  单位地址
    "phone": String, //  联系方式
    "remark": String, //  备注
    "products": [{
        "product": {
            type: Schema.Types.ObjectId,
            ref: 'fabric_category'
        },
        _id: false
    }]
}, {
    versionKey: false
});

const WeavingMillModels = mongoose.model('weaving_mill', WeavingMillSchema, 'weaving_mills');

module.exports = WeavingMillModels