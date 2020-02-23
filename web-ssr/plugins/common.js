/**
 * @Author: 阿洋
 * @Last Modified by: ayang
 * @Last Modified time: 2020-02-04 21:50:29
 */

import Vue from 'vue'
import Lockr from 'lockr'
import { post, get, doDelete, deleteOne, put } from '@/libs/request'
const commonConfig = {
  install (Vue) {
    // 定义全局变量
    Vue.prototype.$host = process.env.HOSTURL
    Vue.prototype.$imgHost = 'https://res.qiaolu.com/'
    Vue.prototype.$post = post
    Vue.prototype.$get = get
    Vue.prototype.$delete = doDelete
    Vue.prototype.$deleteOne = deleteOne
    Vue.prototype.$put = put
    Vue.prototype.$Lockr = Lockr
    Vue.prototype.$Bus = new Vue()
  }
}
Vue.use(commonConfig)
