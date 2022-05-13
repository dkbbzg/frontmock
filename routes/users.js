const express = require('express');
const router = express.Router();
const UserModels = require('../models/UserModels');
const CollectionModels = require('../models/CollectionModels');

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

router.post('/register', function (req, res) {
  let account = req.body.account;
  let password = req.body.password;
  UserModels.find({ user_name: account }).then(doc => {
    if (doc.length) {
      res.json({
        status: 0,
        message: '账号已存在'
      })
    }
    else {
      let newUserData = new UserModels({
        user_name: account,
        user_pwd: password
      })
      newUserData.save((err, data) => {
        console.log(err)
        if (err) {
          res.json({
            status: 0,
            message: '注册失败'
          })
        } else {
          res.json({
            status: 1,
            message: '注册成功'
          })
        }
      })
    }
  }).catch(err => {
    res.json({
      status: 0,
      message: err
    })
  })
})

router.get('/searchCollection', function (req, res) {
  CollectionModels.find().then((doc) => {
    res.json({
      status: 1,
      data: doc
    })
  })
})

router.post('/collection', function (req, res) {
  let title = req.body.title;
  let href = req.body.href;
  let type = req.body.type;
  if (type == 'true') {
    CollectionModels.deleteOne({ href: href }, function (err) {
      if (err) {
        res.json({
          status: 0,
          message: err
        })
      } else {
        res.json({
          message: '取消收藏',
          status: 1,
          is_collection: false,
        })
      }
    });
  } else {
    CollectionModels.update({ href: href }, { title, href }, { multi: true, upsert: true }, function (err, docs) {
      if (err) {
        res.json({
          status: 0,
          message: err
        })
      } else {
        res.json({
          message: '收藏成功',
          status: 1,
          is_collection: true,
        })
      }
    })
  }
})

router.post('/is_collection', function (req, res) {
  let href = req.body.href;
  CollectionModels.find({ href: href }).then(doc => {
    if (doc.length) {
      res.json({
        status: 1,
        is_collection: true
      })
    }
    else {
      res.json({
        status: 1,
        is_collection: false
      })
    }
  }).catch(err => {
    res.json({
      status: 0,
      message: err
    })
  })
})

module.exports = router;
