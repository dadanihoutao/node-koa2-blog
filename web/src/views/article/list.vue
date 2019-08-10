<template>
    <div class="content-wrap">
        <div class="content-list">
            <div class="list-header">
                <Button class="active" type="text"><Icon class="icons" type="ios-bulb-outline" />最新</Button>
                <Button type="text"><Icon class="icons" type="md-bulb" />最热</Button>
            </div>
            <div class="list-main">
                <ul class="artical-list">
                    <li class="clearfix" v-for="item in 10" :key="item" @click="jumpDetail(item)">
                        <div class="left-box">
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
                        <div class="right-box">
                            <img :src="defaultImg" alt="">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="list-footer">
                <Page></Page>
            </div>
        </div>
        <div class="sidebar">
            <div class="classfiy">
                <div class="classfiy-header">
                    <Icon class="icons" type="ios-pricetag-outline" />
                    <h2>分类</h2>
                </div>
                <ul class="list">
                    <li>全部文章</li>
                    <li><Button type="text">javascrpt(1)</Button></li>
                    <li><Button type="text">javascrpt(1)</Button></li>
                    <li><Button type="text">javascrpt(1)</Button></li>
                    <li><Button type="text">javascrpt(1)</Button></li>
                    <li><Button type="text">javascrpt(1)</Button></li>
                </ul>
            </div>
            <div class="link-list">
                <div class="link-header">
                    <Icon class="icons" type="ios-shuffle" />
                    <h2>外部链接</h2>
                </div>
                <ul class="list">
                    <li><Button type="text">github</Button></li>
                    <li><Button type="text">简书</Button></li>
                    <li><Button type="text">CSDN博客</Button></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            total: '',
            page: 1,
            pageSize: 10,
            defaultImg: require('@/assets/images/default-img.jpg')
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            let params = {
                page: this.page,
                pageSize: this.pageSize
            }
            this.$get('/api/article/list', params).then(res => {
                if (res.code === 200) {
                    console.log(res)
                } else {
                    this.$Message.error(res.msg)
                }
            })
        },
        jumpDetail (val) {
            console.log(val)
            this.$router.push({
                path: '/detail',
                query: {id: val}
            })
        }
    }
}
</script>
<style lang="less">
.content-wrap {
    width: 1180px;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    .content-list {
        background-color: #ffffff;
        width: 930px;
        .list-header {
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #f1f1ff;
            line-height: 50px;
            .icons {
                font-size: 18px;
                margin-top: -5px;
                margin-right: 5px;
            }
            button {
                font-size: 14px;
                &:focus {
                    box-shadow: none;
                }
            }
        }
        .list-main {
            width: 100%;
            .artical-list {
                width: 100%;
                li {
                    padding: 20px;
                    border-bottom: 1px solid #f1f1f1;
                    .left-box {
                        float: left;
                        width: 80%;
                        position: relative;
                        h1 {
                            font-size: 18px;
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
                    .right-box {
                        float: right;
                        width: 20%;
                        text-align: right;
                        img {
                            width: 69px;
                            height: 69px;
                            border-radius: 5px;
                        }
                    }
                    &:hover {
                        background-color: #f1f1f1;
                    }
                }
            }
        }
        .list-footer {
            padding: 20px;
            text-align: center;
        }
    }
    .sidebar {
        width: 240px;
        .link-list,
        .classfiy {
            width: 100%;
            background-color: #ffffff;
            margin-bottom: 10px;
            .link-header,
            .classfiy-header {
                height: 50px;
                border-bottom: 1px solid #f1f1f1;
                line-height: 50px;
                .icons {
                    padding-left: 20px;
                    font-size: 20px;
                    float: left;
                    margin-top: 15px;
                    margin-right: 10px;
                }
                h2 {
                    float: left;
                }
            }
            .list {
                width: 100%;
                padding: 10px 0;
                li {
                    height: 30px;
                    line-height: 30px;
                    padding: 0 20px;
                    cursor: pointer;
                    button {
                        padding: 0;
                        &:focus {
                            box-shadow: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
