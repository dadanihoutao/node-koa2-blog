<template>
    <div class="admin-admin-page">
        <div>
            <h2>{{ userInfo.nickname }}，欢迎您</h2>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            userInfo: {}
        }
    },
    created () {
        this.getUserInfo()
    },
    methods: {
        getUserInfo () {
            this.userInfo = this.$Lockr.get('userinfo')
        }
    }
}
</script>
<style lang="less">
.admin-admin-page {
    height: 100%;
    background-color: #ffffff;
    div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        h2 {
            font-size: 20px;
        }
    }
}
</style>
