<template>
    <y-layout :title="title" class="contactsList">
        <template slot="sidebar">
            <div class="btn-sidebar-wrapper">
                <Button class="btn-sidebar" type="primary" @click="showDrawer">添加新客户</Button>
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
                <Divider :key="index+'num'" v-if="index>=2" class="sidebar-level-divider" />
            </template>
        </template>
        <template slot="toolbarTop">
            <Input class="toolbar-top-search" v-model="value" placeholder="搜点什么..." clearable />
        </template>
        <div slot="content" class="table-page-wrapper">

            <!-- <div class="table-wrapper">
        <Table :border="false" :columns="columns" :data="data" :height="tableHeight"></Table>
      </div>
      <div class="page-wrapper">
        <Page :total="100" :current="page" :page-size="pageSize" show-total show-elevator @on-change="changePage" />
      </div>
      <Drawer title="Basic Drawer" v-model="show" :mask="false" :width="600" :transfer="false" class-name="drawer-high">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <Drawer title="Basic" v-model="showBasic" :mask="false" :width="600" :transfer="false">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer> -->
        </div>
    </y-layout>
</template>
<script>
import { mapState } from 'vuex'
import list from '@/mxins/list'
export default {
    name: 'contactsList',
    mixins: [list],
    data () {
        return {
            show: false,
            showBasic: false,
            value: '',
            activeType: 1,
            select: 1,
            sidebarData: [
                {
                    type: 1,
                    icon: 'ios-analytics',
                    name: '我的客户',
                    num: 356
                },
                {
                    type: 2,
                    icon: 'ios-analytics',
                    name: '核心客户',
                    num: 52
                },
                {
                    type: 3,
                    icon: 'ios-analytics',
                    name: '临时客户',
                    num: 26
                },
                {
                    type: 4,
                    icon: 'ios-analytics',
                    name: '潜在客户',
                    num: 39972
                }
            ],
            data: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ]
        }
    },
    computed: {
        ...mapState([
            'tableHeight'
        ]),
        title () {
            let name = '我的客户'
            switch (this.activeType) {
            case 1:
                name = '我的客户'
                break
            case 2:
                name = '核心客户'
                break
            case 3:
                name = '临时客户'
                break
            case 4:
                name = '潜在客户'
                break
            }
            return name
        }
    },
    created () {
        if (this.$Lockr.get('contactsActive')) {
            this.activeType = this.$Lockr.get('contactsActive')
        }
    },
    methods: {
        changeActive (item) {
            this.showBasic = true
            this.activeType = item.type
            this.$Lockr.set('contactsActive', item.type)
        },
        showDrawer () {
            this.show = true
        }
    }
}
</script>
<style lang="less">
.contactsList {
}
</style>
