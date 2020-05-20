<!--实人认证-->
<template>
  <div class="srrz">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">

      <div class="tv1">实名认证信息无法修改，请仔细确认在提交</div>
      <div class="tv2">身份证识别，请对准取景框的四边</div>

      <div class="tv3">
        <div class="tv4" @click="sfzClick(1)">
          <img class="iv1" v-show="idCardPosition==null"
               src="../../assets/left@3x.png"/>
          <img class="iv1" v-show="idCardPosition!=null" :src="idCardPosition"/>
        </div>
        <div class="tv5" @click="sfzClick(2)">
          <img class="iv2" v-show="idCardBack==null"
               src="../../assets/right@3x.png"/>
          <img class="iv2" v-show="idCardBack!=null" :src="idCardBack"/>
        </div>
      </div>

      <div class="tv6"></div>

      <div class="tv7">
        <div class="tv8">
          <div class="tv9">姓名</div>
          <input class="tv10" readonly unselectable="on" disabled="disabled" type="text" v-model="userName"
                 placeholder="请填写真实姓名"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv8">
          <div class="tv9">身份证号</div>
          <input class="tv10" readonly unselectable="on" disabled="disabled" type="text" v-model="idCard"
                 placeholder="请填写真实的身份证号"/>
        </div>
      </div>
    </div>
    <div class="jhcd">
      <div @click="xyb">
        下一步
      </div>
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
        titleName: '实名认证',
        name: '',
        userInfo: '',
        idCard: null,
        userName: null,
        idCardPosition: null,
        idCardBack: null,
        canClick: true,
        clickTag: true
        // idCardBack: 'http://loan-img.oss.aliyuncs.com/id-card/20181219185940530sfzFile.jpg',
      }
    },
    created() {

      window.setIdCardInfo = this.setIdCardInfo;
      window.setIdCardInfoIOS = this.setIdCardInfoIOS;
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
        this.idCard = this.userInfo.idCard;
        this.userName = this.userInfo.trueName;
        this.idCardPosition = this.userInfo.idCardPosition;
        this.idCardBack = this.userInfo.idCardBack;
      }

      // this.getUserId(2); //请求uid 传2表示可不登录情况返回uid可能为空 传1是必须登录
    },
    mounted() {
      // this.getUserInfo();

      window.setIdCardInfoIOS = this.setIdCardInfoIOS;
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
      xyb(){
        if (Utils.isEmpty(this.idCardPosition)) {
          Toast('请先完成实名认证！')
          return;
        }

        if (Utils.isEmpty(this.idCardBack)) {
          Toast('请先完成实名认证！')
          return;
        }
        if (Utils.isEmpty(this.idCard)) {
          Toast('请先完成实名认证！')
          return;
        }
        if (Utils.isEmpty(this.userName)) {
          Toast('请先完成实名认证！')
          return;
        }
        this.back();
      },
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
      setIdCardInfoIOS(value) {
        // Toast('234')
        // alert('1233444')
        // alert("swt--" + value);

        // this.userName = value.userName;
        let json = JSON.parse(value);
        if (!Utils.isEmpty(json.t.idCard)) {
          this.idCard = json.t.idCard;
        }
        if (!Utils.isEmpty(json.t.userName)) {
          this.userName = json.t.userName;
        }
        if (!Utils.isEmpty(json.t.idCardPosition)) {
          this.idCardPosition = json.t.idCardPosition;
        }
        if (!Utils.isEmpty(json.t.idCardBack)) {
          this.idCardBack = json.t.idCardBack;
        }
      },
      setIdCardInfo(json) {
        // let json = JSON.parse(params);
        if (!Utils.isEmpty(json.t.idCard)) {
          this.idCard = json.t.idCard;
        }
        if (!Utils.isEmpty(json.t.userName)) {
          this.userName = json.t.userName;
        }
        if (!Utils.isEmpty(json.t.idCardPosition)) {
          this.idCardPosition = json.t.idCardPosition;
        }
        if (!Utils.isEmpty(json.t.idCardBack)) {
          this.idCardBack = json.t.idCardBack;
        }


      },
      sfzClick(type) {
        if (!this.clickTag) {
          return;
        }
        this.clickTag = false;
        setTimeout(() => {
          this.clickTag = true;
        }, 5000);

        if (Utils.isEmpty(localStorage.userMes)) {
          this.$router.push('/login')
          return
        }
        if (type == 1 && !Utils.isEmpty(this.idCardPosition)) {
          return
        }
        if (type == 2 && !Utils.isEmpty(this.idCardBack)) {
          return
        }
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let params = JSON.stringify({
          userId: JSON.parse(localStorage.userMes).userId,
          token: localStorage.token,
          cardType: type
        });
        if (isAndroid) {
          window.android.invoke_native("goSfz", params, "jsGetUserInfoCallBack");
        } else if (isiOS) {
          window.webkit.messageHandlers.goSfz.postMessage(params)
        }

        console.log(type)
      },

      // 提交实名认证实名认证
      realname() {
        if (Utils.isEmpty(this.idCardPosition)) {
          Toast('请上传身份证正面')
          return;
        }

        if (Utils.isEmpty(this.idCardBack)) {
          Toast('请上传身份证反面')
          return;
        }
        if (Utils.isEmpty(this.idCard)) {
          Toast('身份证号不能为空')
          return;
        }
        if (Utils.isEmpty(this.userName)) {
          Toast('姓名不能为空')
          return;
        }

        let params1 = {
          jsonObject: {
            "idCard": this.idCard,
            "userName": this.userName,
            // "idCardPosition": this.idCardPosition,
            // "idCardBack": this.idCardBack,
          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        if (this.canClick) {
          this.canClick = false;
        } else {
          return;
        }
        this.showLoading();
        Base.requestCas(params1, '/validate/realname').then((response) => {
          this.canClick = true

          this.hideLoading(response.data.text)
          if (response.data.success == true) {
            this.$router.back();
          }
        }).catch((error) => {
          this.canClick = true;
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        })
      },

    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.srrz {*/
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

  .srrz {

    background-color: #ffffff;
    min-height: 100vh;
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
      padding: 0.88rem 0 1.2rem;

      .tv1 {
        background: #faefcf;
        font-size: 0.22rem;
        color: #f54246;
        padding: 0.12rem 0.3rem;
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
            height: 2.3rem;
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
            height: 2.3rem;

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
        .tv8 {
          position: relative;
          .tv9 {
            width: 1.5rem;
            display: inline-block;
            position: relative;
            left: 0;
            color: #333333;
            font-size: 0.3rem;
            margin: 0 0.3rem;
          }
          .tv10 {
            width: calc(100% - 2.2rem);
            display: inline-block;
            height: 0.75rem;
            border-width: 0;
            font-weight: 500;
            padding: 0.4rem 0;
            color: #333333;
            font-size: 0.3rem;;
            background: #FFFFFF;
          }
        }
      }
    }
    .jhcd {
      text-align: center;
      margin-top: 0.5rem;
      &>div{
        .theme_buttom();
      }
    }
    input:disabled, input[disabled] {
      -webkit-opacity: 1;
      opacity: 1;
    }
  }
</style>

<style scoped>

</style>
