const express = require('express');
const router = express.Router();

//  Token
router.get('/token.la', function (req, res) {
    res.json('tokenUuid123456')
})

//  接口1（监控视图）
router.post('/findMonitorView.la', function (req, res) {
    res.json({
        "secondList": [{ "id": 7, "functionItem": "DNS解析日志", "email": 1, "emergency": "2", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 9, "functionItem": "缓存业务日志", "email": 1, "emergency": "2", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 10, "functionItem": "CDN分发日志", "email": 1, "emergency": "2", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }], "thirdLine": [{ "id": 13, "functionItem": "主机/数据库", "email": 1, "emergency": "3", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 14, "functionItem": "数据清洗", "email": 1, "emergency": "3", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 15, "functionItem": "采集/存储过程", "email": 1, "emergency": "3", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 16, "functionItem": "DNS切换", "email": 1, "emergency": "3", "addresseeId": null, "remind": 1, "number": 1, "isAlarm": 0 }, { "id": 17, "functionItem": "调度策略", "email": 1, "emergency": "3", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 18, "functionItem": "可缓存分析", "email": 1, "emergency": "3", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }], "firstList": [{ "id": 1, "functionItem": "设备性能日志", "email": 1, "emergency": "2", "addresseeId": "113,114", "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 2, "functionItem": "CDN业务日志", "email": 1, "emergency": "1", "addresseeId": "113", "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 3, "functionItem": "CDN卡顿日志", "email": 1, "emergency": "1", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 4, "functionItem": "XDR话单", "email": 1, "emergency": "1", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 5, "functionItem": "GENIE日志", "email": 1, "emergency": "2", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }, { "id": 6, "functionItem": "IPNET日志", "email": 1, "emergency": "2", "addresseeId": null, "remind": 1, "number": 0, "isAlarm": 0 }]
    })
})

//  接口2.1 （CDN性能日志）
router.post('/findDevicePerformancelLog.la', function (req, res) {
    let hwOrZx = req.body.hwOrZx;
    let id = req.body.id;
    let findTime = req.body.findTime;
    let page = req.body.page;
    let length = req.body.length;

    let d1 = {
        totalCount: [{ totalCount: 123 }],
        list: [
            {
                "FILE_NAME": "名称11",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "11",
                "FILE_TIME": "2018-03-03 12:00"
            },
            {
                "FILE_NAME": "名称12",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "12",
                "FILE_TIME": "2018-03-03 12:00"
            },
            {
                "FILE_NAME": "名称13",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "13",
                "FILE_TIME": "2018-03-03 12:00"
            }
        ]
    }
    let d2 = {
        totalCount: [{ totalCount: 321 }],
        list: [
            {
                "FILE_NAME": "名称21",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "21",
                "FILE_TIME": "2018-03-03 12:00"
            },
            {
                "FILE_NAME": "名称22",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "22",
                "FILE_TIME": "2018-03-03 12:00"
            },
            {
                "FILE_NAME": "名称23",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "23",
                "FILE_TIME": "2018-03-03 12:00"
            }
        ]
    }

    if (hwOrZx == 'HW') {
        if (page % 2) {
            res.json(d1);
        }
        else {
            res.json(d2);
        }
    }
    else if (hwOrZx == 'ZTE') {
        if (page % 2) {
            res.json(d2);
        }
        else {
            res.json(d1);
        }
    }
})

//  接口2.2（CDN设备性能日志趋势图）
router.post('/findDevicePerformancelLogTrend.la', function (req, res) {
    let type = req.body.factory;
    if (type == 'HW') {
        res.json([
            {
                "COUNT": 2234,
                "FILE_TIME": "2018-08-08 1"
            },
            {
                "COUNT": 3453,
                "FILE_TIME": "2018-08-08 2"
            },
            {
                "COUNT": 2345,
                "FILE_TIME": "2018-08-08 3"
            },
            {
                "COUNT": 1231,
                "FILE_TIME": "2018-08-08 4"
            },
            {
                "COUNT": 0,
                "FILE_TIME": "2018-08-08 5"
            },
            {
                "COUNT": 1231,
                "FILE_TIME": "2018-08-08 6"
            },
            {
                "COUNT": 9482,
                "FILE_TIME": "2018-08-08 7"
            },
            {
                "COUNT": 6345,
                "FILE_TIME": "2018-08-08 8"
            }
        ])
    }
    else if (type == 'ZTE') {
        res.json([
            {
                "COUNT": 1234,
                "FILE_TIME": "2018-08-08 1"
            },
            {
                "COUNT": 3453,
                "FILE_TIME": "2018-08-08 2"
            },
            {
                "COUNT": 2341,
                "FILE_TIME": "2018-08-08 3"
            },
            {
                "COUNT": 6523,
                "FILE_TIME": "2018-08-08 4"
            },
            {
                "COUNT": 1234,
                "FILE_TIME": "2018-08-08 5"
            },
            {
                "COUNT": 4532,
                "FILE_TIME": "2018-08-08 6"
            },
            {
                "COUNT": 2342,
                "FILE_TIME": "2018-08-08 7"
            },
            {
                "COUNT": 1244,
                "FILE_TIME": "2018-08-08 8"
            }
        ])
    }
})

//  接口3.2（CDN业务日志趋势图）
router.post('/findBusinessLogTrend.la', function (req, res) {
    let type = req.body.factory;
    if (type == 'HW') {
        res.json([{"COUNT":0,"FILE_TIME":"2020-05-11 19"},{"COUNT":0,"FILE_TIME":"2020-05-11 20"},{"COUNT":0,"FILE_TIME":"2020-05-11 21"},{"COUNT":0,"FILE_TIME":"2020-05-11 22"},{"COUNT":0,"FILE_TIME":"2020-05-11 23"},{"COUNT":0,"FILE_TIME":"2020-05-12 00"},{"COUNT":0,"FILE_TIME":"2020-05-12 01"},{"COUNT":0,"FILE_TIME":"2020-05-12 02"},{"COUNT":0,"FILE_TIME":"2020-05-12 03"},{"COUNT":0,"FILE_TIME":"2020-05-12 04"},{"COUNT":0,"FILE_TIME":"2020-05-12 05"},{"COUNT":0,"FILE_TIME":"2020-05-12 06"},{"COUNT":0,"FILE_TIME":"2020-05-12 07"},{"COUNT":0,"FILE_TIME":"2020-05-12 08"},{"COUNT":0,"FILE_TIME":"2020-05-12 09"},{"COUNT":0,"FILE_TIME":"2020-05-12 10"},{"COUNT":0,"FILE_TIME":"2020-05-12 11"},{"COUNT":0,"FILE_TIME":"2020-05-12 12"},{"COUNT":0,"FILE_TIME":"2020-05-12 13"},{"COUNT":0,"FILE_TIME":"2020-05-12 14"},{"COUNT":0,"FILE_TIME":"2020-05-12 15"},{"COUNT":0,"FILE_TIME":"2020-05-12 16"},{"COUNT":0,"FILE_TIME":"2020-05-12 17"},{"COUNT":0,"FILE_TIME":"2020-05-12 18"}]);
    }
    else if (type == 'ZTE') {
        res.json([{"COUNT":0,"FILE_TIME":"2020-05-11 19"},{"COUNT":0,"FILE_TIME":"2020-05-11 20"},{"COUNT":0,"FILE_TIME":"2020-05-11 21"},{"COUNT":0,"FILE_TIME":"2020-05-11 22"},{"COUNT":0,"FILE_TIME":"2020-05-11 23"},{"COUNT":0,"FILE_TIME":"2020-05-12 00"},{"COUNT":0,"FILE_TIME":"2020-05-12 01"},{"COUNT":0,"FILE_TIME":"2020-05-12 02"},{"COUNT":0,"FILE_TIME":"2020-05-12 03"},{"COUNT":0,"FILE_TIME":"2020-05-12 04"},{"COUNT":0,"FILE_TIME":"2020-05-12 05"},{"COUNT":0,"FILE_TIME":"2020-05-12 06"},{"COUNT":0,"FILE_TIME":"2020-05-12 07"},{"COUNT":4,"FILE_TIME":"2020-05-12 08"},{"COUNT":24,"FILE_TIME":"2020-05-12 09"},{"COUNT":24,"FILE_TIME":"2020-05-12 10"},{"COUNT":24,"FILE_TIME":"2020-05-12 11"},{"COUNT":24,"FILE_TIME":"2020-05-12 12"},{"COUNT":23,"FILE_TIME":"2020-05-12 13"},{"COUNT":20,"FILE_TIME":"2020-05-12 14"},{"COUNT":4,"FILE_TIME":"2020-05-12 15"},{"COUNT":24,"FILE_TIME":"2020-05-12 16"},{"COUNT":28,"FILE_TIME":"2020-05-12 17"},{"COUNT":40,"FILE_TIME":"2020-05-12 18"}]);
    }
})

//  接口3.1（CDN业务日志）
router.post('/findBusinessLog.la', function (req, res) {
    let hwOrZx = req.body.hwOrZx;
    let id = req.body.id;
    let findTime = req.body.findTime;
    let page = req.body.page;
    let length = req.body.length;

    
    if (hwOrZx == 'ZTE') {
        res.json({"totalCount":[{"totalCount":459}],"list":[{"Id":522,"FILE_NAME":"ZTE_202005121855_PopListCNetwork.txt","LOG_ROW_NUMBER":22,"FILE_SIZE":904.0,"FILE_TIME":"2020-05-12 18:48:58","HWORZTE":"ZTE"},{"Id":486,"FILE_NAME":"ZTE_202005121855_CNetwork.txt","LOG_ROW_NUMBER":4,"FILE_SIZE":78.0,"FILE_TIME":"2020-05-12 18:48:58","HWORZTE":"ZTE"},{"Id":498,"FILE_NAME":"ZTE_202005121855_PopListCNetwork.txt","LOG_ROW_NUMBER":22,"FILE_SIZE":904.0,"FILE_TIME":"2020-05-12 18:48:58","HWORZTE":"ZTE"},{"Id":510,"FILE_NAME":"ZTE_202005121855_CNetwork.txt","LOG_ROW_NUMBER":4,"FILE_SIZE":78.0,"FILE_TIME":"2020-05-12 18:48:58","HWORZTE":"ZTE"},{"Id":497,"FILE_NAME":"ZTE_202005121850_PopListCNetwork.txt","LOG_ROW_NUMBER":22,"FILE_SIZE":904.0,"FILE_TIME":"2020-05-12 18:43:59","HWORZTE":"ZTE"},{"Id":485,"FILE_NAME":"ZTE_202005121850_CNetwork.txt","LOG_ROW_NUMBER":4,"FILE_SIZE":78.0,"FILE_TIME":"2020-05-12 18:43:59","HWORZTE":"ZTE"},{"Id":509,"FILE_NAME":"ZTE_202005121850_CNetwork.txt","LOG_ROW_NUMBER":4,"FILE_SIZE":78.0,"FILE_TIME":"2020-05-12 18:43:59","HWORZTE":"ZTE"},{"Id":521,"FILE_NAME":"ZTE_202005121850_PopListCNetwork.txt","LOG_ROW_NUMBER":22,"FILE_SIZE":904.0,"FILE_TIME":"2020-05-12 18:43:59","HWORZTE":"ZTE"},{"Id":484,"FILE_NAME":"ZTE_202005121845_CNetwork.txt","LOG_ROW_NUMBER":4,"FILE_SIZE":78.0,"FILE_TIME":"2020-05-12 18:38:58","HWORZTE":"ZTE"},{"Id":508,"FILE_NAME":"ZTE_202005121845_CNetwork.txt","LOG_ROW_NUMBER":4,"FILE_SIZE":78.0,"FILE_TIME":"2020-05-12 18:38:58","HWORZTE":"ZTE"}]})
    }
    else if (hwOrZx == 'HW') {
        res.json({"totalCount":[{"totalCount":2}],"list":[{"Id":63,"FILE_NAME":"HW20200430160002Domain.txt","LOG_ROW_NUMBER":0,"FILE_SIZE":0.0,"FILE_TIME":"2020-04-30 16:06:47","HWORZTE":"HW"},{"Id":1,"FILE_NAME":"业务测试1","LOG_ROW_NUMBER":1,"FILE_SIZE":1.0,"FILE_TIME":"2020-04-28 13:28:09","HWORZTE":"HW"}]})
    }
})

//  接口4.1（CDN卡顿日志）CDN卡顿日志 GENIE日志 IPNET日志 DNS解析日志 缓存业务日志  CDN分发日志 可缓存分析
router.post('/findCartonLog.la', function (req, res) {
    res.json({
        totalCount: [{ totalCount: 123 }],
        list: [
            {
                "FILE_NAME": "名称11",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "11",
                "FILE_TIME": "2018-03-03 12:00"
            },
            {
                "FILE_NAME": "名称12",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "12",
                "FILE_TIME": "2018-03-03 12:00"
            },
            {
                "FILE_NAME": "名称13",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "13",
                "FILE_TIME": "2018-03-03 12:00"
            }
        ]
    })
})

//  接口4.2（CDN卡顿日志趋势图）CDN卡顿日志趋势图 GENIE日志趋势图 IPNET日志趋势图
router.post('/findCartonLogTrend.la', function (req, res) {
    res.json([
        {
            "COUNT": 2234,
            "FILE_TIME": "2018-08-08 1"
        },
        {
            "COUNT": 3453,
            "FILE_TIME": "2018-08-08 2"
        },
        {
            "COUNT": 2345,
            "FILE_TIME": "2018-08-08 3"
        },
        {
            "COUNT": 1231,
            "FILE_TIME": "2018-08-08 4"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 5"
        },
        {
            "COUNT": 1231,
            "FILE_TIME": "2018-08-08 6"
        },
        {
            "COUNT": 9482,
            "FILE_TIME": "2018-08-08 7"
        },
        {
            "COUNT": 6345,
            "FILE_TIME": "2018-08-08 8"
        }
    ])
})

//  接口5.1（XDR原始话单）
router.post('/findOriginalBill.la', function (req, res) {
    let id = req.body.id;
    let findTime = req.body.findTime;
    let page = req.body.page;
    let length = req.body.length;

    let d1 = {
        totalCount: [{ totalCount: 111 }],
        list: [
            {
                "FACTORY": "名称11",
                "LOG_ROW_NUMBER": "123",
                "Id": "11",
                "BILL_TIME": "2018-03-03 12:00"
            },
            {
                "FACTORY": "名称12",
                "LOG_ROW_NUMBER": "123",
                "Id": "12",
                "BILL_TIME": "2018-03-03 12:00"
            },
            {
                "FACTORY": "名称13",
                "LOG_ROW_NUMBER": "123",
                "Id": "13",
                "BILL_TIME": "2018-03-03 12:00"
            }
        ]
    }
    let d2 = {
        totalCount: [{ totalCount: 222 }],
        list: [
            {
                "FACTORY": "名称21",
                "LOG_ROW_NUMBER": "123",
                "Id": "21",
                "BILL_TIME": "2018-03-03 12:00"
            },
            {
                "FACTORY": "名称22",
                "LOG_ROW_NUMBER": "123",
                "Id": "22",
                "BILL_TIME": "2018-03-03 12:00"
            },
            {
                "FACTORY": "名称23",
                "LOG_ROW_NUMBER": "123",
                "Id": "23",
                "BILL_TIME": "2018-03-03 12:00"
            }
        ]
    }

    if (page % 2) {
        res.json(d1);
    }
    else {
        res.json(d2);
    }
})

//  接口5.2（XDR原始话单趋势图）
router.post('/findOriginalBillTrend.la', function (req, res) {
    let type = req.body.factory;
    if (type == 'HW') {
        res.json([
            {
                "COUNT": 2234,
                "FILE_TIME": "2018-08-08 1"
            },
            {
                "COUNT": 3453,
                "FILE_TIME": "2018-08-08 2"
            },
            {
                "COUNT": 2345,
                "FILE_TIME": "2018-08-08 3"
            },
            {
                "COUNT": 1231,
                "FILE_TIME": "2018-08-08 4"
            },
            {
                "COUNT": 0,
                "FILE_TIME": "2018-08-08 5"
            },
            {
                "COUNT": 1231,
                "FILE_TIME": "2018-08-08 6"
            },
            {
                "COUNT": 9482,
                "FILE_TIME": "2018-08-08 7"
            },
            {
                "COUNT": 6345,
                "FILE_TIME": "2018-08-08 8"
            }
        ])
    }
    else if (type == 'LW') {
        res.json([
            {
                "COUNT": 1234,
                "FILE_TIME": "2018-08-08 1"
            },
            {
                "COUNT": 3453,
                "FILE_TIME": "2018-08-08 2"
            },
            {
                "COUNT": 2341,
                "FILE_TIME": "2018-08-08 3"
            },
            {
                "COUNT": 6523,
                "FILE_TIME": "2018-08-08 4"
            },
            {
                "COUNT": 1234,
                "FILE_TIME": "2018-08-08 5"
            },
            {
                "COUNT": 4532,
                "FILE_TIME": "2018-08-08 6"
            },
            {
                "COUNT": 2342,
                "FILE_TIME": "2018-08-08 7"
            },
            {
                "COUNT": 1244,
                "FILE_TIME": "2018-08-08 8"
            }
        ])
    }
    else if (type == 'HH') {
        res.json([
            {
                "COUNT": 1231,
                "FILE_TIME": "2018-08-08 1"
            },
            {
                "COUNT": 2343,
                "FILE_TIME": "2018-08-08 2"
            },
            {
                "COUNT": 5341,
                "FILE_TIME": "2018-08-08 3"
            },
            {
                "COUNT": 6123,
                "FILE_TIME": "2018-08-08 4"
            },
            {
                "COUNT": 1231,
                "FILE_TIME": "2018-08-08 5"
            },
            {
                "COUNT": 2341,
                "FILE_TIME": "2018-08-08 6"
            },
            {
                "COUNT": 1212,
                "FILE_TIME": "2018-08-08 7"
            },
            {
                "COUNT": 3213,
                "FILE_TIME": "2018-08-08 8"
            }
        ])
    }
})

//  接口8.2（DNS解析日志趋势图）DNS解析日志趋势图 缓存业务日志趋势图
router.post('/findAnalysisLogTrend.la', function (req, res) {
    res.json([
        {
            "COUNT": 2234,
            "FILE_TIME": "2018-08-08 1"
        },
        {
            "COUNT": 3453,
            "FILE_TIME": "2018-08-08 2"
        },
        {
            "COUNT": 2345,
            "FILE_TIME": "2018-08-08 3"
        },
        {
            "COUNT": 1231,
            "FILE_TIME": "2018-08-08 4"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 5"
        },
        {
            "COUNT": 1231,
            "FILE_TIME": "2018-08-08 6"
        },
        {
            "COUNT": 9482,
            "FILE_TIME": "2018-08-08 7"
        },
        {
            "COUNT": 6345,
            "FILE_TIME": "2018-08-08 8"
        }
    ])
})

//  接口11.2（CDN分发日志趋势图）
router.post('/findDistributeLogTrend.la', function (req, res) {
    res.json([
        {
            "COUNT": 2234,
            "FILE_TIME": "2018-08-08 1"
        },
        {
            "COUNT": 3453,
            "FILE_TIME": "2018-08-08 2"
        },
        {
            "COUNT": 2345,
            "FILE_TIME": "2018-08-08 3"
        },
        {
            "COUNT": 1231,
            "FILE_TIME": "2018-08-08 4"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 5"
        },
        {
            "COUNT": 1231,
            "FILE_TIME": "2018-08-08 6"
        },
        {
            "COUNT": 9482,
            "FILE_TIME": "2018-08-08 7"
        },
        {
            "COUNT": 6345,
            "FILE_TIME": "2018-08-08 8"
        }
    ])
})

//  接口14.1（主机/数据库监控）
router.post('/findHostDbMonitor.la', function (req, res) {
    let page = req.body.page;

    let d1 = {
        totalCount: [{ totalCount: 123 }],
        list: [
            {
                "id": "id11",
                "hostordb": "主机/数据11",
                "port": "端口11",
                "cpu": "cpu11",
                "memory": "内存11",
                "disk": "磁盘11",
                "port_state": "端口状态11",
                "synchronization_time": "2018-03-03 12:00"
            },
            {
                "id": "id12",
                "hostordb": "主机/数据12",
                "port": "端口12",
                "cpu": "cpu12",
                "memory": "内存11",
                "disk": "磁盘11",
                "port_state": "端口状态11",
                "synchronization_time": "2018-03-03 12:00"
            },
            {
                "id": "id13",
                "hostordb": "主机/数据13",
                "port": "端口11",
                "cpu": "cpu11",
                "memory": "内存11",
                "disk": "磁盘11",
                "port_state": "端口状态11",
                "synchronization_time": "2018-03-03 12:00"
            },
            {
                "id": "id14",
                "hostordb": "主机/数据14",
                "port": "端口11",
                "cpu": "cpu11",
                "memory": "内存11",
                "disk": "磁盘11",
                "port_state": "端口状态11",
                "synchronization_time": "2018-03-03 12:00"
            },
            {
                "id": "id15",
                "hostordb": "主机/数据15",
                "port": "端口11",
                "cpu": "cpu11",
                "memory": "内存11",
                "disk": "磁盘11",
                "port_state": "端口状态11",
                "synchronization_time": "2018-03-03 12:00"
            },
        ]
    }
    let d2 = {
        totalCount: [{ totalCount: 321 }],
        list: [
            {
                "id": "id121",
                "hostordb": "主机/数据121",
                "port": "端口11",
                "cpu": "cpu11",
                "memory": "内存11",
                "disk": "磁盘11",
                "port_state": "端口状态11",
                "synchronization_time": "2018-03-03 12:00"
            },
            {
                "id": "id212",
                "hostordb": "主机/数据122",
                "port": "端口12",
                "cpu": "cpu12",
                "memory": "内存11",
                "disk": "磁盘11",
                "port_state": "端口状态11",
                "synchronization_time": "2018-03-03 12:00"
            },
            {
                "id": "id213",
                "hostordb": "主机/数据13",
                "port": "端口11",
                "cpu": "cpu11",
                "memory": "内存11",
                "disk": "磁盘11",
                "port_state": "端口状态11",
                "synchronization_time": "2018-03-03 12:00"
            },
            {
                "id": "id214",
                "hostordb": "主机/数据14",
                "port": "端口11",
                "cpu": "cpu11",
                "memory": "内存11",
                "disk": "磁盘11",
                "port_state": "端口状态11",
                "synchronization_time": "2018-03-03 12:00"
            },
            {
                "id": "id125",
                "hostordb": "主机/数据125",
                "port": "端口11",
                "cpu": "cpu11",
                "memory": "内存11",
                "disk": "磁盘11",
                "port_state": "端口状态11",
                "synchronization_time": "2018-03-03 12:00"
            },
        ]
    }

    if (page % 2) {
        res.json(d1);
    }
    else {
        res.json(d2);
    }
})

//  接口14.2（主机/数据库监控趋势图）
router.post('/findHostDbMonitorTrend.la', function (req, res) {
    res.json([
        {
            "cpu": 1.81,
            "memory": 50,
            "disk": 43.44,
            "FILE_TIME": "2018-08-08 10:00"
        },
        {
            "cpu": 4.81,
            "memory": 90,
            "disk": 23.44,
            "FILE_TIME": "2018-08-08 11:00"
        },
        {
            "cpu": 2.81,
            "memory": 40,
            "disk": 53.44,
            "FILE_TIME": "2018-08-08 12:00"
        },
        {
            "cpu": 3.81,
            "memory": 60,
            "disk": 43.44,
            "FILE_TIME": "2018-08-08 13:00"
        }
    ])
})

//  接口15.1（XDR）
router.post('/findXdrDataClean.la', function (req, res) {
    res.json({
        totalCount: [{ totalCount: 123 }],
        list: [
            {
                "FILE_NAME": "名称11",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "11",
                "FILE_TIME": "2018-03-03 12:00"
            },
            {
                "FILE_NAME": "名称12",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "12",
                "FILE_TIME": "2018-03-03 12:00"
            },
            {
                "FILE_NAME": "名称13",
                "LOG_ROW_NUMBER": "123",
                "FILE_SIZE": "4",
                "Id": "13",
                "FILE_TIME": "2018-03-03 12:00"
            }
        ]
    })
})

//  接口15.2（XDR数据清洗趋势图）
router.post('/findXdrDataCleanTrend.la', function (req, res) {
    res.json([
        {
            "COUNT": 2234,
            "FILE_TIME": "2018-08-08 1"
        },
        {
            "COUNT": 3453,
            "FILE_TIME": "2018-08-08 2"
        },
        {
            "COUNT": 2345,
            "FILE_TIME": "2018-08-08 3"
        },
        {
            "COUNT": 1231,
            "FILE_TIME": "2018-08-08 4"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 5"
        },
        {
            "COUNT": 1231,
            "FILE_TIME": "2018-08-08 6"
        },
        {
            "COUNT": 9482,
            "FILE_TIME": "2018-08-08 7"
        },
        {
            "COUNT": 6345,
            "FILE_TIME": "2018-08-08 8"
        }
    ])
})

//  接口16.1（采集存储过程）
router.post('/findCollectionStorage.la', function (req, res) {
    let page = req.body.page;

    let d1 = {
        totalCount: [{ totalCount: 123 }],
        list: [
            {
                "id": "id11",
                "max_time": "主机/数据1111",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id121",
                "max_time": "主机/数据11",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id131",
                "max_time": "主机/数据11",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id114",
                "max_time": "主机/数据11",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id151",
                "max_time": "主机/数据11",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id161",
                "max_time": "主机/数据11",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id171",
                "max_time": "主机/数据11",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
        ]
    }
    let d2 = {
        totalCount: [{ totalCount: 321 }],
        list: [
            {
                "id": "id121",
                "max_time": "主机/数据2222",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id121",
                "max_time": "主机/数据131",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id131",
                "max_time": "主机/数据12411",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id114",
                "max_time": "主机/数据112311",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id151",
                "max_time": "主机/数据1121",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id161",
                "max_time": "主机/数据11",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
            {
                "id": "id171",
                "max_time": "主机/数据11",
                "channel": "端口11",
                "system_time": "cpu11",
                "differ_time": "内存11",
            },
        ]
    }

    if (page % 2) {
        res.json(d1);
    }
    else {
        res.json(d2);
    }
})

//  接口16.2（采集存储过程趋势图）
router.post('/findCollectionStorageTrend.la', function (req, res) {
    res.json([
        {
            "COUNT": 2234,
            "FILE_TIME": "2018-08-08 1"
        },
        {
            "COUNT": 3453,
            "FILE_TIME": "2018-08-08 2"
        },
        {
            "COUNT": 2345,
            "FILE_TIME": "2018-08-08 3"
        },
        {
            "COUNT": 1231,
            "FILE_TIME": "2018-08-08 4"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 5"
        },
        {
            "COUNT": 1231,
            "FILE_TIME": "2018-08-08 6"
        },
        {
            "COUNT": 9482,
            "FILE_TIME": "2018-08-08 7"
        },
        {
            "COUNT": 6345,
            "FILE_TIME": "2018-08-08 8"
        }
    ])
})

//  接口17.1（DNS切换）
router.post('/findDnsSwitch.la', function (req, res) {
    res.json({
        totalCount: [{ totalCount: 2123 }],
        list: [
            {
                "id": "id11",
                "RESULT": 1,
                "RESULT_TIME": "端口11",
            },
            {
                "id": "id11",
                "RESULT": 0,
                "RESULT_TIME": "端口11",
            },
            {
                "id": "id11",
                "RESULT": 2,
                "RESULT_TIME": "端口11",
            },
            {
                "id": "id11",
                "RESULT": 1,
                "RESULT_TIME": "端口11",
            },
            {
                "id": "id11",
                "RESULT": 0,
                "RESULT_TIME": "端口11",
            },
        ]
    })
})

//  接口17.2（DNS切换趋势图）
router.post('/findDnsSwitchTrend.la', function (req, res) {
    res.json([
        {
            "COUNT": 1,
            "FILE_TIME": "2018-08-08 1"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 2"
        },
        {
            "COUNT": 2,
            "FILE_TIME": "2018-08-08 3"
        },
        {
            "COUNT": 1,
            "FILE_TIME": "2018-08-08 4"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 5"
        },
        {
            "COUNT": 1,
            "FILE_TIME": "2018-08-08 6"
        },
        {
            "COUNT": 2,
            "FILE_TIME": "2018-08-08 7"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 8"
        }
    ])
})

//  接口18.1（策略调度下发）
router.post('/findDispatchPolicyIssue.la', function (req, res) {
    res.json({"totalCount":[{"totalCount":93}],"list":[{"Id":90,"link_state":0,"host_name":"120.193.9.202","port":1569,"synchronization_time":"2020-05-13 16:01:20"},{"Id":91,"link_state":1,"host_name":"120.193.9.203","port":1569,"synchronization_time":"2020-05-13 16:01:20"},{"Id":93,"link_state":1,"host_name":"120.193.9.203","port":1569,"synchronization_time":"2020-05-13 16:00:53"},{"Id":92,"link_state":1,"host_name":"120.193.9.202","port":1569,"synchronization_time":"2020-05-13 16:00:53"},{"Id":89,"link_state":1,"host_name":"120.193.9.203","port":1569,"synchronization_time":"2020-05-13 15:01:17"},{"Id":88,"link_state":1,"host_name":"120.193.9.202","port":1569,"synchronization_time":"2020-05-13 15:01:17"},{"Id":86,"link_state":1,"host_name":"120.193.9.202","port":1569,"synchronization_time":"2020-05-13 14:00:21"},{"Id":87,"link_state":1,"host_name":"120.193.9.203","port":1569,"synchronization_time":"2020-05-13 14:00:21"},{"Id":82,"link_state":1,"host_name":"120.193.9.202","port":1569,"synchronization_time":"2020-05-13 13:01:14"},{"Id":83,"link_state":1,"host_name":"120.193.9.203","port":1569,"synchronization_time":"2020-05-13 13:01:14"}]})
})

//  接口18.2（策略调度下发趋势图）
router.post('/findDispatchPolicyIssueTrend.la', function (req, res) {
    res.json([
        {
            "COUNT": 1,
            "FILE_TIME": "2018-08-08 1"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 2"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 3"
        },
        {
            "COUNT": 1,
            "FILE_TIME": "2018-08-08 4"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 5"
        },
        {
            "COUNT": 1,
            "FILE_TIME": "2018-08-08 6"
        },
        {
            "COUNT": 1,
            "FILE_TIME": "2018-08-08 7"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 8"
        }
    ])
})

//  接口19.2（可缓存分析趋势图）
router.post('/findCacheableAnalysisTrend.la', function (req, res) {
    res.json([
        {
            "COUNT": 1,
            "FILE_TIME": "2018-08-08 1"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 2"
        },
        {
            "COUNT": 2,
            "FILE_TIME": "2018-08-08 3"
        },
        {
            "COUNT": 1,
            "FILE_TIME": "2018-08-08 4"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 5"
        },
        {
            "COUNT": 1,
            "FILE_TIME": "2018-08-08 6"
        },
        {
            "COUNT": 2,
            "FILE_TIME": "2018-08-08 7"
        },
        {
            "COUNT": 0,
            "FILE_TIME": "2018-08-08 8"
        }
    ])
})

//  接口20（告警显示）是否显示关联模块表
router.post('/findAlarm.la', function (req, res) {
    res.json({"importanceCount":[{"importanceCount":667}],"emergentCount":[{"emergentCount":73}],"list":[{"id":1018,"alarm_category":"源数据告警","alarm_content":"绿网XDR原始话单数量异常!","alarm_time":"2020-05-13 05:01:03","process_time":"2020-05-13 05:15:25","process_people":"admin","process_state":"已处理","alarm_level":2},{"id":1028,"alarm_category":"源数据告警","alarm_content":"浩瀚XDR原始话单数量异常!","alarm_time":"2020-05-13 05:01:03","process_time":"2020-05-13 05:15:25","process_people":"admin","process_state":"已处理","alarm_level":2},{"id":1027,"alarm_category":"源数据告警","alarm_content":"绿网XDR原始话单数量异常!","alarm_time":"2020-05-13 05:01:03","process_time":"2020-05-13 05:15:25","process_people":"admin","process_state":"已处理","alarm_level":2},{"id":1026,"alarm_category":"源数据告警","alarm_content":"华为XDR原始话单数量异常!","alarm_time":"2020-05-13 05:01:03","process_time":"2020-05-13 05:15:25","process_people":"admin","process_state":"已处理","alarm_level":2},{"id":1025,"alarm_category":"源数据告警","alarm_content":"浩瀚XDR原始话单数量异常!","alarm_time":"2020-05-13 05:01:03","process_time":"2020-05-13 05:15:25","process_people":"admin","process_state":"已处理","alarm_level":2},{"id":1024,"alarm_category":"源数据告警","alarm_content":"绿网XDR原始话单数量异常!","alarm_time":"2020-05-13 05:01:03","process_time":null,"process_people":null,"process_state":"未处理","alarm_level":2},{"id":1013,"alarm_category":"源数据告警","alarm_content":"浩瀚XDR原始话单数量异常!","alarm_time":"2020-05-13 05:01:02","process_time":null,"process_people":null,"process_state":"未处理","alarm_level":2},{"id":1012,"alarm_category":"源数据告警","alarm_content":"绿网XDR原始话单数量异常!","alarm_time":"2020-05-13 05:01:02","process_time":null,"process_people":null,"process_state":"未处理","alarm_level":2},{"id":1011,"alarm_category":"源数据告警","alarm_content":"华为XDR原始话单数量异常!","alarm_time":"2020-05-13 05:01:02","process_time":null,"process_people":null,"process_state":"未处理","alarm_level":2},{"id":1010,"alarm_category":"源数据告警","alarm_content":"浩瀚XDR原始话单数量异常!","alarm_time":"2020-05-13 05:01:02","process_time":null,"process_people":null,"process_state":"未处理","alarm_level":2}],"totalCount":[{"totalCount":951}],"remindCount":[{"remindCount":211}]})
})

//  接口21（告警处理）
router.post('/updateAlarmHandle.la', function (req, res) {
    res.header('tokenUuid', '1231231312312321')
    let _id = req.body.id;
    if (_id % 2 == 0) {
        res.json({
            success: true,
            message: "处理成功"
        })
    }
    else {
        res.json({
            success: false,
            message: "处理失败"
        })
    }
})

//  接口22（监控视图管理）
router.post('/updateAlarmAdministration.la', function (req, res) {
    let _id = req.body.id;
    let _email = req.body.email;
    let _remind = req.body.remind;
    let _emergency = req.body.emergency;
    let _userId = req.body.userId;
    if (_id % 2 == 0) {
        res.json({
            success: true,
            message: "处理成功"
        })
    }
    else {
        res.json({
            success: false,
            message: "处理失败"
        })
    }
})

//  接口23（告警等级查询）
router.post('/findAlarmLevel.la', function (req, res) {
    res.json([{ "EMERGENCY_NAME": "紧急", "EMERGENCY": "1" }, { "EMERGENCY_NAME": "重要", "EMERGENCY": "2" }, { "EMERGENCY_NAME": "提醒", "EMERGENCY": "3" }, { "EMERGENCY_NAME": "隐藏", "EMERGENCY": "4" }])
})

//  接口24（提醒人员查询）
router.post('/findAlarmUser.la', function (req, res) {
    res.json([{ "USER_ID": 5, "USERNAME": "admin", "NICKNAME": "管理员" }, { "USER_ID": 56, "USERNAME": "chenguangyu", "NICKNAME": "用户姓名" }, { "USER_ID": 57, "USERNAME": "linlinwl", "NICKNAME": "用户姓名" }, { "USER_ID": 58, "USERNAME": "yushanshan", "NICKNAME": "用户姓名" }, { "USER_ID": 72, "USERNAME": "yuhaijiang", "NICKNAME": "用户姓名" }, { "USER_ID": 75, "USERNAME": "wangdaxue", "NICKNAME": "用户姓名" }, { "USER_ID": 76, "USERNAME": "hupeng5", "NICKNAME": "用户姓名" }, { "USER_ID": 77, "USERNAME": "wuzilin", "NICKNAME": "用户姓名" }, { "USER_ID": 80, "USERNAME": "lileilei", "NICKNAME": "用户姓名" }, { "USER_ID": 81, "USERNAME": "wanghaiyong", "NICKNAME": "用户姓名" }, { "USER_ID": 89, "USERNAME": "luoqi", "NICKNAME": "用户姓名" }, { "USER_ID": 94, "USERNAME": "panhy", "NICKNAME": "用户姓名" }, { "USER_ID": 95, "USERNAME": "pxtest", "NICKNAME": "用户姓名" }, { "USER_ID": 96, "USERNAME": "yl", "NICKNAME": "用户姓名" }, { "USER_ID": 98, "USERNAME": "dns", "NICKNAME": "用户姓名" }, { "USER_ID": 99, "USERNAME": "xuhao", "NICKNAME": "用户姓名" }, { "USER_ID": 100, "USERNAME": "yesido1", "NICKNAME": "用户姓名" }, { "USER_ID": 102, "USERNAME": "chenyuanhang", "NICKNAME": "用户姓名" }, { "USER_ID": 104, "USERNAME": "hangzhou", "NICKNAME": "用户姓名" }, { "USER_ID": 107, "USERNAME": "test_provience", "NICKNAME": "用户姓名" }, { "USER_ID": 108, "USERNAME": "test_ningbo", "NICKNAME": "用户姓名" }, { "USER_ID": 109, "USERNAME": "ceshi_sheng", "NICKNAME": "用户姓名" }, { "USER_ID": 110, "USERNAME": "ceshi_hangzhou", "NICKNAME": "用户姓名" }, { "USER_ID": 111, "USERNAME": "aqadmin", "NICKNAME": "用户姓名" }, { "USER_ID": 112, "USERNAME": "hukezhongxin", "NICKNAME": "用户姓名" }])
})

//  接口25（更新时间）
router.post('/findUpdateTime.la', function (req, res) {
    res.json([{ viewUpdateTime: "2020-05-09 18:00:31", sourceUpdateTime: "2020-05-09 17:17:00" }])
})

//  接口26（判断用户是否可以操作监控视图管理）
router.post('/findMonitorViewUserConfig.la', function (req, res) {
    res.json({
        success: true,
        message: '该用户可以进行操作'
    })
})

module.exports = router;
