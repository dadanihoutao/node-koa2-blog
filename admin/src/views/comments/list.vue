<template>
    <div class="admin-comments-list">
        <Table
            stripe
            :columns="columns"
            :data="tableData"
            :max-height="clientHeight - 220"
        >
            <template slot-scope="{row}" slot="opt">
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
import { mapState } from 'vuex'
export default {
    data () {
        return {
            spinShow: false,
            total: 0,
            page: 1,
            pageSize: 20,
            tableData: [],
            columns: [
                {
                    title: '评论id',
                    key: 'id'
                },
                {
                    title: '评论人昵称',
                    key: 'nickname'
                },
                {
                    title: '评论人邮箱',
                    key: 'email'
                },
                {
                    title: '评论内容',
                    key: 'content'
                },
                {
                    title: '所属文章',
                    key: 'article_id'
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
    computed: {
        ...mapState([
            'clientHeight'
        ])
    },
    methods: {
        getList () {
            let params = { page: this.page, pageSize: this.pageSize }
            this.spinShow = true
            this.$get('/api/comments/list', params).then(res => {
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
                path: '/comments/create'
            })
        },
        changePage (page) {
            this.page = page
            this.getList()
        },
        deleteArticle (id) {
            this.$delete('/api/comments/del/' + id).then(res => {
                if (res.code === 200) {
                    this.$Message.success('删除成功')
                    this.getList()
                } else {
                    this.$Message.error(res.msg)
                }
            })
        }
    }
}
</script>
<style lang="less">
.admin-comments-list {
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
        text-align: right;
        position: absolute;
        bottom: 75px;
        right: 50px;
    }
}
</style>
