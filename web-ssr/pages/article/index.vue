<template>
    <y-layout>
        <div slot="content">
            <div class="article-list">
                <div class="left-box">
                    <ul class="list" v-if="Array.isArray(listData) && listData.length">
                        <li v-for="item in listData" :key="item.id">
                            <div class="left-img">
                                <img v-if="item.cover" :src="item.cover" alt="">
                                <img v-else :src="defaultImg" alt="">
                            </div>
                            <div class="right-text" @click="handleToDetail(item)">
                                <h2>{{ item.title }}</h2>
                                <p>{{ item.content }}</p>
                                <div class="labels">
                                    <span class="label">{{ item.category_name }}</span>
                                    <span>
                                        <Icon class="icons" type="ios-person-outline" />
                                        {{ item.author }}
                                    </span>
                                    <span>
                                        <Icon class="icons" type="ios-eye-outline" />
                                        {{ item.browse }}
                                    </span>
                                    <span>
                                        <Icon class="icons" type="ios-text-outline" />
                                        {{ item.comments_sum }}
                                    </span>
                                    <span>
                                        <Icon class="icons" type="ios-time-outline" />
                                        {{ item.created_at }}
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div v-else class="no-data">
                        <p>暂无数据</p>
                    </div>
                    <div class="list-footer">
                        <Page :total="total" :current="page" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
                    </div>
                </div>
                <div class="right-box">
                    <side-bar :categoryList="categoryList" @on-searchCategory="searchCategory"></side-bar>
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
            total: 0,
            page: 1,
            pageSize: 10,
            order: 0
        }
    },
    watch: {
        '$route.query' (nVal) {
            if (Object.keys(nVal).length) {
                if (nVal.order === 0 || nVal.order === 1) {
                    this.categoryId = ''
                    this.searchVal = ''
                    this.order = nVal.order
                    this.getList()
                } else if (nVal.searchVal) {
                    this.searchVal = nVal.searchVal
                    this.getList()
                }
            } else {
                this.order = ''
                this.categoryId = ''
                this.searchVal = ''
                this.getList()
            }
        }
    },
    async asyncData ({app, query}) {
        let params = {
            page: 1,
            pageSize: 10,
            order: (query.order === 0 || query.order === 1) ? query.order : '',
            categoryId: query.categoryId ? query.categoryId : '',
            searchVal: query.searchVal ? query.searchVal : '',
        }
        let [ data1, data2 ] = await Promise.all([
            app.$axios.get('/api/article/list', {params}),
            app.$axios.get('/api/category/list')
        ])
        return {
            listData: data1.data.data || [],
            categoryList: data2.data.data || [],
            page: data1.data.page.curPage,
            pageSize: data1.data.page.pageSize,
            total: data1.data.page.total
        }
    },
    methods: {
        searchCategory (data) {
            this.categoryId = data.id
            this.getList()
        },
        getList () {
            let params = {
                page: this.page,
                pageSize: this.pageSize,
                order: this.order,
                categoryId: this.categoryId,
                searchVal: this.searchVal
            }
            this.$axios.get('/api/article/list', {params}).then(res => {
                if (res.data.code === 200) {
                    this.listData = res.data.data
                    this.total = res.data.page.total
                    this.page = res.data.page.curPage
                } else {
                    this.$Message.error(res.data.msg)
                }
            })
        },
        handleToDetail (item) {
            this.$router.push({
                path: '/article/detail/' + item.id,
            })
        },
        changePage (page) {
            this.page = page
            this.getList()
        },
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
        .list li {
            width: 100%;
            padding: 20px;
            height: 220px;
            margin-bottom: 15px;
            background-color: rgba(255,255,255,.5);
            box-shadow: 0px 0px 6px rgba(63,74,105,.16);
            border-radius: 3px;
            display: flex;
            .left-img {
                width: 270px;
                height: 100%;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .right-text {
                width: calc(100% - 290px);
                margin-left: 20px;
                h2 {
                    font-size: 18px;
                    color: #666666;
                    width: 100%;
                    overflow: hidden;
                    cursor: pointer;
                    border-bottom: 1px solid #e6e6e6;
                    padding: 0 0 10px 0;
                    &:hover {
                        color: #409EFF;
                    }
                }
                p {
                    font-size: 14px;
                    padding: 10px 0;
                    height: 100px;
                    overflow: hidden;
                }
                .labels {
                    .label {
                        display: inline-block;
                        padding: 0 20px;
                        height: 20px;
                        line-height: 20px;
                        border-radius: 10px;
                        background: rgba(51, 119, 255, 0.1);
                        color: #409EFF;
                        margin-left: 0;
                    }
                    span {
                        color: #9ea7b4;
                        margin: 0 5px;
                        .icons {
                            font-size: 18px;
                        }
                        margin-top: 27px;
                    }
                }
            }
        }
        .no-data {
            width: 100%;
            height: 220px;
            margin-bottom: 15px;
            background-color: rgba(255,255,255,.5);
            box-shadow: 0px 0px 6px rgba(63,74,105,.16);
            border-radius: 3px;
            text-align: center;
            line-height: 220px;
            font-size: 14px;
            color: #666666;
        }
        .list-footer {
            width: 100%;
            text-align: center;
            padding: 0 0 5px 0;
        }
    }
    .right-box {
        width: 285px;
    }
}
</style>
