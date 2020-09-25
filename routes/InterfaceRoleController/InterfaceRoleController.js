const express = require('express');
const router = express.Router();
const fs = require("fs");

router.post('/findUserRole.la', (req, res) => {
    // res.status(403).json('aaa');
    res.json({
        "message": "查询成功",
        "statusCode": 0,
        "success": true,
        "data": {
            "totalCount": 11,
            "list": [{
                "roleId": 1,
                "roleName": "超级管理员",
                "state": 1,
                "remark": "<script>alert(1);</script>",
                "updateUser": null,
                "updateTime": 1594569600000,
                "createTime": 1437667200000,
                "updateUserId": 1,
                "userName": null,
                "describe": null
            }, {
                "roleId": 3,
                "roleName": "用户",
                "state": 1,
                "remark": "具有较小权限范围用户",
                "updateUser": null,
                "updateTime": 1594137600000,
                "createTime": 1479312000000,
                "updateUserId": 1,
                "userName": null,
                "describe": null
            }, {
                "roleId": 4,
                "roleName": "普通用户",
                "state": 0,
                "remark": "策略调度管理员",
                "updateUser": null,
                "updateTime": 1594137600000,
                "createTime": null,
                "updateUserId": 1,
                "userName": null,
                "describe": null
            }, {
                "roleId": 6,
                "roleName": "DNS管理员",
                "state": 1,
                "remark": "DNS管理员",
                "updateUser": null,
                "updateTime": 1592150400000,
                "createTime": 1588176000000,
                "updateUserId": 1,
                "userName": null,
                "describe": null
            }, {
                "roleId": 13,
                "roleName": "角色测试1",
                "state": 1,
                "remark": "测试",
                "updateUser": null,
                "updateTime": 1592409600000,
                "createTime": 1592409600000,
                "updateUserId": 5,
                "userName": null,
                "describe": null
            }]
        }
    })
})

router.post('/addRole.la', (req, res) => {
    res.header('tokenUuid', 'addRole');
    res.json({
        success: true,
        message: '新增成功'
    })
})

router.post('/updateRole.la', (req, res) => {
    res.header('tokenUuid', 'updateRole');
    res.json({
        success: true,
        message: '编辑成功'
    })
})

router.post('/findInterfaceConfigRole.la', (req, res) => {
    res.json({
        "message": "查询成功",
        "statusCode": 0,
        "success": true,
        "data": {
            "totalCount": 11,
            "list": [{
                    "nodeId": 1118,
                    "priority": 2,
                    "nodeName": "质量管理",
                    "effectiveState": 1,
                    "state": 1,
                    "level": 1,
                    "iconType": "icon-home",
                    "list": [{
                            "nodeId": 1119,
                            "priority": 2,
                            "nodeName": "质量视图",
                            "effectiveState": 1,
                            "level": 2,
                            "imageClassName": "../quality/index.html",
                            "state": 1,
                            "list": [{
                                    "id": 839,
                                    "urlLa": "getContentScore.la",
                                    "effectiveState": 1,
                                    "level": 3,
                                    "nodeName": "内容源质量评分",
                                    "state": 1
                                },
                                {
                                    "id": 840,
                                    "urlLa": "getDomainICPScore.la",
                                    "effectiveState": 0,
                                    "level": 3,
                                    "nodeName": "热点ICP质量分析",
                                    "state": 1
                                }
                            ]
                        },
                        {
                            "nodeId": 1120,
                            "priority": 1,
                            "nodeName": "用户质量分析",
                            "effectiveState": 1,
                            "level": 2,
                            "imageClassName": "../userAnalysis/index.html",
                            "state": 1,
                            "list": [{
                                "id": 841,
                                "level": 3,
                                "urlLa": "analysis/queryAnalysisList.la",
                                "effectiveState": 1,
                                "nodeName": "热点ICP质量分析",
                                "state": 0
                            }]
                        }
                    ]
                },
                {
                    "nodeId": 1124,
                    "priority": 1,
                    "nodeName": "流量管理9",
                    "effectiveState": 1,
                    "level": 1,
                    "state": 0,
                    "iconType": "icon-home",
                    "list": []
                },
                {
                    "nodeId": 1125,
                    "priority": 1,
                    "nodeName": "流量管理8",
                    "effectiveState": 1,
                    "level": 1,
                    "state": 0,
                    "iconType": "icon-home",
                    "list": []
                },
                {
                    "nodeId": 1126,
                    "priority": 1,
                    "level": 1,
                    "nodeName": "流量管理7",
                    "effectiveState": 1,
                    "state": 0,
                    "iconType": "icon-home",
                    "list": []
                },
                {
                    "nodeId": 1127,
                    "priority": 1,
                    "level": 1,
                    "nodeName": "流量管理6",
                    "effectiveState": 1,
                    "state": 0,
                    "iconType": "icon-home",
                    "list": []
                },
                {
                    "nodeId": 1128,
                    "priority": 1,
                    "level": 1,
                    "nodeName": "流量管理5",
                    "effectiveState": 1,
                    "state": 0,
                    "iconType": "icon-home",
                    "list": []
                },
                {
                    "nodeId": 1129,
                    "priority": 1,
                    "level": 1,
                    "nodeName": "流量管理4",
                    "effectiveState": 1,
                    "state": 0,
                    "iconType": "icon-home",
                    "list": []
                },
                {
                    "nodeId": 1130,
                    "priority": 1,
                    "level": 1,
                    "nodeName": "流量管理3",
                    "effectiveState": 1,
                    "state": 0,
                    "iconType": "icon-home",
                    "list": []
                },
                {
                    "nodeId": 1131,
                    "priority": 1,
                    "level": 1,
                    "nodeName": "流量管理2",
                    "effectiveState": 1,
                    "state": 0,
                    "iconType": "icon-home",
                    "list": []
                },
                {
                    "nodeId": 1132,
                    "priority": 1,
                    "level": 1,
                    "nodeName": "流量管理1",
                    "effectiveState": 1,
                    "state": 0,
                    "iconType": "icon-home",
                    "list": []
                },
                {
                    "nodeId": 1133,
                    "priority": 1,
                    "level": 1,
                    "nodeName": "流量管理12",
                    "effectiveState": 1,
                    "state": 0,
                    "iconType": "icon-home",
                    "list": []
                },
            ]
        }
    })
})

router.post('/updateInterfaceConfigRole.la', (req, res) => {
    res.header('tokenUuid', 'updateInterfaceConfigRole');
    res.json({
        success: true,
        message: '分配成功'
    })
})


module.exports = router;