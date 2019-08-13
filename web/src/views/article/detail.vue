<template>
    <div class="detail-page">
        <div class="detail-header">
            <h1>{{ data.title }}</h1>
            <div class="labels">
                <span class="label">{{ data.category_name }}</span>
                <span>
                    <Icon class="icons" type="ios-person-outline" />
                    {{ data.author }}
                </span>
                <span>
                    <Icon class="icons" type="ios-eye-outline" />
                    {{ data.browse }}
                </span>
                <span>
                    <Icon class="icons" type="ios-text-outline" />
                    {{ data.comments_sum }}
                </span>
                <span>
                    <Icon class="icons" type="ios-time-outline" />
                    {{ data.created_at }}
                </span>
            </div>
        </div>
        <div class="detail-content">
            <div v-html="readmeContent"></div>
        </div>
        <div class="detail-footer">
            <div class="comment-form">
                <h2 class="title">欢迎评论</h2>
                <div class="form-wrap">
                    <Form ref="form" class="form" :model="form" :rules="ruleInline" label-position="left" :label-width="100" >
                        <FormItem label="昵称" prop="nickname">
                            <Input v-model="form.nickname" placeholder="请输入昵称"></Input>
                        </FormItem>
                        <FormItem label="邮箱" prop="email">
                            <Input v-model="form.email" placeholder="请输入邮箱（不会被公开）"></Input>
                        </FormItem>
                        <FormItem label="内容">
                            <mavon-editor
                                placeholder="请输入评论内容"
                                v-model="form.content"
                                ref="md"
                                @imgAdd="handleEditorImgAdd"
                                @imgDel="handleEditorImgDel"
                            />
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
</template>
<script>
import _ from 'lodash'
import marked from 'marked'
const formParams = {
    nickname: '',
    email: '',
    content: '',
    article_id: ''
}
export default {
    name: 'detailpage',
    data () {
        return {
            total: 0,
            page: 1,
            pageSize: 5,
            form: _.cloneDeep(formParams),
            imgFile: {},
            data: {},
            readmeContent: '',
            commentsList: [],
            ruleInline: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blue' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blue' },
                    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                ]
            }
        }
    },
    created () {
        this.id = this.$route.query.id
        if (this.id) {
            this.getDetail()
        }
    },
    computed: {
    },
    methods: {
        getDetail () {
            this.$get('/api/article/detail/' + this.id).then(res => {
                if (res.code === 200) {
                    this.data = res.data
                    this.readmeContent = marked(res.data.content || '', {
                        sanitize: true
                    })
                    this.getCommentsList()
                } else {
                    this.$Message.error(res.msg)
                }
            })
        },
        getCommentsList () {
            let params = { page: this.page, pageSize: this.pageSize, id: this.data.id }
            this.$get('/api/comments/list', params).then(res => {
                if (res.code === 200) {
                    this.commentsList = res.data
                    this.page = res.page.curPage
                    this.total = res.page.total
                } else {
                    this.$Message.error(res.msg)
                }
            })
        },
        handleEditorImgAdd (pos, $file) {
            let formdata = new FormData()
            formdata.append('file', $file)
            this.imgFile[pos] = $file
            // 参考博客 https://www.jianshu.com/p/bcf19f69ee4f   以后有时间了要整理下
            let instance = this.$axios.create({
                withCredentials: true,
                headers: {
                    Authorization: 'Bearer ' + this.$Lockr.get('token')
                }
            })
            instance.post('/api/upload/fileds', formdata).then(res => {
                if (res.data.code === 200) {
                    this.$Message.success('上传成功')
                    let url = res.data.data
                    let name = $file.name
                    let content = this.form.content
                    if (content.includes(name)) {
                        let oStr = `(${pos})`
                        let nStr = `(${url})`
                        let index = content.indexOf(oStr)
                        let str = content.replace(oStr, '')
                        let insertStr = (soure, start, newStr) => {
                            return soure.slice(0, start) + newStr + soure.slice(start)
                        }
                        this.form.content = insertStr(str, index, nStr)
                    }
                } else {
                    this.$Message.error(res.data.msg)
                }
            })
        },
        handleReset () {
            this.form = _.cloneDeep(formParams)
            this.imgFile = {}
        },
        handleEditorImgDel (pos) {
            delete this.imgFile[pos]
        },
        handleSubmit () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let params = _.cloneDeep(this.form)
                    params.article_id = this.data.id
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
        changePage (page) {
            this.page = page
            this.getCommentsList()
        }
    }
}
</script>
<style lang="less">
.detail-page {
    width: 1180px;
    margin: 10px auto;
    padding: 20px;
    background-color: #ffffff;
    .detail-header {
        width: 100%;
        h1 {
            font-size: 28px;
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
                margin: 0 10px;
                .icons {
                    font-size: 16px;
                }
                margin-top: 27px;
            }
        }
    }
    .detail-content {
        padding: 30px 0;
        min-height: 200px;
        div {
           p {
               font-size: 16px;
               line-height: 36px;
           }
           img {
               width: 500px;
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
    .detail-footer {
        .comment-form {
            .title {
                font-size: 22px;
                color: #409EFF;
                padding: 20px 0;
            }
        }
        .comment-list {
            .title {
                font-size: 22px;
                color: #409EFF;
                padding: 20px 0;
            }
            .list {
                width: 100%;
                li {
                    border-bottom: 1px solid #f1f1f1;
                    padding-bottom: 20px;
                    .title {
                        font-size: 16px;
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
</style>
