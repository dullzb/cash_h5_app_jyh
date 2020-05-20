<template>
  <div class="normal-head">
    <van-nav-bar
      :title="titleName"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
  import {Tag, Col, Toast, Button, Dialog, Icon, NavBar} from "vant";

  export default {
    props: {
      titleName: {
        type: String,
        default() {
          return "标题"
        }
      },
      type: {
        type: Number,
        default() {
          return 0
        }
      }
    },
    components: {
      [Tag.name]: Tag,
      [Col.name]: Col,
      [Icon.name]: Icon,
      [Button.name]: Button,
      [NavBar.name]: NavBar,
      [Toast.name]: Toast,
      [Toast.Dialog]: Dialog
    },

    data() {
      return {
        // titleName: "标题"
      };
    },

    methods: {
      onClickLeft() {
        if (this.type == 1) {
          this.clearSlected()
        } else {
          this.$router.go(-1)
        }
      },
      //清空重选
      clearSlected() {
        Dialog.confirm({
          title: "温馨提示",
          message: "是否保留当前投注？",
          confirmButtonText: "是",
          cancelButtonText: "否"
        })
          .then(() => {
            // on confirm
            this.$store.getters.getMatchScoreAllDataChange.forEach((value) => {
              value.list.forEach((value) => {
                value.hasSelectedPay = value.hasSelected;
              })
            });
            this.$router.go(-1)
          })
          .catch(() => {
            // on cancel

            this.$store.dispatch('initMatchScoreAllDataChange', true)
            this.$router.go(-1)
          });
      },
    }
  };
</script>

<style lang="less">
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .normal-head {
      .van-nav-bar {
        height: 1.36rem!important;
        padding-top: 0.48rem!important;
      }
    }
  }
  .normal-head {
    .van-nav-bar {
      background-color: @title_bgColor;
      /*height: 1.28rem;*/
      /*padding-top: 0.4rem;*/
      height: 0.88rem;
      line-height: 0.88rem;
      .van-nav-bar__left {
        font-size: 0.24rem;
        vertical-align: middle;
      }
      .van-nav-bar__title,
      .van-icon,
      .van-nav-bar__text {
        color: #ffffff;
      }
      .van-nav-bar__title {
        font-size: 0.34rem;
        line-height: 0.9rem;
      }
      .van-icon {
        font-size: 0.4rem;
      }
    }
  }
</style>
