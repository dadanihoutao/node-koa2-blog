const Router = require('koa-router');
const path = require('path');

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
// 添加
router.post('/add', async ctx => {
    let { nickname, email, content, article_id } = ctx.request.fields;
    if (nickname && email && content && article_id) {
        let vals = Object.values(ctx.request.fields)
        await ctx.db.query(`INSERT INTO comments (nickname, email, content, article_id, parent_id) VALUES(?,?,?,?,?)`, [...vals, 0])
        ctx.body = {
            code: 200,
            data: '',
            msg: '添加成功'
        }
    } else {
        ctx.body = {
            code: 201,
            data: '',
            msg: '请填写完整数据'
        }
    }
})


module.exports = router.routes()