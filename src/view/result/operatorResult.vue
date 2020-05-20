<!--手机验证-运营商-->
<template>
  <div class="operatorResult">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">

      <div class="tv1" v-if="show!=''">
        <img class="iv1" v-show="show==1"
             src="../../assets/result_fail@3x.png"/>
        <img class="iv1" v-show="show==2"
             src="../../assets/result_success@3x.png"/>
      </div>
      <div class="tv2">{{resultText}}</div>
    </div>

    <div class="tv4">
      <div class="jhcd">
        <div @click="back">
          返回
        </div>
      </div>
      小提示：本平台不对学生开放，注意自己的还款能力，谨慎借款
    </div>

  </div>

</template>

<script>

  import {Icon, NavBar, Toast} from "vant";
  import Utils from '../../utils'
  import Base from '@/common/base.js';

  export default {
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Toast.name]: Toast,
    },
    data() {
      return {
        leftArrow: true, // 返回箭头
        titleName: '认证结果',
        mxcode: '', //-1失败 1成功
        loginDone: '',//0失败 1成功
        show: '',
        resultText: ''
      }
    },
    created() {

    }
    ,
    mounted() {
      this.mxcode = Utils.getQueryString('mxcode');
      this.loginDone = Utils.getQueryString('loginDone');
      if (this.mxcode != -1 && this.loginDone != 0) {
        if (!Utils.isEmpty(localStorage.userMes)) {
          if (!Utils.isEmpty(localStorage.rzType)) {
            if ("1" == localStorage.rzType) {
              this.getOperator();
            } else if ("2" == localStorage.rzType) {
              this.getAlipay();
            }
            localStorage.rzType = "";
          }
        }
        //成功
        const toast = Toast.loading({
          mask: true,
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '等待 30 秒'
        });

        let second = 30;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `等待 ${second} 秒`;
          } else {
            this.show = 2;
            this.resultText = '操作成功';
            clearInterval(timer);
            Toast.clear();


          }
        }, 1000);
      } else {
        this.show = 1;
        this.resultText = '认证失败';
      }
    }
    ,
    activated() {

    },
    methods: {
      back() {
        if (this.mxcode != -1 && this.loginDone != 0) {
          Toast('运营商认证审核中，请耐心等待1-3分钟')
          this.$router.go(-1)
        } else {
          this.$router.go(-1)
        }
      },
      //修改支付宝为审核中
      getAlipay() {

        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestCas(params1, '/validate/alipay/c').then((response) => {

        }).catch((error) => {

        })
      },

      //修改运营商为审核中
      getOperator() {
        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestCas(params1, '/validate/operator/c').then((response) => {

        }).catch((error) => {

        })
      },

    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.operatorResult {*/
  /*.van-nav-bar {*/
  /*padding-top: 0.48rem !important;*/
  /*height: 1.36rem !important;*/
  /*}*/
  /*.list {*/
  /*margin-top: 3.26rem !important;*/
  /*&.collectionList {*/
  /*margin-top: 2.54rem !important;*/
  /*}*/
  /*}*/
  /*.content {*/
  /*padding: 0.72rem 0 1.2rem !important;*/
  /*}*/
  /*}*/
  /*}*/

  .operatorResult {

    background-color: #ffffff;
    min-height: 100vh;
    .van-nav-bar-top {
      background-color: #ffffff;
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .van-nav-bar {
      /*padding-top: 0.4rem;*/
      /*height: 1.28rem;*/
      background: @title_bgColor;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #333;
      .van-nav-bar__left {
        left: 0;
        padding: 0 0.26rem;
        font-size: 0.36rem;
        vertical-align: middle;
      }
      .van-icon {
        color: @title_color;
        width: 0.36rem;
        vertical-align: middle;
        font-weight: bold;
      }
      .van-nav-bar__title {
        color: @title_color;
        font-size: 0.36rem;
        font-weight: bold
      }
    }
    .van-hairline--bottom::after {
      border-bottom-width: 0 !important;
    }
    [class*=van-hairline]::after {
      border: 0 solid @title_color !important;
    }

    .van-picker__cancel, .van-picker__confirm {
      font-size: 0.3rem;
    }
    .content {
      padding: 0.88rem 0 0 0;
      /*margin-bottom: 1.2rem;*/
      background: #FFFFFF;

      .tv1 {
        width: 100%;
        text-align: center;
        margin-top: 1rem;
        .iv1 {
          width: 35%;
        }
      }
      .tv2 {
        color: #333333;
        font-size: 0.38rem;
        text-align: center;
        margin-top: 0.5rem;
      }
    }
    .jhcd {

      /*background: url("../../assets/anniu@3x.png") 50% 50% no-repeat;
      background-size: 75% 100%;*/
      margin: 0.2rem 0 1.5rem 0;
      text-align: center;
      &>div {
       .theme_buttom()
      }
    }
    .tv4 {
      width: 100%;
      text-align: center;
      position: fixed;
      /*background: #FFFFFF;*/
      padding-top: 0.2rem;
      bottom: 0;
      padding-bottom: 0.2rem;
      color: #999999;
      font-size: 0.24rem;
    }
  }
</style>

<style scoped>

</style>
