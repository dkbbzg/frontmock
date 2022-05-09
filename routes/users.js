const express = require('express');
const router = express.Router();
const UserModels = require('../models/UserModels');

router.post('/login', function (req, res) {
  let account = req.body.account;
  let password = req.body.password;
  UserModels.find({ user_name: account }).then(doc => {
    if (!doc.length) {
      res.json({
        status: 0,
        message: '账号或密码错误，请输入正确的账号和密码'
      })
    }
    else {
      if (password == doc[0].user_pwd) {
        res.json({
          status: 1,
          message: '登录成功'
        })
      }
      else {
        res.json({
          status: 0,
          message: '账号或密码错误，请输入正确的账号和密码'
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
