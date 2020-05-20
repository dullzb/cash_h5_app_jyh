<!--续期订单详情-->
<template>
  <div class="xqOrderDetail">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">

      <div class="tv1">订单明细</div>

      <div class="tv7">
        <div class="tv11">
          <div class="tv12">续期费用</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="orderDetail.renewalCost==null?'0元':orderDetail.renewalCost+'元'"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">原到账时间</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="repaymentTime"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">续期到账时间</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="repaymentTime2"/>
        </div>
      </div>
    </div>
    <div class="jhcd">
      <div class="tv6" @click="ljhkClick">立即续期</div>
    </div>
    <div class="tv4">

      小提示：本平台不对学生开放，注意自己的还款能力，谨慎借款
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
        titleName: '续期订单',
        idcard: '',
        orderId: '',
        orderDetail: {userForm: {}, orderLogFormList: []},
        repaymentTime: '',
        repaymentTime2: '',
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
      }
    },
    created() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.invoke_native("getDevice", "", "jsGetUserInfoCallBack");
      } else if (isiOS) {

        // window.webkit.messageHandlers.getDevice.postMessage()
        window.location.href = 'cashloans://getDevice';
      }
      this.orderId = this.$route.query.orderId;
      this.getOrderDetail();
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
        }
      },
      back() {
        this.$router.back()
      },
      tabClick(type) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.android.invoke_native("goAuth", type, "jsGetUserInfoCallBack");
        } else if (isiOS) {

          window.webkit.messageHandlers.goAuth.postMessage(type)
        }

        console.log(type)
      },
      // 获取用户信息
      getUserInfo() {

        //登陆
        if (this.checkCode == '') {
          Toast({message: '请输入验证码', position: 'center'});
          return;
        }
        let params1 = {
          jsonObject: {}
        };
        if (this.isiOS) {
          params1.jsonObject.phoneType = 'ios'
        } else {
          params1.jsonObject.phoneType = 'Android'
        }
        if (this.channel) {
          params1.jsonObject.channel = this.channel
        }
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestCas(params1, '/user/info/c').then((response) => {
          if (response.data.status == 'SUCCESS') {
            Toast({message: response.data.text, position: 'center'});
            storage['userMes'] = JSON.stringify(response.data.t)
          } else {
            Toast({message: response.data.text, position: 'center'});

          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            Toast({message: error.text, position: 'center'});
          } else {
            Toast({message: error.message, position: 'center'});
          }
        });
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
      formatDate2(time) {
        let date = new Date(time);
        return Utils.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      // C端订单列表
      getOrderDetail() {
        console.log('1215')
        let params1 = {
          jsonObject: {
            orderId: this.orderId
          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();
        Base.requestPos(params1, '/order/info').then((response) => {
          if (response.data.status == 'SUCCESS') {
            this.orderDetail = response.data.t.order;

            this.repaymentTime = this.formatDate2(response.data.t.order.repaymentTime)
            this.repaymentTime2 = this.formatDate2(response.data.t.order.repaymentTime + (1000 * 24 * 60 * 60 * response.data.t.order.renewalTerm))

          }
          this.hideLoading();
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        });
      },
      //立即续期
      ljhkClick() {
        let params1 = {
          jsonObject: {
            payType: '1',
            moneyType: '3',
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
          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();
        Base.requestPos(params1, '/backLoanOrder/inner').then((response) => {
          if (response.data.status == 'SUCCESS') {

            const div = document.createElement('div')
            div.innerHTML = response.data.t.form //此处form就是后台返回接收到的数据
            document.body.appendChild(div)
            document.forms[0].submit()
          }
          this.hideLoading(response.data.text);
        }).catch(res => {
          this.hideLoading(res.message);
        });
      }
    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.xqOrderDetail {*/
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
  /*.topNav {*/
  /*padding: 1.36rem 0 0 !important;*/
  /*}*/
  /*.content {*/
  /*padding: 0.72rem 0 1.2rem !important;*/
  /*}*/
  /*}*/
  /*}*/

  .xqOrderDetail {

    /*background-color: #ffffff;*/
    min-height: 100vh;
    .van-nav-bar-top {
      background-color: #333;
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
        font-weight: bold;
      }
    }
    .van-hairline--bottom::after {
      border-bottom-width: 0 !important;
    }
    [class*=van-hairline]::after {
      border: 0 solid @title_color !important;
    }
    .van-nav-bar .van-icon {
      color: #333;
      width: 0.4rem;
      vertical-align: middle;
    }
    .topNav {
      background: #FFFFFF;
      padding: 0.88rem 0 0;
      margin-bottom: 0.2rem;
      .tv1 {
        font-size: 0.36rem;
        color: #333333;
        font-weight: bold;
        padding: 0.12rem 0.3rem;
      }
      .addProgressItemBtn {
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 0.24rem;
        color: #999;
        text-align: center;
      }
      .progressList {
        padding: 0 0.3rem 0rem 0.3rem;
        /*display: flex;
        flex-direction:column-reverse;*/
        .progressItem {
          font-family: "PingFangSC-Medium";
          padding-bottom: 0.2rem;
          font-size: 0;
          position: relative;
          &:nth-of-type(0) {
            display: block;
          }
          &:nth-of-type(1) {
            display: block;
          }
          &:first-child {
            .progress-cricle {
              background: @theme_bgColor !important;
            }
          }
          &:last-child {
            .progress-line {
              display: none !important;
            }
          }
          .left {
            padding-top: 3px;
            width: 0.46rem;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            .progress-cricle {
              display: block;
              width: 0.24rem;
              height: 0.24rem;
              background: #dcdcdc;
              border-radius: 50%;
              margin: 0 auto;
            }
            .progress-line {
              display: block;
              width: 2px;
              height: 100%;
              background: #dcdcdc;
              margin: 0 auto;
            }
          }
          .right {
            vertical-align: top;
            padding-left: 0.46rem;
            font-size: 0.26rem;
            .color999999 {
              color: #999;
            }
            .ftsz32 {
              font-size: 0.32rem;
            }
            & > div {
              margin-bottom: 2px;
              color: #333333;
            }
          }
        }
      }
    }

    .content {
      padding: 0.88rem 0 0 0;
      /*margin-bottom: 1.2rem;*/
      background: #FFFFFF;
      .tv1 {

        font-size: 0.36rem;
        color: #333333;
        font-weight: bold;
        padding: 0.12rem 0.3rem;
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
    }

    .jhcd {
      text-align: center;
      margin-top: 1rem;
      text-align: center;
      &>.tv6{
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
  }
</style>

<style scoped>

</style>
