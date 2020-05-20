<!--绑定银行卡-->
<template>
  <div class="feedback">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">

      <div class="tv1">
        问题描述（必填）
      </div>

      <div class="tv2">
        <textarea style="-webkit-user-select: auto;" contenteditable="true" class="tv3" placeholder="请输入内容..."
                  v-model="formData.remark"/>
        <div class="tv4">{{formData.remark.length}}/200</div>
      </div>
      <div class="tv1">
        问题截图（最多三张，选填）
      </div>

      <div class="tv8">
        <div class="tv5" v-show="imgs.length>0">
          <div class="tv9" v-for="(item,index) in imgs">
            <img class="tv6" :src="item"/>
            <img class="tv7" @click="removeImg(index)"
                 src="../../assets/shanchu@3x.png"/>
          </div>
        </div>

        <div class="tv5" v-show="this.imgs.length!=3">
          <van-uploader :after-read="onRead" accept="image/*" multiple>
            <img class="tv6" src="../../assets/add@3x.png"/>
          </van-uploader>
        </div>
      </div>
      <div class="jhcd">
        <div @click="confirmClick">
          提交反馈
        </div>
      </div>

    </div>
  </div>

</template>

<script>

  import {CellGroup, Field, Icon, NavBar, Toast, Uploader} from "vant";

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
      [Uploader.name]: Uploader,
    },
    data() {
      return {
        isAndroid: ISANDROID,
        isiOS: ISIOS,
        isWeixin: ISWEIXIN,
        leftArrow: true, // 返回箭头
        titleName: '意见反馈',
        telphone: '',
        checkCode: '',
        setTimeOut: false,
        dtime: 60,
        canGetCode: true,
        imgs: [],
        imgsFile: [],
        formData: {
          "remark": "",//问题描述,
          "imgs": ""// 截图 ,隔开 最多三张,
        }

      }
    },
    created() {

      this.telphone = this.$route.params.telphone;
      console.log(this.telphone)
    },
    mounted() {
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
      onRead(file) {
        this.imgsFile.push(file);
        this.imgs.push(file.content);
      },
      removeImg(index) {
        this.imgsFile.splice(index, 1);
        this.imgs.splice(index, 1);
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

      //图片上传
      jhedClick() {
        if (this.canGetCode) {
          this.canGetCode = false;
        } else {
          return;
        }
        let params1 = {
          jsonObject: {}
        };
        // params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        let formData = new FormData(); //创建form对象
        for (let i = 0; i < this.imgsFile.length; i++) {
          console.log(333)
          formData.append('files', this.imgsFile[i].file, this.imgsFile[i].file.name);//通过append向form对象添加数据
        }
        params1.keyParams = Base.getKeyParams2();
        this.showLoading();

        Base.requestCasImg(params1, formData, '/feedback/upload_third_file').then((response) => {
          if (response.data.status == 'SUCCESS') {
            this.formData.imgs = response.data.t;
            this.confirmClick2();
          } else {
            Toast({message: response.data.text, position: 'center'});
            this.hideLoading(response.data.text);
          }
        }).catch(error => {
          this.canGetCode = true;
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        });
      },
      //提交
      confirmClick() {
        if (Utils.isEmpty(this.formData.remark)) {
          Toast({message: '请输入问题描述', position: 'center'});
          return;
        }

        // if (this.imgsFile.length == 0) {
        //   Toast({message: '请上传问题截图', position: 'center'});
        //   return;
        // }
        if (this.imgsFile.length == 0) {

          this.confirmClick2();
        } else {

          this.jhedClick();
        }

      },
      //提交
      confirmClick2() {

        let params1 = {
          jsonObject: this.formData
        };

        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestCas(params1, '/feedback/add').then((response) => {
          this.canGetCode = true;
          this.hideLoading(response.data.text);
          if (response.data.status == 'SUCCESS') {
            setTimeout(() => {
              this.$router.back();
            }, 1000);
          }
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
  /*.feedback {*/
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

  .feedback {
    .van-hairline--bottom::after {
      border-bottom-width: 0;
    }
    background-color: #ffffff;
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
      background-color: #fff;
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
      border: 0 solid @title_color !important;
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

  }
</style>

<style lang="less" scoped>
  .feedback {

    .content {
      padding: 0.88rem 0 1.2rem;
      background: #FFFFFF;
      .jhcd {
        margin-top: 0.8rem;
        text-align: center;
        &>div{
          .theme_buttom();
        }
      }
      .tv1 {
        padding: 0.3rem;
        background: #f7f7f7;
        color: #333333;
        font-size: 0.3rem;
        font-weight: bold;
      }
      .tv2 {
        width: 100%;
        height: 3.1rem;
        .tv3 {
          background: #FFFFFF;
          padding: 0.3rem;
          font-size: 0.24rem;
          color: #333333;
          border-width: 0;
          width: 100%;
          height: 3.1rem;
        }
        .tv4 {
          text-align: right;
          color: #999999;
          font-size: 0.24rem;
          margin: -0.6rem 0.3rem 0 0;
        }
      }
      .tv8 {
        padding-left: 0.3rem;
      }
      .tv9 {
        display: inline-block;
      }
      .tv5 {
        display: inline-block;
        .tv6 {
          /*width: 1.2rem;*/
          height: 1.8rem;
          padding-top: 0.3rem;
        }
        .tv7 {
          width: 0.3rem;
          position: relative;
          top: 0.12rem;
          vertical-align: top;
          left: -0.2rem;
        }
      }
    }
  }

</style>
