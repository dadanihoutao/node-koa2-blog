<template>
    <div class="admin-category-list">
        <div class="add-category">
            <Button type="primary" @click="addCategory"><Icon type="md-add" />新增分类</Button>
        </div>
        <Table stripe border :columns="columns" :data="tableData">
            <template slot-scope="{row}" slot="opt">
                <Button size="small" type="primary" @click="modifiyCategory(row.id)">编辑</Button>
                <Button size="small" type="error" @click="deletecategory(row.id)">删除</Button>
            </template>
        </Table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tableData: [],
            columns: [
                {
                    title: '分类id',
                    key: 'id'
                },
                {
                    title: '分类名称',
                    key: 'name'
                },
                {
                    title: '分类关键字',
                    key: 'key'
                },
                {
                    title: '分类下的文章',
                    key: 'category_sum'
                },
                {
                    title: '操作',
                    slot: 'opt'
                }
            ]
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            this.$get('/api/category/list').then(res => {
                if (res.code === 200) {
                    this.tableData = res.data
                } else {
                    this.$Message.error(res.msg)
                }
            })
        },
        addCategory () {
            this.$router.push({
                path: '/category/create'
            })
        },
        deletecategory (id) {
            this.$delete('/api/category/del/' + id).then(res => {
                if (res.code === 200) {
                    this.$Message.success('删除成功')
                    this.getList()
                } else {
                    this.$Message.error(res.msg)
                }
            })
        },
        modifiyCategory (id) {
            this.$router.push({
                path: 'category/update',
                query: { id: id }
            })
        }
    }
}
</script>
<style lang="less">
.admin-category-list {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 30px;
    .ivu-table th {
        background-color: #f8f8f9;
    }
    .add-category {
        margin-bottom: 10px;
    }
}
</style>
