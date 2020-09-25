const express = require('express');
const router = express.Router();
const fs = require("fs");

router.post('/queryCity.la', (req, res) => {
    res.json([{
        "cityId": 200,
        "cityName": "省公司"
    }, {
        "cityId": 570,
        "cityName": "衢州市"
    }, {
        "cityId": 571,
        "cityName": "杭州市"
    }, {
        "cityId": 572,
        "cityName": "湖州市"
    }, {
        "cityId": 573,
        "cityName": "嘉兴市"
    }, {
        "cityId": 574,
        "cityName": "宁波市"
    }, {
        "cityId": 575,
        "cityName": "绍兴市"
    }, {
        "cityId": 576,
        "cityName": "台州市"
    }, {
        "cityId": 577,
        "cityName": "温州市"
    }, {
        "cityId": 578,
        "cityName": "丽水市"
    }, {
        "cityId": 579,
        "cityName": "金华市"
    }, {
        "cityId": 580,
        "cityName": "舟山市"
    }])
})

router.post('/getSynTime.la', (req, res) => {
    res.json({
        "message": null,
        "statusCode": 200,
        "success": true,
        "data": "2020-06-28 15:19:23"
    })
})

router.post('/queryAreaConfigList.la', (req, res) => {
    res.json({
        "totalSize": 22,
        "data": [{
            "inputTime": "2020-06-11 15:16:42",
            "updateTime": "2020-06-28 15:34:24",
            "inputUserName": "aqtest",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 93,
            "cityId": 200,
            "cityName": "省公司",
            "ip": "1.1.1.1",
            "ipLong": 0,
            "exitName": "111",
            "linkType": "省三方链路",
            "exitUse": "网页,投诉,游戏",
            "state": 0,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-04-30 10:58:28",
            "updateTime": "2020-04-30 10:58:28",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 92,
            "cityId": 578,
            "cityName": "丽水市",
            "ip": "111.1.1.1",
            "ipLong": 0,
            "exitName": "to_lishui_yun",
            "linkType": "地市云链路",
            "exitUse": "网页,投诉,国际,游戏",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 2
        }, {
            "inputTime": "2020-03-17 19:01:19",
            "updateTime": "2020-03-17 19:01:19",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 91,
            "cityId": 573,
            "cityName": "嘉兴市",
            "ip": "112.1.1.1",
            "ipLong": 0,
            "exitName": "to_jiaxing_ceshii",
            "linkType": "省中心链路",
            "exitUse": "网页",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 2
        }, {
            "inputTime": "2020-03-17 11:18:55",
            "updateTime": "2020-03-17 11:18:55",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 90,
            "cityId": 573,
            "cityName": "嘉兴市",
            "ip": "112.11.1.11",
            "ipLong": 0,
            "exitName": "to_jiaxing_ceshi9",
            "linkType": "地市云链路",
            "exitUse": "网页",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-03-16 15:36:39",
            "updateTime": "2020-03-16 15:36:39",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 89,
            "cityId": 578,
            "cityName": "丽水市",
            "ip": "112.108.109.11",
            "ipLong": 0,
            "exitName": "to_lishui_province",
            "linkType": "省中心链路",
            "exitUse": "网页",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-03-15 03:05:54",
            "updateTime": "2020-03-15 03:05:54",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 88,
            "cityId": 200,
            "cityName": "省公司",
            "ip": "112.1.1.101",
            "ipLong": 0,
            "exitName": "to_sheng_ceshi",
            "linkType": "省三方链路",
            "exitUse": "投诉",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-03-06 14:33:35",
            "updateTime": "2020-06-18 15:34:40",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 87,
            "cityId": 570,
            "cityName": "衢州市",
            "ip": "172.0.0.1",
            "ipLong": 0,
            "exitName": "to_quzhou_ceshi",
            "linkType": "地市云链路",
            "exitUse": "网页,投诉,游戏",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-02-19 11:03:13",
            "updateTime": "2020-03-16 09:47:59",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 86,
            "cityId": 572,
            "cityName": "湖州市",
            "ip": "223.93.170.119",
            "ipLong": 0,
            "exitName": "to_huzhou_ceshi2",
            "linkType": "地市云链路",
            "exitUse": "网页,投诉,游戏",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-01-10 14:33:01",
            "updateTime": "2020-06-11 16:50:14",
            "inputUserName": "admin",
            "updateUserName": "hangzhou",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 85,
            "cityId": 571,
            "cityName": "杭州市",
            "ip": "111.1.1.11",
            "ipLong": 0,
            "exitName": "to_hangzhou_guoji",
            "linkType": "地市云链路",
            "exitUse": "国际",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-01-09 11:21:38",
            "updateTime": "2020-03-18 14:33:34",
            "inputUserName": "panhy",
            "updateUserName": "hangzhou",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 84,
            "cityId": 571,
            "cityName": "杭州市",
            "ip": "1.1.1.61",
            "ipLong": 0,
            "exitName": "to_hangzhou_jialiang6",
            "linkType": "地市云链路",
            "exitUse": "网页,投诉,游戏,国际",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }],
        "page": 1,
        "total": 3,
        "all": 0,
        "rows": 10
    })
})

router.post('/queryAreaConfigListReadOnly.la', (req, res) => {
    res.json({
        "totalSize": 22,
        "data": [{
            "inputTime": "2020-06-11 15:16:42",
            "updateTime": "2020-06-28 15:34:24",
            "inputUserName": "aqtest",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 93,
            "cityId": 200,
            "cityName": "省公司",
            "ip": "1.1.1.1",
            "ipLong": 0,
            "exitName": "111",
            "linkType": "省三方链路",
            "exitUse": "网页,投诉,游戏",
            "state": 0,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 2
        }, {
            "inputTime": "2020-04-30 10:58:28",
            "updateTime": "2020-04-30 10:58:28",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 92,
            "cityId": 578,
            "cityName": "丽水市",
            "ip": "111.1.1.1",
            "ipLong": 0,
            "exitName": "to_lishui_yun",
            "linkType": "地市云链路",
            "exitUse": "网页,投诉,国际,游戏",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-03-17 19:01:19",
            "updateTime": "2020-03-17 19:01:19",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 91,
            "cityId": 573,
            "cityName": "嘉兴市",
            "ip": "112.1.1.1",
            "ipLong": 0,
            "exitName": "to_jiaxing_ceshii",
            "linkType": "省中心链路",
            "exitUse": "网页",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 2
        }, {
            "inputTime": "2020-03-17 11:18:55",
            "updateTime": "2020-03-17 11:18:55",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 90,
            "cityId": 573,
            "cityName": "嘉兴市",
            "ip": "112.11.1.11",
            "ipLong": 0,
            "exitName": "to_jiaxing_ceshi9",
            "linkType": "地市云链路",
            "exitUse": "网页",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-03-16 15:36:39",
            "updateTime": "2020-03-16 15:36:39",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 89,
            "cityId": 578,
            "cityName": "丽水市",
            "ip": "112.108.109.11",
            "ipLong": 0,
            "exitName": "to_lishui_province",
            "linkType": "省中心链路",
            "exitUse": "网页",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-03-15 03:05:54",
            "updateTime": "2020-03-15 03:05:54",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 88,
            "cityId": 200,
            "cityName": "省公司",
            "ip": "112.1.1.101",
            "ipLong": 0,
            "exitName": "to_sheng_ceshi",
            "linkType": "省三方链路",
            "exitUse": "投诉",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-03-06 14:33:35",
            "updateTime": "2020-06-18 15:34:40",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 87,
            "cityId": 570,
            "cityName": "衢州市",
            "ip": "172.0.0.1",
            "ipLong": 0,
            "exitName": "to_quzhou_ceshi",
            "linkType": "地市云链路",
            "exitUse": "网页,投诉,游戏",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-02-19 11:03:13",
            "updateTime": "2020-03-16 09:47:59",
            "inputUserName": "admin",
            "updateUserName": "admin",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 86,
            "cityId": 572,
            "cityName": "湖州市",
            "ip": "223.93.170.119",
            "ipLong": 0,
            "exitName": "to_huzhou_ceshi2",
            "linkType": "地市云链路",
            "exitUse": "网页,投诉,游戏",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-01-10 14:33:01",
            "updateTime": "2020-06-11 16:50:14",
            "inputUserName": "admin",
            "updateUserName": "hangzhou",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 85,
            "cityId": 571,
            "cityName": "杭州市",
            "ip": "111.1.1.11",
            "ipLong": 0,
            "exitName": "to_hangzhou_guoji",
            "linkType": "地市云链路",
            "exitUse": "国际",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }, {
            "inputTime": "2020-01-09 11:21:38",
            "updateTime": "2020-03-18 14:33:34",
            "inputUserName": "panhy",
            "updateUserName": "hangzhou",
            "inputUserId": 0,
            "updateUserId": 0,
            "id": 84,
            "cityId": 571,
            "cityName": "杭州市",
            "ip": "1.1.1.61",
            "ipLong": 0,
            "exitName": "to_hangzhou_jialiang6",
            "linkType": "地市云链路",
            "exitUse": "网页,投诉,游戏,国际",
            "state": 2,
            "status": 0,
            "syncResult": null,
            "band": null,
            "useState": 1
        }],
        "page": 1,
        "total": 3,
        "all": 0,
        "rows": 10
    })
})

router.post('/queryLinkDetail.la', (req, res) => {
    res.json({"message":"当前地市已有区域同步申请正在审核中，禁止编辑","statusCode":0,"success":false,"data":null})
})

router.post('/queryLinkDetailReadOnly.la', (req, res) => {
    res.json({
        "message": "查询成功",
        "statusCode": 0,
        "success": true,
        "data": [{
                "id": 195,
                "bandType": "PPPOE",
                "linkFormat": "50Mbps",
                "operate": "国际",
                "linkTotal": 1,
                "relatId": 93
            },
            {
                "id": 196,
                "bandType": "PPPOE",
                "linkFormat": "50Mbps",
                "operate": "电信",
                "linkTotal": 1,
                "relatId": 93
            },
            {
                "id": 197,
                "bandType": "",
                "linkFormat": "",
                "operate": "",
                "linkTotal": 0,
                "relatId": 93
            },
            {
                "id": 198,
                "bandType": "",
                "linkFormat": "",
                "operate": "",
                "linkTotal": 0,
                "relatId": 93
            },
            {
                "id": 199,
                "bandType": "",
                "linkFormat": "",
                "operate": "",
                "linkTotal": 0,
                "relatId": 93
            }
        ]
    })
})

router.post('/queryStrategyConfig.la', (req, res) => {
    res.json({
        "message": null,
        "statusCode": 0,
        "success": true,
        "data": {
            "start": "省公司",
            "type": 1
        }
    })
})

router.post('/findExamine.la', (req, res) => {
    res.json({
        "message": "查询审批列表成功",
        "statusCode": 0,
        "success": true,
        "data": {
            "totalCount": 21,
            "list": [{
                "id": 97,
                "relatId": 0,
                "submitTime": "2020-07-08 11:11:09",
                "cityId": 0,
                "cityName": "全部",
                "type": 1,
                "objectiveIp": "192.71.68.156/32",
                "businessType": null,
                "nextExit": null,
                "applyUserName": "admin",
                "dispatchReason": "修改了调度出口to_dishi_youxi。",
                "examineUserName": "admin",
                "state": 1,
                "examineTime": "2020-07-08 11:12:52",
                "examineOpinion": "111",
                "strategyState": "下发成功",
                "completion": "2020-07-08 11:12:53完成",
                "applyUserId": 5,
                "applyUserCityId": 200,
                "buttonState": 3,
                "examineUserId": 5,
                "ipSize": 10
            }, {
                "id": 95,
                "relatId": 0,
                "submitTime": "2020-07-08 10:27:54",
                "cityId": 0,
                "cityName": "全部",
                "type": 1,
                "objectiveIp": null,
                "businessType": null,
                "nextExit": null,
                "applyUserName": "admin",
                "dispatchReason": "删除了调度出口to_shenggongsiguoji1\n删除了调度出口To-ShengSanFan-GRE3\n修改了调度出口to_wangye\n添加了调度出口to_dishi_youxi\n",
                "examineUserName": "admin",
                "state": 1,
                "examineTime": "2020-07-08 10:55:18",
                "examineOpinion": "&lt;a&gt;2&lt;/a&gt;",
                "strategyState": "下发成功",
                "completion": "2020-07-08 10:55:20完成",
                "applyUserId": 5,
                "applyUserCityId": 200,
                "buttonState": 3,
                "examineUserId": 5,
                "ipSize": 0
            }, {
                "id": 94,
                "relatId": 0,
                "submitTime": "2020-07-08 10:08:42",
                "cityId": 0,
                "cityName": "全部",
                "type": 1,
                "objectiveIp": null,
                "businessType": null,
                "nextExit": null,
                "applyUserName": "admin",
                "dispatchReason": "添加了调度出口to_wangye。",
                "examineUserName": "admin",
                "state": 1,
                "examineTime": "2020-07-08 10:12:46",
                "examineOpinion": "审核通过审核通过审核",
                "strategyState": "下发成功",
                "completion": "2020-07-08 10:12:47完成",
                "applyUserId": 5,
                "applyUserCityId": 200,
                "buttonState": 3,
                "examineUserId": 5,
                "ipSize": 0
            }, {
                "id": 93,
                "relatId": 2583,
                "submitTime": "2020-07-08 09:30:24",
                "cityId": 571,
                "cityName": "杭州市",
                "type": 2,
                "objectiveIp": "1.1.1.1/24",
                "businessType": "网页",
                "nextExit": "to_wangye",
                "applyUserName": "admin",
                "dispatchReason": "0708测试",
                "examineUserName": "admin",
                "state": 1,
                "examineTime": "2020-07-08 09:46:22",
                "examineOpinion": "审核通过测试",
                "strategyState": "下发成功",
                "completion": "2020-07-08 09:46:23完成",
                "applyUserId": 5,
                "applyUserCityId": 200,
                "buttonState": 3,
                "examineUserId": 5,
                "ipSize": 1
            }, {
                "id": 92,
                "relatId": 2582,
                "submitTime": "2020-07-07 21:36:10",
                "cityId": 200,
                "cityName": "省公司",
                "type": 2,
                "objectiveIp": "192.71.68.156/32",
                "businessType": "投诉",
                "nextExit": "to_sheng_third",
                "applyUserName": "admin",
                "dispatchReason": "加载缓慢",
                "examineUserName": "admin",
                "state": 2,
                "examineTime": "2020-07-07 21:36:40",
                "examineOpinion": "ces",
                "strategyState": "审核驳回",
                "completion": "--",
                "applyUserId": 5,
                "applyUserCityId": 200,
                "buttonState": 2,
                "examineUserId": 5,
                "ipSize": 1
            }, {
                "id": 91,
                "relatId": 2581,
                "submitTime": "2020-07-07 21:14:50",
                "cityId": 570,
                "cityName": "衢州市",
                "type": 2,
                "objectiveIp": "192.71.68.110/32",
                "businessType": "投诉",
                "nextExit": "to_guoxinguoji",
                "applyUserName": "admin",
                "dispatchReason": "测试徐文俊",
                "examineUserName": "admin",
                "state": 2,
                "examineTime": "2020-07-07 21:15:22",
                "examineOpinion": "s",
                "strategyState": "审核驳回",
                "completion": "--",
                "applyUserId": 5,
                "applyUserCityId": 200,
                "buttonState": 2,
                "examineUserId": 5,
                "ipSize": 1
            }, {
                "id": 90,
                "relatId": 577,
                "submitTime": "2020-07-07 20:53:05",
                "cityId": 577,
                "cityName": "温州市",
                "type": 1,
                "objectiveIp": null,
                "businessType": null,
                "nextExit": null,
                "applyUserName": "admin",
                "dispatchReason": "添加了调度出口to_wenzhou_ceshi2。",
                "examineUserName": "admin",
                "state": 1,
                "examineTime": "2020-07-07 21:02:38",
                "examineOpinion": "111",
                "strategyState": "下发成功",
                "completion": "2020-07-07 21:04:21完成",
                "applyUserId": 5,
                "applyUserCityId": 200,
                "buttonState": 3,
                "examineUserId": 5,
                "ipSize": 1
            }, {
                "id": 89,
                "relatId": 2580,
                "submitTime": "2020-07-07 20:28:48",
                "cityId": 200,
                "cityName": "省公司",
                "type": 2,
                "objectiveIp": "192.71.68.160/32",
                "businessType": "网页",
                "nextExit": "to_sheng_third",
                "applyUserName": "admin",
                "dispatchReason": "测试徐文俊",
                "examineUserName": "admin",
                "state": 1,
                "examineTime": "2020-07-08 10:59:22",
                "examineOpinion": "111",
                "strategyState": "下发中",
                "completion": "下发中",
                "applyUserId": 5,
                "applyUserCityId": 200,
                "buttonState": 4,
                "examineUserId": 5,
                "ipSize": 1
            }, {
                "id": 88,
                "relatId": 2579,
                "submitTime": "2020-07-07 20:24:33",
                "cityId": 200,
                "cityName": "省公司",
                "type": 2,
                "objectiveIp": "192.71.68.120/30",
                "businessType": "网页",
                "nextExit": "to_sheng_third",
                "applyUserName": "admin",
                "dispatchReason": "测试徐文俊",
                "examineUserName": "admin",
                "state": 1,
                "examineTime": "2020-07-07 20:24:51",
                "examineOpinion": "a",
                "strategyState": "下发成功",
                "completion": "2020-07-07 20:24:53完成",
                "applyUserId": 5,
                "applyUserCityId": 200,
                "buttonState": 3,
                "examineUserId": 5,
                "ipSize": 1
            }, {
                "id": 87,
                "relatId": 2540,
                "submitTime": "2020-07-07 14:52:15",
                "cityId": 570,
                "cityName": "衢州市",
                "type": 2,
                "objectiveIp": "192.71.68.132/30",
                "businessType": "游戏",
                "nextExit": "to_quzhou_ceshi",
                "applyUserName": "admin",
                "dispatchReason": "测试徐文俊",
                "examineUserName": "admin",
                "state": 2,
                "examineTime": "2020-07-07 14:52:44",
                "examineOpinion": "bohui",
                "strategyState": "审核驳回",
                "completion": "--",
                "applyUserId": 5,
                "applyUserCityId": 200,
                "buttonState": 2,
                "examineUserId": 5,
                "ipSize": 1
            }]
        }
    })
})

router.post('/queryStrategyIp.la', (req, res) => {
    res.json({
        "totalSize": 4,
        "data": [{
            "id": 42307,
            "ip": "3.208.72.109",
            "mask": "32",
            "ipLongStart": 63981677,
            "ipLongEnd": 63981677,
            "relatId": 0,
            "logId": 0,
            "result": "成功"
        }, {
            "id": 42308,
            "ip": "3.80.20.132",
            "mask": "32",
            "ipLongStart": 55579780,
            "ipLongEnd": 55579780,
            "relatId": 0,
            "logId": 0,
            "result": "成功"
        }, {
            "id": 42309,
            "ip": "3.235.96.11",
            "mask": "32",
            "ipLongStart": 65757195,
            "ipLongEnd": 65757195,
            "relatId": 0,
            "logId": 0,
            "result": "成功"
        }, {
            "id": 42310,
            "ip": "3.235.96.10",
            "mask": "32",
            "ipLongStart": 65757194,
            "ipLongEnd": 65757194,
            "relatId": 0,
            "logId": 0,
            "result": "成功"
        }],
        "page": 1,
        "total": 1,
        "all": 0,
        "rows": 7
    })
})

let BtnStateCount = 0;
router.post('/getButtonState.la', (req, res) => {
    let city = req.body.cityId;
    let buttonState = 3;
    if (city == 0) {
        buttonState = 1
    }
    else if (city == 1) {
        buttonState = 4
    }
    else if (city == 2) {
        buttonState = 6
    }
    else if (city == 3) {
        BtnStateCount++;
        buttonState = 5;
        if (BtnStateCount % 5 == 0) {
            buttonState = 3;
        }
    }
    else if (city == 4) {
        BtnStateCount++;
        buttonState = 5;
        if (BtnStateCount % 3 == 0) {
            buttonState = 6;
        }
    }
    res.json({
        message: 'qweqwe',
        success: true,
        data: [{
            "buttonState": buttonState,
            updateTime: '2020-07-03 13:56:26'
        }],
    })
})

router.post('/queryExit.la', (req, res) => {
    res.json([{
        "exitName": "to_jiaxing_ceshi5",
        "linkType": 2,
        "ip": "192.192.193.195"
    }, {
        "exitName": "to_lishui_ceshi",
        "linkType": 1,
        "ip": "112.1.1.103"
    }, {
        "exitName": "to_hangzhou_ceshi",
        "linkType": 2,
        "ip": "112.11.11.222"
    }, {
        "exitName": "to_hangzhou_wangye",
        "linkType": 2,
        "ip": "1.2.3.41"
    }, {
        "exitName": "to_huzhou_youxi",
        "linkType": 2,
        "ip": "2.2.2.21"
    }, {
        "exitName": "to_hangzhou_tousu",
        "linkType": 2,
        "ip": "2.2.2.22"
    }, {
        "exitName": "to_sheng_third",
        "linkType": 3,
        "ip": "112.10.82.189"
    }, {
        "exitName": "to_hangzhou_youxi",
        "linkType": 2,
        "ip": "12.2.21.21"
    }, {
        "exitName": "to_hangzhou_jialiang1",
        "linkType": 2,
        "ip": "1.1.1.11"
    }, {
        "exitName": "to_hangzhou_jialiang2",
        "linkType": 2,
        "ip": "1.1.1.21"
    }, {
        "exitName": "to_hangzhou_jialiang3",
        "linkType": 2,
        "ip": "1.1.1.31"
    }, {
        "exitName": "to_hangzhou_jialiang5",
        "linkType": 2,
        "ip": "1.1.1.51"
    }, {
        "exitName": "to_hangzhou_jialiang6",
        "linkType": 2,
        "ip": "1.1.1.61"
    }, {
        "exitName": "to_hangzhou_guoji",
        "linkType": 2,
        "ip": "111.1.1.11"
    }, {
        "exitName": "to_huzhou_ceshi2",
        "linkType": 2,
        "ip": "223.93.170.119"
    }, {
        "exitName": "to_quzhou_ceshi",
        "linkType": 2,
        "ip": "172.0.0.1"
    }, {
        "exitName": "to_sheng_ceshi",
        "linkType": 3,
        "ip": "112.1.1.101"
    }, {
        "exitName": "to_lishui_province",
        "linkType": 1,
        "ip": "112.108.109.11"
    }, {
        "exitName": "to_jiaxing_ceshi9",
        "linkType": 2,
        "ip": "112.11.1.11"
    }, {
        "exitName": "to_lishui_yun",
        "linkType": 2,
        "ip": "111.1.1.1"
    }, {
        "exitName": "test",
        "linkType": 3,
        "ip": "11.23.23.4"
    }, {
        "exitName": "test2",
        "linkType": 3,
        "ip": "11.23.23.4"
    }, {
        "exitName": "test22",
        "linkType": 3,
        "ip": "11.23.23.4"
    }, {
        "exitName": "test22222",
        "linkType": 3,
        "ip": "11.23.23.4"
    }, {
        "exitName": "test202007021711",
        "linkType": 3,
        "ip": "11.23.23.4"
    }])
})

router.post('/removeAreaConfig.la', (req, res) => {
    res.json({
        "message": "当前地市已有区域同步申请正在审核中，禁止编辑",
        "statusCode": 0,
        "success": false,
        "data": null
    })
})


module.exports = router;