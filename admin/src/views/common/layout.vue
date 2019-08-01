<template>
    <div class="home">
        <leftMenu ref="leftMenu" @emitData="getActiveMenu">
        </leftMenu>
        <section class="content">
            <div class="fix-header">
                <div class="left-box">
                    <Icon class="icon-font" type="md-menu" />
                </div>
                <div class="right-box">
                    <span>851051279@qq.com</span>
                </div>
            </div>
            <div class="content-wrap">
                <router-view />
            </div>
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
            height: 50px;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-box {
                .icon-font {
                    font-size: 26px;
                    margin-left: 20px;
                }
            }
            .right-box {
                span {
                    color: #2d8cf0;
                    font-size: 14px;
                    margin-right: 20px;
                }
            }
        }
        &.spread {
            width: 100%;
            margin-left: 0;
        }
        .content-wrap {
            margin-top: 5px;
        }
    }
}
</style>
