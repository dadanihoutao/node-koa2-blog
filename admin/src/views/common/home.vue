<template>
    <div class="home">
        <leftMenu ref="leftMenu" @emitData="getActiveMenu">
        </leftMenu>
        <section class="content">
            <router-view />
        </section>
    </div>
</template>
<script>
import leftMenu from '@/components/home/leftMenu'
export default {
    name: 'home',
    components: {
        leftMenu
    },
    data () {
        return {
        }
    },
    created () {
        this.initData()
    },
    methods: {
        getActiveMenu (data) {
        },
        initData () {
        }
    }
}
</script>
<style lang="less">
.home {
    position: absolute;
    width: 100%;
    height: 100%;
    .content {
        position: relative;
        width: calc(100% - 60px);
        margin-left: 60px;
        height: 100%;
        &.spread {
            width: 100%;
            margin-left: 0;
        }
    }
}
</style>
