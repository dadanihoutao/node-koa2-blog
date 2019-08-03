<template>
    <div class="home">
        <leftMenu ref="leftMenu">
        </leftMenu>
        <section class="content">
            <div class="fix-header" ref="fixHeader">
                <div class="left-box">
                    <!-- <Icon class="icon-font" type="md-menu" /> -->
                </div>
                <div class="right-box">
                    <span>欢迎， {{ userInfo.email }}</span>
                    <Button type="text" @click="logOut">退出</Button>
                </div>
            </div>
            <div class="content-wrap" :style="{'height': mainHeight + 'px'}">
                <router-view />
            </div>
            <footer class="home-footer" ref="homeFooter">
                <p>2019 © lokiblog.com</p>
            </footer>
        </section>
    </div>
</template>
<script>
import leftMenu from '@/components/home/leftMenu'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'home',
    components: {
        leftMenu
    },
    data () {
        return {
            clientHeight: null,
            clientWidth: null,
            userInfo: {}
        }
    },
    computed: {
        ...mapState([
            'mainHeight'
        ])
    },
    watch: {
        '$route': {
            handler (nVal, oVal) {
                this.measure()
            },
            deep: true
        }
    },
    created () {
        this.getUserInfo()
    },
    mounted () {
        this.measure()
        window.addEventListener('resize', () => {
            this.measure()
        }, false)
    },
    methods: {
        ...mapActions([
            'setMainHeight',
            'setClientHeight',
            'setClientWidth'
        ]),
        getUserInfo () {
            this.userInfo = this.$Lockr.get('userinfo')
        },
        logOut () {
            this.$Lockr.rm('token')
            this.$Message.success('登出成功')
            this.$router.push({
                path: '/login'
            })
        },
        measure () {
            this.$nextTick(() => {
                this.clientHeight = document.documentElement.clientHeight
                this.clientWidth = document.documentElement.clientWidth
                let mainHeight = this.clientHeight - this.$refs.fixHeader.clientHeight - this.$refs.homeFooter.clientHeight
                this.setMainHeight(mainHeight)
                this.setClientHeight(this.clientHeight)
                this.setClientWidth(this.clientWidth)
            })
        }
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.measure(), false)
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
        background-color: #f5f7f9;
        .fix-header {
            height: 50px;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #ffffff;
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
        .home-footer {
            width: 100%;
            height: 40px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            line-height: 40px;
            color: #9ea7b4;
        }
        &.spread {
            width: 100%;
            margin-left: 0;
        }
        .content-wrap {
            margin: 10px 10px 0 10px;
        }
    }
}
</style>
