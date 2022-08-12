// 对API进行统一管理
import requests from "./request";
import mockRequests from './mockRequest'

// 1. TypeNav组件数据请求地址：product/getBaseCategoryList get 无参数
export const reqCategoryList = () => requests({ url: 'product/getBaseCategoryList', method: 'GET' })

// 2. ListContainer和Floor组件图片资源请求地址：/banner和/floor
export const reqGetBannerList = () => mockRequests({ url: '/banner' })
export const reqGetFloorList = () => mockRequests({ url: '/floor' })

// 3. Search组件数据请求地址：/list post 10个参数
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'POST', data: params })

// 4. Detail组件数据请求地址：/item/{ skuId } get skuId参数
export const reqGetDetailInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'GET' })

// 5. 加入购物车请求地址： /cart/addToCart/{ skuId }/{ skuNum } POST 两个参数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${ skuId }/${ skuNum }`, method: 'POST', })

// 6. ShopCart组件数据请求地址：/cart/cartList DELETE
export const reqGetCartList = () => requests({ url: '/cart/cartList', method: 'GET' })

// 7. 删除商品请求地址：/cart/deleteCart/{skuId}
export const reqDeleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

//8.  切换商品选中状态请求地址：/cart/checkCart/{skuID}/{isChecked} GET
export const reqChangeChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })

// 9. 获取验证码请求地址：/user/passport/sendCode/{phone} GET
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })

// 10. 用户注册请求地址：/user/passport/register
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, method: 'POST', data })

// 11. 登录请求地址：/user/passport/login
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, method: 'POST', data })

// 12. 携带token获取用户信息请求地址：/user/passport/auth/getUserInfo
export const reqGetUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'GET' })

// 13. 退出登录请求地址：/user/passport/logout
export const reqUserLogout = () => requests({ url: '/user/passport/logout', method: 'GET' })

// 14. 用户地址信息请求地址：/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' })

// 15. 订单交易页请求地址：/order/auth/trade
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'GET' })

// 16. 提交订单请求地址:/order/auth/submitOrder?tradeNo={tradeNo} POST请求
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'POST', data })

// 17. 获取订单支付信息请求地址:/payment/weixin/createNative/{orderId} GET
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'GET' })

// 18. 获取订单支付状态请求地址:/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })

// 19. 获取订单列表请求地址:/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'GET' })