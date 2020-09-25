const express = require('express');
const router = express.Router();
const HomeModels = require('../models/HomeModels.js');

// 获取swiper列表
router.post('/getSwiperInfo', function (req, res) {
  HomeModels.find({ type: 'swiper' }).then(doc => {
    res.json({
      status: 1,
      swiper: doc
    })
  })
})

// 添加新的swiper
router.post('/addSwiper', function (req, res) {
  newSwiper.save(function(err, doc) {
    if (err) {
      res.json({
        status: 0,
        message: err
      })
    }
    else {
      res.json({
        status: 1,
        message: '增加成功'
      })
    }
  })
})

// 更新swiper
router.post('/editSwiper', function (req, res) {
  let condition = {
    _id: req.body.id,
    type: 'swiper'
  }
  let newData = {
    swiper_title: req.body.title,
    swiper_bgimg: req.body.bg,
    swiper_remarks: req.body.remarks
  }
  HomeModels.findOneAndUpdate(condition, newData).then(() => {
    res.json({
      status: 1,
      message: '修改成功',
      token: token
    })
  })
})

// 删除
router.post('/delete', function (req, res) {
  let del = req.body.obj;
  HomeModels.deleteMany({ _id: { $in: del} }, function(err, doc) {
    if (err) {
      res.json({
        status: 0,
        message: err
      })
    }
    else {
      HomeModels.find({ type: 'swiper' }).then(doc => {
        res.json({
          status: 1,
          swiper: doc,
          message: '删除成功'
        })
      })
    }
  })
})

// 更新Introduction
router.post('/changeIntroduction', function (req, res) {
  HomeModels.findOneAndUpdate(condition, newData, options).then(() => {
    res.json({
      status: 1,
      message: '修改成功',
    })
  })
})

module.exports = router;
