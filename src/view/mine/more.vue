<!--更多-->
<template>
  <div class="more">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">

      <div class="tv1" @click="yhxyClick">
        <div class="tv3">用户协议</div>
        <div class="tv4"><img class="iv1" src="../../assets/more@3x.png"/>
        </div>

      </div>


      <div class="tv2" v-show="userInfo!=''">
        <div class="jhcd">
          <div @click="clearUserInfo">
            退出账户
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import {CellGroup, Dialog, Field, Icon, NavBar, Toast} from "vant";

  import Utils from '../../utils'

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
      [Dialog.name]: Dialog,
    },
    data() {
      return {
        isAndroid: ISANDROID,
        isiOS: ISIOS,
        isWeixin: ISWEIXIN,
        leftArrow: true, // 返回箭头
        titleName: '更多',
        userInfo: ''

      }
    },
    created() {
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
      }
    },

    methods: {
      back() {
        this.$router.back()
      },
      tabClick(type) {
        console.log(type)
      },
      yhxyClick() {
        this.$router.push('yhxy')
      },
      clearUserInfo() {
        Dialog.confirm({
          title: '',
          message: '您确认退出登录吗？'
        }).then(() => {
          // on confirm
          localStorage.userMes = ''
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isAndroid) {
            window.android.invoke_native("removeUserId", "", "jsGetUserInfoCallBack");
          } else if (isiOS) {

            // window.webkit.messageHandlers.getDevice.postMessage()
            window.location.href = 'cashloans://removeUserId';
          }
          this.back();
        }).catch(() => {
          // on cancel
        });
      }

    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.more {*/
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

  .more {
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
      /*padding-top: 0.4rem;*/
      /*height: 1.28rem;*/
      background-color: @title_bgColor;
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
  .more {

    .content {
      padding: 0.88rem 0 1.2rem;
      .tv1 {
        position: absolute;
        width: 100%;
        padding: 0.3rem;
        background: #FFFFFF;
        border-top: 1px solid #f7f7f7;
        .tv3 {
          display: inline-block;
          width: calc(100% - 0.3rem);
          color: #333333;
          font-size: 0.3rem;
          vertical-align: middle;
        }
        .tv4 {
          vertical-align: middle;
          display: inline-block;
          position: relative;
          right: 0;
          .iv1 {
            width: 0.16rem;
            vertical-align: middle;
            line-height: 1rem;

          }
        }
      }
      .tv2 {
        width: 100%;
        position: fixed;
        bottom: 25%;
        left: 0;
        padding: 0.3rem;
        .jhcd {
          margin-top: 0.8rem;
          text-align: center;
          &>div{
            .theme_buttom()
          }
        }
      }

    }

  }
</style>
