const express = require('express');
const router = express.Router();
const fs = require("fs");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModels = require('../../models/CRM/UserModels');
const TWLModels = require('../../models/CRM/TokenWhitelist');

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
                status: false,
                message: '此账号不存在！'
            })
        } else if (!bcrypt.compareSync(user_pwd, data.user_pwd)) {
            res.json({
                status: false,
                message: '密码错误，请输入正确的密码！'
            })
        } else {
            const token = 'Bearer ' + jwt.sign({
                    _id: data._id,
                    role: data.user_role
                },
                'CrMsEcReT', {
                    expiresIn: 60
                }
            )
            res.header({
                authorization: token
            })
            let newToken = new TWLModels({
                token: token
            })
            newToken.save();
            UserModels.findByIdAndUpdate(data._id, {$set:{ token: token }}).then(doc => {
                TWLModels.findOneAndRemove({token: doc.token});
            });
            res.json({
                status: true,
                message: '登录成功！'
            })
        }
    }).catch(err => {
        res.json({
            status: false,
            message: err
        })
    })
})
// 注册
router.post('/register', function (req, res) {
    let user_name = req.body.user;
    let user_pwd = req.body.pwd;
    let user_role = req.body.role;

    if (req.user.role === 'admin') {
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
                            status: false,
                            message: err
                        })
                    } else {
                        res.json({
                            status: true,
                            message: '注册成功'
                        })
                    }
                })
            } else {
                res.json({
                    status: false,
                    message: '此账号已存在'
                })
            }
        })
    } else {
        res.json({
            code: 401,
            status: false,
            message: '当前用户无权限！'
        })
    }
})
// 修改密码
router.post('/updatePWD', function (req, res) {
    let old_user_pwd = req.body.old_pwd;
    let new_user_pwd = req.body.new_pwd;

    if (old_user_pwd == new_user_pwd) {
        res.json({
            code: 200,
            status: false,
            message: '原密码和新密码不能相同！'
        })
    }

    UserModels.findOne({
        _id: req.user._id
    }, 'user_pwd').then(data => {
        if (!data) {
            res.json({
                code: 400,
                status: false,
                message: '用户登录失效，请重新登录！'
            })
        }
        else if (!bcrypt.compareSync(old_user_pwd, data.user_pwd)) {
            res.json({
                code: 200,
                status: false,
                message: '旧密码错误，请输入正确的密码！'
            })
        }
        else {
            UserModels.updateOne({
                _id: req.user._id
            }, {
                user_pwd: bcrypt.hashSync(new_user_pwd, salt)
            }, err => {
                if (err) {
                    res.json({
                        code: 401,
                        status: false,
                        message: err
                    }) 
                }
                res.json({
                    code: 200,
                    status: true,
                    message: '修改密码成功！'
                })
            })
            
        }
    })
})
// 退出登录
router.post('/logout', function (req, res) {
    res.json({
        code: 200,
        status: false,
        message: req.user
    })
})

module.exports = router;