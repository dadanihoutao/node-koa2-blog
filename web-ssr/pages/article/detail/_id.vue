<template>
    <y-layout>
        <div slot="content">
            <div class="article-detail">
                <div class="left-box">
                    <div class="detail-content">
                        <div class="detail-header">
                            <h1>{{ detailData.title }}</h1>
                            <div class="labels">
                                <span class="label">{{ detailData.category_name }}</span>
                                <span>
                                    <Icon class="icons" type="ios-person-outline" />
                                    {{ detailData.author }}
                                </span>
                                <span>
                                    <Icon class="icons" type="ios-eye-outline" />
                                    {{ detailData.browse }}
                                </span>
                                <span>
                                    <Icon class="icons" type="ios-text-outline" />
                                    {{ detailData.comments_sum }}
                                </span>
                                <span>
                                    <Icon class="icons" type="ios-time-outline" />
                                    {{ detailData.created_at }}
                                </span>
                            </div>
                        </div>
                        <div class="detail-main">
                            <div v-html="readmeContent"></div>
                        </div>
                    </div>
                    <div class="comment-content">
                        <div class="comment-form">
                            <h2 class="title">欢迎评论</h2>
                            <div class="form-wrap">
                                <Form ref="form" class="form" :model="form" :rules="ruleInline" label-position="left" :label-width="100" >
                                    <FormItem label="昵称" prop="nickname">
                                        <Input v-model.trim="form.nickname" placeholder="请输入昵称"></Input>
                                    </FormItem>
                                    <FormItem label="邮箱" prop="email">
                                        <Input v-model.trim="form.email" placeholder="请输入邮箱（不会被公开）"></Input>
                                    </FormItem>
                                    <FormItem label="内容" prop="content">
                                        <Input v-model.trim="form.content" type="textarea" placeholder="请输入评论内容" :rows="4"></Input>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" @click="handleSubmit()">提交评论</Button>
                                        <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                        <div class="comment-list" v-if="commentsList.length">
                            <h2 class="title">评论列表</h2>
                            <ul class="list">
                                <li v-for="item in commentsList" :key="item.id">
                                    <p class="title">
                                        <Icon class="icons" type="ios-chatboxes-outline" />
                                        来自「{{item.nickname}}」的评论：
                                    </p>
                                    <p class="text">
                                        {{item.content}}
                                        <span class="timer">评论时间：{{item.created_at}}</span>
                                    </p>
                                </li>
                            </ul>
                            <div class="page-wrap">
                                <Page :total="total" :current="page" :page-size="pageSize" show-total show-elevator @on-change="changePage"></Page>
                            </div>
                        </div>
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
import linkList from '@/data/link.json'
import marked from 'marked'
import sideBar from '@/components/sideBar.vue'
export default {
    layout: 'default',
    components: {
        sideBar
    },
    validate({params}) {
        return /^\d+$/.test(params.id)
    },
    data () {
        return {
            id: '',
            total: 0,
            page: 1,
            pageSize: 5,
            commentsList: [],
            linkList: linkList,
            form: {
                nickname: '',
                email: '',
                content: '',
                article_id: ''
            },
            readmeContent: '',
            ruleInline: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blue' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blue' },
                    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入评论内容', trigger: 'blue' }
                ]
            }
        }
    },
    head () {
        return {
            title: this.detailData.title,
            meta: [
                { hid: 'description', name: 'description', content: this.detailData.content }
            ]
        }
    },
    async asyncData({app, params}) {
        let requireArr = [
            app.$axios.get('/api/article/detail/' + params.id),
            app.$axios.get('/api/category/list')
        ]
        let [data1, data2] = await Promise.all(requireArr)
        return {
            detailData: data1.data.data || {},
            categoryList: data2.data.data || []
        }
    },
    created () {
        this.id = this.$route.params.id
        if (!this.id) return this.$Message.warning('参数丢失，请重新打开页面') 
        this.readmeContent = marked(this.detailData.content || '')
        this.getCommentsList()
    },
    methods: {
        // 获取评论列表
        getCommentsList () {
            let params = { page: this.page, pageSize: this.pageSize, id: this.id }
            this.$axios.get('/api/comments/list', {params}).then(res => {
                if (res.data.code === 200) {
                    this.commentsList = res.data.data
                    this.page = res.data.page.curPage
                    this.total = res.data.page.total
                }
            })
        },
        // 评论分页
        changePage (page) {
            this.page = page
            this.getCommentsList()
        },
        // 提交评论
        handleSubmit () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let params = this.form
                    params.article_id = this.id
                    if (!params.content) return this.$Message.warning('请输入评论内容')
                    this.$post('/api/comments/add', params).then(res => {
                        if (res.code === 200) {
                            this.$Message.success('添加成功')
                            this.handleReset()
                            this.getCommentsList()
                        } else {
                            this.$Message.error(res.msg)
                        }
                    })
                }
            })
        },
        // 清空评论
        handleReset () {
            this.form = {
                nickname: '',
                email: '',
                content: '',
                article_id: ''
            }
        }
    }
}
</script>
<style lang="less">
.article-detail {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left-box {
        width: 800px;
        .detail-content {
            padding: 20px;
            width: 100%;
            height: auto;
            margin-bottom: 15px;
            background-color: rgba(255,255,255,.5);
            box-shadow: 0px 0px 6px rgba(63,74,105,.16);
            border-radius: 3px;
            .detail-header {
                width: 100%;
                text-align: center;
                h1 {
                    font-size: 22px;
                    color: #444444;
                    padding-bottom: 20px;
                }
                span {
                    font-size: 14px;
                    color: #666666;
                    margin: 0 5px;
                    i {
                        font-size: 18px;
                        color: #666666;
                    }
                }
            }
            .detail-main {
                padding: 30px 0;
                min-height: 200px;
                div {
                p {
                    font-size: 16px;
                    line-height: 36px;
                }
                img {
                    width: 100%;
                    display: block;
                }
                    pre {
                        padding: 20px;
                        background-color: #FAFBFE;
                        margin-top: 20px;
                        border-radius: 4px;
                    }
                    code {
                        font-size: 14px;
                    }
                }
            }
        }
        .comment-content {
            padding: 20px;
            width: 100%;
            height: auto;
            margin-bottom: 15px;
            background-color: rgba(255,255,255,.5);
            box-shadow: 0px 0px 6px rgba(63,74,105,.16);
            border-radius: 3px;
            .comment-form {
                .title {
                    font-size: 18px;
                    padding-bottom: 20px;
                }
            }
            .comment-list {
                .title {
                    font-size: 18px;
                    padding-bottom: 20px;
                }
                .list {
                    width: 100%;
                    li {
                        border-bottom: 1px solid #f1f1f1;
                        padding: 20px 0;
                        .title {
                            font-size: 16px;
                            color: #409EFF;
                        }
                        .text {
                            font-size: 14px;
                            text-indent: 2em;
                        }
                        .timer {
                            margin-left: 20px;
                            font-size: 12px;
                            color: #999999;
                        }
                    }
                }
                .page-wrap {
                    padding: 20px 0 0 0;
                    text-align: center;
                }
            }
        }
    }
    .right-box {
        width: 285px;
    }
}
</style>
