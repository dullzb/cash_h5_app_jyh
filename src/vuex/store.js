import Vue from "vue"
import Vuex from "vuex"
import Utils from '@/utils.js'
import axios from 'axios'
import Base from '@/common/base.js';
import {Toast} from 'vant';

Vue.use(Vuex)
Vue.prototype.$http = axios

const store = new Vuex.Store({
  state: {  //这里的state必须是JSON，是一个对象
    bottomBarIndex: 0, // 记录首页选中的底部按钮和对应展示页面

  },
  // 我们通过提交 mutation 的方式，而非直接改变 store.state.bottomBarIndex中的数据
  mutations: {
    // 底部点击记录角标和对应页面的位置
    bottomBarIndexChange(state, bottomBarIndex) {
      state.bottomBarIndex = bottomBarIndex;
    },
  },
  actions: {
    // 异步方法需要写在Action里面
    bottomBarIndexChange(ctx, data) {
      ctx.commit('bottomBarIndexChange', data);
    },
    logOut(ctx, data){
      localStorage.clear()
    }
  },
  getters: {
    getBottomBarIndexChange(state) {
      return state.bottomBarIndex;
    },
  }
});
export default store;//用export default 封装代码，让外部可以引用
