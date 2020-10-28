const express = require('express');
const router = express.Router();
const fs = require("fs");

//  获取用户信息
router.post('/getUserInfo', (req, res) => {
    res.header({
        tokenUuid: 11111
    })
    res.json({
        code: 200,
        user: {
            username: 'admin',
            nickname: '管理员'
        }
    })
})
//  登录
router.post('/login', (req, res) => {
    res.header({
        tokenUuid: 2222
    })
    res.json({
        code: 200,
        msg: '登录成功',
        success: true
    })
})

module.exports = router;