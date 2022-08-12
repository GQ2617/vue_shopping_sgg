// cart小仓库
import { reqGetCartList, reqDeleteCart, reqChangeChecked } from "@/api"

export default {
    namespaced: true,
    actions: {
        // 购物车列表
        async getCartList({ commit }) {
            let res = await reqGetCartList()
            if (res.code === 200) {
                commit('GETCARTLIST', res.data)
            }
        },
        // 删除购物车商品
        async deleteCart({ commit }, skuId) {
            let res = await reqDeleteCart(skuId)
            if (res.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 商品选中状态
        async changeChecked({ commit }, { skuId, isChecked }) {
            let res = await reqChangeChecked(skuId, isChecked)
            if (res.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 删除全部选中商品
        deleteAllCheckedCart({ dispatch, getters }) {
            let promiseAll = []
            getters.cartList.cartInfoList.forEach((item) => {
                let promise = item.isChecked == 1 ? dispatch('deleteCart', item.skuId) : '';
                promiseAll.push(promise)
            })
            return Promise.all(promiseAll)
        },
        // 底部全选
        allChecked({ dispatch, getters }, allChecked) {
            let promiseAll = []
            getters.cartList.cartInfoList.forEach((item) => {
                let promise = dispatch('changeChecked', { skuId: item.skuId, isChecked: allChecked })
                promiseAll.push(promise)
            })
            return Promise.all(promiseAll)
        }
    },
    mutations: {
        GETCARTLIST(state, cartList) {
            state.cartList = cartList
        }
    },
    state: {
        cartList: []
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        },
    }
}