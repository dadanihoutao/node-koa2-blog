const env = process.env.NODE_ENV;
// console.log('==========================')
// console.log('环境===', env)
// console.log('==========================')

// 开发环境数据库配置
const devConfig = {
    dbName: 'yangblog',
    dbPass: '',
    dbHost: 'localhost',
    dbUser: 'root',
    dbPort: 3306,
    timezone: '08:00',  // 处理使用node查询数据库（mysql）时，日期格式不对的问题
    host: 'http://localhost'
}
// 线上环境数据库配置
const protConfig = {
    dbName: 'yangblog',
    dbPass: '',
    dbHost: '',
    dbUser: '',
    dbPort: 3306,
    timezone: '08:00',
    host: ''
}

let config = {}
if (env === 'development') {
    config = devConfig
} else if (env === 'production') {
    config = protConfig
}
module.exports = {
    ...config,
    port: 3001,  //端口号

    ADMIN_PREFIX: '_?:L$"OPUIOSIFJ(*UPT:LKRFG',  // 密码加密前缀
}