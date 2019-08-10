<template>
    <div>列表</div>
</template>
<script>
export default {
    data () {
        return {
            total: '',
            page: 1,
            pageSize: 10
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            let params = {
                page: this.page,
                pageSize: this.pageSize
            }
            this.$get('/api/article/list', params).then(res => {
                if (res.code === 200) {
                    console.log(res)
                } else {
                    this.$Message.error(res.msg)
                }
            })
        }
    }
}
</script>
