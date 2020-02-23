<template>
    <y-layout>
        <div slot="content">
            <div class="article-list">
                <div class="left-box">
                    <div class="content">
                        <h1>个人简介</h1>
                        <p>
                            我叫时东洋，是一名靠前端技术养家糊口的前端程序猿。出生在幽州（今河北），燕赵儿女（臭不要脸），在加上是白羊座，所以本人比较直爽，喜欢交朋友。没事儿的时候也喜欢自己找点事情瞎鼓捣！
                        </p>
                        <h1>博客说明</h1>
                        <p>
                            对于创建本博客的初衷，说起来稍显幼稚，最初可能仅仅是因为羡慕有博客的人吧，那时候喜欢搜索一些个人站来看，有时候看到做的很好的站就有些按耐不住，跃跃欲试，想自己折腾一个网站，当这种冲动到了一个度的时候，终于再也按耐不住，匆匆选了主机，买了域名，东拼西凑做了第一版博客,后来为了更好的seo，和优化加载速度，也是为了学习一下nuxt.js,又重新做了第二版，也就是当前的版本。本博客从建站之初前端选择了vue.js相关的技术栈作为前端框架，koa2.js作为后端框架，mySql数据库，主要是因为方便，好用，学习成本小。博客第二版是基于网上找的一个主题做的，一直稳定运行着，而且也会一直持续稳定的运行下去，本博客最初是作为本人一个记录工作日常的小空间，虽然文章文笔不好，但都是我一个字一个字敲出来的，demo也是我一个一个熬夜码出来的，在写的时候我尽量清楚的表达出自己的想法，尽可能让看到我文章的朋友很容易就能理解其中的道道，但是我不敢保证自己一定能做得很好，如果有朋友觉得那里说的不清楚或者说错了，欢迎随时指教，我也好尽早修改，免得误导更多的人，毕竟既然做了博客，就要对他负责，将他做好。当然博客肯定还有很多做的不足的地方，希望远方的你能多多指教，我在这里恭候大驾！！！
                        </p>
                        <h1>与我联系</h1>
                        <p class="indent0">您可以通过线上QQ或者以下方式与我取得联系，非常期待和您成为朋友</p>
                        <p class="indent0">微信：shi851051279</p>
                        <p class="indent0">QQ：851051279</p>
                        <p class="indent0">邮箱：851051279@qq.com</p>
                    </div>
                </div>
                <div class="right-box">
                    <side-bar :categoryList="categoryList"></side-bar>
                </div>
            </div>
        </div>
    </y-layout>
</template>
<script>
import sideBar from '@/components/sideBar.vue'
export default {
    layout: 'default',
    components: {
        sideBar
    },
    data () {
        return {
            defaultImg: require('@/assets/images/defaultImg.jpg'),
        }
    },
    head () {
        return {
            title: '哼哼嘻的博客 -- 个人简介',
            meta: [
                { hid: 'description', name: 'description', content: '我叫时东洋，是一名靠前端技术养家糊口的前端程序猿。' }
            ]
        }
    },
    watch: {},
    async asyncData ({app, query}) {
        let data2 = await app.$axios.get('/api/category/list')
        return {
            categoryList: data2.data.data || [],
        }
    },
    methods: {
        openLink (url) {
            window.open(url)
        }
    }
}
</script>
<style lang="less">
.article-list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left-box {
        width: 800px;
        .content {
            width: 100%;
            padding: 20px;
            margin-bottom: 15px;
            background-color: rgba(255,255,255,.5);
            box-shadow: 0px 0px 6px rgba(63,74,105,.16);
            border-radius: 3px;
            h1 {
                text-align: left;
                font-size: 16px;
                padding: 10px 0;
            }
            p {
                line-height: 34px;
                font-size: 14px;
                text-indent: 2em;
                &.indent0 {
                    text-indent: 0;
                }
            }
        }
    }
    .right-box {
        width: 285px;
    }
}
</style>
