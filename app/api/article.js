const Router = require('koa-router');

let router = new Router()

// 文章列表
router.get('/list', async ctx => {
    let { page, pageSize } = ctx.request.query
    // let data = await ctx.db.query(`SELECT * FROM article ORDER BY created_at ASC LIMIT ${(page-1)*pageSize}, ${pageSize}`);
    let data = await ctx.db.query(`SELECT * FROM article ORDER BY created_at DESC LIMIT ${(page-1)*pageSize}, ${pageSize}`);
    let total = await ctx.db.query(`SELECT COUNT(id) as total FROM article`)
    ctx.body = {
        code: 200,
        data: data,
        page: {
            total: total[0].total,
            curPage: +page,
            pageSize: +pageSize
        },
        msg: '获取分类列表'
    }
})

// 添加文章
router.post('/add', async ctx => {
    let { title, author, content, category_id, cover } = ctx.request.fields;
    if (title && author && content && category_id && cover) {
        let data = await ctx.db.query(`SELECT * FROM article WHERE title=?`, [title])
        if (data.length) {
            ctx.body = {
                code: 201,
                data: '',
                msg: '文章标题重复'
            }
        } else {
            let vals = Object.values(ctx.request.fields);
            await ctx.db.query('INSERT INTO article (title, author, content, category_id, cover, browse) VALUES(?,?,?,?,?,?)', [...vals, 0])
            ctx.body = {
                code: 200,
                data: '',
                msg: '添加成功'
            }
        }
    } else {
        ctx.body = {
            code: 201,
            data: '',
            msg: '请填写完整信息'
        }
    }
})

// 删除文章
router.delete('/del/:id', async ctx => {
    let { id } = ctx.params;
    if (id) {
        let data = await ctx.db.query('SELECT * FROM article WHERE id=?', [id])
        if (data.length) {
            await ctx.db.query('DELETE FROM article WHERE id=?', [id])
            ctx.body = {
                code: 200,
                data: '',
                msg: '删除成功'
            }
        } else {
            ctx.body = {
                code: 201,
                data: '',
                msg: '没有此分类'
            }
        }
    } else {
        ctx.body = {
            code: 201,
            data: '',
            msg: '请传入要删除数据的id'
        }
    }
})
// 获取文章详情
router.get('/detail/:id', async ctx => {
    let { id } = ctx.params;
    if (id) {
        let data = await ctx.db.query('SELECT * FROM article WHERE id=?', [id])
        ctx.body = {
            code: 200,
            data: data[0],
            msg: '获取详情成功'
        }
    } else {
        ctx.body = {
            code: 201,
            data: '',
            msg: '请传入要删除数据的id'
        }
    }
})

// 更新文章
router.put('/update/:id', async ctx => {
    let { id } = ctx.params;
    if (id) {
        let data = await ctx.db.query('SELECT ID FROM article WHERE id=?', [id])
        if (data.length) {
            let vals = Object.values(ctx.request.fields);
            await ctx.db.query('INSERT INTO article (title, author, content, category_id, cover, browse) VALUES(?,?,?,?,?,?)', [...vals, 0])
            ctx.body = {
                code: 200,
                data: '',
                msg: '添加成功'
            }
        } else {
            ctx.body = {
                code: 201,
                data: '',
                msg: '没有此数据'
            }
        }
    } else {
        ctx.body = {
            code: 201,
            data: '',
            msg: '请传入要删除数据的id'
        }
    }
})

module.exports = router.routes()