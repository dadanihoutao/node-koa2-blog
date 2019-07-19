<!--
 * @Author: 时洋
 * @pageName: 'singleUpload  上传单个图片'
 * @Last Modified by:   时洋
 * @Last Modified time: 2019-01-21 10:36:56
 * @events  @initData  初始化图片
   @props   name 上传识别名
            action 请求地址
            data 其他传参
            url 图片地址
            title 图片title
            width 容器宽度
            height 容器高度
 -->
<template>
    <div class="y-single-upload-wrapper" :class="{'ctrl-upload': hasImg}">
        <div class="y-single-upload-list" :style="uploadListStyle">
            <template v-if="uploadImg !== ''">
                <img :src="uploadData" :title="title" :width="width" :height="height">
            </template>
        </div>
        <Upload ref="upload" class="y-single-upload-main" :style="{width: `${this.width}px`}" :name="name" :data="data" :show-upload-list="false" :on-success="handleSuccess" :action="action" :headers="headers">
            <div class="y-single-upload-button" :style="uploadButtonStyle">
                <Icon type="ios-camera" size="20"></Icon>
            </div>
        </Upload>
    </div>
</template>
<script>
export default {
    name: 'singleUpload',
    props: {
        name: {
            type: String,
            default: ''
        },
        action: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
            default: () => { }
        },
        url: {
            type: String,
            default: undefined
        },
        title: {
            type: String,
            default: '头像'
        },
        width: {
            type: String,
            default: '60'
        },
        height: {
            type: String,
            default: '60'
        }
    },
    data () {
        return {
            hasImg: false,
            uploadData: '',
            uploadImg: '',
            headers: {}
        }
    },
    computed: {
        uploadListStyle () {
            return {
                width: `${parseFloat(this.width) + 2}px`,
                height: `${parseFloat(this.height) + 2}px`,
                lineHeight: `${this.height}px`
            }
        },
        uploadButtonStyle () {
            return {
                width: `${this.width}px`,
                height: `${this.height}px`,
                lineHeight: `${this.height}px`
            }
        }
    },
    watch: {
        url: {
            handler (curVal, oldVal) {
                this.initData(curVal)
            },
            immediate: true
        }
    },
    created () {
        this.headers = {
            authKey: this.$Lockr.get('authKey'),
            sessionId: this.$Lockr.get('sessionId')
        }
    },
    methods: {
        initData (src) {
            if (src) {
                this.hasImg = true
                this.uploadImg = src
                this.uploadData = this.$imgHost + src
            } else {
                this.hasImg = false
                this.uploadImg = ''
                this.uploadData = ''
            }
        },
        handleSuccess (res, file) {
            this.hasImg = true
            if (res.code === 200) {
                this.uploadImg = res.data.filestr
                this.uploadData = this.$imgHost + res.data.filestr
                this.$emit('uploadData', res.data)
            } else {
                this.$Message.error('上传失败')
            }
        },
        handleFormatError (file) {
            this.$Message.error('请选择jpg、jpeg、png、gif格式的文件')
        },
        handleMaxSize (file) {
            this.$Message.error('图片文件太大，已超过2M')
        }
    }
}
</script>
<style lang="less">
.y-single-upload-wrapper {
    position: relative;
    &.ctrl-upload {
        .y-single-upload-main {
            display: none;
        }
        &:hover {
            .y-single-upload-main {
                display: block;
            }
        }
    }
    .y-single-upload-list {
        position: relative;
        display: inline-block;
        width: 62px;
        height: 62px;
        text-align: center;
        line-height: 60px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        margin-right: 4px;
        img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 100%;
            border-radius: 4px;
        }
    }
    .y-single-upload-main {
        position: absolute;
        top: 0;
        left: 0;
        width: 60px;
        .ivu-upload {
            position: relative;
            color: rgba(0, 0, 0, 0.6);
            background: rgba(255, 255, 255, 0.6);
            border: 1px solid #dcdee2;
            border-radius: 4px;
            text-align: center;
            overflow: hidden;
            transition: border-color 0.2s ease;
            cursor: pointer;
        }
        .y-single-upload-button {
            width: 60px;
            height: 60px;
            line-height: 60px;
        }
    }
}
</style>
