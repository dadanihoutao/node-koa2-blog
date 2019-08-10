// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import Lockr from 'lockr'
import vuescroll from 'vuescroll'
import './iview'
import './assets/less/index.less'
import './assets/font/iconfont.css'
// 富文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
import { post, get, doDelete, deleteOne, put } from './libs/http'

// 定义全局变量
Vue.prototype.$imgHost = 'https://res.qiaolu.com/'
Vue.prototype.$axios = axios
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$delete = doDelete
Vue.prototype.$deleteOne = deleteOne
Vue.prototype.$put = put
Vue.prototype.$Lockr = Lockr
Vue.prototype.$Bus = new Vue()

Vue.config.productionTip = false

Vue.use(mavonEditor)
Vue.use(vuescroll, {
    ops: {
        scrollPanel: {
            initialScrollY: 0,
            initialScrollX: 0,
            scrollingX: false
        },
        bar: {
            background: '#ddd'
        }
    }
})
/* eslint-disable no-new */
new Vue({
    el: '#admin',
    router,
    store,
    components: { App },
    template: '<App/>'
})
