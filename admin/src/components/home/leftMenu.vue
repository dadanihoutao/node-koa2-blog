<template>
    <aside class="menu">
        <div class="header-title">yangblog</div>
        <Menu
            theme="dark"
            :open-names="['0']"
            accordion
            @on-select="goLink"
        >
            <MenuItem name="0-1">
                <Icon type="ios-paper" />
                首页
            </MenuItem>
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper" />
                    内容管理
                </template>
                <MenuItem name="1-1">文章管理</MenuItem>
                <MenuItem name="1-2">评论管理</MenuItem>
                <MenuItem name="1-3">举报管理</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-people" />
                    用户管理
                </template>
                <MenuItem name="2-1">新增用户</MenuItem>
                <MenuItem name="2-2">活跃用户</MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-stats" />
                    统计分析
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>
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
            this.$get('/api/test').then(res => {
                console.log(res)
                if (res.code === 200) {
                    console.log(formatDate(res.data.exp * 1000))
                }
            })
        },
        goLink (data) {
            console.log(data)
            if (data === '0-1') {
                this.$router.push({path: '/admin'})
            }
        }
    }
}
</script>
<style lang="less">
.menu {
    width: 240px;
    height: 100%;
    background-color: #515a6e;
    .header-title {
        width: 100%;
        height: 60px;
        color: #ffffff;
        text-align: center;
        line-height: 60px;
        font-size: 18px;
    }
}
</style>
