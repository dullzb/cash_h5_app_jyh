<!--订单-->
<template>
  <div class="bankList">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">
      <div v-show="listData.length>0">
        <div class="item clearfix" v-for="(item,index) of listData" @click="itemClick(item,index)">

          <div class="p3">
            <div class="p4">
              <span class="p6">{{item.key}}</span>
            </div>
            <img class="p7" v-show="item.check"
                 src="../../assets/ic_duihao@3x.png"/>
          </div>
        </div>
      </div>

    </div>
    <div class="jhcd">
      <div class="tv5" @click="ljhkClick">确认</div>
    </div>
  </div>

</template>

<script>

  import {Cell, Col, Icon, List, NavBar, PullRefresh, Row, Swipe, SwipeItem, Toast} from "vant";

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
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
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
        titleName: '选择银行',
        listData: [
          {value: "ICBC_NET_B2C", key: "工商银行", check: false},
          {value: "CMBCHINA_NET_B2C", key: "招商银行", check: false},
          {value: "ABC_NET_B2C", key: "中国农业银行", check: false},
          {value: "CCB_NET_B2C", key: "建设银行", check: false},
          {value: "NJCB_NET_B2C", key: "南京银行", check: false},
          {value: "BOCO_NET_B2C", key: "交通银行", check: false},
          {value: "CIB_NET_B2C", key: "兴业银行", check: false},
          {value: "CMBC_NET_B2C", key: "中国民生银行", check: false},
          {value: "CEB_NET_B2C", key: "光大银行", check: false},
          {value: "BOC_NET_B2C", key: "中国银行", check: false},
          {value: "PINGANBANK_NET_B2C", key: "平安银行", check: false},
          {value: "ECITIC_NET_B2C", key: "中信银行", check: false},
          {value: "CGB_NET_B2C", key: "广发银行", check: false},
          {value: "SPDB_NET_B2C", key: "上海浦东发展银行", check: false},
          {value: "POST_NET_B2C", key: "中国邮政", check: false},
          {value: "HXB_NET_B2C", key: "华夏银行", check: false},
          {value: "SHB_NET_B2C", key: "上海银行", check: false},
          {value: "HKBEA_NET_B2C", key: "东亚银行", check: false},
          {value: "BCCB_NET_B2C", key: "北京银行", check: false},
        ],
        isLoading: false,
        selectBank: '',
        orderId: '',
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
    filters: {},
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
    },
    mounted() {

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
        }, 500);
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
      itemClick(item, index) {
        this.listData.forEach((obj) => {
          obj.check = false;
        });

        item.check = true;
        this.selectBank = item;
        console.log(JSON.stringify(item))
      },
      //立即还款
      ljhkClick() {
        console.log(111)
        if (Utils.isEmpty(this.selectBank)) {
          Toast('请选择银行');
          return;
        }
        let params1 = {
          jsonObject: {
            payType: '2',
            moneyType: '5',
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
            bankCode: this.selectBank.value,
          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();
        Base.requestPos(params1, '/backLoanOrder/inner').then((response) => {
          console.log(JSON.stringify(response.data.t))

          if (response.data.status == 'SUCCESS') {
            const div = document.createElement('div')
            div.html = "";
            div.innerHTML = response.data.t.form; //此处form就是后台返回接收到的数据
            document.body.appendChild(div);
            document.forms[0].submit()
          }
          this.hideLoading(response.data.text);
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        });
      },

    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.bankList {*/
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

  .bankList {
    background-color: #f7f7f7;
    min-height: 100vh;
    .swipe {
      width: 100%;
      height: 3.4rem;
      .swipe_img {
        object-fit: cover;
        width: 100%;
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
      border: 0 solid @title_color !important;
    }

  }
</style>

<style lang="less" scoped>
  .bankList {
    .content {

      padding: 0.88rem 0 1.5rem;
      .item {
        margin-top: 1px;
        background-color: #ffffff;

        .p3 {
          clear: both;
          height: 0.80rem;
          line-height: 0.40rem;
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
            }

          }
          .p7 {
            width: 0.4rem;
            float: right;
            margin: 0.3rem;
          }

        }

      }

    }
    .jhcd {
      position: fixed;
      width: 100%;
      bottom: 0.3rem;
      text-align: center;
      .tv5 {
        .theme_buttom();
      }
    }
    .tv_tip {
      width: 100%;
      text-align: center;
      position: fixed;
      background: #FFFFFF;
      padding-top: 0.2rem;
      bottom: 0;
      padding-bottom: 1.2rem;
      color: #999999;
      font-size: 0.24rem;
    }

  }

</style>
