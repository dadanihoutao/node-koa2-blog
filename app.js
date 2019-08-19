const Koa = require('koa');
const Router = require('koa-router');
const config = require('./config/config');
const db = require('./config/database');
const body = require('koa-better-body');
const static = require('koa-static');
const cors = require('koa2-cors');
const proving = require('./app/token/proving');
const path = require('path');
const common = require('./app/libs/common');

let server = new Koa()
server.listen(config.port)

/**
 * 中间件 koa-better-body
 * 相关博客地址  
 * https://blog.csdn.net/shi851051279/article/details/99618239
 *  */ 
server.use(body({
    uploadDir: path.resolve(__dirname, './static/upload')
}))

/**
 * koa-static 静态文件托管，上传的图片可以通过路径访问
 * 相关博客地址
 * https://blog.csdn.net/shi851051279/article/details/99618426
 *  */
// 如下两种写法都可以
// server.use(static(path.resolve(__dirname, './static/')))
server.use(static(__dirname + '/static/'))

/**
 * koa2-cors解决跨域
 * 相关博客地址
 * https://blog.csdn.net/shi851051279/article/details/99617908
 *  */
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
    // 登录注册直接通过
    if (ctx.request.url.includes('login') || ctx.request.url.includes('register')) {
        await next()
    } else {
        // 其他接口检测有没有携带token
        let token = ctx.request.header.authorization
        if (token && token.split(' ')[1]) {
            let res = proving(token)
            if (res && res.exp <= (new Date() / 1000)){
                // token 过期
                ctx.body = common.handleResulte(101, '', '登录过期，请重新登录')
            } else {
                await next()
            }
        } else {
            // 没有token
            ctx.body = common.handleResulte(101, '', '请登录')
        }
    }
})

// 路由入口
// 登录注册接口
router.use('/api/admin', require('./app/api/admin'));
// 分类接口
router.use('/api/category', require('./app/api/category'));
// 文章接口
router.use('/api/article', require('./app/api/article'));
// 图片上传
router.use('/api/upload', require('./app/api/upload'));
// 评论
router.use('/api/comments', require('./app/api/comments'));

server.use(router.routes());
