<!--订单详情-->
<template>
  <div class="orderDetail">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="topNav">
      <div class="tv1">订单进度</div>
      <ul class="progressList">
        <li class="progressItem" v-for="item in data">
          <div class="left">
            <i class="progress-cricle"></i>
            <i class="progress-line"></i>
          </div>
          <div class="right">
            <div class="am-ft-bold" v-show="item.createTimeName != ''">{{ item.createTimeName }}</div>
            <div class="am-ft-bold ftsz32">{{ item.orderLogTypeName }}</div>
            <div class="color999999">{{ item.orderLogMsg}}</div>
          </div>
        </li>
        <!--<li class="progressItem">
          <div class="left">
            <i class="progress-cricle"></i>
            <i class="progress-line"></i>
          </div>
          <div class="right">
            <div class="am-ft-bold">2018-12-06 18：28</div>
            <div class="am-ft-bold ftsz32">到账时间</div>
            <div class="color999999">放款时出现问题，请联系客服</div>
          </div>
        </li>
        <li class="progressItem">
          <div class="left">
            <i class="progress-cricle"></i>
            <i class="progress-line"></i>
          </div>
          <div class="right">
            <div class="am-ft-bold">2018-12-06 18：28</div>
            <div class="am-ft-bold ftsz32">到账时间</div>
            <div class="color999999">放款时出现问题，请联系客服</div>
          </div>
        </li>-->
      </ul>
      <div class="addProgressItemBtn" @click="addProgressItemBtn" v-show="data.length>=3">
        点击查看更多详情
      </div>
    </div>
    <div class="content">

      <div class="tv1">订单明细</div>

      <div class="tv7">
        <div class="tv11">
          <div class="tv12">应还金额</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="orderDetail.yhje==null?'0元':orderDetail.yhje+'元'"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">未还金额</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="orderDetail.sReturnMoney==null?'0元':orderDetail.sReturnMoney+'元'"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">减免金额</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="orderDetail.returnReductionMoney==null?'0元':orderDetail.returnReductionMoney+'元'"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">已还金额</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="orderDetail.returnMoney==null?'0元':orderDetail.returnMoney+'元'"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">服务费</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="orderDetail.serviceCost==null?'0元':orderDetail.serviceCost+'元'"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">到账金额</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="orderDetail.accountMoney==null?'0元':orderDetail.accountMoney+'元'"/>
        </div>
      </div>
      <div class="tv7"
           v-if="orderDetail.theaccountBank!=null&&orderDetail.theaccountBank!=''&&orderDetail.theaccountBank!=undefined">
        <div class="tv11">
          <div class="tv12">到账银行</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled" v-model="orderDetail.theaccountBank"/>
        </div>
      </div>
      <div class="tv7"
           v-if="orderDetail.theaccountBankCardNo!=null&&orderDetail.theaccountBankCardNo!=''&&orderDetail.theaccountBankCardNo!=undefined">
        <div class="tv11">
          <div class="tv12">银行卡尾号</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="orderDetail.theaccountBankCardNo"/>
        </div>
      </div>
      <div class="tv7"
           v-if="orderDetail.repaymentTimeName!=null&&orderDetail.repaymentTimeName!=''&&orderDetail.repaymentTimeName!=undefined">
        <div class="tv11">
          <div class="tv12">还款日</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled" v-model="orderDetail.repaymentTimeName"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">滞纳金</div>
          <input class="tv13" readonly unselectable="on" disabled="disabled"
                 v-model="orderDetail.lateMoney==null?'0元':orderDetail.lateMoney+'元'"/>
        </div>
      </div>
    </div>

    <div class="tv4">
      <div class="jhcd">
        <div class="tv5 tv6" @click="ljhkClick(2)" v-show="orderDetail.orderStatus>=5&&orderDetail.orderStatus<=9">
          立即还款
        </div>
        <div class="tv5 tv6" @click="ljhkClick(1)" v-show="renewFlg==1">立即续期</div>
      </div>
      <div class="jhcd"
           v-show="orderDetail.orderStatus==31">
        <div class="tv5" @click="bdyhkClick">绑定银行卡</div>
        <!--<div class="tv6" @click="xqOrderDetail">立即续期</div>-->
      </div>
      小提示：本平台不对学生开放，注意自己的还款能力，谨慎借款
    </div>


    <van-popup
      v-model="show"
      position="bottom"
      :close-on-click-overlay="false">
      <div class="p1">
        <span class="p11">选择付款方式</span>
        <img @click="cCancle" class="p2"
             src="../../assets/ic_close@3x.png"/>

        <div class="line"></div>
        <div class="p3" @click="payTypeClick(1)">
          <div class="p4">
            <img class="p5" src="../../assets/airpay@3x.png"/>
            <span class="p6">支付宝</span>
          </div>
          <img class="p7" v-show="payType==1"
               src="../../assets/ic_circle_select@3x.png"/>
          <img class="p7" v-show="payType!=1"
               src="http://cash-loan-img.oss-cn-hangzhou.aliyuncs.com/images/ic_circle@3x.png"/>
        </div>
        <!--<div class="line"></div>-->
        <!--<div class="p3" @click="payTypeClick(2)">-->
        <!--<div class="p4">-->
        <!--<img class="p5" src="http://cash-loan-img.oss-cn-hangzhou.aliyuncs.com/images/bankcard@3x.png"/>-->
        <!--<span class="p6">银行卡</span>-->
        <!--</div>-->
        <!--<img class="p7" v-show="payType==2"-->
        <!--src="http://cash-loan-img.oss-cn-hangzhou.aliyuncs.com/images/ic_circle_select@3x.png"/>-->
        <!--<img class="p7" v-show="payType!=2"-->
        <!--src="http://cash-loan-img.oss-cn-hangzhou.aliyuncs.com/images/ic_circle@3x.png"/>-->
        <!--</div>-->

        <div class="line"></div>
        <div class="p8" @click="confirmClick">确定</div>
      </div>

    </van-popup>

  </div>

</template>

<script>

  import {Cell, Col, Icon, List, NavBar, PullRefresh, Row, Toast, Popup} from "vant";

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
      [Popup.name]: Popup,
    },
    data() {
      return {
        leftArrow: true, // 返回箭头
        titleName: '订单详情',
        name: '111',
        idcard: '',
        dataGet: [],
        data: [],
        all: false,
        orderId: '',
        renewFlg: '',
        orderDetail: {userForm: {}, yhje: null, orderLogFormList: []},
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
        show: false,
        payType: 1,
        theaccountBankCardNo: '1',
      }
    },
    created() {
      window.setDevice = this.setDevice;
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
    },
    mounted() {
      var input = document.getElementsByTagName("input")
      for (var i = 0; i < input.length; i++) {
        console.log(i)

        input[i].addEventListener('blur', function () {
          window.scroll(0, 0);
        });
      }
      // this.getUserInfo();
      this.getOrderDetail();

    },
    activated() {
      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          this.getOrderDetail();
        } else {
          this.getOrderDetail();
          clearInterval(timer);

        }
      }, 2000);
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Utils.formatDate(date, 'hh:mm')
      }
    },
    methods: {
      bdyhkClick() {
        this.$router.push('bdyhkUpdate')
      },
      payTypeClick(type) {
        this.payType = type;
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
      ulSeeTwo() {
        this.data = []
        for (let i = 0; i < this.dataGet.length; i++) {
          if (i <= 2) {
            this.data.push(this.dataGet[i])
          }

        }
        this.all = false
      },
      ulSeeAll() {
        this.data = []
        this.dataGet.map((item) => {
          this.data.push(item)
        })
        this.all = true
      },
      addProgressItemBtn() {
        if (this.all) {
          this.ulSeeTwo()
        } else {
          this.ulSeeAll()
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
            this.$router.go(-2);
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
            this.renewFlg = response.data.t.renewFlg;
            if (Utils.isEmpty(this.orderDetail.loanMoney)) {
              this.orderDetail.loanMoney = 0;
            }
            if (Utils.isEmpty(this.orderDetail.lateMoney)) {
              this.orderDetail.lateMoney = 0;
            }
            this.orderDetail.yhje = parseFloat(this.orderDetail.loanMoney) + parseFloat(this.orderDetail.lateMoney);

            this.theaccountBankCardNo = this.orderDetail.theaccountBankCardNo;
            if (this.orderDetail.orderStatus < 0) {
              this.theaccountBankCardNo = "1";
            }
            this.dataGet = response.data.t.order.orderLogFormList;
            this.ulSeeTwo();
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
      xqOrderDetail() {
        this.$router.push({path: 'xqOrderDetail', query: {orderId: this.orderDetail.orderId}})
      },
      //立即还款
      ljhkClick(type) {
        var payMoney = this.orderDetail.sReturnMoney;
        if (2 == type) {
          payMoney = this.orderDetail.sReturnMoney
        } else {
          payMoney = this.orderDetail.renewLateMoney
        }
        this.$router.push({
          path: 'bankPay',
          query: {payMoney: payMoney, type: type}
        })
        // let params1 = {
        //   jsonObject: {
        //     payType: '2',
        //     // moneyType: '3',//支付宝
        //     moneyType: '6',//合利宝银行
        //     loginIp: this.loginIp, //登录ip
        //     IMEI: this.IMEI, //设备号
        //     lat: this.lat, //维度
        //     lon: this.lon, //经度
        //     phoneStoreName: this.phoneStoreName, //手机厂商名
        //     phoneProName: this.phoneProName, //手机产品名
        //     phoneBrand: this.phoneBrand, //手机品牌
        //     phoneModel: this.phoneModel, //手机型号
        //     phoneCpu: this.phoneCpu, //手机主板名
        //     phoneName: this.phoneName, //设备名
        //     phoneVersion: this.phoneVersion, //系统版本
        //     wifiName: this.wifiName, //wifi名称
        //     netType: this.netType, //0:wifi 1:1G,2:2G,3:3G,4:4G,5:5G,6:6G'
        //     version: this.version,
        //     appName: this.appName,
        //   }
        // };
        // params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        // params1.keyParams = Base.getKeyParams();
        // this.showLoading();
        // Base.requestPos(params1, '/backLoanOrder/inner').then((response) => {
        //   console.log(JSON.stringify(response.data.t))
        //   if (response.data.status == 'SUCCESS') {
        //     // if (document.getElementsByClassName('zfb')[0]) {
        //     //   document.getElementsByClassName('zfb')[0].remove()
        //     // }
        //     // const div = document.createElement('div')
        //     // div.className = "zfb";
        //     // div.innerHTML = response.data.t.form; //此处form就是后台返回接收到的数据
        //     // document.body.appendChild(div);
        //     // document.forms[0].submit()
        //
        //
        //
        //   }
        //   this.hideLoading();
        // }).catch(error => {
        //   if (!Utils.isEmpty(error.text)) {
        //     this.hideLoading(error.text);
        //   } else {
        //     this.hideLoading(error.message);
        //   }
        // });
      },

      showDialog() {

        this.show = true;
      },

      cCancle() {
        this.show = false;
      },

      confirmClick() {
        this.show = false;
        console.log(this.payType)
        if (this.payType == 1) {
          this.ljhkClick();
        } else if (this.payType == 2) {
          this.$router.push({path: 'bankList', query: {orderId: this.orderDetail.orderId}})
        }
      },
    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.orderDetail {*/
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
  /*.topNav {*/
  /*padding: 1.36rem 0 0 !important;*/
  /*}*/
  /*.content {*/
  /*padding: 0rem 0 1.2rem !important;*/
  /*}*/
  /*}*/
  /*}*/

  .orderDetail {

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
      padding: 0rem 0 3rem 0;
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

      background-size: 100% 100%;
      height: 0.9rem;
      text-align: center;
      line-height: 0.8rem;
      margin: 0.2rem 0;
      color: #FFFFFF;
      font-size: 0.32rem;
      vertical-align: middle;
      .tv5 {
        .theme_buttom();
        &.tv6 {
          width: 40%;
          min-width: 0
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
    .p1 {
      text-align: center;
      .p11 {
        font-size: 0.32rem;
        color: #333333;
        display: inline-block;
        text-align: center;
        margin-top: 0.2rem;
        margin-left: 0.6rem;
      }
      .p2 {
        width: 0.3rem;
        float: right;
        margin: 0.3rem;
      }
      .line {
        clear: both;
        width: 100%;
        height: 0.02rem;
        background: #e2e2e2;
        color: #e2e2e2;
      }
      .p3 {
        clear: both;
        height: 1.1rem;
        line-height: 0.55rem;
        .p4 {
          float: left;
          margin: 0.3rem;
          .p2 {
            font-size: 0.32rem;
          }
          .p5 {
            width: 0.5rem;
            vertical-align: middle;
          }
          .p6 {
            color: #333333;
            size: 0.26rem;
            margin-left: 0.15rem;
          }

        }
        .p7 {
          width: 0.4rem;
          float: right;
          margin: 0.3rem;
        }

      }
      .p8 {
        /*background: url("../../assets/anniu@3x.png") 50% 50% no-repeat;*/
        background: @theme_bgColor;
        background-size: 100% 100%;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        margin: 0.8rem 0.3rem;
        color: #FFFFFF;
        font-size: 0.37rem;
      }
    }
  }
</style>

<style scoped>

</style>
