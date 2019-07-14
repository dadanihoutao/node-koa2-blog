const mysql = require('mysql');
const co = require('co-mysql');
const config = require('./config');

let conn = mysql.createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPass,
    database: config.dbName
})
module.exports = co(conn)