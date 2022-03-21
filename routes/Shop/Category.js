const express = require('express');
const router = express.Router();
const fs = require("fs");
//  瓷砖品类
const TileCategoryModels = require('../../models/Shop/Category/TileCategoryModels');
//  卫浴品类
const BathCategoryModels = require('../../models/Shop/Category/BathCategoryModels');

const { Mongoose } = require('mongoose');


//  瓷砖品类
//  获取瓷砖品类表格数据
router.post('/getTileCategory', (req, res) => {
    let name = req.body.name ? req.body.name : '';
    let specifications = req.body.specifications ? req.body.specifications : '';
    let remark = req.body.remark ? req.body.remark : '';
    let supplier = req.body.supplier ? req.body.supplier : '';
    let page = parseInt(req.body.page) - 1;
    let pageSize = parseInt(req.body.pageSize);

    let queryParams = {}

    if (supplier == '') {
        queryParams = {
            name: {
                $regex: name
            },
            specifications: {
                $regex: specifications
            },
            remark: {
                $regex: remark
            }
        }
    } else {
        queryParams = {
            name: {
                $regex: name
            },
            supplier: supplier,
            specifications: {
                $regex: specifications
            },
            remark: {
                $regex: remark
            }
        }
    }

    TileCategoryModels.count(queryParams).exec((err, count) => {
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
            TileCategoryModels
                .find(queryParams)
                .skip(page * pageSize)
                .limit(pageSize)
                .populate({ path: 'supplier', select: 'name'})
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
//  删除 瓷砖品类
router.post('/deleteTileCategory', (req, res) => {
    let ids = req.body.ids.split(',');
    let deleteParams = {
        _id: {
            $in: ids
        }
    }
    TileCategoryModels.remove(deleteParams, err => {
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
//  新增编辑 瓷砖品类 弹出框点击 确定 操作
router.post('/addEditTileCategory', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let supplier = req.body.supplier;
    let specifications = req.body.specifications;
    let remark = req.body.remark;
    let type = req.body.type;

    if (type == 'add') {
        // 新增
        if (req.user.role === 'admin') {
            let queryParams = {
                name: name
            }

            TileCategoryModels.findOne(queryParams).then(data => {
                if (!data) {
                    let newRMC = new TileCategoryModels({
                        name: name,
                        supplier: supplier,
                        specifications: specifications,
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
                                message: '新增瓷砖成功!'
                            })
                        }
                    })
                } else if (data.name == name) {
                    res.json({
                        success: false,
                        message: '名称已存在, 请换个名称!'
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
        TileCategoryModels.findById(id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                TileCategoryModels.updateOne({
                    _id: id
                }, {
                    name: name,
                    supplier: supplier,
                    specifications: specifications,
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
                        message: `修改成功!`
                    })
                })

            }
        })
    }
})

//  卫浴品类
//  获取卫浴品类表格数据
router.post('/getBathCategory', (req, res) => {
    let name = req.body.name ? req.body.name : '';
    let category = req.body.category ? req.body.category : '';
    let remark = req.body.remark ? req.body.remark : '';
    let supplier = req.body.supplier ? req.body.supplier : '';
    let page = parseInt(req.body.page) - 1;
    let pageSize = parseInt(req.body.pageSize);

    let queryParams = {}

    if (supplier == '') {
        queryParams = {
            name: {
                $regex: name
            },
            category: {
                $regex: category
            },
            remark: {
                $regex: remark
            }
        }
    } else {
        queryParams = {
            name: {
                $regex: name
            },
            supplier: supplier,
            category: {
                $regex: category
            },
            remark: {
                $regex: remark
            }
        }
    }

    BathCategoryModels.count(queryParams).exec((err, count) => {
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
            BathCategoryModels
                .find(queryParams)
                .skip(page * pageSize)
                .limit(pageSize)
                .populate({ path: 'supplier', select: 'name'})
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
//  删除 卫浴品类
router.post('/deleteBathCategory', (req, res) => {
    let ids = req.body.ids.split(',');
    let deleteParams = {
        _id: {
            $in: ids
        }
    }
    BathCategoryModels.remove(deleteParams, err => {
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
//  新增编辑 卫浴品类 弹出框点击 确定 操作
router.post('/addEditBathCategory', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let supplier = req.body.supplier;
    let category = req.body.category;
    let remark = req.body.remark;
    let type = req.body.type;

    if (type == 'add') {
        // 新增
        if (req.user.role === 'admin') {
            let queryParams = {
                name: name
            }

            BathCategoryModels.findOne(queryParams).then(data => {
                if (!data) {
                    let newRMC = new BathCategoryModels({
                        name: name,
                        supplier: supplier,
                        category: category,
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
                                message: '新增成功!'
                            })
                        }
                    })
                } else if (data.name == name) {
                    res.json({
                        success: false,
                        message: '名称已存在, 请换个名称!'
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
        BathCategoryModels.findById(id).then(data => {
            if (!data) {
                res.json({
                    success: false,
                    message: '程序错误,没有找到对应的数据!'
                })
            } else {
                BathCategoryModels.updateOne({
                    _id: id
                }, {
                    name: name,
                    supplier: supplier,
                    category: category,
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
                        message: `修改成功!`
                    })
                })

            }
        })
    }
})


//  获取瓷砖所有品类
router.post('/getTileAllCategory', (req, res) => {
    BathCategoryModels
        .find({}, { name: 1 })
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

//  获取卫浴所有品类
router.post('/getBathAllCategory', (req, res) => {
    BathCategoryModels
        .find({}, { name: 1 })
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


//  选择框，模糊搜索相关的数据
router.post('/getRMCs', (req, res) => {
    let search = req.body.search;

    let queryParams = {
        $or: [{
                id: {
                    $regex: search
                }
            },
            {
                name: {
                    $regex: search
                }
            },
            {
                remark: {
                    $regex: search
                }
            }
        ]
    }

    TileCategoryModels.count(queryParams).exec((err, count) => {
        if (err) {
            res.json({
                success: false,
                message: err,
                data: []
            })
        } else {
            TileCategoryModels
                .find(queryParams)
                .limit(100)
                .sort({
                    _id: -1
                })
                .exec((err, doc) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: err,
                            data: []
                        })
                    } else {
                        res.json({
                            success: true,
                            message: '查询成功',
                            data: doc
                        })
                    }
                })
        }
    })
})

module.exports = router;