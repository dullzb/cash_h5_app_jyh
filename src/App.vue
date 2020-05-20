<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>

  import Base from '@/common/base.js';
  export default {
    created() {
      Base.getHost().then((res)=>{
        this.$store.dispatch('bottomBarIndexChange', 1);
      }).catch(()=>{
        this.$store.dispatch('bottomBarIndexChange', 1);
      })
    }
  }
</script>
<style lang="less">
  @import "./reset.less";
  @import "https://cdn.bootcss.com/animate.css/3.5.2/animate.min.css";

  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .safePadding {
      //iphoneX 加安全区域
      /*padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);*/
      /*padding-top: max(44px, env(safe-area-inset-top));*/
    }

  }
  #app{
    width: 100vw;
    overflow: hidden;
  }
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  input {
    -webkit-appearance: none;
    -webkit-touch-callout: default;
    -webkit-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }

  input[disabled], input:disabled, input.disabled {
    color: #3e3e3e;
    -webkit-text-fill-color: #3e3e3e;
    -webkit-opacity: 1;
    opacity: 1;
  }

  body {
    font-size: 12px;
    background-color: #f7f7f7;
    font-family: "PingFangSC-Regular", -apple-system, Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    // 弹窗重置
    .van-dialog {
      width: 84%;
      .van-dialog__header {
        position: relative;
        padding: 12px 0;
        color: #333333;
        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          pointer-events: none;
          box-sizing: border-box;
          border: 0 solid #e5e5e5;
          border-bottom-width: 1px;
        }
      }
      .van-button--large {
        height: 40px;
        line-height: 38px;
      }
      .van-dialog__message {
        color: #333333;
        text-align: center;
        line-height: 2.5;
        padding: 15px 20px;
      }
      .van-dialog__message--has-title {
        color: #333333;
        text-align: center;
      }
      .van-dialog__confirm {
        background-color: @theme_bgColor;
        color: #ffffff;
      }
    }
    // 数字键盘重置
    .van-key--green {
      background-color: @theme_bgColor;
      &:after {
        border-color: @theme_bgColor;
      }
    }
    .van-key--green.van-key--active {
      background-color: @theme_bgColor;
    }
    p {
      margin: 0;
    }
  }
</style>
