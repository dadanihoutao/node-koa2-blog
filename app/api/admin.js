const Router = require('koa-router');
const common = require('../libs/common');
let router = new Router();
// 添加token 用的
// https://www.jianshu.com/p/406301bead0c
const addtoken = require('../token/addtoken');

router.post('/register', async ctx => {
    let { username, password, email } = ctx.request.fields;
    // 密码加密
    ctx.request.fields.password = common.md5(ctx.config.ADMIN_PREFIX + password)
    
    let vals = Object.values(ctx.request.fields);
    let data = await ctx.db.query(`SELECT * FROM admin`);
    let isTrue = data.findIndex(item => item.email === email)
    if (isTrue !== -1) {
        ctx.body = {
            code: 201,
            data: '',
            msg: '此邮箱已被注册'
        }
    } else {
        await ctx.db.query(`INSERT INTO admin (nickname, email, password) VALUES(?,?,?)`, vals)
        ctx.body = {
            code: 200,
            data: '',
            msg: '注册成功'
        }
    }
})

router.post('/login', async ctx => {
    let { email, password } = ctx.request.fields;
    let data = await ctx.db.query(`SELECT * FROM admin`);
    let result = data.find(item => item.email === email)
    if ( result && result instanceof Object && Object.keys(result).length) {
        let pass = common.md5(ctx.config.ADMIN_PREFIX + password);
        if (pass === result.password) {
            let token = addtoken({email: email, username: result.nickname}) 
            ctx.body = {
                token: token,
                code: 200,
                data: result,
                msg: '登录成功'
            };
            // ctx.cookies.set('user', 'blue', {
            //     maxAge: 14*86400*1000,
            //     signed: true
            // });
        } else {
            ctx.body = {
                code: 201,
                data: '',
                msg: '密码不正确'
            };
        }
    } else {
        ctx.body = {
            code: 201,
            data: '',
            msg: '没有此用户'
        }; 
    }
})

// 测试token 的接口
router.get('/test', async ctx => {
    let token = ctx.request.header.authorization
    ctx.body = {
        code: 200,
        data: process.env.NODE_ENV,
        msg: ''
    }

})

module.exports = router.routes()