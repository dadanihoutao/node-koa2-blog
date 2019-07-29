<!--
 * @Author: 时洋
 * @pageName: 'yImg  展示图片'
 * @Last Modified by:   时洋
 * @Last Modified time: 2019-02-01 10:56:56
   @props   src 图片地址
            width 需要固定宽高时用
            height 需要固定宽高时用
 -->
<template>
    <img :src="src" @error="imgError" :width="width" :height="height" />
</template>
<script>
export default {
    props: {
        src: {
            type: String
        },
        width: {
            type: [String, Number]
        },
        height: {
            type: [String, Number]
        }
    },
    data () {
        return {
            defaultImg: require('@/assets/images/defaultImg.png')
        }
    },
    methods: {
        imgError (e) {
            let img = e.target
            img.src = this.defaultImg
            img.error = null
        }
    }
}
</script>
