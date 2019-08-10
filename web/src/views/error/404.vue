<template>
    <div class="error-wrapper">
        <div class="error-img">
            <img :src="imgSrc" />
        </div>
        <div class="error-btnGroups">
            <Button type="primary" @click="goHome" class="btn-home">首页</Button>
            <Button @click="goBack">后退</Button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'error',
    data () {
        return {
            imgSrc: require('../../assets/images/error.jpg')
        }
    },
    methods: {
        goHome () {
            this.$router.push({
                name: 'home'
            })
        },
        goBack () {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.error-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 720px;
    height: 540px;
    margin-top: -270px;
    margin-left: -360px;
    .error-btnGroups {
        position: absolute;
        left: 350px;
        top: 330px;
        .btn-home {
            margin-right: 5px;
        }
    }
}
</style>
