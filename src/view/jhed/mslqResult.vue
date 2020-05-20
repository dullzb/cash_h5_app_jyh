<!--激活额度-马上领钱-->
<template>
  <div class="mslqResult">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="goBack"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">
      <div>
        <div class="list-block">
          <img class="img1" src="../../assets/shenhe@3x.png">
        </div>
        <div class="tv1">您的申请已经在加速审核</div>
        <div class="tv2">审核时间8:00-20:30。请注意接收app</div>
        <div class="tv2">和短信审核通知</div>
      </div>

      <div class="jhcd">
        <div @click="goBack">
          确认
        </div>
      </div>
    </div>
    <div class="tv4">本平台使用银行级数据加密，承诺不会泄露用户数据</div>
  </div>

</template>

<script>

  import {Cell, Col, Icon, List, NavBar, PullRefresh, Row, Toast} from "vant";

  import Utils from '../../utils'

  var storage = window.localStorage;
  var u = navigator.userAgent;
  var ISANDROID, ISIOS, ISWEIXIN;

  ISANDROID = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  ISIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  ISWEIXIN = u.toLowerCase().indexOf('micromessenger') != -1;
  var elementNode = document.createElement("p");
  export default {


    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [List.name]: List,
      [Cell.name]: Cell,
      [Row.name]: Row,
      [Col.name]: Col,
      [Toast.name]: Toast,
      [PullRefresh.name]: PullRefresh,
    },
    data() {
      return {
        leftArrow: true, // 返回箭头
        titleName: '激活额度',
        userInfo: '',
        validateIndex: 0,
        card: '',
        listData: {list: {productQuota: '', serviceCost: '',}, bankCard: {bankName: ''}}
      }
    },
    created() {
    },
    mounted() {

    },
    methods: {
      goBack() {

        this.$router.push('home')
        // var u = navigator.userAgent;
        // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        //
        // if (isAndroid) {
        //   this.$router.go(-3)
        // } else if (isiOS) {
        //   this.$router.push('home')
        // }
      },
      showLoading() {
        Toast.loading({
          message: '加载中...'
        });
      },
      hideLoading(text) {
        if (!Utils.isEmpty(text)) {
          Toast(text);
        }
        setTimeout(() => {
          Toast.clear();
        }, 500);
      },


    },

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.mslqResult {*/
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

  .mslqResult {

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
      color: #FFFFFF;
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
      border: 0 solid @theme_bgColor !important;
    }

    .content {
      padding: 0.88rem 0 1.2rem;
      .list-block {
        background: #FFFFFF;
        text-align: center;
        padding: 2rem 0 0.7rem 0;
        .img1 {
          width: 2rem;
        }
      }
      .tv1 {
        text-align: center;
        background: white;
        font-size: 0.3rem;
        color: #333333;
        margin-bottom: 0.2rem;
      }
      .tv2 {
        text-align: center;
        background: white;
        font-size: 0.26rem;
        margin-bottom: 0.1rem;
        color: #999999;
      }
      .tv3 {
        background: #f7f7f7;
        height: 0.2rem;
      }
      .jhcd {
        margin-top: 0.9rem;
        text-align: center;
        &>div{
          .theme_buttom()
        }
      }

      .tv7 {
        border-bottom: 1px solid #ededed;

        .tv11 {
          position: relative;
          .tv12 {
            width: 2rem;
            display: inline-block;
            position: relative;
            left: 0;
            color: #999999;
            font-size: 0.30rem;
            margin: 0 0.3rem;
          }
          .tv13 {
            background: white;
            width: calc(100% - 3rem);
            display: inline-block;
            height: 0.75rem;
            border-width: 0;
            padding: 0.4rem 0;
            color: #333333;
            font-size: 0.30rem;;
            text-align: right;
          }
          .iv1 {
            width: 0.16rem;
            vertical-align: middle;
            line-height: 1rem;
            margin-left: 0.3rem;
          }
        }
      }
      .tv5 {
        color: @theme_color;
        padding: 0.2rem;
        font-size: 0.24rem;
        display: inline-block;
        text-align: center;
        .tv6 {
          width: 0.24rem;
          text-align: center;
          vertical-align: middle;
          display: inline-block;
        }
        .tv9 {
          vertical-align: middle;
          display: inline-block;
          text-align: center;
        }
      }
    }

    .tv4 {
      width: 100%;
      text-align: center;
      position: fixed;
      background: #FFFFFF;
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
