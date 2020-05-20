<!--帮助中心-->
<template>
  <div class="helpCenter">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">

      <div class="tv1" @click="fksmClick">
        <div class="tv3">放还款说明操作</div>
        <div class="tv4"><img class="iv1" src="../../assets/more@3x.png"/>
        </div>

      </div>
      <div class="line"></div>
      <div class="tv5">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="平台能够提供哪些类型的贷款？" name="1">
            平台给用户提供个人消费贷款，可用于个人消费等。
          </van-collapse-item>
          <van-collapse-item title="申请借款后未通过，是否可以重新申请借款？" name="2">
            可以的，如单个产品申请遗憾未通过，可再次申请其他不同类型的产品。
          </van-collapse-item>
          <van-collapse-item title="如何查看我的审核及自己到账进度？" name="3" disabled>
            根据产品推送上的时间为准，请您耐心等待哦
          </van-collapse-item>
          <van-collapse-item title="如果未按时还款会怎么样？" name="4" disabled>
            如未按时还款，您的逾期记录将会上传到银行征信、芝麻信用等征信机构，将会影响您的信用记录，影响您贷款买车、买房。根据产品类型不同，也将会产生不同额度的逾期违约金，请务必按时还款。
          </van-collapse-item>
          <van-collapse-item title="在平台填写的借款信息会不会泄露？" name="5" disabled>
            不会。平台将严格遵守国家相关法律法规，对用户隐私信息、借款信息等数据进行数据加密，同时承诺在任何情况下不会以出售、出租及其他方式泄露用户信息。
          </van-collapse-item>
          <van-collapse-item title="为什么我借款申请不通过？" name="6" disabled>
            首先，确保您的各项信息真实有效并填写完整，图片按照规范上传完整，如未通过可能是您当前未达到系统的评估要求。如有疑问，可拨打客服电话了解详情。
          </van-collapse-item>
          <van-collapse-item title="平台支持提前还款吗？" name="7" disabled>
            不同类型的产品要求不同，具体情况可咨询客服电话。
          </van-collapse-item>
          <van-collapse-item title="贷款的申请条件是什么？" name="8" disabled>
            a.借款人年龄在18-55周岁之间；<br/>
            b.借款人有稳定的职业或收入，有良好的信用记录；<br/>
            c.借款的的近半年银行流水记录；<br/>
            d.身份证信息、目前居住地信息证明（水电气发票、居住证等）
          </van-collapse-item>
          <van-collapse-item title="能够提供的借款额度是多少？" name="9" disabled>
            平台提供1000-20万的借款额度，用户可根据个人消费事项选择合适的产品。
          </van-collapse-item>
          <van-collapse-item :title="title" name="10" disabled v-if="wechat_no">
            <div class="copy">

              <div class="copy_content">
                <span>{{title}}</span>:<span id="wechat" ref="copy" :data-clipboard-text="wechat_no"
                                             @click="copyAction">{{wechat_no}}</span>
              </div>

              <img class="wechat" v-if="wechat_img_url" :src="wechat_img_url">

            </div>

          </van-collapse-item>
        </van-collapse>

      </div>


    </div>
  </div>

</template>

<script>
  import Utils from '../../utils';
  import Base from '@/common/base.js';

  import {CellGroup, Collapse, CollapseItem, Field, Icon, NavBar, Toast} from "vant";

  var storage = window.localStorage;
  var u = navigator.userAgent;
  var ISANDROID, ISIOS, ISWEIXIN;

  ISANDROID = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  ISIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  ISWEIXIN = u.toLowerCase().indexOf('micromessenger') != -1;

  export default {
    components: {
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
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
        titleName: '帮助中心',
        activeNames: [],
        title: '',
        wechat_no: '',
        wechat_img_url: '',

      }
    },
    created() {
      this.getHome();
    },

    mounted() {
      // this.getOperator();
      // this.copyWechat = new this.clipboard(this.$refs.copy);
    },

    methods: {
      back() {
        this.$router.back()
      },
      fksmClick() {
        this.$router.push('fksm');
      },
      copyAction(text) {
        let _this = this;
        let clipboard = _this.copyWechat;
        clipboard.on('success', function () {

          Toast({message: '复制成功！', position: 'center'});
        });
        clipboard.on('error', function (e) {
          Toast({message: '复制失败！', position: 'center'});
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
          console.log(JSON.stringify(response.data.t))
          if (response.data.status == 'SUCCESS') {
            this.title = response.data.t.index_data.title;
            this.wechat_no = response.data.t.index_data.wechat_no;
            this.wechat_img_url = response.data.t.index_data.wechat_img_url;
            /*if(typeof response.data.t.value== 'string' && response.data.t.value.indexOf('～')!=-1){
              this.homeData.value = parseInt(response.data.t.value.split('～')[0]) + '-' + parseInt(response.data.t.value.split('～')[1]);
            }*/
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


    }

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.helpCenter {*/
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

  .helpCenter {
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

    .van-cell {
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      padding: 0.27rem 0;
      box-sizing: border-box;
      line-height: 24px;
      position: relative;
      background-color: #fff;
      color: #333;
      font-size: 0.32rem;
      font-weight: 500;
      overflow: hidden;
    }
    .van-cell-group .van-hairline--top-bottom {
      border-bottom: 0px solid #ffffff;
    }

    .van-cell__value--alone {
      font-size: 0.3rem;
    }
    .van-collapse-item__content {
      background: #FFFFFF;
      font-size: 0.26rem;
      color: #999999;

    }
  }
</style>

<style lang="less" scoped>
  .helpCenter {
    .content {
      padding: 0.88rem 0 1.2rem;
      .tv1 {
        position: absolute;
        width: 100%;
        padding: 0.3rem;
        background: #FFFFFF;
        border-top: 1px solid #f7f7f7;
        .tv3 {
          display: inline-block;
          width: calc(100% - 0.3rem);
          color: #333333;
          font-size: 0.3rem;
          vertical-align: middle;
        }
        .tv4 {
          vertical-align: middle;
          display: inline-block;
          position: relative;
          right: 0;
          .iv1 {
            width: 0.16rem;
            vertical-align: middle;
            line-height: 1rem;

          }
        }
      }
      .line {
        width: 100%;
        height: 0.2rem;
        background: #f7f7f7;
      }
      .tv5 {
        margin-top: 1rem;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        background: #FFFFFF;
      }

      .wechat {
        margin-top: 0.15rem;
        width: 100%;
      }

      .copy {
        margin-top: 0.3rem;
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
  }

</style>
