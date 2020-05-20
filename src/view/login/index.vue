<!--登录-->
<template>
  <div class="login_page_one">

    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="login_content">
      <img style="margin-top: -2px;width: 100%" src="../../assets/bg2@3x.png" alt="">
      <div class="topIcon">
        <img src="../../assets/logo@3x.png" alt="">
      </div>
      <div class="form">
        <div class="login_tv1">欢迎注册/登录</div>
        <div class="login_tv2">
          <input class="login_tv3" type="tel" v-model="telphone" placeholder="请输入手机号"/>
        </div>
        <div class="login_tv9">
        </div>
        <div class="login_bottom">
          <div class="login_jhcd" @click="jhedClick">
            <div>
              下一步
            </div>
          </div>
          <div class="login_tv4">
            <div class="login_tv5">
              <img class="login_tv6"
                   src="../../assets/duihao@3x.png">
            </div>

            <div class="login_tv7">请认真已阅读并同意<span class="tv8" @click="yhxyClick">《服务许可协议》《隐私政策》</span>，未注册时将自动注册账号</div>
          </div>
        </div>
      </div>

    </div>


  </div>

</template>

<script>

  import {CellGroup, Field, Icon, NavBar, Toast} from "vant";

  import Utils from '../../utils'

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
        leftArrow: true, // 返回箭头
        titleName: '',
        telphone: ''
      }
    },
    created() {
      console.log("11")

      // this.getUserId(2); //请求uid 传2表示可不登录情况返回uid可能为空 传1是必须登录
    },
    mounted() {
      var input = document.getElementsByTagName("input")
      for (var i = 0; i < input.length; i++) {
        console.log(i)

        input[i].addEventListener('blur', function () {
          window.scroll(0, 0);
        });
      }
    },
    activated() {
      // this.onRefresh();
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Utils.formatDate(date, 'hh:mm')
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
      jhedClick() {
        //跳转至验证码页面
        if (Utils.isEmpty(this.telphone)) {
          Toast("请输入手机号")
          return;
        }
        if (!Utils.verifyInt(this.telphone) || this.telphone.length != 11) {
          Toast("请输入正确的手机号")
          return;
        }

        this.$router.push({path: 'yzm', query: {telphone: this.telphone}})
      }
    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.login_page_one {*/
  /*!*.van-nav-bar {*!*/
  /*!*padding-top: 0.48rem !important;*!*/
  /*!*height: 1.36rem !important;*!*/
  /*!*}*!*/
  /*.list {*/
  /*margin-top: 3.26rem !important;*/
  /*&.collectionList {*/
  /*margin-top: 2.54rem !important;*/
  /*}*/
  /*}*/
  /*.login_content {*/
  /*padding: 0.72rem 0 1.2rem !important;*/
  /*}*/
  /*}*/
  /*}*/

  .login_page_one {
    padding-top: 1px;
    /*background: -webkit-linear-gradient(bottom, rgb(103,96,167), rgb(139,174,196)); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(bottom, rgb(103,96,167), rgb(139,174,196)); !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(bottom, rgb(103,96,167), rgb(139,174,196)); !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(to top, rgb(103,96,167), rgb(139,174,196)); !* 标准的语法 *!*/
    background: url("../../assets/login_bg@3x.png") 0% 0% repeat-y;
    background-size: 100% auto;
    min-height: 100vh;

    .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
    .topIcon{
      position: absolute;
      top: 0.8rem;
      width: 100%;
      z-index: 100;
      text-align: center;
      border-radius: 50%;
      overflow: hidden;

      &>img{
        width: 1.2rem;
        position: relative;
      }
      &>div{
        color: #fff;
        font-size: 0.38rem;
      }
    }
    .form{
      padding: 0 0.2rem;
    }
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
      background-color: transparent;
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .van-nav-bar {
      background-color: transparent;
      /*padding-top: 0.4rem;*/
      /*height: 1.28rem;*/
      height: 0.88rem;
      line-height: 0.88rem;
      color: #333333;
      .van-nav-bar__left {
        left: 0;
        padding: 0 0.26rem;
        font-size: 0.36rem;
        vertical-align: middle;
      }
      .van-icon {
        color: #fff;
        width: 0.36rem;
        vertical-align: middle;
        font-weight: bold;
      }
      .van-nav-bar__title {
        font-family: "PingFangSC-Medium";
        color: #333333;
        font-size: 0.36rem;
        font-weight: bold
      }
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
  .login_page_one{
    .login_content {
      position: relative;
      padding: 1px 0rem 2rem;
      margin: 2rem 0.3rem 0;
      background: #fff;
      border-radius: 0.2rem;
      .login_tv1 {
        margin-top: 1.2rem;
        color: #333333;
        font-size: 0.5rem;
        font-weight: bold;
      }
      .login_tv9 {
        border-bottom: 1px solid #bababa;
      }
      .login_tv2 {

        .login_tv3 {
          width: 100%;
          height: 0.75rem;
          border-width: 0;
          font-weight: 500;
          margin-top: 1rem;
          color: #333333;
          font-size: 0.3rem;
        }
      }
    }
    .login_bottom{

      margin: 0;
      .login_jhcd {
        text-align: center;
        margin-top: 1rem;
        &>div{
          .theme_buttom();
          width: 100%;
          background: #f8da49;
          color: #2f2808;
        }
      }

      .login_tv4 {
        display: inline-block;
        color: #333;
        margin-top: 0.22rem;
        font-size: 0.24rem;
        .login_tv5 {
          display: inline-block;
        }
        .login_tv6 {
          display: inline-block;
          color: #333;
          width: 0.32rem;
          vertical-align: top;
        }
        .login_tv7 {
          vertical-align: top;
          width: calc(100% - 0.4rem);
          display: inline-block;
          color: #333;
        }
        .tv8 {
          display: inline-block;
          color: @theme_color;
          color: #333;
        }
      }
    }

  }

</style>
