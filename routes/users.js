const express = require('express');
const router = express.Router();
const fs = require("fs");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModels = require('../models/UserModels');

const salt = bcrypt.genSaltSync(10);

// 登录
router.post('/login', function (req, res) {
    // 获取前端的传参
    let user_name = req.body.user;
    let user_pwd = req.body.pwd;
    // 根据用户名在users表查找
    UserModels.findOne({
        user_name: user_name
    }).then(data => {
        if (!data) {
            // 在表中查不出数据时执行
            res.json({
                success: false,
                message: '此账号不存在！'
            })
        } else if (!bcrypt.compareSync(user_pwd, data.user_pwd)) {  // 将表中数据的密码和传参的密码进行比对，这里密码双重加密过，所以需要解密
            // 密码比对不一致时执行
            res.json({
                success: false,
                message: '密码错误，请输入正确的密码！'
            })
        } else {
            // 新的token封装
            const new_token = 'Bearer ' + jwt.sign({
                _id: data._id,
                role: data.user_role
            },
                'CrMsEcReT', {
                expiresIn: 3600 * 24 * 3
            }
            )
            UserModels.findById(data._id, (err, doc) => {
                doc.token = new_token;
                doc.save((err, doc) => {
                    // 返回的用户信息
                    let user_data = {
                        user_name: doc.user_name,
                        user_role: doc.user_role
                    }
                    // 在返回结果中增加token
                    res.header({
                        Authorization: doc.token
                    })
                    res.json({
                        success: true,
                        message: '登录成功',
                        user: user_data
                    })
                });
            })

        }
    }).catch(err => {
        // 程序报错
        res.json({
            success: false,
            message: err
        })
    })
})
// 注册
router.post('/register', function (req, res) {
    // 获取前端的传参
    let user_name = req.body.user;
    let user_pwd = req.body.pwd;
    let user_role = req.body.role;
    // 根据用户名在users表查找
    UserModels.findOne({
        user_name: user_name
    }).then(data => {
        if (!data) {
            // 用户名在表中不存在，可以进行注册
            // 创建一个实例
            let newUserData = new UserModels({
                user_name: user_name,
                user_pwd: bcrypt.hashSync(user_pwd, salt),
                user_role: user_role ? user_role : 'user'
            })
            // 将实例保存在表中
            newUserData.save((err, data) => {
                if (err) {
                    // 程序报错
                    res.json({
                        success: false,
                        message: err
                    })
                } else {
                    // 新的token封装
                    const new_token = 'Bearer ' + jwt.sign({
                        _id: data._id,
                        role: data.user_role
                    },
                        'CrMsEcReT', {
                        expiresIn: 3600 * 24 * 3
                    })
                    UserModels.findById(data._id, (err, doc) => {
                        doc.token = new_token;
                        doc.save((err, doc) => {
                            // 返回的用户信息
                            let user_data = {
                                user_name: doc.user_name,
                                user_role: doc.user_role
                            }
                            // 在返回结果中增加token
                            res.header({
                                Authorization: doc.token
                            })
                            res.json({
                                success: true,
                                message: '注册成功',
                                user: user_data
                            })
                        });
                    })
                }
            })
        } else {
            // 用户名在表中存在，不可以进行注册
            res.json({
                success: false,
                message: '此账号已存在'
            })
        }
    })
})
// 退出登录
router.post('/logout', function (req, res) {
    // 根据_id在表中进行查找,这个_id保存在请求头中
    UserModels.findOne({
        _id: req.user._id
    }, 'token').then(data => {
        // 没在请求头中找到用户的_id，说明当前并没有用户处于登录状态
        if (!data) {
            res.json({
                code: 400,
                success: false,
                message: '用户登录失效，请重新登录！'
            })
        } else {
            // 将用户在表中保存的token更改为空值，表明此用户并不处于登录状态，然后返回给前端
            UserModels.updateOne({
                _id: req.user._id
            }, {
                token: ''
            }, err => {
                if (err) {
                    res.json({
                        code: 401,
                        success: false,
                        message: err
                    })
                }
                res.json({
                    code: 200,
                    success: true,
                    message: '退出登录!'
                })
            })

        }
    })
})
// 判断用户是否登录
router.post('/getUserInfo', function (req, res) {
    // 根据_id在表中进行查找,这个_id保存在请求头中
    UserModels.findOne({
        _id: req.user._id
    }).then(data => {
        // 没在请求头中找到用户的_id，说明当前并没有用户处于登录状态
        if (!data) {
            res.json({
                code: 400,
                success: false,
                message: '用户登录失效，请重新登录！'
            })
        } else {
            // 返回用户的信息
            let user_data = {
                user_name: data.user_name,
                user_role: data.user_role
            }
            res.json({
                code: 200,
                success: true,
                user: user_data
            })
        }
    })
})

module.exports = router;