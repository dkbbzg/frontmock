const express = require('express');
const router = express.Router();
const HomeModels = require('../models/HomeModels.js');
const CompanyModels = require('../models/CompanyModels.js');

// 获取logo和名称
router.post('/info', async function (req, res) {
  let company = {};
  CompanyModels.find().then(doc => {
    company = {
      company_name: doc[0]['company_name'],
      company_logo: doc[0]['company_logo']
    }
    res.json({
      company: company
    })
  })
})

// 前台获取home信息
router.post('/home', async function (req, res) {
  let swiper = [], introduction = {};
  HomeModels.find().then(doc => {
    for (i = 0; i < doc.length; i++) {
      switch (doc[i].type) {
        case 'swiper': {
          let obj = {
            swiper_title: doc[i].swiper_title,
            swiper_bgimg: doc[i].swiper_bgimg
          }
          swiper.push(obj);
          break;
        }
        case 'introduction': {
          introduction = {
            introduction: doc[i].introduction,
            introduction_bg: doc[i].introduction_bg
          }
          break;
        }
      }
    }
    res.json({
      swiper: swiper,
      introduction: introduction
    })
  })
})

module.exports = router;
