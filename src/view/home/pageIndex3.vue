<!--首页-->
<template>
  <div class="pageIndex3">
    <div class="content">
      <div class="tv1">
        <img class="iv1" src="../../assets/logo@3x.png"/>

      </div>

      <div class="tv2" v-show="userInfo!=''">
        {{userInfo.telphone}}
      </div>
      <div class="tv2" v-show="userInfo==''" @click="goLogin">登录/注册</div>



      <van-cell>
        <template>
          <div class="cell_content" @click.stop="tabClick(2)">
            <img class="cell_img" src="../../assets/dingdan@3x.png">
            <span class="cell_title">订单</span>

            <img class="cell_right_img" src="../../assets/more@3x.png">
          </div>
        </template>
      </van-cell>
      <!--<van-cell>-->
        <!--<template>-->
          <!--<div class="cell_content" @click.stop="tabClick(3)">-->
            <!--<img class="cell_img" src="../../assets/card@3x.png">-->
            <!--<span class="cell_title">银行卡</span>-->

            <!--<img class="cell_right_img" src="../../assets/more@3x.png">-->
          <!--</div>-->
        <!--</template>-->
      <!--</van-cell>-->

      <van-cell>
        <template>
          <div class="cell_content" @click.stop="tabClick(4)">
            <img class="cell_img" src="../../assets/help@3x.png">
            <span class="cell_title">帮助中心</span>

            <img class="cell_right_img" src="../../assets/more@3x.png">
          </div>
        </template>
      </van-cell>

      <van-cell>
        <template>
          <div class="cell_content" @click.stop="tabClick(5)">
            <img class="cell_img" src="../../assets/yijianfankui@3x.png">
            <span class="cell_title">意见反馈</span>

            <img class="cell_right_img" src="../../assets/more@3x.png">
          </div>
        </template>
      </van-cell>

      <van-cell>
        <template>
          <div class="cell_content" @click.stop="tabClick(6)">
            <img class="cell_img" src="../../assets/more_wd@3x.png">
            <span class="cell_title">更多</span>

            <img class="cell_right_img" src="../../assets/more@3x.png">
          </div>
        </template>
      </van-cell>

    </div>
    <div class="tv_tip">小提示：本平台不对学生开放，注意自己的还款能力，谨慎借款！</div>
  </div>

</template>

<script>

  import {Cell, Col, Icon, List, NavBar, PullRefresh, Row, Swipe, SwipeItem, Toast} from "vant";

  import Utils from '../../utils'
  import Base from '@/common/base.js';

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
        titleName: '',
        images: [
        ],
        userInfo: {'telphone': ''},

      }
    },
    created() {

      // this.getUserId(2); //请求uid 传2表示可不登录情况返回uid可能为空 传1是必须登录
    },
    mounted() {
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
        this.appAutoConfiglist();
      } else {
        this.userInfo = '';
      }
    },
    activated() {
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
      } else {
        this.userInfo = '';
      }

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
      goLogin() {
        this.$router.push('/login')
      },
      tabClick(type) {
        if (type == 1) {

          if (!Utils.isEmpty(localStorage.userMes)) {
            this.userInfo = JSON.parse(localStorage.userMes);
            if (this.validateIndex == -1) {
              this.$router.push('grxxUpdate');
            } else {
              Toast('请先认证信息');
              this.$router.push('jhed');
            }
          } else {
            this.$router.push('/login')
          }
        } else if (type == 2) {
          if (!Utils.isEmpty(localStorage.userMes)) {

            this.$router.push('orderList');
          } else {
            this.$router.push('/login')
          }
        } else if (type == 3) {
          if (!Utils.isEmpty(localStorage.userMes)) {
            this.userInfo = JSON.parse(localStorage.userMes);
            if (this.validateIndex == -1) {
              this.$router.push('bdyhkUpdate');
            } else {
              Toast('请先认证信息');
              this.$router.push('jhed');
            }
          } else {
            this.$router.push('/login')
          }
        } else if (type == 4) {
          if (!Utils.isEmpty(localStorage.userMes)) {
            this.$router.push('helpCenter');
          } else {
            this.$router.push('/login')
          }
        } else if (type == 5) {
          if (!Utils.isEmpty(localStorage.userMes)) {

            this.$router.push('feedback');
          } else {
            this.$router.push('/login')
          }
        } else if (type == 6) {
          if (!Utils.isEmpty(localStorage.userMes)) {
            this.$router.push('more');
          } else {
            this.$router.push('/login')
          }
        }
      },
      jhedClick() {
        //马上领钱
        if (Utils.isEmpty(localStorage.userMes)) {
          this.$router.push('/login')
        } else {
          this.$router.push('/jhed')
        }
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
            this.validateIndex = response.data.t.validateIndex;
            this.nextIndex = response.data.t.nextIndex;
          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
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
    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.pageIndex3 {*/
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

  .pageIndex3 {
    background-color: #ffffff;
    min-height: 100vh;

  }
</style>

<style lang="less" scoped>
  .pageIndex3 {
    background-color: #fff;
    .content {
      padding: 0 0 1.2rem;
      text-align: center;
      .iv1 {
        width: 2rem;
        margin: 1.45rem auto 1rem;
      }
      .tv1 {
        background: url("../../assets/bg_wd@3x.png") 100% 100% no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 2.82rem;
      }
      .tv2 {
        color: #333;
        font-size: 0.4rem;
        padding: 0.14rem 0 0.15rem;
        text-align: center;
        margin: 0.8rem 0 0.2rem;
        .userImg{
          width: 1rem;
          vertical-align: middle;
        }
      }
      /*.page_btn{
        width: 6.9rem;
        height: 4.42rem;
        border-radius: 0.1rem;
        margin: -1rem auto 0;
        box-shadow: 0 2px 15px 1px #ccc;
        font-size: 0;
        background: #fff;
        &>div{
          display: inline-block;
          width: 33%;
          height: 2.1rem;
          padding: 0.3rem 0 0rem;
          font-size: 0.28rem;
          text-align: center;
          &>img{
            margin-top: 0.1rem;
            height: 1rem;
            width: 1rem;
          }
          &>div{
            font-size: 0.28rem;
            height: 0.34rem;
            line-height: 0.5rem;
          }
        }
      }*/
      /*.page_btn {
        background: white;
        .magt {
          margin-top: 0.4rem;
          margin-bottom: 0.44rem;
        }
        .page_btn_item {
          text-align: center;
          height: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .page_btn_content {
            text-align: center;
            position: relative;
            .page_btn_icon {
              width: 0.7rem;
            }
            .icon_status {
              width: 0.96rem;
            }
            .page_btn_title {
              padding: 0;
              font-size: 0.24rem;
              color: #666666
            }

          }
          .status {
            position: absolute;
            transform: translateX(100%);
            right: 0;
            top: 0;

            .page_btn_icon {
              width: 0.4rem;
              height: 0.4rem;
            }
          }

        }

      }*/

      .van-cell {
        padding: 0 0;
        background: #F5F5F5;
      }
      .van-cell::after{
        left: 0;
        right: 0;
        width: auto;
        -webkit-transform: scale(1,.5);
        transform: scale(1,.5);
        border-bottom-width: 1px;
      }
      .cell_content {

        width: 100%;
        height: 1rem;
        background-color: #fff;
        padding-left: 0.33rem;
      }

      .cell_img {
        width: 0.6rem;
        vertical-align: middle;
      }

      .cell_title {

        vertical-align: middle;
        font-size: 0.32rem;
        color: #333;
        line-height: 1rem;
        margin-left: 0.15rem;
      }

      .cell_right_img {
        width: 0.16rem;
        height: 0.28rem;
        position: absolute;
        right:0.3rem ;
        top: 0.35rem;
      }

      .middel_gap {
        margin-top: 0.2rem;
        position: relative;
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
