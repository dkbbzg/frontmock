const express = require('express');
const router = express.Router();
const ProductModels = require('../models/ProductModels.js');

// 获取product列表
router.post('/info', function (req, res) {
  ProductModels.find().sort({category_No: -1}).then(doc => {
    res.json({
      status: 1,
      product: doc,
      token: token
    })
  })
})

// 添加新的产品型号
router.post('/addCategory', function (req, res) {
  let category = new ProductModels({
    category: req.body.category,
    category_No: req.body.category_No,
  });
  category.save(function(err, doc) {
    if (err) {
      res.json({
        status: 0,
        message: err
      })
    }
    else {
      ProductModels.find().sort({category_No: -1}).then(doc => {
        res.json({
          status: 1,
          message: '增加成功',
          product: doc,
        })
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
  ProductModels.findOneAndUpdate(condition, newData).then(() => {
    res.json({
      status: 1,
      message: '修改成功'
    })
  })
})

// 删除
router.post('/delete', function (req, res) {
  let del = req.body.obj;
  ProductModels.deleteMany({ _id: { $in: del} }, function(err, doc) {
    if (err) {
      res.json({
        status: 0,
        message: err
      })
    }
    else {
      ProductModels.find({ type: 'swiper' }).then(doc => {
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
  let condition = {
    type: 'introduction'
  }
  let newData = {
    introduction: req.body.introduction,
    introduction_bg: req.body.background,
    type: 'introduction'
  }
  let options = {upsert: true, new: true, setDefaultsOnInsert: true};
  ProductModels.findOneAndUpdate(condition, newData, options).then(() => {
    res.json({
      status: 1,
      message: '修改成功'
    })
  })
})

module.exports = router;
