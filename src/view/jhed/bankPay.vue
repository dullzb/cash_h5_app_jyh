<!--银行卡支付-->
<template>
  <div class="bankPay">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">

      <div style="height: 0.1rem;background: #f7f7f7"></div>
      <div class="tv1 tv1_1">支付金额</div>
      <div class="tv1"><span class="tv14">{{payMoney}}</span> <span class="tv15">元</span></div>
      <div class="tv16">温馨提示：可更换本人其它银行卡</div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">持卡人</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled" v-model="formData.trueName"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">银行卡号</div>
          <input class="tv13" v-model="formData.card" :class="formData.card==''?'tv13':'tv17'"
                 placeholder="请输入银行卡号"/>
          <div class="del_input_btn" @click.stop="delIdCard(1)" v-show="formData.card!=''">
            更换
          </div>
        </div>
      </div>
      <!--<div class="tv7">-->
      <!--<div class="tv11">-->
      <!--<div class="tv12">所属银行</div>-->
      <!--<input class="tv13" v-model="formData.cardName" placeholder="请输入所属银行"/>-->
      <!--</div>-->
      <!--</div>-->
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">银行预留手机号</div>
          <input class="tv13" v-model="formData.telphone" :class="formData.telphone==''?'tv13':'tv17'"
                 placeholder="请输入预留手机号"/>
          <div class="del_input_btn" @click.stop="delIdCard(2)" v-show="formData.telphone!=''">
            更换
          </div>
        </div>
      </div>
      <div class="tv7">
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
    <div class="jhcd">
      <div @click="validateInfo">
        立即支付
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
        titleName: '确认支付',
        name: '',
        idcard: '',
        telphone: '',
        checkCode: '',
        setTimeOut: false,
        dtime: 60,
        canGetCode: true,
        userInfo: '',
        showSms: false,
        formData: {
          "card": '', //"卡号",
          "cardName": '', // 银行卡名称,
          "trueName": '', //真实姓名,
          "telphone": '', //银行卡预留手机号,
          "codeMsg": '', //验证码,
        },
        payMoney: "",
        type: "", //2立即还款 1续期还款
        orderNo: '',
        loginIp: '', //登录ip
        IMEI: '', //设备号
        lat: '', //维度
        lon: '', //经度
        phoneStoreName: '', //手机厂商名
        phoneProName: '', //手机产品名
        phoneBrand: '', //手机品牌
        phoneModel: '', //手机型号
        phoneCpu: '', //手机主板名
        phoneName: '', //设备名
        phoneVersion: '', //系统版本
        wifiName: '', //wifi名称
        netType: '', //0:wifi 1:1G,2:2G,3:3G,4:4G,5:5G,6:6G'
        version: '',
        appName: '',
      }
    },
    created() {

      window.setDevice = this.setDevice;
      this.payMoney = this.$route.query.payMoney;
      this.type = this.$route.query.type;
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
        this.formData.trueName = this.userInfo.trueName;
        this.getBankCardList();
      }
      // this.getUserId(2); //请求uid 传2表示可不登录情况返回uid可能为空 传1是必须登录
    },
    mounted() {
      // this.getUserInfo();
      var input = document.getElementsByTagName("input")
      for (var i = 0; i < input.length; i++) {

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
      setDevice(json) {
        if (!Utils.isEmpty(json)) {
          if (ISIOS) {
            json = JSON.parse(json);
          }
          this.loginIp = json.loginIp;
          this.IMEI = json.IMEI;
          this.lat = json.lat;
          this.lon = json.lon;
          this.phoneStoreName = json.phoneStoreName;
          this.phoneProName = json.phoneProName;
          this.phoneBrand = json.phoneBrand;
          this.phoneModel = json.phoneModel;
          this.phoneCpu = json.phoneCpu;
          this.phoneName = json.phoneName;
          this.phoneVersion = json.phoneVersion;
          this.wifiName = json.wifiName;
          this.netType = json.netType;
          this.version = json.version;
          this.appName = json.appName;
        }
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
      //获取银行卡信息
      getBankCardList() {
        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestCas(params1, '/bankCard/list').then((response) => {
          if (response.data.status == 'SUCCESS') {
            this.hideLoading();
            if (response.data.t.list.length > 0) {

              this.formData.card = response.data.t.list[0].card;
              this.formData.cardName = response.data.t.list[0].bankName;
              this.formData.telphone = response.data.t.list[0].telphone;
            }

          } else {

            this.hideLoading(response.data.text);
          }
        }).catch((error) => {
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        })
      },
      //通过接口获取验证码
      getVCode() {

        let params1 = {
          jsonObject: {
            payType: this.type,
            // moneyType: '3',//支付宝
            moneyType: '6',//合利宝银行
            loginIp: this.loginIp, //登录ip
            IMEI: this.IMEI, //设备号
            lat: this.lat, //维度
            lon: this.lon, //经度
            phoneStoreName: this.phoneStoreName, //手机厂商名
            phoneProName: this.phoneProName, //手机产品名
            phoneBrand: this.phoneBrand, //手机品牌
            phoneModel: this.phoneModel, //手机型号
            phoneCpu: this.phoneCpu, //手机主板名
            phoneName: this.phoneName, //设备名
            phoneVersion: this.phoneVersion, //系统版本
            wifiName: this.wifiName, //wifi名称
            netType: this.netType, //0:wifi 1:1G,2:2G,3:3G,4:4G,5:5G,6:6G'
            version: this.version,
            appName: this.appName,
            card: this.formData.card,
            cardName: this.formData.cardName,
            trueName: this.formData.trueName,
            telphone: this.formData.telphone,

          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();
        Base.requestPos(params1, '/backLoanOrder/inner').then((response) => {
          if (response.data.status == 'SUCCESS') {
            this.showSms = true;
            this.hideLoading();
            this.daojishi();
            this.orderNo = response.data.t.form;

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
      },

      ///validate/bank 绑定银行卡
      validateInfo() {

        if (Utils.isEmpty(this.formData.trueName)) {
          Toast('持卡人不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.card)) {
          Toast('银行卡号不能为空')
          return;
        }
        // if (Utils.isEmpty(this.formData.cardName)) {
        //   Toast('所属银行不能为空')
        //   return;
        // }
        if (Utils.isEmpty(this.formData.telphone)) {
          Toast('预留手机号不能为空')
          return;
        }
        if (!this.showSms) {
          Toast('请获取验证码')
          return;
        }
        if (Utils.isEmpty(this.formData.codeMsg)) {
          Toast('验证码不能为空')
          return;
        }

        let params1 = {
          jsonObject: {
            'moneyOrderNo': this.orderNo,
            'checkCode': this.formData.codeMsg,
            'card': this.formData.card,
            'trueName': this.formData.trueName,
            'cardName': this.formData.cardName,
            'telphone': this.formData.telphone,
          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestOther(params1, '/flowMoneyThird/inner/c').then((response) => {

          if (response.data.status == 'SUCCESS') {
            this.hideLoading(response.data.text);

          } else {
            this.hideLoading(response.data.text);
          }

          Toast.loading({
            mask: true,
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '还款中 5 秒'
          });

          let second = 5;
          const timer = setInterval(() => {

            second--;
            console.log("11")
            if (second) {
              // toast.message = `等待 ${second} 秒`;
              Toast.loading('等待' + second + '秒');
            } else {
              this.resultText = '还款成功';
              clearInterval(timer);
              Toast.clear();
              this.back();

            }
          }, 1000);

          // setTimeout(() => {
          //   this.back();
          // }, 5000);
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
          setTimeout(() => {
            this.back();
          }, 1000);
        });
      },
      delIdCard(type) {
        if (type == 1) {
          this.formData.card = "";
        } else {
          this.formData.telphone = "";
        }
      }


    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.bankPay {*/
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

  .bankPay {

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
      background: #FFFFFF;
      .tv1 {
        background: #FFFFFF;
        font-size: 0.24rem;
        color: #999999;
        padding: 0.2rem 0.3rem 0.25rem 0.3rem;
        line-height: 0.35rem;
        box-sizing: border-box;
      }
      .tv16 {
        background: #f7f7f7;
        font-size: 0.24rem;
        color: #999999;
        padding: 0.3rem 0.3rem 0.1rem 0.3rem;
        line-height: 0.35rem;
        box-sizing: border-box;
      }
      .tv1_1 {
        padding-bottom: 0;
      }
      .tv1 span {
        color: #333333;
        display: inline-block;
        vertical-align: middle;
      }
      .tv1 .tv14 {
        font-size: 0.44rem;
      }
      .tv1 .tv15 {
        color: #7d7b7b;
        font-size: 0.32rem;
        padding-left: 0.1rem;
      }
      .tv2 {
        font-size: 0.3rem;
        color: #333333;
        padding: 0.3rem;
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
      .tv7 {
        border-bottom: 1px solid #ededed;

        .tv11 {
          position: relative;
          .tv12 {
            width: 2rem;
            display: inline-block;
            position: relative;
            left: 0;
            color: #333333;
            font-size: 0.28rem;
            margin: 0 0.3rem;
          }
          .tv13 {
            background: white;
            width: calc(100% - 3rem);
            display: inline-block;
            height: 0.75rem;
            border-width: 0;
            font-weight: 500;
            padding: 0.4rem 0;
            color: #333333;
            font-size: 0.28rem;;
            text-align: right;
          }
          .tv17 {
            background: white;
            width: calc(100% - 4rem);
            display: inline-block;
            height: 0.75rem;
            border-width: 0;
            font-weight: 500;
            padding: 0.4rem 0;
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
          width: 2rem;
          display: inline-block;
          position: relative;
          left: 0;
          color: #333333;
          font-size: 0.28rem;
          margin: 0 0.3rem;
        }
        .tv133 {
          background: white;
          width: calc(100% - 4.8rem);
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
      & > div {
        .theme_buttom();
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

    .del_input {
      position: absolute;
      top: 0.2rem;
      width: 0.4rem;
      right: 0.3rem;
    }
    .del_input_btn {
      position: absolute;
      top: 0.2rem;
      right: 0.3rem;
      padding: 0.05rem 0.2rem;
      background: @theme_bgColor;
      border-radius: 0.3rem;
      font-size: 0.24rem;
      color: #FFFFFF;
    }
  }
</style>

<style scoped>

</style>
