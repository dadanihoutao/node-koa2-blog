<template>
    <div class="header">
        <div class="center-wrap">
            <div class="logo">blog</div>
            <div class="btns">
                <Button @click="jumpPage('/article')" type="text" class="active"><Icon class="icons" type="md-book" />文章</Button>
                <Button @click="jumpPage('/about')"  type="text"><Icon class="icons" type="ios-chatbubbles-outline" />关于</Button>
            </div>
            <div class="search-input">
                <Input v-model="searchVal" placeholder="请输入搜索内容">
                    <Icon type="ios-search" slot="prefix" />
                </Input>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'homeheader',
    data () {
        return {
            searchVal: ''
        }
    },
    created () {},
    methods: {
        jumpPage (path) {
            this.$router.push({path: path})
        }
    }
}
</script>
<style lang="less">
.header {
    width: 100%;
    height: 70px;
    box-shadow: 0.053333rem 0.053333rem 0.053333rem rgba(0, 0, 0, 0.03);
    border-bottom: 0.013333rem solid #f0f0f0;
    background-color: #ffffff;
    .center-wrap {
        width: 1180px;
        margin: 0 auto 0;
        display: flex;
        align-items: center;
        .logo {
            font-size: 20px;
            line-height: 70px;
            margin-right: 60px;
        }
        .btns {
            .icons {
                font-size: 18px;
                margin-right: 5px;
            }
            button {
                font-size: 16px;
                &:focus {
                    box-shadow: none;
                }
            }
        }
        .search-input {
            margin-left: 20px;
            input {
                width: 400px;
            }
        }
    }
}
</style>
