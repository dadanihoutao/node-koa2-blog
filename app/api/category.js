const Router = require('koa-router');
const common = require('../libs/common');

let router = new Router();

router.get('/list', async ctx => {
    let data = await ctx.db.query('SELECT c.id, c.name, c.`key`, c.created_at, COUNT(a.category_id) AS category_sum FROM category c LEFT JOIN article a ON c.id = a.category_id GROUP BY c.id ORDER BY c.created_at DESC');
    ctx.body = common.handleResulte(200, data, '获取分类列表成功')
})

router.post('/add', async ctx => {
    let { name, key } = ctx.request.fields;
    if (name && key) {
        let data = await ctx.db.query(`SELECT * FROM category WHERE name=?`, [name])
        if (data.length) return ctx.body = common.handleResulte(201, '', '此分类已存在，请勿重复添加')
            
        let vals = Object.values(ctx.request.fields)
        vals.push(0)
        // key 是mysql 的关键字 要用  `` 括号括起来
        await ctx.db.query('INSERT INTO category (name, `key`, parent_id) VALUES(?,?,?)', vals)
        ctx.body = common.handleResulte(200, '', '添加成功')
    } else {
        ctx.body = common.handleResulte(201, '', '分类名称和关键字不能为空')
    }
})

router.delete('/del/:id', async ctx => {
    let { id } = ctx.params;
    
    let data = await ctx.db.query('SELECT * FROM category WHERE id=?', [id])
    if (!data.length) return ctx.body = common.handleResulte(201, '', '没有此分类')

    await ctx.db.query('DELETE FROM category WHERE id=?', [id])
    ctx.body = common.handleResulte(200, '', '删除成功')
})
router.get('/detail/:id', async ctx => {
    let { id } = ctx.params;
    let data = await ctx.db.query('SELECT id, name, `key` FROM category WHERE id=?', [id])
    ctx.body = common.handleResulte(200, data[0], '详情获取成功')
})

router.put('/update/:id', async ctx => {
    let { id } = ctx.params;
    let { key, name } = ctx.request.fields;
    if (!key || !name) return  ctx.body = common.handleResulte(201, '', '请传入完整参数')
    
    let data = await ctx.db.query('SELECT id FROM category WHERE id=?', [id])
    if (!data.length) return ctx.body = common.handleResulte(201, '', '没有此数据')

    await ctx.db.query('UPDATE category SET name=?, `key`=? WHERE id=?', [name, key, id]);
    ctx.body = common.handleResulte(200, '', '更新成功')
})


module.exports = router.routes()