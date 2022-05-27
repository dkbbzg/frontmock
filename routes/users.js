const express = require('express');
const router = express.Router();
const fs = require("fs");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModels = require('../models/UserModels');

const salt = bcrypt.genSaltSync(10);

// 登录
router.post('/login', function (req, res) {
    let user_name = req.body.user;
    let user_pwd = req.body.pwd;
    UserModels.findOne({
        user_name: user_name
    }).then(data => {
        if (!data) {
            res.json({
                success: false,
                message: '此账号不存在！'
            })
        } else if (!bcrypt.compareSync(user_pwd, data.user_pwd)) {
            res.json({
                success: false,
                message: '密码错误，请输入正确的密码！'
            })
        } else {
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
                    let user_data = {
                        user_name: doc.user_name,
                        user_role: doc.user_role
                    }
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
        res.json({
            success: false,
            message: err
        })
    })
})
// 注册
router.post('/register', function (req, res) {
    let user_name = req.body.user;
    let user_pwd = req.body.pwd;
    let user_role = req.body.role;

    UserModels.findOne({
        user_name: user_name
    }).then(data => {
        if (!data) {
            let newUserData = new UserModels({
                user_name: user_name,
                user_pwd: bcrypt.hashSync(user_pwd, salt),
                user_role: user_role ? user_role : 'user'
            })
            newUserData.save((err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err
                    })
                } else {
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
                            let user_data = {
                                user_name: doc.user_name,
                                user_role: doc.user_role
                            }
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
            res.json({
                success: false,
                message: '此账号已存在'
            })
        }
    })
})
// 修改密码
router.post('/updatePWD', function (req, res) {
    let old_user_pwd = req.body.old_pwd;
    let new_user_pwd = req.body.new_pwd;

    if (old_user_pwd == new_user_pwd) {
        res.json({
            code: 200,
            success: false,
            message: '原密码和新密码不能相同！'
        })
    }

    UserModels.findOne({
        _id: req.user._id
    }, 'user_pwd').then(data => {
        if (!data) {
            res.json({
                code: 400,
                success: false,
                message: '用户登录失效，请重新登录！'
            })
        } else if (!bcrypt.compareSync(old_user_pwd, data.user_pwd)) {
            res.json({
                code: 200,
                success: false,
                message: '旧密码错误，请输入正确的密码！'
            })
        } else {
            UserModels.updateOne({
                _id: req.user._id
            }, {
                user_pwd: bcrypt.hashSync(new_user_pwd, salt)
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
                    message: '修改密码成功！'
                })
            })

        }
    })
})
// 退出登录
router.post('/logout', function (req, res) {
    UserModels.findOne({
        _id: req.user._id
    }, 'token').then(data => {
        if (!data) {
            res.json({
                code: 400,
                success: false,
                message: '用户登录失效，请重新登录！'
            })
        } else {
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
    UserModels.findOne({
        _id: req.user._id
    }).then(data => {
        if (!data) {
            res.json({
                code: 400,
                success: false,
                message: '用户登录失效，请重新登录！'
            })
        } else {
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