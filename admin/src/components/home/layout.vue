<template>
    <div class="layout">
        <div class="sidebar">
            <div class="sidebar-header sidebar-border">
                <h1 class="sidebar-title">
                    <Icon type="ios-menu" class="marginR5" />
                    <!-- <Button class="btn-change" type="primary" shape="circle" icon="ios-search"></Button> -->
                    <span>{{activeMenuName}}</span>
                </h1>
            </div>
            <div class="sidebar-content">
                <vue-scroll>
                    <slot name="sidebar"></slot>
                </vue-scroll>
            </div>
        </div>
        <div class="main">
            <div class="main-header">
                <div class="header-title">
                    <Button v-if="hasGoBack" size="large" type="text" icon="ios-arrow-back" @click="goback()"></Button>
                    <h2 class="name">{{title}}</h2>
                    <div class="toolbar-top">
                        <slot name="toolbarTop"></slot>
                    </div>
                </div>
                <div class="header-right-groups">
                    <div class="btn-wrapper">
                        <Button type="text">
                            <Icon custom="iconfont icon-xiaoxi" />
                        </Button>
                    </div>
                    <div class="btn-wrapper">
                        <Button type="text">
                            <Icon custom="iconfont icon-daiban" />
                        </Button>
                    </div>
                    <div class="btn-wrapper">
                        <Button type="text">
                            <Icon custom="iconfont icon-dulipindao" />
                        </Button>
                    </div>
                    <div class="btn-wrapper">
                        <Button type="text" class="btn-login">
                            <span class="avatar-login">登录</span>
                        </Button>
                    </div>
                </div>
                <div v-if="hasToolbar" class="toolbar clearfix">
                    <slot name="toolbar"></slot>
                </div>
            </div>
            <div class="main-content" ref="mainContent">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'layout',
    props: {
        title: {
            type: String,
            default: ''
        },
        hasGoBack: {
            type: Boolean,
            default: false
        },
        hasToolbar: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            clientHeight: 680
        }
    },
    computed: {
        ...mapState([
            'activeMenuName'
        ])
    },
    watch: {
        '$route': {
            handler: function (val, oldVal) {
                this.measure()
            },
            deep: true
        }
    },
    created () {
    },
    mounted () {
        this.measure()
        window.addEventListener('resize', () => {
            this.measure()
        }, false)
    },
    methods: {
        ...mapActions([
            'setScreenHeight',
            'setMainHeight',
            'setTableHeight'
        ]),
        measure () {
            this.$nextTick(() => {
                this.clientHeight = document.documentElement.clientHeight
                let mainHeight = this.$refs.mainContent ? this.$refs.mainContent.clientHeight : this.clientHeight
                this.setMainHeight(mainHeight)
                if (this.$refs.mainContent) {
                    let pageWrapper = this.$refs.mainContent.querySelector('.page-wrapper')
                    let tableHeight = pageWrapper ? mainHeight - pageWrapper.clientHeight : mainHeight
                    this.setTableHeight(tableHeight)
                } else {
                    this.setTableHeight(mainHeight)
                }
                this.setScreenHeight(this.clientHeight)
            })
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.measure(), false)
    }
}
</script>
<style lang="less">
.layout {
    position: relative;
    height: 100%;
    .sidebar-margin () {
        margin: 0 8px 0 7px;
    }
    .sidebar {
        position: fixed;
        width: @sidebar-width;
        height: 100%;
        background-color: #fff;
        box-shadow: 0px 0px 9px 0px rgba(179, 179, 179, 0.11);
        .btn-sidebar {
            width: 152px;
            height: 36px;
            font-size: 14px;
            border-radius: 3px;
            &-wrapper {
                width: 152px;
                margin: 15px auto 15px auto;
            }
        }
        &-level-divider {
            width: @sidebar-width - 15px;
            min-width: @sidebar-width - 15px;
            margin: 10px 8px 10px 7px;
        }
        &-header {
            .sidebar-margin();
            height: @header-height;
        }
        &-content {
        }
        &-border {
            border-bottom: 1px solid #f7f7fa;
        }
        &-title {
            display: table-cell;
            height: @header-height;
            font-size: @header-font-size;
            font-weight: 600;
            vertical-align: middle;
            padding: 0 17px;
            .btn-change {
                width: 30px;
                height: 30px;
                margin-right: 5px;
            }
        }
        &-item {
            position: relative;
            padding: 0 25px;
            font-size: 14px;
            &:hover,
            &.active {
                color: @primary-color;
                background-color: @sidebar-bg-active-color;
                cursor: pointer;
            }
            .item-title {
                display: table;
                height: 50px;
                &-icon {
                    display: table-cell;
                    vertical-align: middle;
                    width: 30px;
                }
                &-name {
                    display: table-cell;
                    vertical-align: middle;
                }
            }
            .item-tips {
                position: absolute;
                right: 25px;
                top: 50%;
                transform: translate(0, -50%);
            }
        }
    }
    .main {
        position: relative;
        height: 100%;
        width: calc(100% - @sidebar-width - 30px);
        margin-left: @sidebar-width + 15px;
        min-width: 1130px;
        &-header {
            position: relative;
            display: table;
            width: 100%;
            .header-title {
                display: table-cell;
                vertical-align: middle;
                height: @header-height;
                padding-left: 30px;
                .name {
                    display: inline-block;
                    font-size: @header-font-size;
                }
                .toolbar-top {
                    display: inline-block;
                    height: 24px;
                    &-search {
                        width: 300px;
                        margin-left: 30px;
                        .ivu-input {
                            border: 0;
                            background-color: transparent;
                            &:focus {
                                box-shadow: 0 0 0 #fff;
                            }
                        }
                    }
                }
            }
            .header-right-groups {
                position: absolute;
                top: 0;
                right: 0;
                .btn-wrapper {
                    display: table-cell;
                    vertical-align: middle;
                    height: @header-height;
                    padding-left: 5px;
                    .ivu-btn {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        padding: 0;
                        line-height: 1;
                        text-align: center;
                        &:hover {
                            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.13);
                        }
                        &.btn-login {
                            background-color: #fff;
                            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.13);
                            .avatar-login {
                                width: 40px;
                                height: 40px;
                                line-height: 40px;
                                border-radius: 50%;
                            }
                        }
                    }
                }
            }
        }
        &-content {
            height: calc(100% - @header-height);
            background-color: #fff;
            box-shadow: 0px 0px 9px 0px rgba(179, 179, 179, 0.11);
        }
    }
}
</style>
