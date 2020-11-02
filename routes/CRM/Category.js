const express = require('express');
const router = express.Router();
const fs = require("fs");

//  获取原料品类表格数据
router.post('/getRawMaterialCategory', (req, res) => {
    res.header({
        tokenUuid: 'getRawMaterialCategory'
    })
    res.json({
        code: 200,
        msg: '登录成功',
        success: true,
        data: {
            total: 200,
            results: [{
                    id: '1',
                    name: '32<sup>s</sup> C',
                    remark: '32支棉',
                },
                {
                    id: '2',
                    name: '21<sup>s</sup> C/T',
                    remark: '21支棉涤',
                },
                {
                    id: '3',
                    name: '32<sup>s</sup> 60C/40T',
                    remark: '32支 60%棉，40%涤',
                },
            ]
        }
    })
})

//  删除 原料品类
router.post('/deleteRMC', (req, res) => {
    res.header({
        tokenUuid: 'deleteRMC'
    })
    res.json({
        code: 200,
        msg: '删除成功',
        success: true,
    })
})

// 新增编辑弹出框点击确定操作
router.post('/v', (req, res) => {
    res.header({
        tokenUuid: 'addEditRMC'
    })
    res.json({
        code: 200,
        msg: '成功',
        success: true,
    })
})

module.exports = router;