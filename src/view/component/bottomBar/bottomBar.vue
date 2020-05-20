<template>
  <div class="bottomBar van-hairline--top">
    <van-row class="home_top">
      <van-col span="8">
        <!--<router-link :to="{path:'/pageIndex1'}">-->
          <div class="home_top_item" @click.stop="toColor(1)">
            <div class="home_top_content">
              <img v-show="isColor1 !== 1"
                   class="home_top_icon"
                   src="../../../assets/ic_tab_home_unselect@3x.png">
              <img v-show="isColor1 === 1"
                   class="home_top_icon"
                   src="../../../assets/ic_tab_home_select@3x.png">
              <div class="home_top_title" :class="{'home_top_title_active':isColor1 === 1}">首页</div>
            </div>
          </div>
        <!--</router-link>-->
      </van-col>
      <van-col span="8">
        <!--<router-link :to="{path:'/pageIndex2'}">-->
          <div class="home_top_item" @click.stop="toColor(2)">
            <div class="home_top_content">
              <img v-show="isColor1 !== 2"
                   class="home_top_icon"
                   src="../../../assets/ic_tab_order_unselect@3x.png">
              <img v-show="isColor1 === 2"
                   class="home_top_icon"
                   src="../../../assets/ic_tab_order_select@3x.png">
              <div class="home_top_title" :class="{'home_top_title_active':isColor1 === 2}">订单</div>
            </div>
          </div>
        <!--</router-link>-->
      </van-col>
      <van-col span="8">
        <!--<router-link :to="{path:'/pageIndex3'}">-->
          <div class="home_top_item" @click.stop="toColor(3)">
            <div class="home_top_content">
              <img v-show="isColor1 !== 3"
                   class="home_top_icon"
                   src="../../../assets/ic_tab_mine_select@3x.png">
              <img v-show="isColor1 === 3"
                   class="home_top_icon"
                   src="../../../assets/ic_tab_mine_unselect@3x.png">
              <div class="home_top_title" :class="{'home_top_title_active':isColor1 === 3}">我的</div>
            </div>
          </div>
        <!--</router-link>-->
      </van-col>
      <!--<van-col span="6">-->
      <!--<router-link :to="{path:'/home'}">-->
      <!--<div class="home_top_item" @click="toColor(4)">-->
      <!--<div class="home_top_content">-->
      <!--<img v-show="isColor1 !== 4"-->
      <!--class="home_top_icon"-->
      <!--src="../../assets/ic_tab_mine_unselected@2x.png">-->
      <!--<img v-show="isColor1 === 4"-->
      <!--class="home_top_icon"-->
      <!--src="../../assets/ic_tab_mine_selected@2x.png">-->
      <!--<div class="home_top_title" :class="{'home_top_title_active':isColor1 === 4}">我的</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</router-link>-->
      <!--</van-col>-->
    </van-row>

  </div>
</template>

<script>
  import {Row, Col} from 'vant';

  export default {
    name: "bottomBar",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
    },
    data() {
      return {
        isColor1: 1,
        home_top_title: 'home_top_title',
        home_top_title_active: 'home_top_title_active',
      }
    },
    methods: {
      toColor: function (num) {
        event.stopPropagation();
        this.isColor1 = num;
        this.$store.dispatch('bottomBarIndexChange', num);
      }
    },
    created() {
      this.isColor1 = this.$store.getters.getBottomBarIndexChange
    }
  }
</script>

<style scoped lang="less">
  .home_top_title {
    font-size: 0.2rem;
    color: #666666;
  }

  .bottomBar {
    .home_top {
      background: white;
      .home_top_item {
        text-align: center;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        &:active {
          background-color: #efefef;
        }
        .home_top_content {
          .home_top_icon {
            width: 0.4rem;
            height: 0.4rem;
          }
          .home_top_title {
            padding: 0;
            margin-top: -0.02rem;
            font-size: 0.2rem;
            color: #333333
          }
          .home_top_title_active {
            font-size: 0.2rem;
            color: #333;
          }
        }

      }

    }
  }

</style>
