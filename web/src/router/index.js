/**
 * @Author: 时洋
 * @Last Modified by: shiyang
 * @Last Modified time: 2019-07-19 23:43:46
 */
import Vue from 'vue'
import Router from 'vue-router'
import Lockr from 'lockr'
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
    let fullName = (firstName === 'error' || !firstName) ? lastName : (firstName + lastName.charAt(0).toUpperCase() + lastName.slice(1))
    if (arr[arr.length - 2] !== 'common') {
        let rPath = ''
        if (path.includes('home') || path.includes('list') || path.includes('admin')) {
            rPath = path.split('/')[0]
        } else {
            rPath = path
        }
        routesArr.push({
            path: '/' + rPath,
            name: fullName,
            display: true,
            meta: {
                auth: true,
                group: path.split('/')[0] ? path.split('/')[0] : rPath,
                module: rPath.includes('/update') ? `/${rPath.split('/')[0]}` : `/${rPath}`
            },
            component: resolve => require([`@/views/${path}.vue`], resolve)
        })
    }
})
routesArr.push({
    path: '/*',
    display: true,
    redirect: {name: '404'}
})

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: (resolve) => require(['@/views/common/login.vue'], resolve)
    },
    {
        path: '/register',
        name: 'register',
        component: (resolve) => require(['@/views/common/register.vue'], resolve)
    },
    {
        path: '/layout',
        name: 'layout',
        meta: {
            auth: true,
            title: '主页'
        },
        component: (resolve) => require([ '@/views/common/layout.vue' ], resolve),
        redirect: { name: 'home' },
        children: routesArr
        // children: [
        //     {
        //         path: '/home',
        //         name: 'home',
        //         meta: { auth: true, title: '首页' },
        //         component: (resolve) => require([ '@/views/home/home.vue' ], resolve)
        //     },
        //     // 管理员 todo
        //     {
        //         path: '/admin',
        //         name: 'admin',
        //         meta: { auth: true, title: '管理员 - 列表' },
        //         component: (resolve) => require([ '@/views/admin/admin.vue' ], resolve)
        //     },
        //     // 分类管理
        //     {
        //         path: '/category',
        //         name: 'category',
        //         meta: { auth: true, title: '分类 - 列表' },
        //         component: (resolve) => require([ '@/views/category/list.vue' ], resolve)
        //     },
        //     {
        //         path: '/category/create',
        //         name: 'category/create',
        //         meta: { auth: true, title: '分类 - 创建' },
        //         component: (resolve) => require([ '@/views/category/create.vue' ], resolve)
        //     },
        //     {
        //         path: '/category/update/:id',
        //         name: 'category/update',
        //         meta: { auth: true, title: '分类 - 更新' },
        //         component: (resolve) => require([ '@/views/category/update.vue' ], resolve)
        //     },
        //     // 文章管理
        //     {
        //         path: '/article',
        //         name: 'article',
        //         meta: { auth: true, title: '文章 - 列表' },
        //         component: (resolve) => require([ '@/views/article/list.vue' ], resolve)
        //     },
        //     {
        //         path: '/article/create',
        //         name: 'article/create',
        //         meta: { auth: true, title: '文章 - 创建' },
        //         component: (resolve) => require([ '@/views/article/create.vue' ], resolve)
        //     },
        //     {
        //         path: '/article/update',
        //         name: 'article/update',
        //         meta: { auth: true, title: '文章 - 更新' },
        //         component: (resolve) => require([ '@/views/article/update.vue' ], resolve)
        //     },
        //     // 评论管理
        //     {
        //         path: '/comments',
        //         name: 'comments',
        //         meta: { auth: true, title: '评论 - 列表' },
        //         component: (resolve) => require([ '@/views/comments/list.vue' ], resolve)
        //     }
        // ]
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
    // 限制如果没有token 就跳转登录页面
    if (to.meta.auth) {
        if (Lockr.get('token')) {
            next()
        } else {
            next({path: '/login'})
        }
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router
