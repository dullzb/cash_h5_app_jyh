<!--绑定银行卡-->
<template>
  <div class="bdyhk">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">

      <div class="tv1">请绑定实名认证用户的银行卡号，绑定他人卡号无法通过认证。
        一天只能绑定3次，请填写正确信息，避免无法通过认证
      </div>

      <div class="content_operate">
        <div class="tv7">
          <div class="tv11">
            <div class="tv12">持卡人</div>
            <input class="tv13" readonly unselectable="on" disabled="disabled" v-model="formData.trueName"/>
          </div>
        </div>
        <div class="tv7">
          <div class="tv11">
            <div class="tv12">银行卡号</div>
            <input class="tv13" v-model="formData.card" placeholder="请输入银行卡号"/>
          </div>
        </div>
        <!--<div class="tv7">-->
        <!--<div class="tv11">-->
        <!--<div class="tv12">所属银行</div>-->
        <!--<input class="tv13" v-model="formData.cardName" placeholder="请输入所属银行"/>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="tv7">
          <div class="tv11">
            <div class="tv12">银行预留手机号</div>
            <input class="tv13" v-model="formData.telphone" placeholder="请输入预留手机号"/>
          </div>
        </div>
        <div class="tv7" v-if="showSms">
          <div class="tv111">
            <div class="tv122">输入验证码</div>
            <input class="tv133" v-model="formData.codeMsg" placeholder="请输入验证码"/>
            <div class="tv8" v-show="!setTimeOut" @click="getVCode">
              <span class="tvyzm">获取验证码</span>
            </div>

            <div class="tv8" v-show="setTimeOut">
              <span class="tvyzm">{{dtime}}s后重试</span>
            </div>

          </div>
        </div>
      </div>



    </div>
    <div class="jhcd">
      <div @click="validateInfo">
        确认绑卡
      </div>
    </div>
    <div class="tv4">
      本平台使用银行级数据加密，承诺不会泄露用户数据
    </div>
  </div>

</template>

<script>

  import {Cell, Col, Icon, List, NavBar, PullRefresh, Row, Toast} from "vant";

  import Utils from '../../utils'
  import Base from '@/common/base.js';

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
        titleName: '绑定银行卡',
        name: '',
        idcard: '',
        telphone: '',
        checkCode: '',
        setTimeOut: false,
        dtime: 60,
        canGetCode: true,
        userInfo: '',
        showSms: true,
        formData: {
          "card": '', //"卡号",
          "cardName": '', // 银行卡名称,
          "trueName": '', //真实姓名,
          "telphone": '', //银行卡预留手机号,
          "codeMsg": '', //验证码,
        }
      }
    },
    created() {

      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
        this.formData.trueName = this.userInfo.trueName;
      }
      // this.getUserId(2); //请求uid 传2表示可不登录情况返回uid可能为空 传1是必须登录
    },
    mounted() {
      // this.getUserInfo();
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
        }, 1000);
      },
      daojishi() {
        if (this.dtime == 60) {
          this.setTimeOut = !this.setTimeOut;
        }
        this.dtime = this.dtime - 1;

        if (this.dtime > 0 && this.dtime <= 59 && this.setTimeOut) {
          setTimeout(this.daojishi, 1000);
        } else {
          this.setTimeOut = !this.setTimeOut;
          this.dtime = 60;
        }
      },
      //通过接口获取验证码
      getVCode() {
        if (Utils.isEmpty(this.formData.trueName)) {
          Toast('持卡人不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.card.trim())) {
          Toast('银行卡号不能为空')
          return;
        }
        if (!Utils.verifysfz(this.formData.card.trim())) {
          Toast('请输入正确的银行卡号')
          return;
        }
        if (Utils.isEmpty(this.formData.telphone.trim())) {
          Toast('请输入预留手机号')
          return;
        }
        if (!Utils.verifyInt(this.formData.telphone.trim()) || this.formData.telphone.trim().length != 11) {
          Toast("请输入正确的手机号")
          return;
        }
        if (this.canGetCode) {
          this.canGetCode = false;
        } else {
          return;
        }

        let params1 = {
          jsonObject: {
            "bankMobile": this.formData.telphone,
            "payerBankCardNo": this.formData.card,
          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestPos(params1, '/validate/sendQuickPayCode').then((response) => {
          this.canGetCode = true
          if (response.data.success == true) {
            this.hideLoading();
            this.daojishi()
          } else {

            this.hideLoading(response.data.text);
          }
        }).catch((error) => {
          this.canGetCode = true
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        })
      },

      ///validate/bank 绑定银行卡
      validateInfo() {

        if (Utils.isEmpty(this.formData.trueName)) {
          Toast('持卡人不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.card.trim())) {
          Toast('银行卡号不能为空')
          return;
        }
        if (!Utils.verifysfz(this.formData.card.trim())) {
          Toast('请输入正确的银行卡号')
          return;
        }
        // if (Utils.isEmpty(this.formData.cardName)) {
        //   Toast('所属银行不能为空')
        //   return;
        // }
        if (Utils.isEmpty(this.formData.telphone.trim())) {
          Toast('预留手机号不能为空')
          return;
        }
        if (!Utils.verifyInt(this.formData.telphone.trim()) || this.formData.telphone.trim().length != 11) {
          Toast("请输入正确的手机号")
          return;
        }
        if (this.showSms) {
          if (Utils.isEmpty(this.formData.codeMsg.trim())) {
            Toast('验证码不能为空')
            return;
          }
        }

        let params1 = {
          jsonObject: this.formData
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestCas(params1, '/validate/bank').then((response) => {
          if (response.data.status == 'SUCCESS') {
            if (response.data.t == 1) {
              this.hideLoading("请输入验证码");
              this.showSms = true;
              return;
            }
          }
          if (response.data.status == 'SUCCESS') {

            this.hideLoading(response.data.text);
            this.$router.back();
          } else {
            this.hideLoading(response.data.text);

          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        });
      }


    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.bdyhk {*/
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
  /*.content {*/
  /*padding: 0.72rem 0 1.2rem !important;*/
  /*}*/
  /*}*/
  /*}*/

  .bdyhk {

    /*background-color: #ffffff;*/
    /*min-height: 100vh;*/
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
      color: #333333;
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

    .content {
      margin: 0.88rem 0 0 0;
      /*margin-bottom: 1.2rem;*/
      .tv1 {
        background: #f7f7f7;
        font-size: 0.24rem;
        color: #999999;
        padding: 0.12rem 0.3rem;
      }
      .tv2 {
        font-size: 0.3rem;
        color: #333333;
        padding: 0.3rem;
      }
      .content_operate{
        margin: 0 0.3rem;
        overflow: hidden;
        background: #fff;
        border-radius: 0.2rem;
      }
      .tv3 {
        font-size: 0;
        display: inline-block;
        .tv4 {
          width: 50%;
          display: inline-block;
          font-size: 0;
          .iv1 {
            width: 100%;
            padding-left: 0.3rem;
            padding-right: 0.1rem;
          }
        }
        .tv5 {
          width: 50%;
          display: inline-block;
          font-size: 0;
          .iv2 {
            width: 100%;
            padding-right: 0.3rem;
            padding-left: 0.1rem;

          }
        }
      }
      .tv6 {
        background: #f7f7f7;
        height: 0.2rem;
        margin-top: 0.58rem;
      }
      .tv7:not(:last-child) {
        border-bottom: 1px solid #ededed;
      }
      .tv7 {
        margin: 0 0.3rem ;
        .tv11 {
          position: relative;
          .tv12 {
            width: 2.5rem;
            display: inline-block;
            position: relative;
            left: 0;
            color: #333333;
            font-size: 0.28rem;
            margin: 0 0.3rem 0 0;
          }
          .tv13 {
            background: white;
            width: calc(100% - 3rem);
            display: inline-block;
            height: 0.75rem;
            border-width: 0;
            font-weight: 500;
            /*padding: 0.4rem 0;*/
            color: #333333;
            font-size: 0.28rem;;
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

      .tv111 {
        position: relative;
        .tv122 {
          width: 2.5rem;
          display: inline-block;
          position: relative;
          left: 0;
          color: #333333;
          font-size: 0.28rem;
        }
        .tv133 {
          background: white;
          width: calc(100% - 4.5rem);
          display: inline-block;
          height: 0.75rem;
          border-width: 0;
          font-weight: 500;
          padding: 0.4rem 0;
          color: #333333;
          font-size: 0.28rem;;
          text-align: right;
        }
        .tv8 {
          width: 1.6rem;
          display: inline-block;
          text-align: center;
          color: white;
          background: @theme_bgColor;
          border-radius: 0.3rem;
          font-size: 0.24rem;
          padding-top: 0.1rem;
          padding-bottom: 0.1rem;
          margin-left: 0.2rem;
        }

      }

    }
    .jhcd {
      margin: 1.5rem 0;
      text-align: center;
       &>div{
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
