// search模块小仓库
import { reqGetSearchInfo } from '@/api'
export default {
    namespaced: true,
    actions: {
        async getSearchInfo({ commit }, params = {}) {
            let res = await reqGetSearchInfo(params)
            if (res.code === 200) {
                commit('GETSEARCHINFO', res.data)
            }
        }
    },
    mutations: {
        GETSEARCHINFO(state, searchInfo) {
            state.searchInfo = searchInfo
        }
    },
    state: {
        searchInfo: {}
    },
    getters: {
        goodsList(state) {
            return state.searchInfo.goodsList || {}
        },
        attrsList(state) {
            return state.searchInfo.attrsList || {}
        },
        trademarkList(state) {
            return state.searchInfo.trademarkList || {}
        }
    }
}