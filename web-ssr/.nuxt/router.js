import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5fa74859 = () => interopDefault(import('../pages/about/index.vue' /* webpackChunkName: "pages/about/index" */))
const _a7e36b7c = () => interopDefault(import('../pages/article/index.vue' /* webpackChunkName: "pages/article/index" */))
const _08fb2abc = () => interopDefault(import('../pages/article/detail/_id.vue' /* webpackChunkName: "pages/article/detail/_id" */))
const _0fe6351b = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _5fa74859,
    name: "about"
  }, {
    path: "/article",
    component: _a7e36b7c,
    name: "article"
  }, {
    path: "/article/detail/:id?",
    component: _08fb2abc,
    name: "article-detail-id"
  }, {
    path: "/",
    component: _0fe6351b,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
