/**
 * @Author: 阿洋
 * @Last Modified by: ayang
 * @Last Modified time: 2020-02-04 21:50:29
 * 注意事项，调用axios的请求方法，参数统一用对象包裹 名字为 params {params}
 */

import qs from 'qs'
// import iView from 'iview'
import { Message } from 'iview'

export default function ({ $axios, redirect, app }) {
    $axios.defaults.timeout = 30000
    // http request
    $axios.onRequest((config) => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // 请求头参数处理
        config.headers['Authorization'] = 'Bearer undefined'
        config.data = qs.stringify(config.data)
        return config
    }, (error) => {
        return Promise.reject(error)
    })
    // http response
    $axios.onResponse((res) => {
        if (res.status && res.status === 200) {
            if (res.data.code === 101) {
                if (process.client) {
                    Message.error('未登录，或登录失效，请登录')
                }
            }
        }
        return res
    }, (error) => {
        if (!error.response && error.message) {
            if (process.client) {
                Message.error('请求超时，请检查网络，刷新后重试')
            }
        } else {
            if (process.client) {
                Message.error('系统错误')
            }
        }
        return Promise.reject(error)
    })

    // 请求错误
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/404')
        } else if (code === 500) {
            redirect('/500')
        }
    })
}