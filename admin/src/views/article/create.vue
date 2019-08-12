<template>
    <div class="admin-article-create">
        <Form class="form" :model="form" label-position="left" :label-width="100" >
            <FormItem label="文章标题" style="width: 600px">
                <Input v-model="form.title" placeholder="文章标题"></Input>
            </FormItem>
            <FormItem label="文章作者" style="width: 600px">
                <Input v-model="form.author" placeholder="文章作者"></Input>
            </FormItem>
            <FormItem label="文章分类" style="width:600px">
                <Select v-model="form.category_id" placeholder="选择分类">
                    <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="文章封面">
                <Upload
                    class="upload-img"
                    :headers="headers"
                    :show-upload-list="false"
                    multiple
                    :format="['jpg','png','gif']"
                    type="drag"
                    action="/api/upload/fileds"
                    :on-success="handleUploadSuccess"
                    :on-format-error="handleUploadFormatError"
                >
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或者拖拽上传</p>
                    </div>
                </Upload>
                <div class="success-img">
                    <img v-if="imgUrl" :src="imgUrl" alt="">
                </div>
            </FormItem>
            <FormItem label="文章内容">
                <mavon-editor
                    v-model="form.content"
                    ref="md"
                    @imgAdd="handleEditorImgAdd"
                    @imgDel="handleEditorImgDel"
                />
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit()">提交</Button>
                <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import _ from 'lodash'
const formParams = {
    title: '',
    author: '',
    content: '',
    category_id: null,
    cover: ''
}
export default {
    data () {
        return {
            form: _.cloneDeep(formParams),
            category: '',
            categoryList: [],
            headers: {},
            imgUrl: '',
            imgFile: {}
        }
    },
    created () {
        this.categorydata()
        this.headers = {
            Authorization: 'Bearer ' + this.$Lockr.get('token')
        }
    },
    methods: {
        categorydata () {
            this.$get('/api/category/list').then(res => {
                if (res.code === 200) {
                    this.categoryList = res.data
                } else {
                    this.$Message.error(res.msg)
                }
            })
        },
        handleUploadSuccess (res, file, fileList) {
            console.log(res.data)
            this.imgUrl = res.data
        },
        handleUploadFormatError () {
            this.$Message.error('请上传 jpg, png, gif 格式文件')
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
                    console.log(res.data.data)
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
            this.imgUrl = ''
            this.imgFile = {}
        },
        handleEditorImgDel (pos) {
            delete this.imgFile[pos]
        },
        handleSubmit () {
            let params = _.cloneDeep(this.form)
            params.cover = this.imgUrl
            this.$post('/api/article/add', params).then(res => {
                if (res.code === 200) {
                    this.$Message.success('添加成功')
                } else {
                    this.$Message.error(res.msg)
                }
            })
        }
    }
}
</script>
<style lang="less">
.admin-article-create {
    width: 100%;
    height: 100%;
    padding: 30px;
    background-color: #ffffff;
    overflow: auto;
    .upload-img {
        float: left;
        width: 500px;
    }
    .success-img {
        float: left;
        width: 300px;
        height: 125px;
        margin-left: 10px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
