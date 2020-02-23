/**
 * @Author: 阿洋
 * @Last Modified by: ayang
 * @Last Modified time: 2020-02-04 21:50:29
 */

export default ({ app }) => {
    app.router.beforeEach((to, from, next) => {
        // console.log(to.path)
        // 这里拦截重定向的能成功，但是报错，
        // if (to.path === '/') {
        //     next({
        //         path: '/article'
        //     })
        // } else {
        //     next()
        // }
        next()
    })
}