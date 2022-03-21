const express = require('express');
const router = express.Router();
const fs = require("fs");
//  供应商
const SupplierModels = require('../../models/Shop/People/SupplierModels');
//  客户
const CustomerModels = require('../../models/Shop/People/CustomerModels');
//  仓库管理
const WarehouseManagementModels = require('../../models/Shop/People/WarehouseManagementModels');


//  供应商
//  获取供应商表格数据
router.post('/getSupplier', (req, res) => {
    let category = req.body.category ? req.body.category : '';
    let name = req.body.name ? req.body.name : '';
    let address = req.body.address ? req.body.address : '';
    let phone = req.body.phone ? req.body.phone : '';
    let remark = req.body.remark ? req.body.remark : '';
    let page = parseInt(req.body.page) - 1;
    let pageSize = parseInt(req.body.pageSize);

    let queryParams = {
        category: {
            $regex: category
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

    SupplierModels.count(queryParams).exec((err, count) => {
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
            SupplierModels
                .find(queryParams)
                .skip(page * pageSize)
                .limit(pageSize)
                .sort({
                    _id: -1
                })
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
//  获取各类别供应商
router.post('/getSingleSupplier', (req, res) => {
    let category = req.body.category ? req.body.category : '';

    if (!category) {
        res.json({
            success: false,
            message: '参数错误',
            data: {
                total: 0,
                results: []
            }
        })
    }

    let queryParams = {
        category: category
    }

    SupplierModels
        .find(queryParams, { name: 1 })
        .sort({
            _id: -1
        })
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
                        results: doc
                    }
                })
            }
        })
})
//  删除 供应商单位
router.post('/deleteSupplier', (req, res) => {
    let ids = req.body.ids.split(',');
    let deleteParams = {
        _id: {
            $in: ids
        }
    }
    SupplierModels.remove(deleteParams, err => {
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
// 新增编辑 供应商单位 弹出框点击 确定 操作
router.post('/addEditSupplier', (req, res) => {
    let id = req.body.id;
    let address = req.body.address;
    let phone = req.body.phone;
    let name = req.body.name;
    let remark = req.body.remark;
    let category = req.body.category;
    let type = req.body.type;

    if (type == 'add') {
        // 新增
        if (req.user.role === 'admin') {
            let queryParams = {
                name: name
            }

            SupplierModels.findOne(queryParams).then(data => {
                if (!data) {
                    let newRMC = new SupplierModels({
                        category: category,
                        name: name,
                        address: address,
                        phone: phone,
                        remark: remark
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
                                message: '新增供应商成功!'
                            })
                        }
                    })
                } else if (data.name == name) {
                    res.json({
                        success: false,
                        message: `${name}已存在！`
                    })
                } else {
                    res.json({
                        success: false,
                        message: '程序错误!'
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
        SupplierModels.findById(id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                let updateParams = {
                    category: category,
                    name: name,
                    address: address,
                    phone: phone,
                    remark: remark
                };
                SupplierModels.updateOne({
                    _id: id
                }, updateParams, err => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err
                        })
                    }
                    res.json({
                        success: true,
                        message: `修改成功!`
                    })
                })

            }
        })
    }
})

//  客户
//  获取客户表格数据
router.post('/getCustomer', (req, res) => {
    let name = req.body.name ? req.body.name : '';
    let intention = req.body.intention ? req.body.intention : '';
    let address = req.body.address ? req.body.address : '';
    let phone = req.body.phone ? req.body.phone : '';
    let remark = req.body.remark ? req.body.remark : '';
    let page = parseInt(req.body.page) - 1;
    let pageSize = parseInt(req.body.pageSize);

    let queryParams = {
        name: {
            $regex: name
        },
        intention: {
            $regex: intention
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

    CustomerModels.count(queryParams).exec((err, count) => {
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
            CustomerModels
                .find(queryParams)
                .skip(page * pageSize)
                .limit(pageSize)
                .sort({
                    _id: -1
                })
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
//  删除 客户单位
router.post('/deleteCustomer', (req, res) => {
    let ids = req.body.ids.split(',');
    let deleteParams = {
        _id: {
            $in: ids
        }
    }
    CustomerModels.remove(deleteParams, err => {
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
// 新增编辑 客户单位 弹出框点击 确定 操作
router.post('/addEditCustomer', (req, res) => {
    let id = req.body.id;
    let address = req.body.address;
    let intention = req.body.intention;
    let phone = req.body.phone;
    let name = req.body.name;
    let remark = req.body.remark;
    let type = req.body.type;

    if (type == 'add') {
        // 新增
        if (req.user.role === 'admin') {
            let queryParams = {
                name: name
            }

            CustomerModels.findOne(queryParams).then(data => {
                if (!data) {
                    let newRMC = new CustomerModels({
                        name: name,
                        intention: intention,
                        address: address,
                        phone: phone,
                        remark: remark
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
                                message: '新增客户成功!'
                            })
                        }
                    })
                } else if (data.name == name) {
                    res.json({
                        success: false,
                        message: '该名称已存在, 请换个名称!'
                    })
                } else {
                    res.json({
                        success: false,
                        message: '程序错误!'
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
        CustomerModels.findById(id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                let updateParams = {
                    name: name,
                    intention: intention,
                    address: address,
                    phone: phone,
                    remark: remark
                }
                CustomerModels.updateOne({
                    _id: id
                }, updateParams, err => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err
                        })
                    }
                    res.json({
                        success: true,
                        message: `修改成功!`
                    })
                })

            }
        })
    }
})

//  仓库管理
//  获取仓库管理表格数据
router.post('/getWarehouseManagement', (req, res) => {
    let name = req.body.name;
    let address = req.body.address;
    let remark = req.body.remark;
    let page = parseInt(req.body.page) - 1;
    let pageSize = parseInt(req.body.pageSize);

    let queryParams = {
        name: {
            $regex: name
        },
        address: {
            $regex: address
        },
        remark: {
            $regex: remark
        }
    }

    WarehouseManagementModels.countDocuments(queryParams).exec((err, count) => {
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
            WarehouseManagementModels
                .find(queryParams)
                .skip(page * pageSize)
                .limit(pageSize)
                .sort({
                    _id: -1
                })
                .populate('products.product')
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
//  删除 仓库单位
router.post('/deleteWM', (req, res) => {
    let ids = req.body.ids.split(',');
    let deleteParams = {
        _id: {
            $in: ids
        }
    }

    console.log(ids)

    res.json({
        message: '删除成功!',
        success: true,
    })
    // WarehouseManagementModels.remove(deleteParams, err => {
    //     if (err) {
    //         res.json({
    //             message: '删除失败!',
    //             success: false,
    //         })
    //     } else {
    //         res.json({
    //             message: '删除成功!',
    //             success: true,
    //         })
    //     }
    // })
})
//  新增编辑 仓库单位 弹出框点击 确定 操作
router.post('/addEditWM', (req, res) => {
    let id = req.body.id;
    let address = req.body.address;
    let name = req.body.name;
    let remark = req.body.remark;
    let products = req.body.products ? JSON.parse(req.body.products) : '';
    let type = req.body.type;

    if (type == 'add') {
        // 新增
        if (req.user.role === 'admin') {
            let queryParams = {
                name: name
            }

            WarehouseManagementModels.findOne(queryParams).then(data => {
                if (!data) {
                    let newRMC = new WarehouseManagementModels({
                        name: name,
                        address: address,
                        remark: remark,
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
                                message: '新增成功!'
                            })
                        }
                    })
                } else if (data.name == name) {
                    res.json({
                        success: false,
                        message: '该名称已存在, 请换个名称!'
                    })
                } else {
                    res.json({
                        success: false,
                        message: '程序错误!'
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
        WarehouseManagementModels.findById(real_id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                let updateParams = {}
                if (products) {
                    updateParams = {
                        name: name,
                        address: address,
                        remark: remark,
                        products: products
                    }
                } else {
                    updateParams = {
                        name: name,
                        address: address,
                        remark: remark
                    }
                }
                WarehouseManagementModels.updateOne({
                    _id: id
                }, updateParams, err => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err
                        })
                    }
                    res.json({
                        success: true,
                        message: `修改成功!`
                    })
                })

            }
        })
    }
})
//  获取所有仓库
router.post('/getWarehouseManagement', (req, res) => {
    WarehouseManagementModels
        .find(queryParams)
        .skip(page * pageSize)
        .limit(pageSize)
        .sort({
            _id: -1
        })
        .populate('products.product')
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
})

module.exports = router;