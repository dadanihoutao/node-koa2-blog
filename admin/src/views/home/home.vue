<template>
    <div class="home">
        <leftMenu ref="leftMenu" @emitData="getActiveMenu">
        </leftMenu>
        <section class="content">
            <div class="fix-header">
                顶部固定的位置
            </div>
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
    display: flex;
    .content {
        position: relative;
        width: calc(100% - 240px);
        height: 100%;
        .fix-header {
            height: 60px;
            border: 1px solid red;
        }
        &.spread {
            width: 100%;
            margin-left: 0;
        }
    }
}
</style>
