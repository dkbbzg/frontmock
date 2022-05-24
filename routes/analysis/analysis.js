const express = require('express');
const router = express.Router();
const fs = require("fs");
const { json } = require('express');

router.post('/queryAnalysisListNew.la', (req, res) => {
    res.json([{"id":1,"overallScore":80.10,"userTotal":1009.23,"logTotal":30.32,"scorePercent":4.400,"userPercent":-0.400,"logPercent":-0.500,"httpQuality":89.0900,"tcpQuality":93.4800,"downloadQuality":3.4244,"httpDelay":228.4155,"tcpDelay":15.1448,"badPercent":0.1300,"createTime":"2020-09-01"}])
})

router.post('/queryAnalysisList.la', (req, res) => {
    res.json([
        {
            "badPercent": 5.59,
            "createTime": "2020-05-01",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 2966585261.00,
            "wLog": 3066445816.00,
            "hLog": 3194093344.00,
            "zLog": 2844279523.00,
            "gLog": 2617730745.00,
            "aLog": 3020599684.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 80.24,
            "wScore": 79.99,
            "hScore": 80.07,
            "zScore": 80.03,
            "gScore": 79.82,
            "aScore": 80.16,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-02",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 2905522844.00,
            "wLog": 2919550613.00,
            "hLog": 3077491684.00,
            "zLog": 2994467366.00,
            "gLog": 2939544137.00,
            "aLog": 3032286461.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 80.40,
            "wScore": 80.00,
            "hScore": 79.86,
            "zScore": 79.70,
            "gScore": 79.92,
            "aScore": 80.10,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-03",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 2377867631.00,
            "wLog": 2649611677.00,
            "hLog": 2579577073.00,
            "zLog": 2572492117.00,
            "gLog": 2734970076.00,
            "aLog": 2710414606.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 79.97,
            "wScore": 79.55,
            "hScore": 79.69,
            "zScore": 79.52,
            "gScore": 79.44,
            "aScore": 79.76,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-04",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 3374625360.00,
            "wLog": 3341411137.00,
            "hLog": 3316045742.00,
            "zLog": 3033553996.00,
            "gLog": 3108047870.00,
            "aLog": 3339646826.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 78.27,
            "wScore": 78.73,
            "hScore": 78.42,
            "zScore": 78.82,
            "gScore": 78.90,
            "aScore": 78.06,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-05",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 3192807145.00,
            "wLog": 3337400058.00,
            "hLog": 3163284830.00,
            "zLog": 3135094188.00,
            "gLog": 2811378161.00,
            "aLog": 3169115134.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 78.40,
            "wScore": 78.35,
            "hScore": 78.65,
            "zScore": 78.64,
            "gScore": 78.66,
            "aScore": 78.53,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-06",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 2849992862.00,
            "wLog": 2747653111.00,
            "hLog": 2594549820.00,
            "zLog": 3223353503.00,
            "gLog": 3259174300.00,
            "aLog": 2569334621.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 79.04,
            "wScore": 79.49,
            "hScore": 79.53,
            "zScore": 78.64,
            "gScore": 78.29,
            "aScore": 79.52,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-07",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 3177088962.00,
            "wLog": 3292419599.00,
            "hLog": 3292419599.00,
            "zLog": 3292419599.00,
            "gLog": 3292419599.00,
            "aLog": 3129810521.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 78.77,
            "wScore": 78.38,
            "hScore": 78.38,
            "zScore": 78.38,
            "gScore": 78.38,
            "aScore": 78.96,
            "flow": null
        }
    ])    
})

router.post('/queryOriginalList.la', (req, res) => {
    res.json([
        {
            "badPercent": 5.59,
            "createTime": "2020-05-01",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 2966585261.00,
            "wLog": 3066445816.00,
            "hLog": 3194093344.00,
            "zLog": 2844279523.00,
            "gLog": 2617730745.00,
            "aLog": 3020599684.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 80.24,
            "wScore": 79.99,
            "hScore": 80.07,
            "zScore": 80.03,
            "gScore": 79.82,
            "aScore": 80.16,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-02",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 2905522844.00,
            "wLog": 2919550613.00,
            "hLog": 3077491684.00,
            "zLog": 2994467366.00,
            "gLog": 2939544137.00,
            "aLog": 3032286461.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 80.40,
            "wScore": 80.00,
            "hScore": 79.86,
            "zScore": 79.70,
            "gScore": 79.92,
            "aScore": 80.10,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-03",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 2377867631.00,
            "wLog": 2649611677.00,
            "hLog": 2579577073.00,
            "zLog": 2572492117.00,
            "gLog": 2734970076.00,
            "aLog": 2710414606.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 79.97,
            "wScore": 79.55,
            "hScore": 79.69,
            "zScore": 79.52,
            "gScore": 79.44,
            "aScore": 79.76,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-04",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 3374625360.00,
            "wLog": 3341411137.00,
            "hLog": 3316045742.00,
            "zLog": 3033553996.00,
            "gLog": 3108047870.00,
            "aLog": 3339646826.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 78.27,
            "wScore": 78.73,
            "hScore": 78.42,
            "zScore": 78.82,
            "gScore": 78.90,
            "aScore": 78.06,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-05",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 3192807145.00,
            "wLog": 3337400058.00,
            "hLog": 3163284830.00,
            "zLog": 3135094188.00,
            "gLog": 2811378161.00,
            "aLog": 3169115134.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 78.40,
            "wScore": 78.35,
            "hScore": 78.65,
            "zScore": 78.64,
            "gScore": 78.66,
            "aScore": 78.53,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-06",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 2849992862.00,
            "wLog": 2747653111.00,
            "hLog": 2594549820.00,
            "zLog": 3223353503.00,
            "gLog": 3259174300.00,
            "aLog": 2569334621.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 79.04,
            "wScore": 79.49,
            "hScore": 79.53,
            "zScore": 78.64,
            "gScore": 78.29,
            "aScore": 79.52,
            "flow": null
        },
        {
            "badPercent": 5.59,
            "createTime": "2020-05-07",
            "downloadQuality": 3.7907,
            "httpDelay": 247.3242,
            "httpQuality": 87.71,
            "id": 1,
            "logPercent": 2.5,
            "logTotal": 31.08,
            "overallScore": 78.9,
            "scorePercent": 0.1,
            "tcpDelay": 14.9414,
            "tcpQuality": 92.96,
            "userPercent": 0.4,
            "userTotal": 1027.62,
            "channel": null,
            "idcLog": 3177088962.00,
            "wLog": 3292419599.00,
            "hLog": 3292419599.00,
            "zLog": 3292419599.00,
            "gLog": 3292419599.00,
            "aLog": 3129810521.00,
            "idcFlow": 2966585261.00,
            "wFlow": 2966585261.00,
            "hFlow": 2966585261.00,
            "zFlow": 2966585261.00,
            "gFlow": 2966585261.00,
            "aFlow": 29665852601.00,
            "idcScore": 78.77,
            "wScore": 78.38,
            "hScore": 78.38,
            "zScore": 78.38,
            "gScore": 78.38,
            "aScore": 78.96,
            "flow": null
        }
    ])  
})

router.post('/queryTopList.la', (req, res) => {
    res.json([{"bandName":"jhyka88571709","score":15.00,"sort":0,"createTime":null},{"bandName":"hztla05816605","score":15.00,"sort":0,"createTime":null},{"bandName":"hzjda68121036","score":15.00,"sort":0,"createTime":null},{"bandName":"hzjga34119198","score":15.00,"sort":0,"createTime":null},{"bandName":"hzyha24192453","score":15.00,"sort":0,"createTime":null},{"bandName":"hzxha34102360","score":15.00,"sort":0,"createTime":null},{"bandName":"hzjga19159544","score":15.00,"sort":0,"createTime":null},{"bandName":"hzxha61363880","score":15.00,"sort":0,"createTime":null},{"bandName":"hzjga24473699","score":15.00,"sort":0,"createTime":null},{"bandName":"hzyhb68835331","score":15.00,"sort":0,"createTime":null},{"bandName":"a13777068889","score":15.00,"sort":0,"createTime":null},{"bandName":"zsdha30474827","score":15.00,"sort":0,"createTime":null},{"bandName":"hzxia68831682","score":15.00,"sort":0,"createTime":null},{"bandName":"wzyqa58076872","score":15.00,"sort":0,"createTime":null},{"bandName":"huwxb88353436","score":15.00,"sort":0,"createTime":null},{"bandName":"hzcaa57128927","score":15.00,"sort":0,"createTime":null},{"bandName":"huajb59900157","score":15.00,"sort":0,"createTime":null},{"bandName":"hudqb25722952","score":15.00,"sort":0,"createTime":null}])
})

module.exports = router;