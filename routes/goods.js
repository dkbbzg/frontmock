const express = require('express');
const router = express.Router();
const GoodsModel = require('../models/GoodsModels');
const NewGoodsModels = require('../models/NewGoodsModels');

//  前台 获取数据
router.post('/front/getGoods', (req, res) => {
  let category = req.body.category !== '' ? req.body.category : '';
  let region = req.body.region ? req.body.region : '';

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
// 新增编辑
router.post('/front/addGoods', (req, res) => {
  let name = req.body.name;
  let region = req.body.region;
  let category = req.body.category;
  let files = req.body.files;
  let original = req.body.original;
  let current = req.body.current;
  let delivery = req.body.delivery;
  let desc = req.body.desc;

  if (req.user.role === 'admin') {
    let newCollection = new NewGoodsModels({ userId: req.user._id, name, category, original, current, files, delivery, region, desc });
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
  } else {
    res.json({
      code: 401,
      success: false,
      message: '当前用户无权限！'
    })
  }
})
//  前台 我的商品 查询
router.post('/front/getMyGoods', (req, res) => {
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
//  前台 我的商品 删除
router.post('/front/deleteMyGood', (req, res) => {
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


//  获取数据
router.post('/getGoods', (req, res) => {
  let name = req.body.name ? req.body.name : '';
  let category = req.body.category !== '' ? parseInt(req.body.category) : '';
  let page = parseInt(req.body.page) - 1 ? parseInt(req.body.page) - 1 : 0;
  let pageSize = parseInt(req.body.pageSize) ? parseInt(req.body.pageSize) : 0;

  let queryParams = {};
  if (name !== '') {
    queryParams.name = {
      $regex: name
    }
  }
  if (category !== '') {
    queryParams.category = category
  }

  GoodsModel.count(queryParams).exec((err, count) => {
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
      GoodsModel
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
  let ids = req.body.ids.split(',');
  let deleteParams = {
    _id: {
      $in: ids
    }
  }
  GoodsModel.remove(deleteParams, err => {
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
// 新增编辑
router.post('/addEditGoods', (req, res) => {
  let _id = req.body.id;
  let name = req.body.name;
  let category = req.body.category;
  let original = req.body.original;
  let current = req.body.current;
  let files = req.body.files;
  let from = req.body.from;
  let express = req.body.express;
  let desc = req.body.desc;
  let type = req.body.type;

  if (req.user.role === 'admin') {
    if (type == 'add') {
      // 新增
      let newCollection = new GoodsModel({ name, category, original, current, files, from, express, desc });
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
    } else {
      // 更新
      GoodsModel.findById(_id).then(data => {
        if (!data) {
          res.json({
            success: false,
            message: '程序错误,没有找到对应的数据!'
          })
        } else {
          GoodsModel.updateOne({ _id }, { name, category, original, current, files, from, express, desc }, err => {
            if (err) {
              res.json({
                success: false,
                message: err
              })
            }
            res.json({
              success: true,
              message: `修改成功!`
            })
          })

        }
      })
    }
  } else {
    res.json({
      code: 401,
      success: false,
      message: '当前用户无权限！'
    })
  }
})


module.exports = router;