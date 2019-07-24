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

const routes = [
    {
        path: '/login',
        name: 'login',
        component: (resolve) => require(['@/views/login/login.vue'], resolve)
    },
    {
        path: '/register',
        name: 'register',
        component: (resolve) => require(['@/views/register/register.vue'], resolve)
    },
    {
        path: '/home',
        name: 'home',
        component: (resolve) => require([ '@/views/home/home.vue' ], resolve),
        children: [
        ]
    },
    {
        path: '*',
        redirect: { name: '404' }
    },
    {
        path: '/*',
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
