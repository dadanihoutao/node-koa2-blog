<template>
    <aside class="menu">
        <div class="header-title">yangblog.com</div>
        <Menu
            :accordion="true"
            width="auto"
            :class="menuitemClasses"
            @on-select="goLink"
            :active-name="$route.meta.module"
            :open-names="[$route.meta.group]"
            theme="dark"
            v-if="menus"
        >
            <div class="" v-for="(item, index) in menus" :key="index">
                <Submenu :name="item.path" v-if="item.children && item.children.length > 0">
                    <template slot="title">
                        <Icon class="layout-icon" :type="item.icon"></Icon>
                        <span class="layout-text">{{ item.name }}</span>
                    </template>
                    <Menu-item :name="child.path" v-for="(child, ind) in item.children" :key="ind">
                        <Icon :type="child.icon" class="layout-icon"></Icon>
                        <span class="layout-text">{{ child.name }}</span>
                    </Menu-item>
                </Submenu>
                <Menu-item :name="item.path" v-else >
                    <Icon class="layout-icon" :type="item.icon"></Icon>
                    <span class="layout-text">{{ item.name }}</span>
                </Menu-item>
            </div>
        </Menu>
    </aside>
</template>
<script>
// import { formatDate } from '@/libs/tools'
import { menus } from '@/data/menus.js'
export default {
    name: 'leftMenu',
    data () {
        return {
            isCollapsed: false,
            menus: menus
        }
    },
    created () {
        this.test()
    },
    computed: {
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    methods: {
        test () {
            this.$get('/api/test').then(res => {
                if (res.code === 200) {
                }
            })
        },
        goLink (data) {
            console.log(data)
            this.$router.push({
                path: data
            })
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
