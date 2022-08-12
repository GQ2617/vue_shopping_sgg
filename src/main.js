import Vue from 'vue'
import App from './App.vue'
// 引入路由配置文件
import router from './router/index'
// 引入vuex仓库
import store from './store/index'

// 引入并注册全局组件，（第一个参数：组件名称，第二个参数：组件)
import TypeNav from './components/TypeNav/TypeNav'
import Carousel from './components/Carousel/Carousel'
import Pagination from './components/Pagination/Pagination'
// Vue.use(TypeNav.name, TypeNav)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 引入mockServe.js来模拟数据
import './mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 引入element组件库并使用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


// 引入api文件夹下的所有请求函数
import * as API from '@/api'

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
import img from '@/assets/logo.png'
Vue.use(VueLazyLoad, {
    loading: img
})

// 表单验证插件
import '@/plugins/validate'


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    // 注册路由
    router: router,
    // 注册仓库
    store,
}).$mount('#app')