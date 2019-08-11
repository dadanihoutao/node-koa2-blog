<template>
    <div class="admin-article-list">
        <div class="add-article">
            <Button type="primary" @click="addArticle"><Icon type="md-add" />新增文章</Button>
        </div>
        <Table stripe border :columns="columns" :data="tableData">
            <template slot-scope="{row}" slot="opt">
                <Button size="small" type="primary" @click="modifiyArticle(row.id)">编辑</Button>
                <Button size="small" type="error" @click="deleteArticle(row.id)">删除</Button>
            </template>
        </Table>
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=36 class="spin-icon-load"></Icon>
        </Spin>
        <div class="page-wrapper">
            <Page :total="total" :current="page" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            spinShow: false,
            total: 0,
            page: 1,
            pageSize: 5,
            tableData: [],
            columns: [
                {
                    title: '文章id',
                    key: 'id',
                    width: 100
                },
                {
                    title: '文章标题',
                    key: 'title'
                },
                {
                    title: '评论次数',
                    key: 'comments_sum',
                    width: 100
                },
                {
                    title: '浏览次数',
                    key: 'browse',
                    width: 100
                },
                {
                    title: '分类ID',
                    key: 'category_id',
                    width: 100
                },
                {
                    title: '创建时间',
                    key: 'created_at',
                    width: 200
                },
                {
                    title: '操作',
                    slot: 'opt',
                    width: 150
                }
            ]
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            let params = { page: this.page, pageSize: this.pageSize }
            this.spinShow = true
            this.$get('/api/article/list', params).then(res => {
                if (res.code === 200) {
                    this.spinShow = false
                    this.tableData = res.data
                    this.total = res.page.total
                    this.page = res.page.curPage
                } else {
                    this.$Message.error(res.msg)
                }
            })
        },

        addArticle () {
            this.$router.push({
                path: '/article/create'
            })
        },
        changePage (page) {
            this.page = page
            this.getList()
        },
        deleteArticle (id) {
            this.$delete('/api/article/del/' + id).then(res => {
                if (res.code === 200) {
                    this.$Message.success('删除成功')
                    this.getList()
                } else {
                    this.$Message.error(res.msg)
                }
            })
        },
        modifiyArticle (id) {
            this.$router.push({
                path: 'article/update',
                query: { id: id }
            })
        }
    }
}
</script>
<style lang="less">
.admin-article-list {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 30px;
    .ivu-table th {
        background-color: #f8f8f9;
    }
    .add-article {
        margin-bottom: 10px;
    }
    .page-wrapper {
        margin-top: 30px;
        width: 100%;
        text-align: right;
    }
}
</style>
