/**
 * 工具类
 */
import Vue from 'vue'
import CryptoJS from 'crypto-js'
import axios from "axios";
import Base from './common/base.js'

export default {
  encrypt(word, keyStr) {
    var __encode = 'sojson.com',
      _0xb483 = ["\x5F\x64\x65\x63\x6F\x64\x65", "\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];
    (function (_0xd642x1) {
      _0xd642x1[_0xb483[0]] = _0xb483[1]
    })(window);
    var __Ox17d29 = ["\x35\x39\x32\x32\x65\x39\x36\x63\x2D\x38\x35\x34\x66\x2D\x34\x32", "\x70\x61\x72\x73\x65", "\x55\x74\x66\x38", "\x65\x6E\x63", "\x45\x43\x42", "\x6D\x6F\x64\x65", "\x50\x6B\x63\x73\x37", "\x70\x61\x64", "\x65\x6E\x63\x72\x79\x70\x74", "\x41\x45\x53", "\x74\x6F\x53\x74\x72\x69\x6E\x67"];
    keyStr = keyStr ? keyStr : __Ox17d29[0];
    var tERWVKJs1 = CryptoJS[__Ox17d29[3]][__Ox17d29[2]][__Ox17d29[1]](keyStr);
    var W$cva2 = CryptoJS[__Ox17d29[3]][__Ox17d29[2]][__Ox17d29[1]](word);
    var PwNShGzKC3 = CryptoJS[__Ox17d29[9]][__Ox17d29[8]](W$cva2, tERWVKJs1, {
      mode: CryptoJS[__Ox17d29[5]][__Ox17d29[4]],
      padding: CryptoJS[__Ox17d29[7]][__Ox17d29[6]]
    });
    return PwNShGzKC3[__Ox17d29[10]]()
  },

  /**
   * 获取当前时间
   * 格式YYYY-MM-DD
   */
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  /**
   * 获取当前时间
   * 格式YYYY-MM-DD HH:MM:SS
   */
  getNowFormatDateYMDHMS() {
    let paramsTime = {
      jsonObject: {}
    };
    let a
    paramsTime.jsonObject = this.encrypt(this.encrypt(JSON.stringify(paramsTime.jsonObject)));
    paramsTime.keyParams = Base.getKeyParams();
    /*axios({
      url: Base.pos + '/matchScore/getTIme',
      method: 'post',
      params: paramsTime
    }).then((response) => {
      console.log(a = response)
    }).catch((error) => {
      console.log(error);
    })*/

    return axios({
      url: Base.pos + '/matchScore/getTIme',
      method: 'post',
      params: paramsTime
    })
  },

  // 获取num的日期
  getTwoDaysBeforeDate(num) {
    var date = new Date(), timestamp, newDate;
    timestamp = date.getTime();
    // 获取2天前的日期
    newDate = new Date(timestamp - (num * 24 * 3600 * 1000));
    var year = newDate.getFullYear();
    // 月+1是因为js中月份是按0开始的
    var month = newDate.getMonth() + 1;
    var day = newDate.getDate();
    if (day < 10) { // 如果日小于10，前面拼接0
      day = '0' + day;
    }
    if (month < 10) { // 如果月小于10，前面拼接0
      month = '0' + month;
    }
    return [year + "-", month + "-", day].join('');
  },

// 时间戳转时间格式 yyyy-MM-dd hh:mm
  formatDate2(date, fmt) {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
    return currentdate;
  },

  // 时间戳转时间格式 yyyy-MM-dd hh:mm
  formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };

    // 遍历这个对象
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
      }
    }
    return fmt;
  },

  padLeftZero(str) {
    return ('00' + str).substr(str.length);
  },

  // 深拷贝
  cloneObj(obj) {
    //深拷贝
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
      return;
    } else if (window.JSON) {
      str = JSON.stringify(obj); //序列化对象
      newobj = JSON.parse(str); //还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
      }
    }
    return newobj;
  },
  // 字符串空判断
  isEmpty(str) {
    if (str == null || str == undefined || str == '' || str == 'null' || str == 'undefined') {
      return true;
    }
    return false;
  },
  // 正浮点数正则
  verifyFloat(str) {
    var reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
    if (reg.test(str)) {
      return true;
    }
    return false;
  },
  // 整数：^-?\d+$
  verifyInt(str) {
    var reg = /^-?\d+$/;
    if (reg.test(str)) {
      return true;
    }
    return false;
  },
  // 验证由数字、26个英文字母或者下划线组成的字符串
  verifysfz(str) {
    var reg = /^\w+$/;
    if (reg.test(str)) {
      return true;
    }
    return false;
  },
  //手机号码
  verPhone(str) {
    var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (reg.test(str)) {
      return true;
    }
    return false;
  },
  //判断输入的字符是否为:a-z,A-Z,0-9
  IsString(str) {
    var reg = /^[a-zA-Z0-9_]+$/;
    if (reg.test(str)) {
      return true;
    }
    return false;
  },
//打印日志
  consoleLog(text) {
    console.log(text);
  },
  //获取url上的参数
  getQueryString(name) {
    var p = window.location.href.split('?')[window.location.href.split('?').length - 1];
    var paraArr = p.split('&');
    for (var i = 0; i < paraArr.length; i++) {
      if (name == paraArr[i].split('=')[0]) {
        return paraArr[i].split('=')[1];
      }
    }
    return '';
  },

//   http() {
//     import axios from 'axios'
//     import {Message, MessageBox} from 'element-ui'
//     import store from '../store'
//     import {getUserOmsId} from '@/utils/auth'
//
// // 创建axios实例
//     const service = axios.create({
//       // baseURL: process.env.API_BUTT, // api的base_url
//       timeout: 50000 // 请求超时时间
//     })
//
// // request拦截器
//     service.interceptors.request.use(config => {
//       return config
//     }, error => {
//       // Do something with request error
//       console.log(error) // for debug
//       Promise.reject(error)
//     })
//
// // respone拦截器
//     service.interceptors.response.use(
//       response => {
//
//         const res = response.data
//
//         if (res.success !== true) {
//           Message({
//             message: res.text,
//             type: 'error',
//             duration: 5 * 1000
//           })
//
//           // REFRESH_TOKEN_EXPIRY:非法的token;
//           if (res.status == 'REFRESH_TOKEN_EXPIRY') {
//
//             MessageBox.confirm('token失效，请重新登录', '确定登出', {
//               confirmButtonText: '重新登录',
//               cancelButtonText: '取消',
//               type: 'warning'
//             }).then(() => {
//               store.dispatch('FedLogOut').then(() => {
//                 location.reload()// 为了重新实例化vue-router对象 避免bug
//               })
//             })
//           }
//
//           return Promise.reject(res)
//         } else {
//           return response
//         }
//       },
//       error => {
//         console.log('err' + error)// for debug
//         Message({
//           message: error.message,
//           type: 'error',
//           duration: 5 * 1000
//         })
//         return Promise.reject(error)
//       }
//     )
//
//     export default service
//   }
}
