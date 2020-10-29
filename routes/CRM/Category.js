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
            results: [
                {
                    id: '1',
                    name: '',
                    remark: '',
                }
            ]
        }
    })
})

module.exports = router;