const express = require('express');
const router = express.Router();
const fs = require("fs");
const async = require("async");
//  原料业务
const RawMaterialBusinessModels = require('../../models/Shop/Business/RawMaterialBusinessModels');
//  原料商
const RawMaterialSupplierModels = require('../../models/Shop/People/SupplierModels');
//  织造厂
const WeavingMillModels = require('../../models/Shop/People/WeavingMillModels');
//  客户
const CustomerModels = require('../../models/Shop/People/CustomerModels');
//  仓库管理
const WarehouseManagementModels = require('../../models/Shop/People/WarehouseManagementModels');
//  坯布品类
const FabricCategoryModels = require('../../models/Shop/Category/FabricCategoryModels');





//  原料业务
//  获取原料业务表格数据
router.post('/getRawMaterialBusiness', (req, res) => {
    let _id = req.body._id ? req.body._id : '';
    let startTime = req.body.startTime ? req.body.startTime : null;
    let endTime = req.body.endTime ? req.body.endTime : null;
    let from = req.body.from ? req.body.from : '';
    let productName = req.body.productName ? req.body.productName : '';
    let to = req.body.to ? req.body.to : '';
    let usedTo = req.body.usedTo ? req.body.usedTo : '';
    let payStatus = req.body.payStatus ? parseInt(req.body.payStatus) : '';
    let warehouse = req.body.warehouse ? req.body.warehouse : '';
    let KP = req.body.KP ? parseInt(req.body.KP) : '';
    let page = parseInt(req.body.page) - 1;
    let pageSize = parseInt(req.body.pageSize);

    let queryParams = {};

    if (_id) {
        queryParams._id = _id;
    }

    // 获取 from 的参数  购入单位
    function getFromParams() {
        return new Promise(function (resolve, reject) {
            if (from) {
                RawMaterialSupplierModels.find({
                    $or: [
                        {
                            id: {
                                $regex: from
                            }
                        },
                        {
                            name: {
                                $regex: from
                            }
                        },
                        {
                            address: {
                                $regex: from
                            }
                        },
                        {
                            phone: {
                                $regex: from
                            }
                        },
                        {
                            remark: {
                                $regex: from
                            }
                        }
                    ]
                }, "_id",async function(err, from_data) {
                    if (err) {
                        reject();
                    } else if (!from_data.length) {
                        reject();
                    } else {
                        queryParams.from = { $in: [] };
                        from_data.map(item => {
                            queryParams.from.$in.push(item._id);
                        });
                        resolve();
                    }
                })
            } else {
                resolve();
            }
        });
    }
    // 获取 productName 的参数  品名
    function getProductNameParams() {
        return new Promise(function (resolve, reject) {
            if (productName) {
                FabricCategoryModels.find({
                    $or: [
                        {
                            id: {
                                $regex: productName
                            }
                        },
                        {
                            name: {
                                $regex: productName
                            }
                        },
                        {
                            remark: {
                                $regex: productName
                            }
                        }
                    ]
                }, "_id",async function(err, productName_data) {
                    if (err) {
                        reject();
                    } else if (!productName_data.length) {
                        reject();
                    } else {
                        queryParams.productName = { $in: [] };
                        productName_data.map(item => {
                            queryParams.productName.$in.push(item._id);
                        });
                        resolve();
                    }
                })
            } else {
                resolve();
            }
        });
    }
    // 获取 to 的参数  加工单位
    function getToParams() {
        return new Promise(function (resolve, reject) {
            if (to) {
                WeavingMillModels.find({
                    $or: [
                        {
                            id: {
                                $regex: to
                            }
                        },
                        {
                            name: {
                                $regex: to
                            }
                        },
                        {
                            address: {
                                $regex: to
                            }
                        },
                        {
                            phone: {
                                $regex: to
                            }
                        },
                        {
                            remark: {
                                $regex: to
                            }
                        }
                    ]
                }, "_id",async function(err, to_data) {
                    if (err) {
                        reject();
                    } else if (!to_data.length) {
                        reject();
                    } else {
                        queryParams.to = { $in: [] };
                        to_data.map(item => {
                            queryParams.to.$in.push(item._id);
                        });
                        resolve();
                    }
                })
            } else {
                resolve();
            }
        });
    }
    // 获取 warehouse 的参数  所在仓库
    function getWarehouseParams() {
        return new Promise(function (resolve, reject) {
            if (to) {
                WarehouseManagementModels.find({
                    $or: [
                        {
                            id: {
                                $regex: warehouse
                            }
                        },
                        {
                            name: {
                                $regex: warehouse
                            }
                        },
                        {
                            address: {
                                $regex: warehouse
                            }
                        },
                        {
                            phone: {
                                $regex: warehouse
                            }
                        },
                        {
                            remark: {
                                $regex: warehouse
                            }
                        }
                    ]
                }, "_id",async function(err, warehouse_data) {
                    if (err) {
                        reject();
                    } else if (!warehouse_data.length) {
                        reject();
                    } else {
                        queryParams.warehouse = { $in: [] };
                        warehouse_data.map(item => {
                            queryParams.warehouse.$in.push(item._id);
                        });
                        resolve();
                    }
                })
            } else {
                resolve();
            }
        });
    }
    // 查询结果 总数和数据
    function getResult() {
        return new Promise(function (resolve, reject) {
            RawMaterialBusinessModels.count(queryParams).exec((err, count) => {
                if (err) {
                    reject();
                } else {
                    RawMaterialBusinessModels
                        .find(queryParams)
                        .skip(page * pageSize)
                        .limit(pageSize)
                        .sort({
                            _id: -1
                        })
                        .populate([{
                                path: 'from',
                                select: {
                                    _id: 1,
                                    id: 1,
                                    name: 1,
                                    remark: 1
                                },
                            },
                            {
                                path: 'productName',
                                select: {
                                    _id: 1,
                                    id: 1,
                                    name: 1,
                                    remark: 1
                                },
                            },
                            {
                                path: 'to',
                                select: {
                                    _id: 1,
                                    id: 1,
                                    name: 1,
                                    remark: 1
                                },
                            },
                            {
                                path: 'rawMaterialCount.product',
                                select: {
                                    _id: 1,
                                    id: 1,
                                    name: 1,
                                    remark: 1
                                },
                            },
                            {
                                path: 'warehouse',
                                select: {
                                    _id: 1,
                                    id: 1,
                                    name: 1,
                                    remark: 1
                                },
                            }
                        ])
                        .exec((err, doc) => {
                            if (err) {
                                reject();
                            } else {
                                resolve({
                                    count: count,
                                    result: doc
                                });
                            }
                        })
                }
            })
        });
    }
    // 按顺序执行链式查询
    getFromParams()
    .then(() => { return getProductNameParams(); })
    .then(() => { return getToParams(); })
    .then(() => { return getResult(); })
    .then((reback) => {
        res.json({
            success: true,
            message: '查询成功',
            data: {
                total: reback.count ? reback.count : 0,
                results: reback.result ? reback.result : []
            }
        })
    })
    .catch(() => {
        res.json({
            success: true,
            message: '查询成功',
            data: {
                total: 0,
                results: []
            }
        })
    })
})
//  删除 原料业务单位
router.post('/deleteRMB', (req, res) => {
    let ids = req.body.ids.split(',');
    let deleteParams = {
        _id: {
            $in: ids
        }
    }
    RawMaterialBusinessModels.remove(deleteParams, err => {
        if (err) {
            res.json({
                message: '删除失败!',
                success: false,
            })
        } else {
            res.json({
                message: '删除成功!',
                success: true,
            })
        }
    })

})
// 新增编辑原料业务单位 弹出框点击 确定 操作
router.post('/addEditRMB', (req, res) => {
    let pass = true;
    let _id = req.body._id ? req.body._id : '';
    let date = req.body.date ? req.body.date : pass = false;
    let from = req.body.from ? req.body.from : pass = false;
    let productName = req.body.productName ? req.body.productName : pass = false;
    let count = req.body.count ? req.body.count : pass = false;
    let unitPrice = req.body.unitPrice ? req.body.unitPrice : pass = false;
    let amount = count * unitPrice;
    let to = req.body.to ? req.body.to : pass = false;
    let usedTo = req.body.usedTo ? req.body.usedTo : '';
    let payStatus = req.body.payStatus ? req.body.payStatus : pass = false; //  0未付款、1部分付款、2已付款
    let rawMaterialCount = req.body.rawMaterialCount ? JSON.parse(req.body.rawMaterialCount) : '';
    let warehouse = req.body.warehouse ? req.body.warehouse : pass = false;
    let KP = req.body.KP ? req.body.KP : pass = false; //  0不需要，1需要未开，2需要已开
    let type = req.body.type ? req.body.type : pass = false;

    if (!pass) {
        res.json({
            success: false,
            message: '请填写完整的参数！'
        })
    }

    if (type == 'add') {
        // 新增
        if (req.user.role === 'admin') {
            let newRMC = new RawMaterialBusinessModels({
                date: new Date(date),
                from: from,
                productName: productName,
                count: count,
                unitPrice: unitPrice,
                amount: amount,
                to: to,
                usedTo: usedTo,
                payStatus: payStatus,
                rawMaterialCount: rawMaterialCount,
                warehouse: warehouse,
                KP: KP,
            })
            newRMC.save((err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err
                    })
                } else {
                    res.json({
                        success: true,
                        message: '新增原料业务成功!'
                    })
                }
            })
        } else {
            res.json({
                code: 401,
                success: false,
                message: '当前用户无权限！'
            })
        }
    } else {
        // 更新
        RawMaterialBusinessModels.findById(_id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                let updateParams = {
                    date: new Date(date),
                    from: from,
                    productName: productName,
                    count: count,
                    unitPrice: unitPrice,
                    amount: amount,
                    to: to,
                    usedTo: usedTo,
                    payStatus: payStatus,
                    rawMaterialCount: rawMaterialCount,
                    warehouse: warehouse,
                    KP: KP,
                };
                RawMaterialBusinessModels.updateOne({
                    _id: real_id
                }, updateParams, err => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err
                        })
                    }
                    res.json({
                        success: true,
                        message: `修改原料业务-${_id}成功!`
                    })
                })

            }
        })
    }
})



module.exports = router;