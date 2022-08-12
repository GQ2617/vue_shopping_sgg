// 对axios进行二次封装的文件

// 引入axios
import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css'

// 1. 利用axios对象的方法create，去创建一个axios实例
// 2. requests是对axios的一些配置
const requests = axios.create({
    // 基础路径
    baseURL: '/mock',
    // 代表请求超时的时间
    timeout: 5000,
});
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在发请求之前做一些事情
requests.interceptors.request.use((config) => {
    nProgress.start()
    return config;
});
// 响应拦截器：服务器响应数据回来之后，响应拦截器可以检测到，可以做一些事情
requests.interceptors.response.use((res) => {
    // 成功的回调函数
    nProgress.done()
    return res.data;
}, (error) => {
    // 失败的回调
    return Promise.reject(new Error('faile'))
})

// 对外暴露
export default requests;