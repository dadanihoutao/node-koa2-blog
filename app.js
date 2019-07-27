const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config/config');
const db = require('./config/database');
const body = require('koa-better-body');
const cors = require('koa2-cors');
const proving = require('./app/token/proving');

let server = new Koa()
server.listen(config.port)

// 中间件
// koa-better-body https://www.jianshu.com/p/694b413ac2a3
server.use(body({
    uploadDir: '/upload'
}))
// 解决跨域
server.use(cors({
    origin: function (ctx) {
        return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
/* 数据库连接并且挂载到context 对象上  */ 
server.context.db = db;
server.context.config = config;

let router = new Router();

// 统一处理token
router.use(async (ctx, next) => {
    console.log(ctx.request.url)
    // 登录注册直接通过
    if (ctx.request.url.includes('login') || ctx.request.url.includes('register')) {
        console.log(1111)
        await next()
    } else {
        // 其他接口检测有没有携带token
        let token = ctx.request.header.authorization
        console.log(token)
        if (token) {
            let res = proving(token)
            console.log(3333,res.exp, (new Date() / 1000));
            if (res && res.exp <= (new Date() / 1000)){
                ctx.body = {
                    code: 101,
                    data: '',
                    msg: 'token过期'
                }
            } else {
                await next()
            }
        } else {
            ctx.body = {
                code: 101,
                data: '',
                msg: '没有token'
            }
        }
    }
})


router.use('/api', require('./app/api/admin'));


server.use(router.routes());
