const express = require('express');
const router = express.Router();
const fs = require("fs");
//  原料业务
const RawMaterialBusinessModels = require('../../models/CRM/Business/RawMaterialBusinessModels');

//  原料业务
//  获取原料业务表格数据
router.post('/getRawMaterialBusiness', (req, res) => {
    // let pass = true;
    // let _id = req.body._id ? req.body._id : '';
    // let date = req.body.date ?.pass = !pass;
    // let from = req.body.from ?.pass = !pass;
    // let productName = req.body.productName ?.pass = !pass;
    // let count = req.body.count ?.pass = !pass;
    // let unitPrice = req.body.unitPrice ?.pass = !pass;
    // let amount = req.body.amount ?.pass = !pass;
    // let to = req.body.to ?.pass = !pass;
    // let usedTo = req.body.usedTo ?.pass = !pass;
    // let payStatus = req.body.payStatus ?.pass = !pass;
    // let rawMaterialCount = req.body.rawMaterialCount ? JSON.parse(req.body.rawMaterialCount) : '';
    // let warehouse = req.body.warehouse ?.pass = !pass;
    // let KP = req.body.KP ?.pass = !pass;
    // let type = req.body.type ?.pass = !pass;

    // if (!pass) {
    //     res.json({
    //         success: false,
    //         message: '请填写完整的参数！'
    //     })
    // }

    let id = req.body.id ? req.body.id : '';
    let name = req.body.name ? req.body.name : '';
    let address = req.body.address ? req.body.address : '';
    let phone = req.body.phone ? req.body.phone : '';
    let remark = req.body.remark ? req.body.remark : '';
    let page = parseInt(req.body.page) - 1;
    let pageSize = parseInt(req.body.pageSize);

    let queryParams = {
        id: {
            $regex: id
        },
        name: {
            $regex: name
        },
        address: {
            $regex: address
        },
        phone: {
            $regex: phone
        },
        remark: {
            $regex: remark
        }
    }

    RawMaterialBusinessModels.count(queryParams).exec((err, count) => {
        if (err) {
            res.json({
                success: false,
                message: err,
                data: {
                    total: 0,
                    results: []
                }
            })
        } else {
            RawMaterialBusinessModels
                .find(queryParams)
                .skip(page * pageSize)
                .limit(pageSize)
                .sort({
                    _id: -1
                })
                .populate([{
                    path: 'products.product',
                    select: {
                        _id: 0,
                        id: 1,
                        name: 1,
                        remark: 1
                    },
                }])
                .exec((err, doc) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err,
                            data: {
                                total: 0,
                                results: []
                            }
                        })
                    } else {
                        res.json({
                            success: true,
                            message: '查询成功',
                            data: {
                                total: count,
                                results: doc
                            }
                        })
                    }
                })
        }
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
    let date = req.body.date ?.pass = !pass;
    let from = req.body.from ?.pass = !pass;
    let productName = req.body.productName ?.pass = !pass;
    let count = req.body.count ?.pass = !pass;
    let unitPrice = req.body.unitPrice ?.pass = !pass;
    let amount = req.body.amount ?.pass = !pass;
    let to = req.body.to ?.pass = !pass;
    let usedTo = req.body.usedTo ?.pass = !pass;
    let payStatus = req.body.payStatus ?.pass = !pass;
    let rawMaterialCount = req.body.rawMaterialCount ? JSON.parse(req.body.rawMaterialCount) : '';
    let warehouse = req.body.warehouse ?.pass = !pass;
    let KP = req.body.KP ?.pass = !pass;
    let type = req.body.type ?.pass = !pass;

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
                date: date,
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
                    date: date,
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