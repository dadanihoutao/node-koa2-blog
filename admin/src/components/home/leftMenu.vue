<template>
    <aside class="menu">
        <div>侧边栏</div>
    </aside>
</template>
<script>
// import { mapActions } from 'vuex'
import { formatDate } from '@/libs/tools'
export default {
    name: 'leftMenu',
    created () {
        this.getRouter()
        this.test()
    },
    methods: {
        getRouter () {
            console.log(this.$router.options.routes)
        },
        test () {
            this.$get('/test').then(res => {
                console.log(res)
                if (res.code === 200) {
                    console.log(formatDate(res.data.exp * 1000))
                }
            })
        }
    }
}
</script>
<style lang="less">
</style>
