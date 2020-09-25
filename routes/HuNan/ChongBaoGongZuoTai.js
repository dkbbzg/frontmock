const express = require('express');
const router = express.Router();
const fs = require("fs");

// 安全事件生成id
router.post('/security!getSecurityEventId.action', (req, res) => {
    res.json({
        "data": "20200722-M0001",
		"ext": null,
		"message": null,
		"state": "SUCCESS"
    })
})
// 新增安全事件
router.post('/security!addSecurityEvent.action', (req, res) => {
    res.json({
        "Result": "新增成功"
    })
})
// 安全事件类型配置（下拉数据）
router.post('/security!getDropDownData.action', (req, res) => {
    res.json({
        "data": [
            {
                "eventType": "APT攻击"
            },
            {
               "eventType": "SQL注入"
            },
            {
              "eventType": "跨站脚本"
            },
            {
              "eventType": "网页篡改"
            },
            {
              "eventType": "DDOS攻击"
            },
            {
              "eventType": "漏洞攻击"
            },
            {
              "eventType": "网络扫描"
            },
            {
              "eventType": "僵木蠕事件"
            },  
            {
              "eventType": "信息泄露"
            },
            {
              "eventType": "邮件攻击"
            },
            {
              "eventType": "其他"
            },
        ],
        "ext": null,
        "message": null,
        "state": "SUCCESS"
    })
})
// 安全事件列表查询
router.post('/security!pageSecurityEvent.action', (req, res) => {
    res.json({
    	"data": [
			{
				id: 1,
				eventId: "20200722-M0001",
				eventType: "SQL注入",
				eventTitle: "1",
				eventInfo: "2",
				sourceIp: "3",
				targetIp: "4",
				domain: "5",
				submitPerson: "6",
				submitTime: "7",
				dealStatus: "0",
				fileName: "abc.rar",
				fileUrl: "baidu.com",
			},
			{
				id: 2,
				eventId: "20200722-M0001",
				eventType: "SQL注入",
				eventTitle: "1",
				eventInfo: "2",
				sourceIp: "3",
				targetIp: "4",
				domain: "5",
				submitPerson: "6",
				submitTime: "7",
				dealStatus: "0",
				fileName: "abc.rar",
				fileUrl: "baidu.com",
			},
			{
				id: 3,
				eventId: "20200722-M0001",
				eventType: "SQL注入",
				eventTitle: "1",
				eventInfo: "2",
				sourceIp: "3",
				targetIp: "4",
				domain: "5",
				submitPerson: "6",
				submitTime: "7",
				dealStatus: "0",
				fileName: "abc.rar",
				fileUrl: "baidu.com",
			},
			{
				id: 4,
				eventId: "20200722-M0001",
				eventType: "SQL注入",
				eventTitle: "1",
				eventInfo: "2",
				sourceIp: "3",
				targetIp: "4",
				domain: "5",
				submitPerson: "6",
				submitTime: "7",
				dealStatus: "1",
				fileName: "abc.rar",
				fileUrl: "baidu.com",
			},
			{
				id: 5,
				eventId: "20200722-M0001",
				eventType: "SQL注入",
				eventTitle: "1",
				eventInfo: "2",
				sourceIp: "3",
				targetIp: "4",
				domain: "5",
				submitPerson: "6",
				submitTime: "7",
				dealStatus: "2",
				fileName: "abc.rar",
				fileUrl: "baidu.com",
			}
		],
		"ext": null,
		"message": null,
		"state": "SUCCESS"
	})
})
// ip溯源
router.post('/dispatch!findIpInfo.action', (req, res) => {
    res.json({
    	"data": [
			{
				"eventId": "20200722-M0001",
				"ip": "102.42.64.14",
				"ipDetail": "埃及|埃及||",
				"ipType": 1
			},
			{
				"eventId": "20200722-M0001",
				"ip": "102.42.64.15",
				"ipDetail": "埃及|埃及||",
				"ipType": 1
			},
			{
				"eventId": "20200722-M0001",
				"ip": "102.42.64.16",
				"ipDetail": "埃及|埃及||",
				"ipType": 1
			},
			{
				"eventId": "20200722-M0001",
				"ip": "102.42.64.17",
				"ipDetail": "埃及|埃及||",
				"ipType": 1
			},
		],
		"ext": null,
		"message": null,
		"state": "SUCCESS"
	})
})
// 安全事件处置信息
router.post('/dispatch!findSEABlock.action', (req, res) => {
    res.json({
    	"data": [
			{
				"level": "高危",
				"description": "",
				"programme": ["源IP一键封堵", "目标IP一键封堵", "内部整改"]
			}
		],
		"ext": null,
		"message": null,
		"state": "SUCCESS"
	})
})
// 安全事件评估处置 保存按钮
router.post('/securityExpert!dealAssessment.action', (req, res) => {
    res.json({
        "data": null,
		"ext": null,
		"message": "保存成功",
		"state": "SUCCESS"
    })
})
// 安全事件评估处置 提交按钮
router.post('/securityExpert!submitAssessment.action', (req, res) => {
    res.json({
        "data": null,
		"ext": null,
		"message": "提交成功",
		"state": "SUCCESS"
    })
})
// 整改待评审分页
router.post('/order!findRectifyOrder.action', (req, res) => {
    res.json({
    	"data": [
			{
				"id": 2,
                "order_id": "20200722-M0001-ZG000123",
                "event_id": "20200722-M000123",
                "event_type": "DDOS攻击",
                "event_title": "test_title2",
                "source_ip": "192.16.14.65",
                "target_ip": "14.21.43.25",
                "domain": "www.sougou.com",
                "submit_factory": "ponshine",
                "deal_rank": "高",
                "submit_time": "2020-08-11T12:43:47",
                "deal_time": null,
                "finish_time": "2020-08-21T12:48:05",
                "order_status": 1,
                "order_time": "2020-08-11T12:47:54",
                "event_info": "这个个DDOS攻击详情",
                "deal_desc": "adasd",
                "deal_plan": "1,2,3",
                "operate_info": "岸边实际上就是",
                "operate_result": null,
                "result_info": null,
                "operate_attachment_path": "J:/谷歌下载/1.jpg",
                "submit_person": "hxj",
                "deal_person": "mld",
                "operate_person": null,
                "fileName": "1.jpg"
			},
			{
				"id": 2,
                "order_id": "20200722-M0001-ZG000123",
                "event_id": "20200722-M000123",
                "event_type": "DDOS攻击",
                "event_title": "test_title2",
                "source_ip": "192.16.14.65",
                "target_ip": "14.21.43.25",
                "domain": "www.sougou.com",
                "submit_factory": "ponshine",
                "deal_rank": "高",
                "submit_time": "2020-08-11T12:43:47",
                "deal_time": null,
                "finish_time": "2020-08-21T12:48:05",
                "order_status": 1,
                "order_time": "2020-08-11T12:47:54",
                "event_info": "这个个DDOS攻击详情",
                "deal_desc": "adasd",
                "deal_plan": "1,2,3",
                "operate_info": "岸边实际上就是",
                "operate_result": null,
                "result_info": null,
                "operate_attachment_path": "J:/谷歌下载/1.jpg",
                "submit_person": "hxj",
                "deal_person": "mld",
                "operate_person": null,
                "fileName": "1.jpg"
			},
			{
				"id": 2,
                "order_id": "20200722-M0001-ZG000123",
                "event_id": "20200722-M000123",
                "event_type": "DDOS攻击",
                "event_title": "test_title2",
                "source_ip": "192.16.14.65",
                "target_ip": "14.21.43.25",
                "domain": "www.sougou.com",
                "submit_factory": "ponshine",
                "deal_rank": "高",
                "submit_time": "2020-08-11T12:43:47",
                "deal_time": null,
                "finish_time": "2020-08-21T12:48:05",
                "order_status": 1,
                "order_time": "2020-08-11T12:47:54",
                "event_info": "这个个DDOS攻击详情",
                "deal_desc": "adasd",
                "deal_plan": "1,2,3",
                "operate_info": "岸边实际上就是",
                "operate_result": null,
                "result_info": null,
                "operate_attachment_path": "J:/谷歌下载/1.jpg",
                "submit_person": "hxj",
                "deal_person": "mld",
                "operate_person": null,
                "fileName": "1.jpg"
			},
			{
				"id": 2,
                "order_id": "20200722-M0001-ZG000123",
                "event_id": "20200722-M000123",
                "event_type": "DDOS攻击",
                "event_title": "test_title2",
                "source_ip": "192.16.14.65",
                "target_ip": "14.21.43.25",
                "domain": "www.sougou.com",
                "submit_factory": "ponshine",
                "deal_rank": "高",
                "submit_time": "2020-08-11T12:43:47",
                "deal_time": null,
                "finish_time": "2020-08-21T12:48:05",
                "order_status": 1,
                "order_time": "2020-08-11T12:47:54",
                "event_info": "这个个DDOS攻击详情",
                "deal_desc": "adasd",
                "deal_plan": "1,2,3",
                "operate_info": "岸边实际上就是",
                "operate_result": null,
                "result_info": null,
                "operate_attachment_path": "J:/谷歌下载/1.jpg",
                "submit_person": "hxj",
                "deal_person": "mld",
                "operate_person": null,
                "fileName": "1.jpg"
			},
			{
				"id": 2,
                "order_id": "20200722-M0001-ZG000123",
                "event_id": "20200722-M000123",
                "event_type": "DDOS攻击",
                "event_title": "test_title2",
                "source_ip": "192.16.14.65",
                "target_ip": "14.21.43.25",
                "domain": "www.sougou.com",
                "submit_factory": "ponshine",
                "deal_rank": "高",
                "submit_time": "2020-08-11T12:43:47",
                "deal_time": null,
                "finish_time": "2020-08-21T12:48:05",
                "order_status": 1,
                "order_time": "2020-08-11T12:47:54",
                "event_info": "这个个DDOS攻击详情",
                "deal_desc": "adasd",
                "deal_plan": "1,2,3",
                "operate_info": "岸边实际上就是",
                "operate_result": null,
                "result_info": null,
                "operate_attachment_path": "J:/谷歌下载/1.jpg",
                "submit_person": "hxj",
                "deal_person": "mld",
                "operate_person": null,
                "fileName": "1.jpg"
			},
			{
				"id": 2,
                "order_id": "20200722-M0001-ZG000123",
                "event_id": "20200722-M000123",
                "event_type": "DDOS攻击",
                "event_title": "test_title2",
                "source_ip": "192.16.14.65",
                "target_ip": "14.21.43.25",
                "domain": "www.sougou.com",
                "submit_factory": "ponshine",
                "deal_rank": "高",
                "submit_time": "2020-08-11T12:43:47",
                "deal_time": null,
                "finish_time": "2020-08-21T12:48:05",
                "order_status": 1,
                "order_time": "2020-08-11T12:47:54",
                "event_info": "这个个DDOS攻击详情",
                "deal_desc": "adasd",
                "deal_plan": "1,2,3",
                "operate_info": "岸边实际上就是",
                "operate_result": null,
                "result_info": null,
                "operate_attachment_path": "J:/谷歌下载/1.jpg",
                "submit_person": "hxj",
                "deal_person": "mld",
                "operate_person": null,
                "fileName": "1.jpg"
			},
			{
				"id": 2,
                "order_id": "20200722-M0001-ZG000123",
                "event_id": "20200722-M000123",
                "event_type": "DDOS攻击",
                "event_title": "test_title2",
                "source_ip": "192.16.14.65",
                "target_ip": "14.21.43.25",
                "domain": "www.sougou.com",
                "submit_factory": "ponshine",
                "deal_rank": "高",
                "submit_time": "2020-08-11T12:43:47",
                "deal_time": null,
                "finish_time": "2020-08-21T12:48:05",
                "order_status": 1,
                "order_time": "2020-08-11T12:47:54",
                "event_info": "这个个DDOS攻击详情",
                "deal_desc": "adasd",
                "deal_plan": "1,2,3",
                "operate_info": "岸边实际上就是",
                "operate_result": null,
                "result_info": null,
                "operate_attachment_path": "J:/谷歌下载/1.jpg",
                "submit_person": "hxj",
                "deal_person": "mld",
                "operate_person": null,
                "fileName": "1.jpg"
			},
		],
		"ext": null,
		"message": null,
		"state": "SUCCESS"
	})
})
// 评审整改
router.post('/securityExpert!reviewAssessment.action', (req, res) => {
    res.json({
        "data": null,
		"ext": null,
		"message": "评审整改成功",
		"state": "SUCCESS"
    })
})

module.exports = router;