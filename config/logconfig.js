const config = {
    "appenders": {
        // console:{ "type": "console", "category": "console" },
        error: {
            "type": "dateFile",                   //日志类型
            "filename": './logs/error/',             //日志输出位置
            "alwaysIncludePattern": true,          //是否总是有后缀名
            "pattern": "error-yyyy-MM-dd.log",      //后缀，每小时创建一个新的日志文件
        },
        request: {
            "type": "file",
            "filename": './logs/req/http.log',
            "maxLogSize": 10485760,
            "backups": 10,
        }
    },
    "categories": {
        error: { appenders: ['error'], level: 'error' },
        http: { appenders: ['request'], level: 'info' },
        default: { appenders: ['request'], level: 'info' }
    },
    pm2: true
}

module.exports = config;