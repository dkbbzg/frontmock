const express = require('express');
const superagent = require('superagent'); // http 方面的库，可以发起 get 或 post 请求
const cheerio = require('cheerio'); // 相当于jquery
const router = express.Router();
const NovelModels = require('../models/novelModels');
const BookModels = require('../models/bookModels');

// 查询书架所有的书籍
router.post('/fetchBooks', function (req, res, next) {
  BookModels.find({}).sort({ latestvisited: 1 }).exec((err, doc) => {
    res.json({
      list: doc,
      status: 200,
    })
  })
})

// 移除书架上某本书籍
router.post('/removeBook', function (req, res, next) {
  let bookId = req.body.bookId;
  let bookName = req.body.bookName;
  let params = {
    bookId,
    bookName
  };
  BookModels.remove(params, function (err) {
    if (err) return handleError(err);
    NovelModels.remove(params, function (err) {
      if (err) return handleError(err);
      res.json({
        status: 200,
        msg: '已移出书架'
      })
    })
  })
})

// 查询小说的所有章节
router.post('/fetch', function (req, res, next) {
  let bookId = req.body.bookId;
  let page = parseInt(req.body.page);
  let pageSize = parseInt(req.body.pageSize);
  NovelModels.countDocuments({ bookId: bookId }, (error, count) => {
    if (error) {
      logger.error(`user::/list::error:${JSON.stringify(error)}`);
      res.json({
        status: 400,
        msg: JSON.stringify(error)
      });
    } else {
      NovelModels.find({ bookId: bookId }).sort({ no: 1 }).skip((page - 1) * pageSize).limit(pageSize).select('bookName href title CharacterId no').exec((err, doc) => {
        res.json({
          list: doc,
          total: count,
          status: 200,
        })
      })
    }
  })
})

// 查询小说最后一个章节
router.post('/fetchLatestNo', function (req, res, next) {
  let bookId = req.body.bookId;
  NovelModels.find({ bookId: bookId }).sort({ no: -1 }).limit(1).select('no').exec((err, doc) => {
    res.json({
      data: doc[0],
      status: 200,
    })
  })
})

// 查询小说某个章节的具体内容
router.post('/fetchContent', function (req, res, next) {
  let bookId = req.body.bookId;
  let no = req.body.no;
  NovelModels.findOne({ bookId: bookId, no: no }).select('bookId bookName title content no').exec((err, doc) => {
    res.json({
      data: doc,
      status: 200,
    })
  })
})

module.exports = router;
