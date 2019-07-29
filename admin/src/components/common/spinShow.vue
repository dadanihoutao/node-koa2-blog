<template>
    <Spin fix v-if="show">
        <Icon type="ios-loading" size=36 class="spin-icon-load"></Icon>
    </Spin>
</template>
<script>
export default {
    name: 'ySpinShow',
    props: {
        show: {
            type: Boolean,
            default: false,
            required: true
        }
    }
}
</script>
