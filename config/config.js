const env = process.env.NODE_ENV;
// console.log('==========================')
// console.log('环境===', env)
// console.log('==========================')

// 开发环境数据库配置
const devConfig = {
    dbName: 'yangblog',
    dbPass: 'shi19910213',
    dbHost: 'localhost',
    dbUser: 'root',
    dbPort: 3306,
}
// 线上环境数据库配置
const protConfig = {
    dbName: 'yangblog',
    dbPass: 'Test123456!',
    dbHost: '127.0.0.1',
    dbUser: 'test',
    dbPort: 3306,
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