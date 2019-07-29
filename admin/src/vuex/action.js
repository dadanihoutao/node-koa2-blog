/**
 * @Author: 时洋
 * @Last Modified by: shiyang
 * @Last Modified time: 2019-07-19 16:58:36
 */
export default {
    setTableHeight ({ commit, state }, val) {
        state.tableHeight = val - 3
    },
    setMainHeight ({ commit, state }, val) {
        state.mainHeight = val - 3
    },
    setScreenHeight ({ commit, state }, val) {
        state.screenHeight = val - 3
    },
    setActiveMenuName ({ commit, state }, val) {
        state.activeMenuName = val
    }
}
