const express = require('express');
const router = express.Router();
const fs = require("fs");
var bcrypt = require('bcryptjs');
const UserModels = require('../../models/CRM/UserModels');

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

router.post('/login', function (req, res) {
    let user_name = req.body.user;
    let user_pwd = req.body.pwd;
    // 加密
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("aaa", salt);
    // bcrypt.compareSync("密码", "数据库里的值")
    console.log(hash)
    UserModels.find({
        user_name: user_name,
        user_pwd: user_pwd
    }).then(data => {
        
        res.json({
            status: 1,
            data: data[0]
        })
    }).catch(err => {
        res.json({
            status: 0,
            message: err
        })
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