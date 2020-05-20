<!--放款说明-->
<template>
  <div class="fksm">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">

      <div class="tv1">
        <div class="tv2">
          <img class="iv1" src="../../assets/fangkuan@3x.png"/>
        </div>
        <div class="tv3">放款</div>
      </div>
      <div class="tv4">

        <div>1.签约生成借条</div>
        <div>2.等待放款到您的银行卡</div>
      </div>

      <div class="tv5">
        <div class="tv2">
          <img class="iv1" src="../../assets/huankuan@3x.png"/>
        </div>
        <div class="tv3">还款</div>
      </div>
      <div class="tv4">

        <div>1.选择相关还款方式，点击支付按钮，进行支付</div>
      </div>
    </div>
  </div>

</template>

<script>

  import {CellGroup, Field, Icon, NavBar, Toast} from "vant";

  var storage = window.localStorage;
  var u = navigator.userAgent;
  var ISANDROID, ISIOS, ISWEIXIN;

  ISANDROID = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  ISIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  ISWEIXIN = u.toLowerCase().indexOf('micromessenger') != -1;

  export default {
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Field.name]: Field,
      [CellGroup.name]: CellGroup,
      [Toast.name]: Toast,
    },
    data() {
      return {
        isAndroid: ISANDROID,
        isiOS: ISIOS,
        isWeixin: ISWEIXIN,
        leftArrow: true, // 返回箭头
        titleName: '放款说明',


      }
    },
    created() {

    },

    methods: {
      back() {
        this.$router.back()
      },
      tabClick(type) {
        console.log(type)
      },
    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.fksm {*/
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

  .fksm {
    background: #FFFFFF;
    .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
    min-height: 100vh;
    .swipe {
      width: 100%;
      height: 3.4rem;
      .swipe_img {
        object-fit: cover;
        width: 100%;
        height: 3.4rem;
      }
    }
    .van-nav-bar-top {
      background-color: #ffffff;
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .van-nav-bar {
      background-color: @title_bgColor;
      height: 0.88rem;
      line-height: 0.88rem;
      color: @title_color;
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
        font-family: "PingFangSC-Medium";
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

    .van-cell {
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      padding: 0.27rem 0;
      box-sizing: border-box;
      line-height: 24px;
      position: relative;
      background-color: #fff;
      color: #333;
      font-size: 0.32rem;
      font-weight: 500;
      overflow: hidden;
    }
    .van-cell-group .van-hairline--top-bottom {
      border-bottom: 0px solid #ffffff;
    }

  }
</style>

<style lang="less" scoped>
  .fksm {

    .content {
      padding: 0.88rem 0 1.2rem;
      background: #FFFFFF;
      .tv1 {
        width: 100%;
        padding: 0.3rem;
        background: #FFFFFF;
        border-top: 1px solid #f7f7f7;
        text-align: center;
        .tv2 {
          display: inline-block;
          vertical-align: middle;
          .iv1 {
            width: 0.36rem;
            vertical-align: middle;
          }
        }
        .tv3 {
          vertical-align: middle;
          display: inline-block;
          font-size: 0.36rem;
          color: #333333;
        }
      }
      .tv5 {
        width: 100%;
        padding: 0.3rem;
        background: #FFFFFF;
        margin-top: 0.3rem;
        text-align: center;
        .tv2 {
          display: inline-block;
          vertical-align: middle;
          .iv1 {
            width: 0.36rem;
            vertical-align: middle;
          }
        }
        .tv3 {
          vertical-align: middle;
          display: inline-block;
          font-size: 0.36rem;
          color: #333333;
        }
      }
      .tv4 {
        color: #333333;
        font-size: 0.3rem;
        padding-left: 0.3rem;
        margin-top: 0.3rem;
      }
    }

  }

</style>
