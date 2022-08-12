// 这是配置路由的文件
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用vue-router插件
Vue.use(VueRouter);

// 引入一级路由组件
// import Home from '../pages//Home//Home'
// import Search from '../pages/Search/Search'
// import Login from '../pages/Login/Login'
// import Register from '../pages/Register/Register'
// import Detail from '../pages/Detail/Detail'
// import AddCartSuccess from '../pages/AddCartSuccess/AddCartSuccess'
// import ShopCart from '../pages/ShopCart/ShopCart'
// import Trade from '../pages/Trade/Trade'
// import Pay from '../pages/Pay/Pay'
// import PaySuccess from '../pages/PaySuccess/PaySuccess'
// import Center from '../pages/Center/Center'
// 引入二级路由
// import MyOrder from '../pages/Center/MyOrder/MyOrder'
// import GroupOrder from '../pages/Center/GroupOrder/GroupOrder'

// 引入仓库
import store from '@/store'

// 重写push|replace
// 第一个参数：告诉原来的push方法，往哪里跳转
// 第二个参数：成功回调
// 第三个参数：失败回调
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
};
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
};

// 配置并导出路由
const router = new VueRouter({
    routes: [{
            path: '/home',
            component: () =>
                import ('@/pages/Home/Home.vue'),
            meta: { isShowFooter: true }
        }, {
            name: 'search',
            path: '/search/:keyword?',
            component: () =>
                import ('@/pages/Search/Search.vue'),
            meta: { isShowFooter: true }
        }, {
            path: '/login',
            component: () =>
                import ('@/pages/Login/Login.vue'),
            meta: { isShowFooter: false }
        }, {
            path: '/register',
            component: () =>
                import ('@/pages/Register/Register.vue'),
            meta: { isShowFooter: false }
        }, {
            path: '/detail/:id',
            component: () =>
                import ('@/pages/Detail/Detail.vue'),
            meta: { isShowFooter: false }
        }, {
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: () =>
                import ('@/pages/AddCartSuccess/AddCartSuccess.vue'),
            meta: { isShowFooter: true }
        }, {
            path: '/shopcart',
            component: () =>
                import ('@/pages/ShopCart/ShopCart.vue'),
            meta: { isShowFooter: true }
        }, {
            path: '/trade',
            component: () =>
                import ('@/pages/Trade/Trade.vue'),
            meta: { isShowFooter: true },
            beforeEnter(to, from, next) {
                if (from.path == '/shopcart') {
                    next()
                } else {
                    next(false)
                }
            }
        }, {
            name: 'pay',
            path: '/pay',
            component: () =>
                import ('@/pages/Pay/Pay.vue'),
            meta: { isShowFooter: true },
            beforeEnter(to, from, next) {
                if (from.path == '/trade') {
                    next()
                } else {
                    next(false)
                }
            }
        }, {
            path: '/paysuccess',
            component: () =>
                import ('@/pages/PaySuccess/PaySuccess.vue'),
            meta: { isShowFooter: true },
            beforeEnter(to, from, next) {
                if (from.path == '/pay') {
                    next()
                } else {
                    next(false)
                }
            }
        }, {
            path: '/center',
            component: () =>
                import ('@/pages/Center/Center.vue'),
            meta: { isShowFooter: false },
            children: [{
                    path: 'myorder',
                    component: () =>
                        import ('@/pages/Center/MyOrder/MyOrder.vue')
                },
                {
                    path: 'grouporder',
                    component: () =>
                        import ('@/pages/Center/GroupOrder/GroupOrder.vue')
                },
                // 重定向
                {
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ]
        },
        // 重定向，打开项目默认页面
        {
            path: '*',
            redirect: '/home'
        }
    ],

    // 路由跳转后，滚动条位置
    scrollBehavior(to, from, saveposition) {
        return { y: 0 }
    }
})

router.beforeEach(async(to, from, next) => {
    // to and from are both route objects. must call `next`.
    // next();

    let token = store.state.user.token;
    let name = store.state.user.userInfo.name
        // 1. 判断用户是否登录（登录后进行判断...)
    if (token) {
        // 2. 判断是否跳往login界面
        if (to.path == '/register') {
            // 2.1 若跳往login页，强制跳转至home页
            next('/login')
        } else {
            // 2.2 未跳往login页，判断是否有用户信息
            // 3. 判断是否有用户信息
            if (name) {
                // 3.1 有用户信息，放行
                next()
            } else {
                // 3.2 没有用户信息
                try {
                    // 3.2.1 没有用户信息发请求获取
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    // 3.2.2 token失效，发请求退出登录
                    await store.dispatch('user/userLogout')
                    next('/login')
                }
            }
        }
    } else {
        if (to.path == '/trade' || to.path == '/pay' || to.path == '/center/myorder' || to.path == '/paysuccess') {
            alert('请先登录,点击确定前往登录页面')
            next('/login?redirect=' + to.path)
        } else {
            next()
        }
    }
})

export default router