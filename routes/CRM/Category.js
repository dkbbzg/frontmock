const express = require('express');
const router = express.Router();
const fs = require("fs");
//  原料品类
const RawMaterialCategoryModels = require('../../models/CRM/RawMaterialCategoryModels');
const FabricCategoryModels = require('../../models/CRM/FabricCategoryModels');

//  获取原料品类表格数据
router.post('/getRawMaterialCategory', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
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
        remark: {
            $regex: remark
        }
    }

    RawMaterialCategoryModels.count(queryParams).exec((err, count) => {
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
            RawMaterialCategoryModels
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

//  删除 原料品类
router.post('/deleteRMC', (req, res) => {
    let ids = req.body.ids.split(',');
    let deleteParams = {
        _id: {
            $in: ids
        }
    }
    RawMaterialCategoryModels.remove(deleteParams, err => {
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

//  新增编辑 原料品类 弹出框点击 确定 操作
router.post('/addEditRMC', (req, res) => {
    let real_id = req.body.real_id;
    let id = req.body.id;
    let name = req.body.name;
    let remark = req.body.remark;
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

            RawMaterialCategoryModels.findOne(queryParams).then(data => {
                if (!data) {
                    let newRMC = new RawMaterialCategoryModels({
                        id: id,
                        name: name,
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
                                message: '新增原料品类成功!'
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
                        message: '该原料名已存在, 请换个原料名!'
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
        RawMaterialCategoryModels.findById(real_id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                RawMaterialCategoryModels.updateOne({
                    _id: real_id
                }, {
                    id: id,
                    name: name,
                    remark: remark,
                }, err => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err
                        })
                    }
                    res.json({
                        success: true,
                        message: `修改品类-${id}成功!`
                    })
                })

            }
        })
    }
})

//  胚布品类
//  获取胚布品类表格数据
router.post('/getFabricCategory', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
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
        remark: {
            $regex: remark
        }
    }

    FabricCategoryModels.count(queryParams).exec((err, count) => {
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
            FabricCategoryModels
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

//  删除 胚布品类
router.post('/deleteFC', (req, res) => {
    let ids = req.body.ids.split(',');
    let deleteParams = {
        _id: {
            $in: ids
        }
    }
    FabricCategoryModels.remove(deleteParams, err => {
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

// 新增编辑 胚布品类 弹出框点击 确定 操作
router.post('/addEditFC', (req, res) => {
    let real_id = req.body.real_id;
    let id = req.body.id;
    let name = req.body.name;
    let weight = req.body.weight;
    let width = req.body.width;
    let warp = req.body.warp;
    let weft = req.body.weft;
    let remark = req.body.remark;
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

            FabricCategoryModels.findOne(queryParams).then(data => {
                if (!data) {
                    let newRMC = new FabricCategoryModels({
                        id: id,
                        name: name,
                        weight: weight,
                        width: width,
                        warp: warp,
                        weft: weft,
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
                                message: '新增原料品类成功!'
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
                        message: '该原料名已存在, 请换个原料名!'
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
        FabricCategoryModels.findById(real_id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                FabricCategoryModels.updateOne({
                    _id: real_id
                }, {
                    id: id,
                    name: name,
                    remark: remark,
                }, err => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err
                        })
                    }
                    res.json({
                        success: true,
                        message: `修改品类-${id}成功!`
                    })
                })

            }
        })
    }
})

module.exports = router;