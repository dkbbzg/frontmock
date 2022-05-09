//引入插件log4js  
var log4js = require('log4js')
//输出json格式的内容
log4js.addLayout('json', function (config) {
  return function (logEvent) {
    return JSON.stringify(logEvent) + config.separator
  }
});
log4js.configure({
  appenders: {
    out: {
      type: 'file',
      filename: "logs/log/error.log",
      layout: { type: 'json', separator: ',' }
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' }
  }
})
var logger = log4js.getLogger('json-test')
exports.logger = logger;
exports.use = function (app) {
  app.use(log4js.connectLogger(logger, { level: 'info', format: ':method:url' }))
}