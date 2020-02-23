<template>
    <div class="error-page">
        <div class="bg"></div>
        <div class="error-text" v-if="error.statusCode === 404">
            <h1>404</h1>
            <div>抱歉！页面走丢了！</div>
            <Button type="primary" @click="toIndex" >返回首页</Button>
        </div>
        <div class="error-text" v-else>
            <h1>500</h1>
            <div>抱歉！服务器错误，请稍后访问！</div>
            <Button type="primary" @click="toIndex" >返回首页</Button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['error'],
    methods: {
        toIndex () {
            this.$router.push('/article')
        }
    }
}
</script>
<style lang="less">
.error-page {
    width: 100%;
    height: 100%;
    .bg {
        width: 100%;
        height: 100%;
        position: fixed;
        background: url('../assets/images/skyblue.jpg') no-repeat;
        background-size: 100%;
        z-index: -1;
        filter: blur(15px);
    }
    .error-text {
        width: 100%;
        padding-top: 200px;
        text-align: center;
        h1 {
            font-size: 60px;
            color: #ffffff;
            letter-spacing: 10px;
        }
        div {
            font-size: 30px;
            color: #ffffff;
        }
        button {
            margin-top: 20px;
        }
    }
}
</style>