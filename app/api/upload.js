const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const common = require('../libs/common');

let router = new Router()

// 上传图片
router.post('/fileds', async ctx => {
    if (ctx.request.fields['file']) {
        let suffix = ctx.request.fields['file'][0].name.split('.')[1];
        let path = ctx.request.fields['file'][0].path
        let newPath = `${path}.${suffix}` 
        fs.renameSync(path, newPath)
        let url = newPath.substr(newPath.indexOf('/upload'));
        let origin = `${ctx.config.host}:${ctx.config.port}${url}`
        ctx.body = common.handleResulte(200, origin, '上传成功')
    } else {
        ctx.body = common.handleResulte(201, '', '请添加图片')
    }
})

module.exports = router.routes()