import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqUserLogout } from "@/api"

export default {
    namespaced: true,
    actions: {
        // 获取验证码
        async getCode({ commit }, phone) {
            let res = await reqGetCode(phone)
            if (res.code == 200) {
                commit('GETCODE', res.data)
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 用户注册
        async userRegister({ commit }, data) {
            let res = await reqUserRegister(data)
            if (res.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //用户登录
        async userLogin({ commit }, data) {
            let res = await reqUserLogin(data)
            if (res.code == 200) {
                commit('USERLOGIN', res.data.token)
                localStorage.setItem('SHOP_TOKEN', res.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 获取用户信息
        async getUserInfo({ commit }) {
            let res = await reqGetUserInfo()
            commit('GETUSERINFO', res.data)
        },
        // 退出登录
        async userLogout({ commit }) {
            let res = await reqUserLogout()
            if (res.code == 200) {
                commit('USERLOGOUT')
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        // 获取验证码
        GETCODE(state, code) {
            state.code = code
        },
        // 用户登录获取token
        USERLOGIN(state, token) {
            state.token = token
        },
        // 获取用户信息
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        // 退出登录
        USERLOGOUT(state) {
            state.token = ''
            state.userInfo = {}
            localStorage.removeItem('SHOP_TOKEN')
                // localStorage.setItem('SHOP_TOKEN', '')
        }
    },
    state: {
        code: '',
        token: localStorage.getItem('SHOP_TOKEN'),
        userInfo: {}
    },
    getters: {},
}