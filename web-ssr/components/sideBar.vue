<template>
    <div class="side-bar">
        <Affix :offset-top="95">
            <div class="classfiy">
                <div class="header">
                    <h2>文章分类</h2>
                </div>
                <ul class="list">
                    <li v-for="item in categoryList" @click="searchCategory(item)" :key="item.id"><Button type="text">{{ item.name }}（{{ item.category_sum }}）</Button></li>
                </ul>
            </div>
            <div class="link-list">
                <div class="header">
                    <h2>外部链接</h2>
                </div>
                <ul class="list">
                    <li v-for="(item, index) in linkList" :key="index"><Button @click="openLink(item.link)" type="text">{{ item.name }}</Button></li>
                </ul>
            </div>
        </Affix>
    </div>
</template>

<script>
import linkList from '@/data/link.json'
export default {
    props: {
        categoryList: {
            type: [Array],
            default: () => []
        }
    },
    data () {
        return {
            linkList: linkList,
        }
    },
    methods: {
        searchCategory (data) {
            if (this.$route.path !== '/article') {
                this.$router.push({
                    path: '/article',
                    query: { categoryId: data.id }
                })
            }
            this.$emit('on-searchCategory', data)
        }
    }
}
</script>
<style lang="less">
    .classfiy, .link-list {
        width: 100%;
        background-color: rgba(255,255,255,.5);
        box-shadow: 0px 0px 6px rgba(63,74,105,.16);
        border-radius: 3px;
        margin-bottom: 15px;
        padding: 0 15px 8px;
        .header {
            border-bottom: 1px solid #e6e6e6;
            h2 {
                font-size: 18px;
                height: 44px;
                line-height: 44px;
                border-bottom: 1px solid #666666;
                display: inline-block;
                transform: translateY(1px);
            }
        }
        .list {
            padding: 10px 0 0 0;
            li {
                padding: 5px 0;
                button {
                    padding: 0;
                    font-size: 14px;
                    &:hover {
                        background: transparent;
                    }
                }
            }
        }
    }
</style>