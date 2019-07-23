const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config/config');
const db = require('./config/database');
const body = require('koa-better-body');
const cors = require('koa2-cors');

let server = new Koa()
server.listen(config.port)

// 中间件
server.use(body({
    uploadDir: '/upload'
}))
// 跨域
server.use(cors())
/* 数据库连接并且挂载到context 对象上  */ 
server.context.db = db;
server.context.config = config;

let router = new Router();

router.post('/register', async ctx => {
    console.log(ctx.request.fields)
    let { username, password, email } = ctx.request.fields;
    let vals = Object.values(ctx.request.fields);

    let data = await ctx.db.query(`SELECT * FROM admin`);
    let isTrue = data.findIndex(item => item.nickname === username)
    if (isTrue !== -1) {
        ctx.body = {
            code: 201,
            data: '',
            msg: '用户名以占用'
        }
    } else {
        console.log(vals)
        await ctx.db.query(`INSERT INTO admin (nickname, email, password) VALUES(?,?,?)`, vals)
        ctx.body = {
            code: 200,
            data: '',
            msg: '注册成功'
        }
    }
})

server.use(router.routes());
