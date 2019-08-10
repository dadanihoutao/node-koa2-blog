const Router = require('koa-router');

let router = new Router();

router.get('/list', async ctx => {
    let data = await ctx.db.query('SELECT id, name, `key` FROM category');
    ctx.body = {
        code: 200,
        data: data,
        msg: '获取分类列表成功'
    }
})

router.post('/add', async ctx => {
    let { name, key } = ctx.request.fields;
    if (name && key) {
        let data = await ctx.db.query(`SELECT * FROM category WHERE name=?`, [name])
        if (data.length) {
            ctx.body = {
                code: 201,
                data: '',
                msg: '此分类已存在，请勿重复添加'
            }
        } else {
            let vals = Object.values(ctx.request.fields)
            vals.push(0)
            // key 是mysql 的关键字 要用  `` 括号括起来
            await ctx.db.query('INSERT INTO category (name, `key`, parent_id) VALUES(?,?,?)', vals)
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
            msg: '分类名称和关键字不能为空'
        }
    }
})

router.delete('/del/:id', async ctx => {
    let { id } = ctx.params;
    if (id) {
        let data = await ctx.db.query('SELECT * FROM category WHERE id=?', [id])
        if (data.length) {
            await ctx.db.query('DELETE FROM category WHERE id=?', [id])
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
router.get('/detail/:id', async ctx => {
    let { id } = ctx.params;
    if (id) {
        let data = await ctx.db.query('SELECT id, name, `key` FROM category WHERE id=?', [id])
        ctx.body = {
            code: 200,
            data: data[0],
            msg: '详情获取成功'
        }
    } else {
        ctx.body = {
            code: 201,
            data: '',
            msg: '请传入要删除数据的id'
        }
    }
})

router.put('/update/:id', async ctx => {
    let { id } = ctx.params;
    let { key, name } = ctx.request.fields;
    if (id) {
        let data = await ctx.db.query('SELECT id FROM category WHERE id=?', [id])
        if (data.length) {
            await ctx.db.query('UPDATE category SET name=?, `key`=? WHERE id=?', [name, key, id]);
            ctx.body = {
                code: 200,
                data: '',
                msg: '更新成功'
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