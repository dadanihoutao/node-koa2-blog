const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config/config');
const db = require('./config/database');
const body = require('koa-better-body');
const cors = require('koa2-cors');

let server = new Koa()
server.listen(config.port)

// 中间件
// koa-better-body https://www.jianshu.com/p/694b413ac2a3
server.use(body({
    uploadDir: '/upload'
}))
// 解决跨域
server.use(cors())
/* 数据库连接并且挂载到context 对象上  */ 
server.context.db = db;
server.context.config = config;

let router = new Router();


router.use('/api', require('./app/api/admin'));


server.use(router.routes());
