const express = require('express');
const router = express.Router();
const CompanyModels = require('../models/CompanyModels.js');

router.post('/changeCompanyInfo', function (req, res) {
  let company_id = req.body.company_id;
  let company_name = req.body.company_name;
  let company_logo = req.body.company_logo;
  CompanyModels.findOneAndUpdate({
    _id: company_id
  }, {
    company_name: company_name,
    company_logo: company_logo
  }).then(() => {
    res.json({
      status: 1,
      message: '修改成功',
    })
  })
})

router.post('/getCompanayInfo', function (req, res) {
  CompanyModels.find({}).then(doc => {
    if (!doc.length) {
      res.json({
        status: 0,
        message: '无记录'
      })
    }
    else {
      res.json({
        status: 1,
        company_id: doc[0]['_id'],
        company_name: doc[0]['company_name'],
        company_logo: doc[0]['company_logo'],
      })
    }
  })
})

module.exports = router;
