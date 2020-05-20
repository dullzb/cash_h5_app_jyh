import axios from 'axios'
import {Toast} from "vant";
import store from '../vuex/store'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.API_BUTT, // api的base_url
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.success !== true) {
      /*Message({
        message: res.text,
        type: 'error',
        duration: 5 * 1000
      })*/

      // REFRESH_TOKEN_EXPIRY:非法的token;
      if (res.status == 'ERROR_KEYPARAMS_MISSING_TOKEN' || res.status == 'REFRESH_TOKEN_EXPIRY') {

        Toast('token失效，请重新登录')
        setTimeout(() => {

          store.dispatch('logOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        }, 1500)

        // MessageBox.confirm('token失效，请重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload()// 为了重新实例化vue-router对象 避免bug
        //   })
        // })
      }

      return Promise.reject(res)
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error)// for debug
    /* Message({
       message: error.message,
       type: 'error',
       duration: 5 * 1000
     })*/
    return Promise.reject(error)
  }
)

export default service
