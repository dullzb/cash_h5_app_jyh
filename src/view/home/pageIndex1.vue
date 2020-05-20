<!--首页-->
<template>
  <div class="page_one">
    <!--<div class="van-nav-bar-top">-->
    <!--<van-nav-bar-->
    <!--:title="titleName"-->
    <!--:left-arrow="leftArrow"-->
    <!--@click-left="back"-->
    <!--@click-right="">-->
    <!--</van-nav-bar>-->
    <!--</div>-->

    <div class="content">
      <div>
        <img class="swipe_img" src="../../assets/bg_home@3x.png"/>
        <div class="page_one_title">首页</div>
      </div>
      <div class="tv_bg">

        <div class="eduTv" v-show="homeData.type==1||homeData.type==2">

          <div class="tv1">最高可贷款额度(元)</div>
          <div class="tv2">￥{{homeData.value}}</div>
          <div class="jhcd">
            <div class="buttom donghua" @click="jhedClick">
              {{btnText}}
            </div>
          </div>
        </div>

        <div class="eduTv" v-show="homeData.type==3">
          <div class="tv8">您的申请已经在加速审核</div>
          <div class="tv9">审核时间8:00-20:30。请注意接收app和短信审核通知</div>
          <div>
            <!--<div class="tv18">
              <div class="tv8 tv88">8:00-20:30</div>
              <div class="tv9">审核时间</div>
            </div>-->
            <div class="tv19">
              <div class="jhcd3" v-show="homeData.type==3||homeData.type==4||homeData.type==7||homeData.type==9">
                <div @click="jhedClick">
                  {{btnText}}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="eduTv" v-show="homeData.type==9">
          <div class="tv8">您的申请已通过</div>
          <div class="tv8" style="padding-top: 0">请等待放款</div>
          <div>
            <div class="tv18">
            </div>
            <div class="tv19">
              <div class="jhcd3" v-show="homeData.type==3||homeData.type==4||homeData.type==7||homeData.type==9">
                <div @click="jhedClick">
                  {{btnText}}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="eduTv" v-show="homeData.type==4">
          <div class="tv8">您的审核已通过，请注意查收借款</div>
          <div class="tv8" style="padding-top: 0">你的还款日为{{homeData.time}}</div>
          <div class="tv8" style="padding-top: 0">请勿逾期</div>
          <div>
            <!--<div class="tv18">
              <div class="tv8 tv88">{{homeData.time}}</div>
              <div class="tv9">还款日期</div>
            </div>-->
            <div class="tv19">
              <div class="jhcd3" v-show="homeData.type==3||homeData.type==4||homeData.type==7||homeData.type==9">
                <div @click="jhedClick">
                  {{btnText}}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="eduTv" v-show="homeData.type==5">
          <div class="tv8">您的初审已通过立即前往查看</div>
          <div class="tv8" style="padding-top: 0"></div>
          <div>
            <div class="tv18">
            </div>
            <div class="tv19">
              <div class="jhcd3" v-show="homeData.type==5">
                <div @click="jhedClick">
                  {{btnText}}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="eduTv" v-show="homeData.type==6">
          <div class="tv20">{{to_url_msg}}</div>
          <div>
            <div class="tv19">
              <div class="jhcd3">
                <div @click="jhedClick">
                  {{btnText}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="eduTv" v-show="homeData.type==7">
          <div class="tv8 tv21">您的申请已逾期请尽快还款</div>
          <div>
            <div class="tv18">
            </div>
            <div class="tv19">
              <div class="jhcd3" @click="jhedClick" v-show="homeData.type==7">
                <div>
                  {{btnText}}
                </div>
              </div>

            </div>

          </div>
        </div>


        <div class="eduTv" v-show="homeData.type==8">
          <div class="tv8">您的申请已通过</div>
          <div class="tv8" style="padding-top: 0">请您绑定银行卡领钱现金</div>
          <div>
            <div class="tv19">
              <div class="jhcd3" v-show="homeData.type==8">
                <div @click="bdyhkClick">
                  {{btnText}}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="eduTv" v-show="homeData.type==10">
          <div class="tv8">您目前的资料暂时无法获取额度</div>
          <div class="tv9">认证更多选项可增加过审记录</div>
          <div>
            <div class="tv18">
            </div>
            <div class="tv19">
              <div class="jhcd3" v-show="homeData.type==10">
                <div @click="jhedClick">
                  {{btnText}}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="tv3">
          <div class="tv4">
            <!--<img class="iv1" src="../../assets/right@3x.png"/>-->
            <span>自动审核</span>
          </div>
          <div class="tv5">
            <!--<img class="iv2" src="../../assets/right@3x.png"/>-->
            <span>闪电到账</span>
          </div>
          <div class="tv6">
            <!--<img class="iv3" src="../../assets/right@3x.png"/>-->
            <span>复借提额降息</span>
          </div>
        </div>

      </div>

      <!--<div class="jhcd2" @click="jhedClick" v-show="homeData.type==8">-->
      <!--查看订单-->
      <!--</div>-->

      <!--<div class="tv_line"></div>-->
      <div class="tv7" @click="xscjwtClick">
        <img class="iv4" src="../../assets/banner@3x.png"/>
      </div>

      <div class="copy">
        <div class="copy_content">
          <!--<span>客服微信号</span>:<span id="wechat" ref="copy" data-clipboard-text="123456" @click="copyAction">{{wechat_no}}</span>-->
          <span v-if="wechat_no">{{title}}:</span><span id="wechat" ref="copy" :data-clipboard-text="wechat_no"
                                                        @click="copyAction">{{wechat_no}}</span>
        </div>
        <!--<div class="am-ft-red am-ft-12 am-ft-left"></div>-->
      </div>

    </div>
    <div class="tv_tip">
      <div>温馨提示：</div>
      <p>①本平台不支持微信公众号还款，请以平台首页官方客服号为准，请勿上当受骗！</p>
      <p>②本平台不对学生开放，注意自己的还款能力，谨慎借款！</p>
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
        leftArrow: false, // 返回箭头
        titleName: '首页',
        images: [
        ],
        money: '0.00',
        homeData: {button: '', text: '', type: '', time: '', value: ''},
        title: '',
        wechat_no: '',
        to_url: '',
        to_url_msg: '请七天后再次申请',
        btnText: '马上领钱',
        autoConfigList: [],
      }
    },
    created() {
      // this.getUserId(2); //请求uid 传2表示可不登录情况返回uid可能为空 传1是必须登录
    },
    activated() {
      // this.getUserInfo();
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
        this.getUserInfo();
      } else {
        this.userInfo = '';
      }

      this.getHome();
    },
    mounted() {
      // this.getOperator();

      this.copyWechat = new this.clipboard(this.$refs.copy);
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
        this.getUserInfo();
      } else {
        this.userInfo = '';
      }

      this.getHome();

    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Utils.formatDate(date, 'hh:mm')
      },
      twoPoint(value) {
        value = Number(value);
        return value.toFixed(2)
      }
    },
    methods: {
      toHelp() {
        this.$router.push('helpCenter');
      },
      //修改运营商为审核中
      getOperator() {
        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestCas(params1, '/validate/operator/c').then((response) => {
          console.log(JSON.stringify(response.data.t))
        }).catch((error) => {
          console.log(error.message)
        })
      },

      back() {
        this.$router.back()
      },
      tabClick(type) {
        console.log(type)
      },
      xscjwtClick() {
        if (Utils.isEmpty(localStorage.userMes)) {
          this.$router.push('/login')
        } else {
          this.$router.push('/helpCenter')
        }
      },
      bdyhkClick() {
        this.$router.push('bdyhkUpdate')
      },
      jhedClick() {
        //马上领钱
        // this.$router.push('/jhed')
        console.log(123)
        if (Utils.isEmpty(localStorage.userMes)) {
          this.$router.push('/login')
          return
        }
        if (this.homeData.type == 6 || this.homeData.type == 5) {

          if (ISANDROID) {
            window.location.href = this.to_url
          } else if (ISIOS) {
            window.location.href = 'cashloans://goSafari?=' + this.to_url;
          }
          return;
        }

        if (!Utils.isEmpty(this.userInfo)) {
          if (this.btnText == '马上领钱') {
            this.$router.push('/jhed');
            return;
          }
        }
        if (this.homeData.type == 1 || this.homeData.type == 2 || this.homeData.type == 10) {
          this.$router.push('/jhed')
          // if (Utils.isEmpty(localStorage.userMes)) {
          //   this.$router.push('/login')
          // } else {
          // if (!Utils.isEmpty(this.userInfo)) {
          //   if (this.userInfo.totalReturn > 0) {
          //     this.$router.push('/mslq')
          //   } else {
          //     this.$router.push('/jhed')
          //   }
          // } else {
          //
          //   this.$router.push('/jhed')
          // }

          // }
        } else if (this.homeData.type == 3 || this.homeData.type == 4 || this.homeData.type == 7 || this.homeData.type == 9) {
          this.$router.push('/orderList')
        } else if (this.homeData.type == 8) {
          this.$router.push('bdyhkUpdate')
        } else {

          if (ISANDROID) {
            window.location.href = this.to_url
          } else if (ISIOS) {
            window.location.href = 'cashloans://goSafari?=' + this.to_url;
          }

        }
      },
      // 获取用户信息
      getUserInfo() {

        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        Base.requestCas(params1, '/user/info/c').then((response) => {

          if (response.data.status == 'SUCCESS') {
            localStorage['userMes'] = JSON.stringify(response.data.t.userInfo)
            this.money = response.data.t.total;

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
      // 首页订单流转信息
      getHome() {

        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        Base.requestPos(params1, '/index/home').then((response) => {
          if (response.data.status == 'SUCCESS') {
            this.homeData = response.data.t;
            this.title = response.data.t.index_data.title;
            this.wechat_no = response.data.t.index_data.wechat_no;
            this.to_url = response.data.t.index_data.to_url;
            this.to_url_msg = response.data.t.index_data.to_url_msg;
            if (this.homeData.type == 1 || this.homeData.type == 2 || this.homeData.type == 10) {
              this.btnText = '马上领钱'
            } else if (this.homeData.type == 3 || this.homeData.type == 4 || this.homeData.type == 7 || this.homeData.type == 9) {
              this.btnText = '查看订单'
            } else if (this.homeData.type == 5 || this.homeData.type == 6) {
              this.btnText = '去挑选'
            } else if (this.homeData.type == 8) {
              this.btnText = '绑定银行卡'
            }
            if (!Utils.isEmpty(this.userInfo)) {
              this.appAutoConfiglist();
            }

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

      copyAction(text) {
        let _this = this;
        let clipboard = _this.copyWechat;
        clipboard.on('success', function (e) {
          Toast({message: '复制成功！', position: 'center'});
        });
        clipboard.on('error', function (e) {
          Toast({message: '复制失败！', position: 'center'});
        });
      },
      // 获取配置
      appAutoConfiglist() {

        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestCas(params1, '/autoConfig/appAutoConfiglist').then((response) => {
          if (response.data.status == 'SUCCESS') {

            this.autoConfigList = response.data.t.autoConfig;
            this.outTime();

          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
          } else {
          }
        });
      },
      outTime() {
        if (this.homeData.type == 5 || this.homeData.type == 6) {
          this.btnText = '去挑选'
          return;
        }
        for (let i = 0; i < this.autoConfigList.length; i++) {
          // 是否可认证下一项 0:不可以 1:可以 && 是认证中
          if (this.autoConfigList[i].isPass != 1) {
            //需要重新认证
            this.btnText = '马上领钱';
            break;
          }
        }

      }

    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.page_one {*/
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

  .page_one {
    min-height: 100vh;

    .van-nav-bar-top {
      /*background-color: #ffffff;*/
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .van-nav-bar {
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
        color: #333;
        width: 0.36rem;
        vertical-align: middle;
        font-weight: bold;
      }
      .van-nav-bar__title {
        color: #333333;
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
    .van-nav-bar .van-icon {
      color: #333;
      width: 0.4rem;
      vertical-align: middle;
    }

  }
</style>

<style lang="less" scoped>
  .page_one {
    background: #FFFFFF;

    .page_one_title {
      position: fixed;
      background: rgb(255, 220, 0);
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
      text-align: center;
      height: 1.08rem;
      line-height: 0.88rem;
      padding-top: 0.2rem;
      color: #333333;
      font-size: 0.36rem;
      font-weight: bold
    }
    .swipe_img {
      width: 100%;
      margin-top: 1.38rem;
    }
    .content {
      padding: 0 0 4rem;
      min-height: 600px;
      .relativeTV {
        position: relative;
      }
      .tv_bg {
        position: absolute;
        top: 1.48rem;
        width: 100%;
        height: 5.72rem;
        .iv5 {
          position: absolute;
          left: 0.4rem;
          top: 2rem;
          width: 2rem;
        }
      }
      .eduTv {
        width: 90%;
        height: 3.08rem;
        width: 100%;
      }
      .tv1 {
        color: #febe32;
        font-size: 0.32rem;
        text-align: center;
      }
      .tv2 {
        color: #333;
        font-size: 0.9rem;
        margin-top: 0.1rem;
        text-align: center;
        font-family: 'DIN-Medium';
      }
      .tv8 {
        color: #333;
        font-size: 0.36rem;
        font-weight: bold;
        text-align: center;
      }
      .tv21 {
        color: #333;
      }

      .tv88 {
        padding-top: 0.2rem;
      }
      .tv_bold {
        font-weight: bold;
      }
      .mgt0 {
        padding-top: 0;
      }
      .tv9 {
        color: #333;
        font-size: 0.28rem;
        width: 70%;
        margin: 0.1rem auto;
        text-align: center;
      }
      .tv18 {
        position: fixed;
        width: 100%;
        left: 0.4rem;
        top: 3.3rem;
      }
      .tv19 {
        width: 2rem;
        right: 0.6rem;
        top: 3.3rem;
      }
      .tv20 {
        color: #333;
        font-size: 0.36rem;
        font-weight: bold;
        padding-top: 0.5rem;
        text-align: center;
      }
      .tv10 {
        color: #333333;
        font-size: 0.36rem;
        font-weight: bold;
        text-align: center;
      }
      .tv11 {
        color: #333333;
        font-size: 0.36rem;
        font-weight: bold;
        margin-top: 0.2rem;
        text-align: center;
      }
      .tv111 {
        color: #333333;
        font-size: 0.36rem;
        font-weight: bold;
        margin-top: 1.2rem;
        text-align: center;
      }

      .jhcd2 {
        background: url("../../assets/juxing@3x.png") 50% 50% no-repeat;
        background-size: 75% 100%;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        margin-top: 0.2rem;
        color: @theme_color;
        font-size: 0.37rem;
      }

      .jhcd {
        position: absolute;
        left: 0;
        bottom: 0rem;
        width: 100%;
        text-align: center;
        & > div {
          .theme_buttom();
          width: 3.66rem;
          height: 3.66rem;
          line-height: 3.66rem;
          color: #463f17;
          font-size: 0.5rem;
          background: url("../../assets/anniu@3x.png") 50% 50% no-repeat;
          background-size: 90%;
          /*transition: all 1s;*/
        }
        /* .donghua{
           animation: dh 2s infinite;
         }
         @keyframes dh
         {
           0% {transform: scale(1)}
           40% {transform: scale(1.1)}
           100% {transform: scale(1)}
         }

         @-moz-keyframes dh !* Firefox *!
         {
           0% {transform: scale(1)}
           40% {transform: scale(1.1)}
           100% {transform: scale(1)}
         }

         @-webkit-keyframes dh !* Safari 和 Chrome *!
         {
           0% {transform: scale(1)}
           40% {transform: scale(1.1)}
           100% {transform: scale(1)}
         }

         @-o-keyframes dh !* Opera *!
         {
           0% {transform: scale(1)}
           40% {transform: scale(1.1)}
           100% {transform: scale(1)}
         }*/
      }
      .jhcd3 {
        position: absolute;
        width: 100%;
        text-align: center;
        bottom: 0rem;
        left: 0;
        /*left: 50%;
        transform: translateX(-50%);
        width: 5.62rem;
        height: 0.9rem;
        background: @theme_bgColor;
        border-radius: 0.1rem;
        line-height: 0.9rem;
        color: #FFFFFF;
        font-size: 0.32rem;*/
        & > div {
          .theme_buttom();
          width: 3.66rem;
          height: 3.66rem;
          line-height: 3.66rem;
          color: #463f17;
          font-size: 0.5rem;
          background: url("../../assets/anniu@3x.png") 50% 50% no-repeat;
          background-size: 90%;
        }
      }
      .tv3 {
        display: none;
        position: absolute;
        width: 100%;
        left: 0;
        top: 2.33rem;
        vertical-align: center;
        text-align: center;
        color: #333;
        font-size: 0.28rem;
        .tv4 {
          display: inline-block;
          margin-right: 0.2rem;
          position: relative;
          .iv1 {
            width: 0.35rem;
            vertical-align: bottom;
          }
          &:after {
            content: '|';
            display: block;
            position: absolute;
            font-size: 0.24rem;
            top: 2px;
            right: -0.18rem;
          }
        }
        .tv5 {
          display: inline-block;
          margin-right: 0.2rem;
          position: relative;
          .iv2 {
            width: 0.35rem;
            margin-left: 0.25rem;
            vertical-align: bottom;
          }
          &:after {
            content: '|';
            display: block;
            position: absolute;
            font-size: 0.24rem;
            top: 2px;
            right: -0.18rem;
          }
        }
        .tv6 {
          display: inline-block;
          .iv3 {
            width: 0.35rem;
            margin-left: 0.25rem;
            vertical-align: bottom;
          }
        }
      }
      .tv_line {
        height: 0.2rem;
        background: #f7f7f7;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
      }
      .tv7 {
        /*margin: 0 0.3rem;*/
        font-size: 0;
        text-align: center;
        margin-top: 0.1rem;
        .iv4 {
          width: 90%;
        }
      }
      .tv17 {
        margin-top: 0.4rem;
      }

      .copy {
        /*background: yellow;*/
        margin-top: 0.18rem;
        width: 100%;
        font-size: 0.28rem;
        color: #666666;
        text-align: center;
        #wechat {
          color: @theme_color;
        }
        .copy_content {
          display: inline-block;
          /*background: #3bcc4a;*/
        }
      }
    }
    .tv_tip {
      width: 100%;
      text-align: left;
      position: fixed;
      background: #FFFFFF;
      padding: 0.2rem;
      bottom: 0;
      padding-bottom: 1.2rem;
      color: #999999;
      font-size: 0.24rem;
      p {
        padding: 0.02rem 0;
        text-indent: 2px;
      }
    }
    .QandA {
      position: fixed;
      bottom: 1.5rem;
      right: 0.2rem;
      & > img {
        height: 1.35rem;
      }
    }
  }

</style>
