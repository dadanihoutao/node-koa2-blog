const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config/config');
const db = require('./config/database');

let server = new Koa()
server.listen(config.port)

/* 数据库连接并且挂载到context 对象上  */ 
server.context.db = db;
server.context.config = config;

let router = new Router();

router.get('/register', async ctx => {
    let data = await ctx.db.query(`SELECT * FROM admin`);
    ctx.body = data
})

server.use(router.routes());
