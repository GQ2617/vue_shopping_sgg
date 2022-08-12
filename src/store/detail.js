// Detail模块小仓库
import { reqGetDetailInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from '@/utils/uuid_token'

export default {
    namespaced: true,
    actions: {
        // 获取详情页数据
        async getDetailInfo({ commit }, skuId) {
            let res = await reqGetDetailInfo(skuId)
            if (res.code === 200) {
                commit('GETDETAILINFO', res.data)
            }
        },
        // 加入购物车
        async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
            let res = await reqAddOrUpdateShopCart(skuId, skuNum)
            if (res.code === 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        // 将详情页数据存储到state
        GETDETAILINFO(state, detailInfo) {
            state.detailInfo = detailInfo
        }
    },
    state: {
        // 详情页数据
        detailInfo: {},
        // 游客临时身份
        uuid_token: getUUID()
    },
    getters: {
        categoryView(state) {
            return state.detailInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.detailInfo.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.detailInfo.spuSaleAttrList || []
        }
    }
}