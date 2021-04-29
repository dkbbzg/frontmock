// 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const SecretKey = 'CrMsEcReT';

// 连接本地数据库
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://127.0.0.1:27017/ERP');
const db = mongoose.connection;
db.on('error', function (error) {
  console.log('Database frontmock connect error: ' + error)
})
db.once('open', function () {
  console.log('Database ERP connect success!')
})

// 创建项目实例
var app = express();

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With, tokenUuid, usertoken, token');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Expose-Headers', 'Authorization')
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
}));
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

const UserModels = require('./models/CRM/UserModels');
let isRevokedCallback = function (req, payload, done) {
  let _id = payload._id;

  UserModels.findOne({
    _id: _id
  }, 'token').then(data => {
    if (!data || !data.token || data.token != req.headers.authorization) {
      return done(null, true);
    } else {
      return done(null, false);
    }
  });
}

// Token管理
app.use(expressJwt({
  secret: SecretKey, // 签名的密钥 或 PublicKey
  algorithms: ['HS256'], // 加密算法
  credentialsRequired: true, //  允许无 Token 请求  false:不需要
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1]
    } else if (req.headers.authorization) {
      return req.headers.authorization
    }
    return null
  },
  isRevoked: isRevokedCallback
}).unless({
  path: ['/crm/user/login'] // 指定路径不经过 Token 解析
}))

// 加载路由控制
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');
const companyRouter = require('./routes/company');
const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const frontRouter = require('./routes/front');
const monitorviewRouter = require('./routes/monitor/monitorview'); // 监控试图概览接口
const domainNameBlacklistRouter = require('./routes/domainNameBlacklist/domainNameBlacklist'); // 域名黑名单接口
const schedpolicyRouter = require('./routes/Schedpolicy/Schedpolicy'); // 区域配置
const interfaceControllerRouter = require('./routes/InterfaceController/InterfaceController'); // 菜单配置
const InterfaceRoleControllerRouter = require('./routes/InterfaceRoleController/InterfaceRoleController'); // 角色管理
const analysisRouter = require('./routes/analysis/analysis'); // 用户质量分析
const top20DomainRouter = require('./routes/Top20Domain/Top20Domain'); // TOP 20 域名

// 湖南一键应急
const HuNan_ChongBaoGongZuoTai = require('./routes/HuNan/ChongBaoGongZuoTai'); // 湖南一键应急 重保工作台
// 重庆一键应急
const CQ_YuMingFengDu = require('./routes/CQ/YuMingFengDu'); // 重庆一键应急 域名封堵
// CRM
const CRM_User = require('./routes/CRM/User');
const CRM_Category = require('./routes/CRM/Category');
const CRM_People = require('./routes/CRM/People');
const CRM_Business = require('./routes/CRM/Business');

// 匹配路径和路由
app.use('/', indexRouter);
app.use('/monitorview', monitorviewRouter); // 监控试图概览接口
app.use('/blackList', domainNameBlacklistRouter); // 域名黑名单接口
app.use('/strategy', schedpolicyRouter); // 区域配置
app.use('/interfaceController', interfaceControllerRouter); // 菜单配置
app.use('/interfaceRoleController', InterfaceRoleControllerRouter); // 角色管理
app.use('/analysis', analysisRouter); // 角色管理
app.use('/top20', top20DomainRouter); // TOP 20 域名
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/company', companyRouter);
app.use('/home', homeRouter);
app.use('/product', productRouter);
app.use('/front', frontRouter);
// CRM
app.use('/crm/user', CRM_User);
app.use('/crm/category', CRM_Category);
app.use('/crm/people', CRM_People);
app.use('/crm/business', CRM_Business);

// 湖南一键应急 路由
app.use('/chongBaoGongZuoTai', HuNan_ChongBaoGongZuoTai); // 湖南一键应急 重保工作台
// 重庆一键应急 路由
app.use('/YuMingFengDu', CQ_YuMingFengDu); // 重庆一键应急 域名封堵

//  解析TOKEN失败
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.json({
      message: '用户登录失效，请重新登录！',
      code: 400
    })
  }
})

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