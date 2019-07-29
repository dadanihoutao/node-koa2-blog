/**
 * @Author: 时洋
 * @Last Modified by: shiyang
 * @Last Modified time: 2019-07-19 23:37:00
 */
export default {
    data () {
        return {
            /* 分页数据 */
            page: 1,
            total: 0,
            pageSize: 20,
            /* 表格数据 */
            spinShow: false,
            tableData: []
        }
    },
    created () {
        this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
    },
    methods: {
        doFilter (key, value) {
            this.searchForm[key] = value
            this.getData()
        },
        btnReset () {
            this.$refs.searchForm.resetFields()
            this.getData()
        },
        btnSearch () {
            this.getData()
        },
        changePage (page) {
            this.$router.push({
                path: this.$route.path,
                query: Object.assign({}, this.$route.query, {
                    page: page
                })
            })
        }
    }
}
