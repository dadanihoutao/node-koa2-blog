/**
 * @Author: 时洋
 * @Last Modified by: shiyang
 * @Last Modified time: 2019-07-19 13:32:26
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    screenHeight: null,
    mainHeight: null,
    tableHeight: null,
    activeMenuName: ''
}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
