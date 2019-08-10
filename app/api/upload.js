const Router = require('koa-router');
const path = require('path');
const fs = require('fs');

let router = new Router()

// 上传图片
router.post('/fileds', async ctx => {
    if (ctx.request.fields['file']) {
        let suffix = ctx.request.fields['file'][0].name.split('.')[1];
        let path = ctx.request.fields['file'][0].path
        let newPath = `${path}.${suffix}` 
        fs.rename(path, newPath, (err) => {
            if (err) throw err;
        })
        let url = newPath.substr(newPath.indexOf('/upload'));
        let origin = `${ctx.config.host}:${ctx.config.port}${url}`
        ctx.body = {
            code: 200,
            data: origin,
            msg: '上传成功'
        }
    } else {
        ctx.body = {
            code: 201,
            data: '',
            msg: '请添加图片'
        }
    }
})

module.exports = router.routes()