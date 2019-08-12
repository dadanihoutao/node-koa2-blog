const Router = require('koa-router');
const common = require('../libs/common');

let router = new Router()

// 文章列表
router.get('/list', async ctx => {
    let { page, pageSize, order, categoryId, searchVal} = ctx.request.query
    let type = +order ? 'comments_sum' : 'a.created_at'
    let categoryQuery = categoryId ? `WHERE a.category_id = ${+categoryId}` : ''
    let searchValQuery = searchVal ? `WHERE a.title LIKE '%${searchVal}%'` : ''
    let data = []
    let total = ''
    if (categoryId) {
        total = await ctx.db.query(`SELECT COUNT(id) as total FROM article WHERE category_id = ${categoryId}`)
    } else if (searchVal) {
        total = await ctx.db.query(`SELECT COUNT(id) as total FROM article WHERE title LIKE '%${searchVal}%'`)
    } else {
        total = await ctx.db.query(`SELECT COUNT(id) as total FROM article`)
    }
    data = await ctx.db.query(`
        SELECT 
        a.id,
        a.title,
        a.author,
        a.content,
        a.cover,
        a.category_id,
        a.browse,
        a.created_at,
        b.name AS category_name,
        b.id AS category_id,
        COUNT(c.article_id) AS comments_sum
        FROM article a 
        LEFT JOIN category b 
        ON a.category_id = b.id
        LEFT JOIN comments c
        ON a.id = c.article_id
        ${categoryQuery}
        ${searchValQuery}
        GROUP BY a.id
        ORDER BY ${type} DESC
        LIMIT ${(page-1)*pageSize}, ${pageSize}
    `)
    const pageObj = {
        total: total[0].total,
        curPage: +page,
        pageSize: +pageSize  
    }
    ctx.body = common.handleResulte(200, data, '获取分类列表', pageObj)
})

// 获取文章详情
router.get('/detail/:id', async ctx => {
    let { id } = ctx.params;
    let data = await ctx.db.query(`
        SELECT
        a.id,
        a.title,
        a.author,
        a.content,
        a.cover,
        a.category_id,
        a.browse,
        a.created_at,
        b.name AS category_name,
        COUNT(c.article_id) AS comments_sum 
        FROM article a
        LEFT JOIN category b
        ON a.category_id = b.id
        LEFT JOIN comments c
        ON a.id = c.article_id
        WHERE a.id = ${id}
    `)
    if (data.length) {
        await ctx.db.query(`UPDATE article SET browse=? WHERE id=?`, [data[0].browse + 1, id])
    }
    ctx.body = common.handleResulte(200, data[0], '获取详情成功')
})

// 添加文章
router.post('/add', async ctx => {
    let { title, author, content, category_id, cover } = ctx.request.fields;
    if (title && author && content && category_id) {
        let data = await ctx.db.query(`SELECT * FROM article WHERE title=?`, [title])

        if (data.length) return ctx.body = common.handleResulte(201, '', '文章标题重复')

        let vals = Object.values(ctx.request.fields);
        await ctx.db.query('INSERT INTO article (title, author, content, category_id, cover, browse) VALUES(?,?,?,?,?,?)', [...vals, 0])
        ctx.body = common.handleResulte(200, '', '添加成功')
    } else {
        ctx.body = common.handleResulte(201, '', '请填写完整信息')
    }
})

// 删除文章
router.delete('/del/:id', async ctx => {
    let { id } = ctx.params;

    let data = await ctx.db.query('SELECT * FROM article WHERE id=?', [id])
    if (!data.length) return ctx.body = common.handleResulte(201, '', '没有此分类')

    await ctx.db.query('DELETE FROM article WHERE id=?', [id])
    ctx.body = common.handleResulte(200, '', '删除成功')
})

// 更新文章
router.put('/update/:id', async ctx => {
    let { id } = ctx.params;

    let data = await ctx.db.query('SELECT ID FROM article WHERE id=?', [id])
    if (!data.length) return ctx.body = common.handleResulte(201, '', '没有此数据')

    let vals = Object.values(ctx.request.fields);
    await ctx.db.query('INSERT INTO article (title, author, content, category_id, cover, browse) VALUES(?,?,?,?,?,?)', [...vals, 0])
    ctx.body = common.handleResulte(200, '', '更新成功')
})

module.exports = router.routes()