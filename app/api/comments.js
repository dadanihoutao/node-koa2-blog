const Router = require('koa-router');
const path = require('path');

let router = new Router()

// 评论列表
router.get('/list', async ctx => {
    let { page, pageSize } = ctx.request.query
    let data = await ctx.db.query(`SELECT * FROM comments ORDER BY created_at DESC LIMIT ${(page-1)*pageSize}, ${pageSize}`);
    let total = await ctx.db.query(`SELECT COUNT(id) as total FROM comments`);
    ctx.body = {
        code: 200,
        data: data,
        page: {
            total: total[0].total,
            curPage: +page,
            pageSize: +pageSize
        },
        msg: '获取评论列表成功'
    }
})
// 删除评论
router.get('/del/:id', async ctx => {
    let { id } = ctx.request.query
    if (id) {
        let data = await ctx.db.query('SELECT * FROM comments WHERE id=?', [id])
        if (data.length) {
            await ctx.db.query('DELETE FROM comments WHERE id=?', [id]);
            ctx.body = {
                code: 200,
                data: '',
                msg: '删除成功',
            }
        } else {
            ctx.body = {
                code: 201,
                data: '',
                msg: '没有此评论'
            }
        }
    } else {
        ctx.body = {
            code: 201,
            data: '',
            msg: '请传入要删除评论的id'
        }
    }
})

module.exports = router.routes()