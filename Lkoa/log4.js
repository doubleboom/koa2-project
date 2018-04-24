const log4js = require('koa-log4');
const logconfig = require("../config/logconfig");
log4js.configure(logconfig);

exports.koaHttpLogger = function () {
    return log4js.koaLogger(log4js.getLogger('http'), { level: 'auto', format: ':method :url', nolog: '\\.gif|\\.jpg|\\.xls|\\.xlsx|\\.png$' });
}

exports.koaErrorLogger = function () {
    return log4js.getLogger('error')
}
