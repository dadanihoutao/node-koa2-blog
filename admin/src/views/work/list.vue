<template>
    <y-layout :title="title" class="workList">
        <template slot="sidebar">
            <div class="btn-sidebar-wrapper">
                <Button class="btn-sidebar" type="primary" @click="showDrawer">创建工作</Button>
            </div>
            <Divider class="sidebar-level-divider" />
            <template v-for="(item, index) in sidebarData">
                <div class="sidebar-item" :key="item.type" :class="{'active':activeType===item.type}" @click="changeActive(item)">
                    <div class="item-title">
                        <Icon class="item-title-icon" :type="item.icon" />
                        <span class="item-title-name">{{item.name}}</span>
                    </div>
                    <div class="item-tips"><span class="font-gray">{{item.num}}</span></div>
                </div>
                <Divider :key="index+'num'" v-if="index!==1" class="sidebar-level-divider" />
            </template>
        </template>
        <template slot="toolbarTop">
            <Input class="toolbar-top-search" placeholder="搜点什么..." clearable />
        </template>
        <div slot="content" class="table-page-wrapper">
        </div>
    </y-layout>
</template>
<script>
export default {
    name: 'workList',
    data () {
        return {
            activeType: 1,
            sidebarData: [
                {
                    type: 1,
                    icon: 'ios-analytics',
                    name: '未完成',
                    num: 32
                },
                {
                    type: 2,
                    icon: 'ios-analytics',
                    name: '已完成'
                },
                {
                    type: 3,
                    icon: 'ios-analytics',
                    name: '已关闭'
                }
            ]
        }
    },
    computed: {
        title () {
            let name = '未完成'
            switch (this.activeType) {
            case 1:
                name = '未完成'
                break
            case 2:
                name = '已完成'
                break
            case 3:
                name = '已关闭'
                break
            }
            return name
        }
    },
    created () {
        if (this.$Lockr.get('workActive')) {
            this.activeType = this.$Lockr.get('workActive')
        }
    },
    methods: {
        changeActive (item) {
            this.activeType = item.type
            this.$Lockr.set('workActive', item.type)
        }
    }
}
</script>
<style lang="less">
.workList {
}
</style>
