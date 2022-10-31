const express = require('express');
const router = express.Router();
const GoodsModel = require('../models/GoodsModels');
const NewGoodsModels = require('../models/NewGoodsModels');

// 口袋商城页面 口袋商品获取数据
router.post('/front/getGoods', (req, res) => {
  // 获取类别和学校的参数
  let category = req.body.category !== '' ? req.body.category : '';
  let region = req.body.region ? req.body.region : '';
  // 查询条件  类别和学校
  let queryParams = {};
  if (region !== '') {
    queryParams.region = {
      $regex: region
    }
  }
  if (category !== '') {
    queryParams.category = {
      $elemMatch: { $eq: category }
    }
  }
  // 根据以上查询条件查找数据并倒序返回
  NewGoodsModels
    .find(queryParams)
    .sort({
      _id: -1
    })
    .exec((err, doc) => {
      if (err) {
        res.json({
          success: false,
          message: err,
          data: []
        })
      } else {
        res.json({
          success: true,
          message: '查询成功',
          data: doc
        })
      }
    })
})
// 口袋商城页面 右上角搜索
router.post('/front/getGoodsByName', (req, res) => {
  // 获取参数
  let name = req.body.name ? req.body.name : '';
  // 查询条件
  let queryParams = {};
  if (name !== '') {
    queryParams.name = {
      $regex: name
    }
  }
  // 根据以上查询条件查找数据并倒序返回
  NewGoodsModels
    .find(queryParams)
    .sort({
      _id: -1
    })
    .exec((err, doc) => {
      if (err) {
        res.json({
          success: false,
          message: err,
          data: []
        })
      } else {
        res.json({
          success: true,
          message: '查询成功',
          data: doc
        })
      }
    })
})
// 口袋商城页面 新增编辑
router.post('/front/addGoods', (req, res) => {
  // 获取参数
  let name = req.body.name;
  let region = req.body.region;
  let category = req.body.category;
  let files = req.body.files;
  let original = req.body.original;
  let current = req.body.current;
  let delivery = req.body.delivery;
  let desc = req.body.desc;
  // 创建实例
  let newCollection = new NewGoodsModels({ userId: req.user._id, name, category, original, current, files, delivery, region, desc });
  // 将实例存入数据表中
  newCollection.save((err, data) => {
    if (err) {
      res.json({
        success: false,
        message: err
      })
    } else {
      res.json({
        success: true,
        message: '新增成功'
      })
    }
  })
})
// 口袋商城页面 我的商品 查询
router.post('/front/getMyGoods', (req, res) => {
  // 根据请求头中的用户信息查找当前用户的商品并倒序返回
  NewGoodsModels
    .find({ userId: req.user._id })
    .sort({
      _id: -1
    })
    .exec((err, doc) => {
      if (err) {
        res.json({
          success: false,
          message: err,
          data: []
        })
      } else {
        res.json({
          success: true,
          message: '查询成功',
          data: doc
        })
      }
    })
})
// 口袋商城页面 我的商品 删除
router.post('/front/deleteMyGood', (req, res) => {
  // 根据商品的id删除数据表中对应的数据
  NewGoodsModels.remove({ _id: req.body.id }, err => {
    if (err) {
      res.json({
        message: '删除失败!',
        success: false,
      })
    } else {
      res.json({
        message: '删除成功!',
        success: true,
      })
    }
  })
})


//  管理页面 获取数据
router.post('/getGoods', (req, res) => {
  // 获取参数
  let name = req.body.name ? req.body.name : '';
  let category = req.body.category !== '' ? req.body.category : '';
  let region = req.body.region ? req.body.region : '';
  let page = parseInt(req.body.page) - 1 ? parseInt(req.body.page) - 1 : 0;
  let pageSize = parseInt(req.body.pageSize) ? parseInt(req.body.pageSize) : 0;
  // 查询条件
  let queryParams = {};
  if (name !== '') {
    queryParams.name = {
      $regex: name
    }
  }
  if (region !== '') {
    queryParams.region = {
      $regex: region
    }
  }
  if (category !== '') {
    queryParams.category = {
      $elemMatch: { $eq: category }
    }
  }
  // 统计符合条件的数据数量
  NewGoodsModels.count(queryParams).exec((err, count) => {
    if (err) {
      res.json({
        success: false,
        message: err,
        data: {
          total: 0,
          results: []
        }
      })
    } else {
      // 根据查询条件查找数据并根据当前页数当前页面数据数量来返回相应段落的数据
      NewGoodsModels
        .find(queryParams)
        .skip(page * pageSize)
        .limit(pageSize)
        .sort({
          _id: -1
        })
        .exec((err, doc) => {
          if (err) {
            res.json({
              success: false,
              message: err,
              data: {
                total: 0,
                results: []
              }
            })
          } else {
            res.json({
              success: true,
              message: '查询成功',
              data: {
                total: count,
                results: doc
              }
            })
          }
        })
    }
  })
})
//  删除
router.post('/deleteGoods', (req, res) => {
  // 获取参数
  let ids = req.body.ids.split(',');
  // 查询条件
  let deleteParams = {
    _id: {
      $in: ids
    }
  }
  // 根据查询条件删除数据
  NewGoodsModels.remove(deleteParams, err => {
    if (err) {
      res.json({
        message: '删除失败!',
        success: false,
      })
    } else {
      res.json({
        message: '删除成功!',
        success: true,
      })
    }
  })

})

module.exports = router;