// home模块小仓库

import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"

export default {
    namespaced: true,

    actions: {
        // 三级菜单数据
        async categoryList({ commit }) {
            let res = await reqCategoryList()
            commit('CATEGORYLIST', res.data)
        },
        // 轮播图数据
        async getBannerList({ commit }) {
            let res = await reqGetBannerList()
            commit('GETBANNERLIST', res.data)
        },
        // 楼层数据
        async getFloorList({ commit }) {
            let res = await reqGetFloorList()
            commit('GETFLOORLIST', res.data)
        }
    },
    mutations: {
        // 三级菜单
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList
        },
        // 轮播图
        GETBANNERLIST(state, bannerList) {
            state.bannerList = bannerList
        },
        // 楼层
        GETFLOORLIST(state, floorList) {
            state.floorList = floorList
        }
    },
    state: {
        // 三级菜单数据
        categoryList: [],
        // 轮播图数据
        bannerList: [],
        // 楼层数据
        floorList: []
    },
    getters: {}
}