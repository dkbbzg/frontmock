const express = require('express');
const router = express.Router();
const fs = require("fs");

// 获得封堵任务列表
router.post('/domain/getTasks', (req, res) => {
    res.json({
        "code": 200,
        "msg": "获得列表成功",
        "resData": {
            "sEcho": 0,
            "iTotalRecords": 0,
            "iTotalDisplayRecords": 0,
            "data": [{
                    "id": "1",
                    "taskId": "YMRW-20200811-0001",
                    "domain": "www.zhihu.com",
                    "resolutionAddress": "1",
                    "operateType": "1",
                    "operateResult": "1",
                    "operatePerson": "admin",
                    "operateTime": "2020-08-11 09:38",
                    "remark": "9",
                    "verificationResult": "1",
                    "interfaceType": "1",
                    "signStr": "01",
                    "excuteTime": "2020-08-11 09:48"
                },
                {
                    "id": "2",
                    "taskId": "YMRW-20200811-0001",
                    "domain": "www.zhihu.com",
                    "resolutionAddress": "1",
                    "operateType": "1",
                    "operateResult": "2",
                    "operatePerson": "admin",
                    "operateTime": "2020-08-11 09:38",
                    "remark": "9",
                    "verificationResult": "",
                    "interfaceType": "1",
                    "signStr": "01",
                    "excuteTime": "2020-08-11 09:48"
                },
                {
                    "id": "3",
                    "taskId": "YMRW-20200811-0001",
                    "domain": "www.zhihu.com",
                    "resolutionAddress": "1",
                    "operateType": "2",
                    "operateResult": "0",
                    "operatePerson": "admin",
                    "operateTime": "2020-08-11 09:38",
                    "remark": "9",
                    "verificationResult": "0",
                    "interfaceType": "1",
                    "signStr": "01",
                    "excuteTime": ""
                }
            ]
        }
    })
})

module.exports = router;