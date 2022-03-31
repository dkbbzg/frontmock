// 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const https = require('https');
const fs = require('fs');
const superagent = require('superagent'); // http 方面的库，可以发起 get 或 post 请求
const cheerio = require('cheerio'); // 相当于jquery

// 连接本地数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/novel');
const db = mongoose.connection;
db.on('error', function (error) {
  console.log('Database novel connect error: ' + error)
})
db.once('open', function () {
  console.log('Database novel connect success!')
})

// 创建项目实例
var app = express();

// 爬虫
// 创建mongo model
const Schema = mongoose.Schema;
const NovelSchema = new Schema({
  "bookName": String,
  "bookId": String,
  "CharacterId": Number,
  "title": String,
  "href": String,
  "content": String,
});
const NovelModels = mongoose.model('novel', NovelSchema, 'novels')
// 爬虫的 URL 信息
const opt = {
  hostname: 'https://www.xbiquwx.la',
  bookId: '/0_722',
  CharacterId: '',
};
app.get('/', function (req, res, next) {
  superagent.get(opt.hostname + opt.bookId)
    .end(async function (err, sres) {
      if (err) {
        return next(errr);
      }
      const $ = cheerio.load(sres.text);
      let items = [];
      let html = '';
      $('#list a').each(async function (idx, element) {
        let $element = $(element);
        let item = {
          bookName: '贵妃起居注',
          bookId: '0_722',
          CharacterId: `${parseInt($element.attr('href').split('.')[0])}`,
          title: $element.attr('title'),
          href: opt.hostname + opt.bookId + '/' + $element.attr('href')
        }
        html += `<h1 style="text-align: center;">${item.title}</h1>`;
        html += `<div style="width: 100%;text-align: center;font-size: 14px;">${item.href}</h1>`;

        await superagent.get(item.href).end(async function (err, eres) {
          if (err) {
            return next(errr);
          }
          let content = '';
          content += `<h1 style="text-align: center;">${item.title}</h1>`;
          content += '<div class="content">';
          const _$ = cheerio.load(eres.text);
          content += _$('#content').html();
          content += '</div>';
          item.content = content;
          items.push(item);
          let _data = new NovelModels(item);
          await _data.save(function (err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log(item.title);
            }
          })
        })
      });
      res.send('spidering');
    });
});
app.get('/fetch', function (req, res, next) {
  NovelModels.find({}).sort({CharacterId: 1}).then((data) => {
    res.json({
      data: data
    })
  })
})

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With, tokenUuid, usertoken, token');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Expose-Headers', 'tokenUuid')
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 加载路由控制
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');
const companyRouter = require('./routes/company');
const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const frontRouter = require('./routes/front');
const monitorviewRouter = require('./routes/monitor/monitorview');  // 监控试图概览接口
const domainNameBlacklistRouter = require('./routes/domainNameBlacklist/domainNameBlacklist');  // 域名黑名单接口
const schedpolicyRouter = require('./routes/Schedpolicy/Schedpolicy');  // 区域配置
const interfaceControllerRouter = require('./routes/InterfaceController/InterfaceController');  // 菜单配置
const InterfaceRoleControllerRouter = require('./routes/InterfaceRoleController/InterfaceRoleController');  // 角色管理
const analysisRouter = require('./routes/analysis/analysis');  // 用户质量分析
const top20DomainRouter = require('./routes/Top20Domain/Top20Domain');  // TOP 20 域名

// 湖南一键应急
const HuNan_ChongBaoGongZuoTai = require('./routes/HuNan/ChongBaoGongZuoTai');  // 湖南一键应急 重保工作台
// 重庆一键应急
const CQ_YuMingFengDu = require('./routes/CQ/YuMingFengDu');  // 重庆一键应急 域名封堵
// CRM
const CRM_User = require('./routes/CRM/User');
const CRM_Category = require('./routes/CRM/Category');

// 匹配路径和路由
app.use('/', indexRouter);
app.use('/monitorview', monitorviewRouter);  // 监控试图概览接口
app.use('/blackList', domainNameBlacklistRouter);  // 域名黑名单接口
app.use('/strategy', schedpolicyRouter);  // 区域配置
app.use('/interfaceController', interfaceControllerRouter);  // 菜单配置
app.use('/interfaceRoleController', InterfaceRoleControllerRouter);  // 角色管理
app.use('/analysis', analysisRouter);  // 角色管理
app.use('/top20', top20DomainRouter);  // TOP 20 域名
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/company', companyRouter);
app.use('/home', homeRouter);
app.use('/product', productRouter);
app.use('/front', frontRouter);
// CRM
app.use('/crm/user', CRM_User);
app.use('/crm/category', CRM_Category);

// 湖南一键应急 路由
app.use('/chongBaoGongZuoTai', HuNan_ChongBaoGongZuoTai);  // 湖南一键应急 重保工作台
// 重庆一键应急 路由
app.use('/YuMingFengDu', CQ_YuMingFengDu);  // 重庆一键应急 域名封堵

// 404错误处理
app.use(function (req, res, next) {
  next(createError(404));
});

// 500错误处理
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 输出模型app
module.exports = app;
