<!--
 * @Author: 时洋
 * @pageName: 'tooltipCell  超出显示全部内容'
 * @Last Modified by:   时洋
 * @Last Modified time: 2019-04-18 13:26:56
   @props   theme 主题色
            content 显示内容
            maxWidth 最大宽度
 -->
<template>
    <Tooltip transfer :theme="theme" :content="content" :disabled="!showTooltip" :max-width="maxWidth" class="tooltipCell">
        <span ref="content" @mouseenter="handleTooltipIn" @mouseleave="handleTooltipOut" class="tooltipCell-content">{{content}}</span>
    </Tooltip>
</template>
<script>
export default {
    name: 'tooltipCell',
    props: {
        theme: {
            type: String,
            default: 'light'
        },
        content: {
            type: String
        },
        maxWidth: {
            type: [String, Number],
            default: 300
        }
    },
    data () {
        return {
            showTooltip: false
        }
    },
    methods: {
        handleTooltipIn () {
            const $content = this.$refs.content
            this.showTooltip = $content.scrollWidth > $content.offsetWidth
        },
        handleTooltipOut () {
            this.showTooltip = false
        }
    }
}
</script>
<style lang="less">
.tooltipCell {
    width: 100%;
    line-height: 1;
    vertical-align: middle;
    &-content {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
