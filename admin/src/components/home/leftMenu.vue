<template>
    <aside class="menu">
        <div>侧边栏</div>
    </aside>
</template>
<script>
// import { mapActions } from 'vuex'
export default {
    name: 'leftMenu',
    created () {
        this.getRouter()
    },
    methods: {
        getRouter () {
            console.log(this.$router.options.routes)
        }
    }
}
</script>
<style lang="less">
</style>
