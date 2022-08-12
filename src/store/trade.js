import { reqAddressInfo, reqOrderInfo } from "@/api";

export default {
    namespaced: true,
    actions: {
        // 用户地址
        async addressInfo({ commit }) {
            let res = await reqAddressInfo()
            if (res.code == 200) {
                commit('ADDRESSINFO', res.data)
            }
        },
        // 订单交易页
        async orderInfo({ commit }) {
            let res = await reqOrderInfo()
            if (res.code == 200) {
                commit('ORDERINFO', res.data)
            }
        }
    },
    mutations: {
        // 用户地址信息
        ADDRESSINFO(state, addressInfo) {
            state.addressInfo = addressInfo
        },
        // 订单交易页信息
        ORDERINFO(state, orderInfo) {
            state.orderInfo = orderInfo
        }
    },
    state: {
        addressInfo: [],
        orderInfo: {}
    },
    getters: {}
}