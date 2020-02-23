<template>
    <div class="list-page">
    </div>
</template>
<script>
export default {
    layout: 'default',
    data () {
        return {}
    },
    beforeCreate () {
        this.$router.push({
            path: '/article'
        })
    }
}
</script>
