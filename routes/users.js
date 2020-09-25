const express = require('express');
const router = express.Router();
const UserModels = require('../models/UserModels');

router.post('/', function (req, res) {
  let user_name = req.body.user;
  let user_pwd = req.body.pwd;
  UserModels.find({user_name: user_name, user_pwd: user_pwd}).then(data => {
    res.json({
      status: 1,
      data: data[0].user_jurisdiction
    })
  }).catch(err => {
    res.json({
      status: 0,
      message: err
    })
  })
})

// 接口26（判断用户是否可以操作监控视图管理）
router.post('/findMonitorViewUserConfig', function (req, res) {
  UserModels.find({user_name: 'admin', user_pwd: '111'}).then(data => {
    res.json({
      status: 1,
      data: data[0].user_jurisdiction
    })
  }).catch(err => {
    res.json({
      status: 0,
      message: err
    })
  })
})

router.post('/login', function (req, res) {
  console.log(req.body);
  let account = req.body.account;
  let password = req.body.password;
  UserModels.find({ account: account }).then(doc => {
    if (!doc.length) {
      res.json({
        status: 0,
        message: '用户名错误，请输入正确的用户名'
      })
    }
    else {
      if (password == doc[0].password) {
        res.json({
          status: 1,
          message: '登录成功'
        })
      }
      else {
        res.json({
          status: 0,
          message: '密码错误，请输入正确的密码'
        })
      }
    }
  }).catch(err => {
    res.json({
      status: 0,
      message: err
    })
  })
})

module.exports = router;
