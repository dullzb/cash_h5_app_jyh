<!--登录-->
<template>
  <div class="yzm_page_one">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="yzm_content">
      <img style="margin-top: -2px;width: 100%" src="../../assets/bg2@3x.png" alt="">
      <div class="topIcon">
        <img src="../../assets/logo@3x.png" alt="">
      </div>
      <div class="form">
        <div class="yzm_tv1">请输入验证码</div>
        <div class="yzm_tv9">短信验证码发送至{{telphone}}</div>
        <div class="yzm_tv11">
          <div class="yzm_tv2">
            <input class="yzm_tv3" type="text" v-model="verify" placeholder="请输入图形验证码"/>
            <div class="yzm_tv13" v-show="imgUrlCode==''" @click="getImgVCode">获取图形验证码</div>
            <div class="" @click="getImgVCode"><img class="imgCode" v-show="imgUrlCode!=''" :src="imgUrlCode"/></div>
          </div>
        </div>
        <div class="yzm_tv11">
          <div class="yzm_tv22">
            <input class="yzm_tv3 mgt" type="tel" v-model="checkCode" placeholder="请输入验证码"/>

            <div class="yzm_tv13 mgt" v-show="!setTimeOut" @click="getVCode">发送验证码</div>
            <div class="yzm_tv10 mgt" v-show="setTimeOut">重发<span class="tv12">{{(+dtime+'s')}}</span></div>
          </div>
        </div>
        <!--<div class="yzm_tv14">收不到验证码？<span class="yzm_tv15">点击获取语音验证</span></div>-->
        <div class="yzm_bottom">
          <div class="yzm_jhcd">
            <div @click="jhedClick">
              下一步
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>

  import {CellGroup, Field, Icon, NavBar, Toast} from "vant";

  import Utils from '../../utils'
  import Base from '@/common/base.js';

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
        titleName: '',
        telphone: '',
        checkCode: '',
        verify: '',
        setTimeOut: false,
        dtime: 60,
        canGetCode: true,
        canGetCode2: true,
        imgUrlCode: '',
        loginIp: '', //登录ip
        phoneNo: '', //设备号
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
        platform: '', //平台
        version: '', //版本号
        appName: '', //应用名称

      }
    },
    created() {

      window.setDevice = this.setDevice;
      this.telphone = this.$route.query.telphone;
      this.getImgVCode();
      console.log(this.telphone)
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.invoke_native("getDevice", "", "jsGetUserInfoCallBack");
      } else if (isiOS) {

        // window.webkit.messageHandlers.getDevice.postMessage()
        window.location.href = 'cashloans://getDevice';
      }
    },
    mounted(){
      var input = document.getElementsByTagName("input")
      for (var i = 0; i < input.length; i++) {
        console.log(i)

        input[i].addEventListener('blur', function () {
          window.scroll(0, 0);
        });
      }
    },

    methods: {
      back() {
        this.$router.back()
      },
      tabClick(type) {
        console.log(type)
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
      setDevice(json) {
        if (!Utils.isEmpty(json)) {
          if (ISIOS) {
            json = JSON.parse(json);
          }
          this.loginIp = json.loginIp;
          this.phoneNo = json.phoneNo;
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
          this.platform = json.platform;
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
      //通过接口获取验证码
      getImgVCode() {
        if (this.canGetCode2) {
          this.canGetCode2 = false;
        } else {
          return;
        }

        let params1 = {
          jsonObject: {
            "telphone": this.telphone,
            "type": 1
          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestOther(params1, '/img/verify').then((response) => {
          this.hideLoading();
          this.canGetCode2 = true
          this.imgUrlCode = "";
          // this.imgUrlCode = 'data:image/jpg;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
          this.imgUrlCode = response.data.t.url;
        }).catch((error) => {
          this.canGetCode2 = true;
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        })
      },
      //通过接口获取验证码
      getVCode() {

        if (Utils.isEmpty(this.imgUrlCode)) {
          Toast('请获取图形验证码')
          return;
        }
        if (Utils.isEmpty(this.verify)) {
          Toast('请输入图形验证码')
          return;
        }
        if (this.canGetCode) {
          this.canGetCode = false;
        } else {
          return;
        }

        let params1 = {
          jsonObject: {
            "telphone": this.telphone,
            "verify": this.verify,
            "type": 1
          }
        };
        console.log(JSON.stringify(params1.jsonObject))
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();
        Base.requestOther(params1, '/sms/sendCheckCode').then((response) => {
          this.canGetCode = true
          console.log(123)
          if (response.data.success == true) {
            Toast({message: "验证码已发送", position: 'center'});
            this.daojishi()
          } else {
            this.hideLoading(response.data.text);
          }
        }).catch((error) => {
          this.canGetCode = true;
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        })
      },

      jhedClick() {
        if (Utils.isEmpty(this.imgUrlCode)) {
          Toast('请获取图形验证码')
          return;
        }
        if (Utils.isEmpty(this.verify)) {
          Toast('请输入图形验证码')
          return;
        }
        //登陆
        if (this.checkCode == '') {
          Toast({message: '请输入验证码', position: 'center'});
          return;
        }
        let params1 = {
            jsonObject: {
              "telphone": this.telphone,
              "checkCode": this.checkCode,
              "type": 2,
              loginIp: this.loginIp, //登录ip
              phoneNo: this.phoneNo, //设备号
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
              platform: this.platform, //平台
              version: this.version, //版本号
              appName: this.appName, //应用名称
            }
          }
        ;
        if (this.isiOS) {
          params1.jsonObject.phoneType = 'ios'
          params1.jsonObject.userType = '2'
        } else {
          params1.jsonObject.phoneType = 'Android'
          params1.jsonObject.userType = '1'
        }
        if (this.channel) {
          params1.jsonObject.channel = this.channel
        }
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams(this.platform, this.version);
        this.showLoading();

        Base.requestCas(params1, '/user/login').then((response) => {
          if (response.data.status == 'SUCCESS') {

            Toast({message: response.data.text, position: 'center'});
            storage['userMes'] = JSON.stringify(response.data.t.user)
            storage['token'] = response.data.t.token;
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            let params = JSON.stringify({
              userId: JSON.parse(localStorage.userMes).userId,
              token: localStorage.token
            });

            try {
              if (isAndroid) {
                window.android.invoke_native("getUserId", params, "jsGetUserInfoCallBack");
              } else if (isiOS) {

                window.webkit.messageHandlers.getUserId.postMessage(params)
              }
            }catch (e) {

            }

            this.$router.go(-2);

          }
          this.hideLoading(response.data.text);
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
  /*.yzm_page_one {*/
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
  /*.yzm_content {*/
  /*padding: 0.72rem 0 1.2rem !important;*/
  /*}*/
  /*}*/
  /*}*/

  .yzm_page_one {
    padding-top: 1px;
    background: url("../../assets/login_bg@3x.png") 0% 0% repeat-y;
    background-size: 100% auto;
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
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .van-nav-bar {
      /*padding-top: 0.4rem;*/
      /*height: 1.28rem;*/
      background-color: transparent;
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
        color: #fff;
        width: 0.36rem;
        vertical-align: middle;
        font-weight: bold;
      }
      .van-nav-bar__title {
        font-family: "PingFangSC-Medium";
        color: #fff;
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
  .yzm_page_one{
    .yzm_content {
      position: relative;
      padding: 1px 0rem 1rem;
      margin: 2rem 0.3rem 0;
      background: #fff;
      border-radius: 0.2rem;

      .yzm_tv1 {
        margin-top: 1.2rem;
        color: #333333;
        font-size: 0.5rem;
        font-weight: bold;
      }
      .yzm_tv9 {
        font-size: 0.28rem;
        color: #999999;
        padding-top: 0.1rem;
      }
      .yzm_tv11 {
        border-bottom: 1px solid #bababa;
      }
      .yzm_tv14 {
        margin-top: 0.3rem;
        text-align: right;
        font-size: 0.24rem;
        color: #999999;
        .yzm_tv15 {
          color: rgb(229, 60, 47);
        }
      }
      .yzm_tv2 {

        width: 100%;
        height: 1.75rem;
        .yzm_tv3 {
          float: left;
          width: 70%;
          height: 0.75rem;
          border-width: 0;
          font-weight: 500;
          margin-top: 1rem;
          color: #999999;
          font-size: 0.3rem;
        }
        /*.yzm_tv10 {
          line-height: 0.75rem;
          width: 30%;
          text-align: right;
          float: right;
          margin-top: 1rem;
          height: 0.75rem;
          font-size: 0.32rem;
          color: #999;
        }*/
        .yzm_tv13 {
          line-height: 0.65rem;
          width: 30%;
          text-align: center;
          float: right;
          margin-top: 1rem;
          height: 0.65rem;
          font-size: 0.24rem;
          color: #999;
          border-radius: 5px;
          &:active {
          }

        }
        .mgt {
          margin-top: 0.5rem;
        }
        .hgt {
          height: 1.25rem;
        }
        .imgCode {
          line-height: 0.65rem;
          width: 30%;
          text-align: center;
          float: right;
          margin-top: 1rem;
          height: 0.65rem;
          font-size: 0.24rem;
          border-radius: 5px;
        }
        .tv12 {
          color: rgb(255,84,84);
        }
      }
      .yzm_tv22 {

        width: 100%;
        height: 1.25rem;
        .yzm_tv3 {
          float: left;
          width: 70%;
          height: 0.75rem;
          border-width: 0;
          font-weight: 500;
          margin-top: 1rem;
          color: #333333;
          font-size: 0.3rem;
        }
        .yzm_tv10 {
          line-height: 0.75rem;
          width: 30%;
          text-align: right;
          float: right;
          margin-top: 1rem;
          height: 0.75rem;
          font-size: 0.32rem;
          color: #999;
        }
        .yzm_tv13 {
          line-height: 0.65rem;
          width: 30%;
          text-align: center;
          float: right;
          margin-top: 1rem;
          height: 0.65rem;
          font-size: 0.28rem;
          color: #2f2808;
          background: #f8da49;
          border-radius: 5px;
          &:active {
            background: #eec93f;
          }

        }
        .mgt {
          margin-top: 0.5rem;
        }
        .hgt {
          height: 1.25rem;
        }
        .imgCode {
          line-height: 0.65rem;
          width: 30%;
          text-align: center;
          float: right;
          margin-top: 1rem;
          height: 0.65rem;
          font-size: 0.24rem;
          border-radius: 5px;
        }
        .tv12 {
          color: rgb(255,84,84);
        }
      }
      .tv4 {
        display: inline-block;
        color: #999999;
        margin-top: 0.22rem;
        font-size: 0.24rem;
        .tv5 {
          display: inline-block;
        }
        .tv6 {
          display: inline-block;
          color: #999999;
          width: 0.32rem;
          vertical-align: top;
        }
        .tv7 {
          vertical-align: top;
          width: calc(100% - 0.4rem);
          display: inline-block;
          color: #999999;
        }
        .tv8 {
          display: inline-block;
          color: @theme_color;
        }
      }
    }
    .yzm_bottom{
      margin: 0rem;
      .yzm_jhcd {
        text-align: center;
        margin-top: 1.2rem;
        &>div{
          .theme_buttom();
          width: 100%;
        }
      }
    }
  }


</style>
