/**
 * @Author: 时洋
 * @Last Modified by: shiyang
 * @Last Modified time: 2019-07-19 23:43:46
 */
import Vue from 'vue'
import Router from 'vue-router'
// import Lockr from 'lockr'
import { LoadingBar } from 'iview'

Vue.use(Router)
const files = require.context('@/views', true, /\.vue$/)
let filenames = files.keys()
const routesArr = []
// 各种子页面
filenames.map((obj, index) => {
    let path = obj.replace(/^\.\//, '').replace(/\.(vue)$/, '')
    let arr = path.split('/')
    let firstName = arr[arr.length - 2]
    let lastName = arr[arr.length - 1]
    let fullName = firstName === 'error' || !firstName ? lastName : firstName + lastName.charAt(0).toUpperCase() + lastName.slice(1)
    if (arr[arr.length - 2] !== 'common') {
        routesArr.push({
            path: '/' + path,
            name: fullName,
            display: true,
            component: (resolve) => require([ `@/views/${path}.vue` ], resolve)
        })
    }
})

routesArr.push({
    path: '/*',
    display: true,
    redirect: { name: '404' }
})
const routes = [
    {
        path: '/home',
        name: 'home',
        display: true,
        component: (resolve) => require([ '@/views/common/home.vue' ], resolve),
        redirect: { name: 'contactsList' },
        children: routesArr
    },
    {
        path: '/',
        display: true,
        redirect: { name: 'home' }
    },
    {
        path: '*',
        display: true,
        redirect: { name: '404' }
    }
]
const router = new Router({
    // mode: 'history',
    // base: '/vuep/',
    routes: routes
})
router.beforeEach((to, from, next) => {
    LoadingBar.start()
    next()
})

router.afterEach((to, from) => {
    LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router
