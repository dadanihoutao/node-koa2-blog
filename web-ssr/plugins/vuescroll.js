/**
 * @Author: 阿洋
 * @Last Modified by: ayang
 * @Last Modified time: 2020-02-04 21:50:29
 */

import Vue from 'vue'
import vuescroll from 'vuescroll'
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