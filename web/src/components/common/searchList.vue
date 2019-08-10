<template>
    <div class="searchList">
        <div class="searchList-toolbar">
            <Input :placeholder="placeholder" search v-model="searchName" @on-search="getData()" />
        </div>
        <div class="searchList-content">
            <vue-scroll>
                <ul ref="searchList">
                    <li v-if="!listdisplay" class="notData">哎呦，没找到！<i v-if="!isGetData" @click="getData()" class="check-continue">再去查一下</i></li>
                    <li v-else-if="listdisplay" v-for="(list, index) in listData" class="list" :key="index" @click="setItemObj($event, list)" @dblclick="submitData">
                        <p class="list-left">
                            <Icon v-if="iconSex" type="md-person" :class="iconClass(list.sex)" />
                            <span>{{ list[showName] }}</span>
                        </p>
                        <p class="list-right">
                            {{list[other]}}
                        </p>
                    </li>
                </ul>
            </vue-scroll>
        </div>
        <div v-if="hasPage" class="searchList-footer page-wrapper">
            <Page :total="total" :page-size="pageSize" size="small" :current="currentPage" show-elevator @on-change="changePage" />
        </div>
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=36 class="spin-icon-load"></Icon>
        </Spin>
    </div>
</template>
<script>
export default {
    name: 'searchList',
    props: {
        params: {
            type: Object,
            default: () => { }
        },
        name: {
            type: String,
            default: 'name'
        },
        showName: {
            type: String,
            default: 'name'
        },
        iconSex: {
            type: Boolean,
            default: false
        },
        other: {
            type: String,
            default: 'other'
        },
        url: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: '请输入查询名称'
        },
        hasPage: {
            type: Boolean,
            default: true
        },
        isGetData: {
            type: Boolean,
            default: false
        },
        nothingness: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            searchName: '',
            itemObj: {},
            listdisplay: true,
            spinShow: false,
            listData: [],
            total: 20,
            pageSize: 20,
            currentPage: 1
        }
    },
    watch: {
        url: {
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    if (this.isGetData) {
                        this.getData()
                    }
                }
            },
            immediate: true
        }
    },
    methods: {
        iconClass (sex) {
            return 'color-sex' + sex
        },
        setItemObj (e, item) {
            this.itemObj = item
            if (this.$refs.searchList.querySelector('.list-selected')) {
                this.$refs.searchList.querySelector('.list-selected').className = 'list'
            }
            if (e.target.className === 'list') {
                e.target.className = 'list list-selected'
            } else if (e.target.parentNode.className === 'list') {
                e.target.parentNode.className = 'list list-selected'
            }
        },
        clearSelected () {
            this.itemObj = {}
            if (this.$refs.searchList.querySelector('.list-selected')) {
                this.$refs.searchList.querySelector('.list-selected').className = 'list'
            }
        },
        changePage (page) {
            this.getData(page)
        },
        getData (page = 1) {
            let params = this.params ? this.params : {}
            params[this.name] = this.searchName
            if (!this.isGetData && this.searchName === '') {
                this.$Message.error('请输入要查找的名称！')
            } else {
                this.spinShow = true
                let url = this.hasPage ? this.url + page : this.url
                this.$post(url, params).then((res) => {
                    if (res.code === 200) {
                        this.listData = res.data
                        if (this.listData.length === 0) {
                            this.listdisplay = false
                        } else {
                            this.listdisplay = true
                        }
                        this.spinShow = false
                        if (this.hasPage) {
                            this.total = res.total
                            this.currentPage = res.current_page
                        }
                        if (this.nothingness) {
                            let item = {}
                            item[this.showName] = '无'
                            item[this.other] = ''
                            this.listData.unshift(item)
                        }
                    } else {
                        this.$Message.error('数据获取失败')
                        this.listdisplay = false
                        this.spinShow = false
                    }
                }).then(() => {
                    this.$nextTick(() => {
                        this.clearSelected()
                    })
                })
            }
        },
        initSubmitData () {
            return this.itemObj
        },
        submitData () {
            if (Object.keys(this.itemObj).length !== 0) {
                this.$emit('emitData', this.itemObj)
            } else {
                this.$Message.error('请选择一条数据')
            }
        }
    }
}
</script>
<style lang="less">
.searchList {
    padding: 10px 10px 0 10px;
    &-content {
        height: 390px;
        font-size: 14px;
        margin-top: 15px;
        .notData {
            height: 50px;
            line-height: 50px;
            text-align: center;
            .check-continue {
                cursor: pointer;
                color: #2d8cf0;
            }
        }
        .list {
            padding: 10px;
            border-bottom: 1px solid #e8eaec;
            display: flex;
            justify-content: space-between;
            &.list-selected {
                color: #2d8cf0;
                background: #f0faff;
            }
            &:hover {
                background: #f0faff;
                cursor: pointer;
            }
        }
    }
    &-footer {
        padding: 10px 0 0 0;
    }
}
</style>
