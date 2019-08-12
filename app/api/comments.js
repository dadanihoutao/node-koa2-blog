const Router = require('koa-router');
const path = require('path');
const common = require('../libs/common');

let router = new Router()

// 评论列表
router.get('/list', async ctx => {
    let { page, pageSize, id } = ctx.request.query
    let data = []
    let total = ''
    if (id) {
        data = await ctx.db.query(`SELECT * FROM comments WHERE article_id = ${id} ORDER BY created_at DESC LIMIT ${(page-1)*pageSize}, ${pageSize}`)
        total = await ctx.db.query(`SELECT COUNT(id) as total FROM comments WHERE article_id = ${id}`);
    } else {
        data = await ctx.db.query(`SELECT * FROM comments ORDER BY created_at DESC LIMIT ${(page-1)*pageSize}, ${pageSize}`);
        total = await ctx.db.query(`SELECT COUNT(id) as total FROM comments`);
    }
    const pageObj = {
        total: total[0].total,
        curPage: +page,
        pageSize: +pageSize 
    }
    ctx.body = common.handleResulte(200, data, '获取评论列表成功', pageObj)
})

// 删除评论
router.delete('/del/:id', async ctx => {
    let { id } = ctx.params
    
    let data = await ctx.db.query('SELECT * FROM comments WHERE id=?', [id])
    if (!data.length) return ctx.body = common.handleResulte(201, '', '没有此评论')

    await ctx.db.query('DELETE FROM comments WHERE id=?', [id]);
    ctx.body = common.handleResulte(200, '', '删除成功')
})
// 添加
router.post('/add', async ctx => {
    let { nickname, email, content, article_id } = ctx.request.fields;

    if (nickname && email && content && article_id) {
        let vals = Object.values(ctx.request.fields)
        await ctx.db.query(`INSERT INTO comments (nickname, email, content, article_id, parent_id) VALUES(?,?,?,?,?)`, [...vals, 0])
        ctx.body = common.handleResulte(200, '', '添加成功')
    } else {
        ctx.body = common.handleResulte(201, '', '请填写完整数据')
    }
})


module.exports = router.routes()