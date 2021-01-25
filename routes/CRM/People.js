const express = require('express');
const router = express.Router();
const fs = require("fs");
//  原料商
const RawMaterialSupplierModels = require('../../models/CRM/People/RawMaterialSupplierModels');
//  织造厂
const WeavingMillModels = require('../../models/CRM/People/WeavingMillModels');
//  客户
const CustomerModels = require('../../models/CRM/People/CustomerModels');
//  仓库管理
const WarehouseManagementModels = require('../../models/CRM/People/WarehouseManagementModels');


//  原料商
//  获取原料商表格数据
router.post('/getRawMaterialSupplier', (req, res) => {
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

    RawMaterialSupplierModels.count(queryParams).exec((err, count) => {
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
            RawMaterialSupplierModels
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
//  删除 原料商单位
router.post('/deleteRMS', (req, res) => {
    let ids = req.body.ids.split(',');
    let deleteParams = {
        _id: {
            $in: ids
        }
    }
    RawMaterialSupplierModels.remove(deleteParams, err => {
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
// 新增编辑 原料商单位 弹出框点击 确定 操作
router.post('/addEditRMS', (req, res) => {
    let real_id = req.body.real_id;
    let id = req.body.id;
    let address = req.body.address;
    let phone = req.body.phone;
    let name = req.body.name;
    let remark = req.body.remark;
    let products = req.body.products ? JSON.parse(req.body.products) : '';
    let type = req.body.type;

    if (type == 'add') {
        // 新增
        if (req.user.role === 'admin') {
            let queryParams = {
                $or: [{
                        id: id
                    },
                    {
                        name: name
                    },
                ]
            }

            RawMaterialSupplierModels.findOne(queryParams).then(data => {
                if (!data) {
                    if (products) {
                        let newRMC = new RawMaterialSupplierModels({
                            id: id,
                            name: name,
                            address: address,
                            phone: phone,
                            remark: remark,
                            products: products
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
                                    message: '新增原料商单位成功!'
                                })
                            }
                        })
                    } else {
                        let newRMC = new RawMaterialSupplierModels({
                            id: id,
                            name: name,
                            address: address,
                            phone: phone,
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
                                    message: '新增原料商单位成功!'
                                })
                            }
                        })
                    }
                } else if (data.id == id) {
                    res.json({
                        success: false,
                        message: '该编号已存在, 请换个编号!'
                    })
                } else if (data.name == name) {
                    res.json({
                        success: false,
                        message: '该单位名称已存在, 请换个名称!'
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
        RawMaterialSupplierModels.findById(real_id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                let updateParams = {
                    id: id,
                    name: name,
                    address: address,
                    phone: phone,
                    remark: remark,
                    products: products
                };
                RawMaterialSupplierModels.updateOne({
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
                        message: `修改原料商单位-${id}成功!`
                    })
                })

            }
        })
    }
})

//  织造厂
//  获取织造厂表格数据
router.post('/getWeavingMill', (req, res) => {
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

    WeavingMillModels.count(queryParams).exec((err, count) => {
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
            WeavingMillModels
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
//  删除 织造厂单位
router.post('/deleteWM', (req, res) => {
    let ids = req.body.ids.split(',');
    let deleteParams = {
        _id: {
            $in: ids
        }
    }
    WeavingMillModels.remove(deleteParams, err => {
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
// 新增编辑 织造厂单位 弹出框点击 确定 操作
router.post('/addEditWM', (req, res) => {
    let real_id = req.body.real_id ? req.body.real_id : '';
    let id = req.body.id;
    let address = req.body.address ? req.body.address : '';
    let phone = req.body.phone ? req.body.phone : '';
    let name = req.body.name;
    let remark = req.body.remark ? req.body.remark : '';
    let products = req.body.products ? JSON.parse(req.body.products) : '';
    let type = req.body.type;

    if (type == 'add') {
        // 新增
        if (req.user.role === 'admin') {
            let queryParams = {
                $or: [{
                        id: id
                    },
                    {
                        name: name
                    },
                ]
            }

            WeavingMillModels.findOne(queryParams).then(data => {
                if (!data) {
                    if (products) {
                        let newRMC = new WeavingMillModels({
                            id: id,
                            name: name,
                            address: address,
                            phone: phone,
                            remark: remark,
                            products: products
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
                                    message: '新增原料商单位成功!'
                                })
                            }
                        })
                    } else {
                        let newRMC = new WeavingMillModels({
                            id: id,
                            name: name,
                            address: address,
                            phone: phone,
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
                                    message: '新增织造厂成功!'
                                })
                            }
                        })
                    }
                } else if (data.id == id) {
                    res.json({
                        success: false,
                        message: '该编号已存在, 请换个编号!'
                    })
                } else if (data.name == name) {
                    res.json({
                        success: false,
                        message: '该单位名称已存在, 请换个名称!'
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
        WeavingMillModels.findById(real_id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                let updateParams = {
                    id: id,
                    name: name,
                    address: address,
                    phone: phone,
                    remark: remark,
                    products: products
                };
                WeavingMillModels.updateOne({
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
                        message: `修改原料商单位-${id}成功!`
                    })
                })

            }
        })
    }
})

//  客户
//  获取客户表格数据
router.post('/getCustomer', (req, res) => {
    let id = req.body.id ? req.body.id : '';
    let name = req.body.name ? req.body.name : '';
    let address = req.body.address ? req.body.address : '';
    let phone = req.body.phone ? req.body.phone : '';
    let bankAccount = req.body.bankAccount ? req.body.bankAccount : '';
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
        bankAccount: {
            $regex: bankAccount
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
    let real_id = req.body.real_id;
    let id = req.body.id;
    let address = req.body.address;
    let phone = req.body.phone;
    let name = req.body.name;
    let remark = req.body.remark;
    let bankAccount = req.body.bankAccount;
    let type = req.body.type;

    if (type == 'add') {
        // 新增
        if (req.user.role === 'admin') {
            let queryParams = {
                $or: [{
                        id: id
                    },
                    {
                        name: name
                    },
                ]
            }

            CustomerModels.findOne(queryParams).then(data => {
                if (!data) {
                    let newRMC = new CustomerModels({
                        id: id,
                        name: name,
                        address: address,
                        phone: phone,
                        remark: remark,
                        bankAccount: bankAccount
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
                                message: '新增客户单位成功!'
                            })
                        }
                    })
                } else if (data.id == id) {
                    res.json({
                        success: false,
                        message: '该编号已存在, 请换个编号!'
                    })
                } else if (data.name == name) {
                    res.json({
                        success: false,
                        message: '该单位名称已存在, 请换个名称!'
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
        CustomerModels.findById(real_id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                let updateParams = {
                    id: id,
                    name: name,
                    address: address,
                    phone: phone,
                    remark: remark,
                    bankAccount: bankAccount
                }
                CustomerModels.updateOne({
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
                        message: `修改原料商单位-${id}成功!`
                    })
                })

            }
        })
    }
})

//  仓库管理
//  获取仓库管理表格数据
router.post('/getWarehouseManagement', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;
    let remark = req.body.remark;
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

    WarehouseManagementModels.count(queryParams).exec((err, count) => {
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
    let real_id = req.body.real_id;
    let id = req.body.id;
    let address = req.body.address;
    let phone = req.body.phone;
    let name = req.body.name;
    let remark = req.body.remark;
    let products = req.body.products ? JSON.parse(req.body.products) : '';
    let type = req.body.type;

    if (type == 'add') {
        // 新增
        if (req.user.role === 'admin') {
            let queryParams = {
                $or: [{
                        id: id
                    },
                    {
                        name: name
                    },
                ]
            }

            WarehouseManagementModels.findOne(queryParams).then(data => {
                if (!data) {
                    if (products) {
                        let newRMC = new WarehouseManagementModels({
                            id: id,
                            name: name,
                            address: address,
                            phone: phone,
                            remark: remark,
                            products: products
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
                    } else {
                        let newRMC = new WarehouseManagementModels({
                            id: id,
                            name: name,
                            address: address,
                            phone: phone,
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
                    }
                } else if (data.id == id) {
                    res.json({
                        success: false,
                        message: '该编号已存在, 请换个编号!'
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
                        id: id,
                        name: name,
                        address: address,
                        phone: phone,
                        remark: remark,
                        products: products
                    }
                } else {
                    updateParams = {
                        id: id,
                        name: name,
                        address: address,
                        phone: phone,
                        remark: remark
                    }
                }
                WarehouseManagementModels.updateOne({
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
                        message: `修改原料商单位-${id}成功!`
                    })
                })

            }
        })
    }
})


module.exports = router;