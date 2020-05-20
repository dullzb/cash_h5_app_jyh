import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'login',
    component: () => import('./view/login/index.vue'),
    meta: {
      title: '登录',
      keepAlive: true
    }
  },
  {
    name: 'yzm',
    component: () => import('./view/login/yzm.vue'),
    meta: {
      title: '验证码',
      keepAlive: false
    }
  },
  {
    name: 'home',
    component: (resolve) => require(['@/view/home/home.vue'], resolve),
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    path: '/pageIndex1',
    name: 'pageIndex1',
    component: (resolve) => require(['@/view/home/pageIndex1.vue'], resolve),
    meta: {
      title: '首页',
      keepAlive: true
    }
  },
  {
    path: '/pageIndex2',
    name: 'pageIndex2',
    component: (resolve) => require(['@/view/home/pageIndex2.vue'], resolve),
    meta: {
      title: '订单',
      keepAlive: true
    }
  },
  {
    path: '/pageIndex3',
    name: 'pageIndex3',
    component: (resolve) => require(['@/view/home/pageIndex3.vue'], resolve),
    meta: {
      title: '我的',
      keepAlive: true
    }
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: (resolve) => require(['@/view/orders/orderDetail.vue'], resolve),
    meta: {
      title: '订单详情',
      keepAlive: false
    }
  },
  {
    path: '/jhed',
    name: 'jhed',
    component: (resolve) => require(['@/view/jhed/index.vue'], resolve),
    meta: {
      title: '激活额度',
      keepAlive: false
    }
  },
  {
    path: '/srrz',
    name: 'srrz',
    component: (resolve) => require(['@/view/jhed/srrz.vue'], resolve),
    meta: {
      title: '实人认证',
      keepAlive: false
    }
  },
  {
    path: '/grxx',
    name: 'grxx',
    component: (resolve) => require(['@/view/jhed/grxx.vue'], resolve),
    meta: {
      title: '个人信息',
      keepAlive: false
    }
  },
  {
    path: '/grxxUpdate',
    name: 'grxxUpdate',
    component: (resolve) => require(['@/view/jhed/grxxUpdate.vue'], resolve),
    meta: {
      title: '个人信息',
      keepAlive: false
    }
  },
  {
    path: '/bdyhk',
    name: 'bdyhk',
    component: (resolve) => require(['@/view/jhed/bdyhk.vue'], resolve),
    meta: {
      title: '绑定银行卡',
      keepAlive: false
    }
  },
  {
    path: '/bdyhkUpdate',
    name: 'bdyhkUpdate',
    component: (resolve) => require(['@/view/jhed/bdyhkUpdate.vue'], resolve),
    meta: {
      title: '修改绑定银行卡',
      keepAlive: false
    }
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: (resolve) => require(['@/view/mine/feedback.vue'], resolve),
    meta: {
      title: '意见反馈',
      keepAlive: false
    }
  },
  {
    path: '/more',
    name: 'more',
    component: (resolve) => require(['@/view/mine/more.vue'], resolve),
    meta: {
      title: '更多',
      keepAlive: false
    }
  },
  {
    path: '/helpCenter',
    name: 'helpCenter',
    component: (resolve) => require(['@/view/mine/helpCenter.vue'], resolve),
    meta: {
      title: '帮助中心',
      keepAlive: false
    }
  },
  {
    path: '/fksm',
    name: 'fksm',
    component: (resolve) => require(['@/view/mine/fksm.vue'], resolve),
    meta: {
      title: '放款说明',
      keepAlive: false
    }
  },
  {
    path: '/operatorResult',
    name: 'operatorResult',
    component: (resolve) => require(['@/view/result/operatorResult.vue'], resolve),
    meta: {
      title: '认证结果',
      keepAlive: false
    }
  },
  {
    path: '/yhxy',
    name: 'yhxy',
    component: (resolve) => require(['@/view/mine/yhxy.vue'], resolve),
    meta: {
      title: '用户协议',
      keepAlive: false
    }
  },
  {
    path: '/jkxy',
    name: 'jkxy',
    component: (resolve) => require(['@/view/mine/jkxy.vue'], resolve),
    meta: {
      title: '借款协议',
      keepAlive: false
    }
  },
  {
    path: '/mslq',
    name: 'mslq',
    component: (resolve) => require(['@/view/jhed/mslq.vue'], resolve),
    meta: {
      title: '激活额度',
      keepAlive: false
    }
  },
  {
    path: '/mslqResult',
    name: 'mslqResult',
    component: (resolve) => require(['@/view/jhed/mslqResult.vue'], resolve),
    meta: {
      title: '激活额度',
      keepAlive: false
    }
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: (resolve) => require(['@/view/mine/orderList.vue'], resolve),
    meta: {
      title: '订单列表',
      keepAlive: false
    }
  },
  {
    path: '/xqOrderDetail',
    name: 'xqOrderDetail',
    component: (resolve) => require(['@/view/orders/xqOrderDetail.vue'], resolve),
    meta: {
      title: '续期订单',
      keepAlive: false
    }
  },
  {
    path: '/bankList',
    name: 'bankList',
    component: (resolve) => require(['@/view/orders/bankList.vue'], resolve),
    meta: {
      title: '选择银行',
      keepAlive: false
    }
  },
  {
    path: '/bankPay',
    name: 'bankPay',
    component: (resolve) => require(['@/view/jhed/bankPay.vue'], resolve),
    meta: {
      title: '选择银行',
      keepAlive: false
    }
  },

];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  // mode: 'history',
  // base: '/',
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  console.log(to.path)
  if (to.path === '/home' || to.path === '/login' || to.path === '/yzm' || to.path === '/yhxy') {
  } else {
    if (!localStorage.userMes) {
      console.log(999)
      console.log(to.path)
      next('/home')
      document.title = title;
    }
  }
  next();
});

export {
  router
};
