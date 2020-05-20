<!--订单-->
<template>
  <div class="orderList">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div v-show="listData.length>0">
          <div class="item clearfix" v-for="item of listData" @click="itemClick(item)">

            <div class="tv1">

              <div class="tv2">
                申请时间：{{item.createTimeName}}
              </div>
              <div class="tv3">
                订单金额：{{item.loanMoney}}元
              </div>

            </div>
            <div class="tv4">
              <div class="tv6" v-if="item.iconFlg==-1">{{item.orderStatusCName}}</div>
              <!---1默认文字  1:审核失败图标   2即将逾期 3已逾期 4订单完成  5图标+文字-->
              <div class="tv5" v-if="item.iconFlg==1">
                <img class="iv1" src="../../assets/bedefeated@3x.png"/>
              </div>
              <div class="tv5" v-if="item.iconFlg==2">
                <img class="iv1"
                     src="../../assets/be_about_to_defeated@3x.png"/>
              </div>
              <div class="tv5" v-if="item.iconFlg==3">
                <img class="iv1"
                     src="../../assets/defeated@3x.png"/>
              </div>
              <div class="tv8" v-if="item.iconFlg==5">
                <img class="iv1"
                     src="../../assets/defeated@3x.png"/>
                <div class="tv6">
                  {{item.orderStatusCName}}
                </div>

              </div>
              <div class="tv5" v-if="item.iconFlg==4">
                <img class="iv1" src="../../assets/ordercompletion@3x.png"/>
              </div>

              <div class="tv7">
                <img class="iv2" src="../../assets/more@3x.png"/>
              </div>
            </div>
          </div>
        </div>
        <div class="tv11" v-show="listData.length==0">
          <img class="iv11" src="../../assets/nodata@3x.png"/>
          <div class="tv12">暂无数据</div>
        </div>
      </van-pull-refresh>
    </div>
    <!--<div class="tv_tip">小提示：本平台不对学生开放，注意自己的还款能力，谨慎借款！</div>-->
    <img v-if="icon_url!=''" class="qlq" @click="qlq"
         src="../../assets/xuanfuanniu@3x.png"/>

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
        titleName: '订单',
        listData: [],
        isLoading: false,
        icon_url: ''
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Utils.formatDate(date, 'yyyy年MM月dd日 HH:mm')
      },
      twoPoint(value) {
        value = Number(value);
        return value.toFixed(2)
      }
    },
    created() {
      this.getHome();
    },
    mounted() {
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
        this.getOrderListC();
      } else {
        this.userInfo = '';
        this.listData = [];
      }
    },
    activated() {
      console.log(222)
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
        this.getOrderListC();
      } else {
        this.userInfo = '';
        this.listData = [];
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      itemClick(item) {
        this.$router.push({path: 'orderDetail', query: {orderId: item.orderId}})
      },
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
          if (!Utils.isEmpty(localStorage.userMes)) {
            this.getOrderListC();
          }
        }, 500);
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
      getOrderListC() {
        console.log('1215')
        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestPos(params1, '/order/list/c').then((response) => {
          console.log(JSON.stringify(response.data.t))
          if (response.data.status == 'SUCCESS') {
            this.hideLoading();
            this.listData = response.data.t.list;
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
      //获取贷超跳转地址
      getHome() {

        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        Base.requestPos(params1, '/index/home').then((response) => {
          if (response.data.status == 'SUCCESS') {
            this.icon_url = response.data.t.index_data.icon_url;
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

      qlq() {
        if (ISANDROID) {
          window.location.href = this.icon_url
        } else if (ISIOS) {
          window.location.href = 'cashloans://goSafari?=' + this.icon_url;
        }
      }
    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.orderList {*/
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

  .orderList {
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
      /*padding-top: 0.4rem;*/
      /*height: 1.28rem;*/
      background-color: @title_bgColor;
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

  }
</style>

<style lang="less" scoped>
  .orderList {
    .content {

      padding: 0.88rem 0 1.2rem;
      .item {
        margin-top: 1px;
        background-color: #ffffff;
        padding: 0.15rem 0.3rem;
        .tv1 {
          float: left;
          line-height: 0.5rem;
          margin-top: 0.1rem;
          .tv2 {
            color: #999999;
            font-size: 0.28rem;
          }
          .tv3 {
            color: #333333;
            font-size: 0.3rem;
          }
        }
        .tv4 {
          float: right;
          height: 1rem;
          vertical-align: middle;
          line-height: 1rem;
          .tv5 {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            vertical-align: middle;
            margin-right: 0.3rem;
            .iv1 {
              width: 1.2rem;
            }
          }
          .tv6 {
            display: inline-block;
            text-align: center;
            color: @theme_color;
            font-size: 0.32rem;
            vertical-align: middle;
            margin-top: 0.05rem;
            margin-right: 0.1rem;
          }
          .tv7 {
            display: inline-block;
            vertical-align: middle;
            .iv2 {
              width: 0.16rem;
              vertical-align: middle;
              line-height: 1rem;
            }
          }
          .tv8 {
            /*width: 2rem;*/
            display: inline-block;
            height: 1rem;
            .tv6 {
              display: inline-block;
              text-align: center;
              color: @theme_color;
              font-size: 0.32rem;
              vertical-align: middle;
              margin-top: 0.05rem;
            }
            .iv1 {
              display: inline-block;
              vertical-align: middle;
              width: 1rem;
            }
          }
        }

      }
      .tv11 {
        width: 100%;
        height: calc(100vh - 3.88rem);
        text-align: center;
        padding-top: 50%;
        .iv11 {
          width: 40%;
          text-align: center;
        }
        .tv12 {
          color: #999999;
          font-size: 0.3rem;
          text-align: center;
        }
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
    .qlq {
      width: 2rem;
      position: fixed;
      bottom: 1.5rem;
      right: 0.2rem;
    }
  }

</style>
