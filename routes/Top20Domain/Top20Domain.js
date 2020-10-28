const express = require('express');
const router = express.Router();
const fs = require("fs");

//  查询
router.post('/getTop20.la', (req, res) => {
    res.json({
        success: true,
        message: '查询成功',
        data: {
            totalCount: 20,
            list: [{
                    id: 1,
                    domainName: "全省 - 1",
                    allFlow: 23.2,
                    outFlow: 34.2,
                    outProportion: 123.3,
                },
                {
                    id: 2,
                    domainName: "全省 - 1",
                    allFlow: 23.2,
                    outFlow: 34.2,
                    outProportion: 123.3,
                },
                {
                    id: 3,
                    domainName: "全省 - 1",
                    allFlow: 23.2,
                    outFlow: 34.2,
                    outProportion: 123.3,
                },
                {
                    id: 4,
                    domainName: "全省 - 1",
                    allFlow: 23.2,
                    outFlow: 34.2,
                    outProportion: 123.3,
                },
                {
                    id: 5,
                    domainName: "全省 - 1",
                    allFlow: 23.2,
                    outFlow: 34.2,
                    outProportion: 123.3,
                },
                {
                    id: 6,
                    domainName: "全省 - 1",
                    allFlow: 23.2,
                    outFlow: 34.2,
                    outProportion: 123.3,
                },
                {
                    id: 7,
                    domainName: "全省 - 1",
                    allFlow: 23.2,
                    outFlow: 34.2,
                    outProportion: 123.3,
                },
                {
                    id: 8,
                    domainName: "全省 - 1",
                    allFlow: 23.2,
                    outFlow: 34.2,
                    outProportion: 123.3,
                },
                {
                    id: 9,
                    domainName: "全省 - 1",
                    allFlow: 23.2,
                    outFlow: 34.2,
                    outProportion: 123.3,
                },
                {
                    id: 10,
                    domainName: "全省 - 1",
                    allFlow: 23.2,
                    outFlow: 34.2,
                    outProportion: 123.3,
                },
            ]
        }
    })
})

//  导出
router.post('/exportTop20.la', (req, res) => {
    res.json({
        success: true,
        message: '黑名单导出成功'
    })
})

//  ip 查询
router.post('/getTopIp10.la', (req, res) => {
    res.json({
        success: true,
        message: '查询成功',
        data: {
            totalCount: 10,
            list: [{
                    id: 1,
                    country: "全省 - 1",
                    city: '杭州',
                    operator: '余杭',
                    flowProportion: 123.3,
                },
                {
                    id: 2,
                    country: "全省 - 1",
                    city: '杭州',
                    operator: '余杭',
                    flowProportion: 123.3,
                },
                {
                    id: 3,
                    country: "全省 - 1",
                    city: '杭州',
                    operator: '余杭',
                    flowProportion: 123.3,
                },
                {
                    id: 4,
                    country: "全省 - 1",
                    city: '杭州',
                    operator: '余杭',
                    flowProportion: 123.3,
                },
                {
                    id: 5,
                    country: "全省 - 1",
                    city: '杭州',
                    operator: '余杭',
                    flowProportion: 123.3,
                },
                {
                    id: 6,
                    country: "全省 - 1",
                    city: '杭州',
                    operator: '余杭',
                    flowProportion: 123.3,
                },
                {
                    id: 7,
                    country: "全省 - 1",
                    city: '杭州',
                    operator: '余杭',
                    flowProportion: 123.3,
                },
                {
                    id: 8,
                    country: "全省 - 1",
                    city: '杭州',
                    operator: '余杭',
                    flowProportion: 123.3,
                },
                {
                    id: 9,
                    country: "全省 - 1",
                    city: '杭州',
                    operator: '余杭',
                    flowProportion: 123.3,
                },
                {
                    id: 10,
                    country: "全省 - 1",
                    city: '杭州',
                    operator: '余杭',
                    flowProportion: 123.3,
                },
            ]
        }
    })
})

//  查询状态
router.post('/getTop20CityState.la', (req, res) => {
    res.json(true)
})

//  改变状态
router.post('/updateTop20CityState.la', (req, res) => {
    res.json({
        data: true,
        success: true,
        message: '操作成功'
    })
})



module.exports = router;