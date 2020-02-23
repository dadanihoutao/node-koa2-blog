/**
 * @Author: 阿洋
 * @Last Modified by: ayang
 * @Last Modified time: 2020-02-04 21:50:29
 */

import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Icon,
    Input,
    Page,
    Affix,
    Message,
    LoadingBar,
    Spin
} from 'iview'
// iview基础模块
const components = {
    Button,
    Form,
    FormItem,
    Icon,
    Input,
    Page,
    Affix,
    Message,
    LoadingBar,
    Spin
}

const iviewModule = {
    ...components,
}
// 循环注册全局组件
Object.keys(iviewModule).forEach(key => {
  Vue.component(key, iviewModule[key])
})
Vue.component('yLayout', () => import('@/components/home/layout.vue'))
// 将iview模块挂载到vue对象上去
Vue.prototype.$Loading = LoadingBar
Vue.prototype.$Message = Message
Vue.prototype.$Spin = Spin


