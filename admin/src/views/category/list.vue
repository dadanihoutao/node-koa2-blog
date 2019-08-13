<template>
    <div class="admin-category-list">
        <div class="add-category">
            <Button type="primary" @click="addCategory"><Icon type="md-add" />新增分类</Button>
        </div>
        <Table
            stripe
            :columns="columns"
            :data="tableData"
            :max-height="clientHeight - 220"
        >
            <template slot-scope="{row}" slot="opt">
                <Button size="small" type="primary" @click="modifiyCategory(row.id)">编辑</Button>
                <Button size="small" type="error" @click="deletecategory(row.id)">删除</Button>
            </template>
        </Table>
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=36 class="spin-icon-load"></Icon>
        </Spin>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            spinShow: false,
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
    computed: {
        ...mapState([
            'clientHeight'
        ])
    },
    methods: {
        getList () {
            this.spinShow = true
            this.$get('/api/category/list').then(res => {
                if (res.code === 200) {
                    this.spinShow = false
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
