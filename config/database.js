const mysql = require('mysql');
const co = require('co-mysql');
const config = require('./config');
// 连接数据库文件
let conn = mysql.createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPass,
    database: config.dbName,
    timezone: config.timezone
})
module.exports = co(conn)