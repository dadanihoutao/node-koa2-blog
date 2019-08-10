<template>
    <div class="detail-page">
        <div class="detail-header">
            <h1>测试的大师傅阿斯蒂芬</h1>
            <div class="labels">
                <span class="label">node</span>
                <span>
                    <Icon class="icons" type="ios-person-outline" />
                    张三
                </span>
                <span>
                    <Icon class="icons" type="ios-eye-outline" />
                    123
                </span>
                <span>
                    <Icon class="icons" type="ios-text-outline" />
                    11
                </span>
                <span>
                    <Icon class="icons" type="ios-time-outline" />
                    2019-08-03
                </span>
            </div>
        </div>
        <div class="detail-content">
            asfasfasf
        </div>
        <div class="detail-footer">
            <div class="comment-form">
                <h2 class="title">欢迎评论</h2>
                <div class="form-wrap">
                    <Form class="form" :model="form" label-position="left" :label-width="100" >
                        <FormItem label="昵称">
                            <Input v-model="form.title" placeholder="请输入昵称"></Input>
                        </FormItem>
                        <FormItem label="邮箱">
                            <Input v-model="form.author" placeholder="请输入邮箱（不会被公开）"></Input>
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
            <div class="comment-list">
                <h2 class="title">评论列表</h2>
                <ul class="list">
                    <li v-for="item in 5" :key="item">
                        <p class="title">
                            <Icon class="icons" type="ios-chatboxes-outline" />
                            来自「张三」的评论：
                        </p>
                        <p class="text">
                            asdas地方撒是发顺丰大上发大水发安抚阿萨法是否啊阿斯蒂芬安抚阿萨法
                        </p>
                    </li>
                </ul>
                <div class="page-wrap">
                    <Page></Page>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
const formParams = {
    title: '',
    author: '',
    content: ''
}
export default {
    name: 'detailpage',
    data () {
        return {
            form: _.cloneDeep(formParams),
            imgFile: {}
        }
    },
    created () {},
    methods: {
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
        handleSubmit () {}
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
