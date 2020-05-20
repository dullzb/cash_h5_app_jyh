import './common/rem';
// import './common/base.less';
require('!style-loader!css-loader!less-loader!./common/base.less'); //导入全局样式
import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import 'font-awesome/css/font-awesome.css'
import store from "./vuex/store"

import Axios from 'axios'

import clipboard from 'clipboard'
Vue.prototype.clipboard = clipboard;

Vue.prototype.$axios = Axios
Axios.defaults.headers.post['Content-Type'] = 'application/json';

import {Dialog, Toast} from 'vant';

Vue.use(Dialog)
  .use(Toast);

window.onload=function(){
  // document.getElementsByTagName("input").addEventListener('blur', function () {
  //   window.scroll(0, 0);
  // });
  // document.getElementsByTagName("select").addEventListener('blur', function () {
  //   window.scroll(0, 0);
  // });
}


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
