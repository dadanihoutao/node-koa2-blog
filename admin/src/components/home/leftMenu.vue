<template>
    <aside class="menu">
        <ul class="menu-list">
            <li class="list list-home-wrapper">
                <router-link to="/home" class="home-link-wrapper">
                    <Icon custom="iconfont icon-zhuye" />
                </router-link>
            </li>
            <template v-for="(secMenu, index) in menuData">
                <li @click="changeMenu(secMenu)" :key="index" class="list" :class="{'active': secMenu.path===activeMenu}">
                    <router-link :to="{ path: secMenu.path}">
                        <Icon :custom="'iconfont icon-'+secMenu.icon" />
                    </router-link>
                </li>
            </template>
        </ul>
    </aside>
</template>
<script>
import { mapActions } from 'vuex'
const menuData = require('@/data/menu.json').menu
export default {
    name: 'leftMenu',
    data () {
        return {
            activeMenu: '/work/list',
            menuData: menuData
        }
    },
    watch: {
        '$route.path' () {
            this.setActiveMenu()
        }
    },
    created () {
        this.setActiveMenu()
        this.getData()
    },
    methods: {
        ...mapActions([
            'setActiveMenuName'
        ]),
        changeMenu (menu) {
            this.activeMenu = menu.path
            this.setActiveMenuName(menu.name)
            this.$emit('emitData', menu)
        },
        setActiveMenu () {
            this.activeMenu = this.$route.path
            let index = this.menuData.findIndex(item => item.path === this.activeMenu)
            this.setActiveMenuName(this.menuData[index].name)
        },
        getData () {
        },
        logout () {
        }
    }
}
</script>
<style lang="less">
.menu {
    position: fixed;
    left: 0;
    width: 60px;
    height: 100%;
    z-index: 100;
    text-align: center;
    background-color: #33373a;
    .menu-list {
        .iconfont {
            font-size: 20px;
        }
        a {
            display: inline-block;
            color: #fff;
            text-align: center;
            padding: 20px 0 35px 0;
        }
        .list {
            &-home-wrapper {
                position: relative;
                height: @header-height;
                a {
                    padding: 0;
                }
            }
            &.active {
                a {
                    color: @primary-color;
                }
            }
        }
        .home-link-wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -16px;
            margin-left: -16px;
            display: inline-block;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid #fff;
            vertical-align: middle;
            .iconfont {
                position: absolute;
                top: 0;
                left: 0;
                font-size: 30px;
            }
        }
    }
}
</style>
