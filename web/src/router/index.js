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
    // 首页
    {
        path: '/',
        component: (resolve) => require([ '@/views/layout/layout.vue' ], resolve),
        redirect: { name: 'article' },
        children: [
            {
                path: '/article',
                name: 'article',
                component: (resolve) => require([ '@/views/article/list.vue' ], resolve)
            },
            // 文章详情
            {
                path: '/detail/:id',
                name: 'detail',
                component: (resolve) => require([ '@/views/article/detail.vue' ], resolve)
            },
            // 关于
            {
                path: '/about',
                name: 'about',
                component: (resolve) => require([ '@/views/about/index.vue' ], resolve)
            },
            {
                path: '/*',
                display: true,
                redirect: {name: '404'}
            },
            {
                path: '/error/404',
                name: '404',
                component: (resolve) => require([ '@/views/error/404.vue' ], resolve)
            }
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
