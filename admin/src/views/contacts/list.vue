<template>
    <y-layout title="客户" class="contactsList">
        <template slot="sidebar">
        </template>
        <template slot="toolbarTop">
            <Input class="toolbar-top-search" placeholder="搜点什么..." clearable />
        </template>
        <div slot="content" class="table-page-wrapper">
        </div>
    </y-layout>
</template>
<script>
export default {
    name: 'contactsList',
    data () {
        return {
        }
    },
    computed: {
    },
    created () {
    },
    methods: {
    }
}
</script>
<style lang="less">
.contactsList {
}
</style>
