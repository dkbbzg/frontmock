const express = require('express');
const router = express.Router();
const multer = require("multer");

router.use(express.static("public"));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + file.originalname)
    }
});
const upload = multer({
    storage: storage
});

router.post('/', upload.single('file'), function (req, res, next) {
    console.log(req.body.files, 1)
    let url = 'http://' + req.headers.host + '/upload/' + req.body.files.originalname;
    res.end(__dirname + req.body.files.path);
})

// 单域多文件上传：input[file]的 multiple=="multiple"
router.post('/', upload.array('file', 5), function (req, res, next) {
    // req.files 是 前端表单name=="imageFile" 的多个文件信息（数组）,限制数量5，应该打印看一下
    var fileName = ""
    for (var i = 0; i < req.files.length; i++) {
        // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
        // 对临时文件转存，fs.rename(oldPath, newPath,callback);
        fileName += req.files[i].originalname + ";"
        fs.rename(req.files[i].path, "upload/" + req.files[i].originalname, function (err) {
            if (err) {
                throw err;
            }
            console.log('done!');
        })
    }


    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"//允许跨域。。。
    });
    // req.body 将具有文本域数据, 如果存在的话
    //  res.end(JSON.stringify(req.files)+JSON.stringify(req.body));
    console.log("fileName:" + fileName)
    res.end(fileName)
})

// 上传logo
router.post('/logo', upload.single('file'), function (req, res, next) {
    let url = 'http://' + req.headers.host + '/upload/' + req.file.originalname;
    res.end(__dirname + req.file.path);
})

module.exports = router;
