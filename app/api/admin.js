const Router = require('koa-router');
const common = require('../libs/common');
let router = new Router();


router.post('/register', async ctx => {
    let { username, password, email } = ctx.request.fields;
    // 密码加密
    ctx.request.fields.password = common.md5(ctx.config.ADMIN_PREFIX + password)
    
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
            console.log(1111,ctx.session);
            ctx.body = {
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

module.exports = router.routes()