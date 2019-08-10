<template>
    <section class="content">
        <home-header></home-header>
        <router-view />
        <home-footer></home-footer>
    </section>
</template>
<script>
import { mapActions } from 'vuex'
import homeHeader from '@/components/common/homeHeader.vue'
import homeFooter from '@/components/common/homeFooter.vue'
export default {
    name: 'home',
    components: {
        homeHeader, homeFooter
    },
    data () {
        return {
            clientHeight: null,
            clientWidth: null,
            userInfo: {}
        }
    },
    computed: {
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
    },
    mounted () {
        this.measure()
        window.addEventListener('resize', () => {
            this.measure()
        }, false)
    },
    methods: {
        ...mapActions([
            'setClientHeight',
            'setClientWidth'
        ]),
        measure () {
            this.$nextTick(() => {
                this.clientHeight = document.documentElement.clientHeight
                this.clientWidth = document.documentElement.clientWidth
                this.setClientHeight(this.clientHeight)
                this.setClientWidth(this.clientWidth)
            })
        }
    },
    destroyed () {
        window.removeEventListener('resize', this.measure(), false)
    }
}
</script>
<style lang="less">
.content {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
