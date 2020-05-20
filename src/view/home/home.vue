<template>
  <div class="home">
    <page-index1 v-if="getBottomBarIndexChange===1"></page-index1>
    <page-index2 v-if="getBottomBarIndexChange===2"></page-index2>
    <page-index3 v-if="getBottomBarIndexChange===3"></page-index3>
    <bottom-bar class="bottomBar" v-if="getBottomBarIndexChange!=0"></bottom-bar>

  </div>
</template>
<script>
  import BottomBar from '../component/bottomBar/bottomBar.vue'
  import PageIndex1 from '../home/pageIndex1.vue'
  import PageIndex2 from '../home/pageIndex2.vue'
  import PageIndex3 from '../home/pageIndex3.vue'
  import Base from '@/common/base.js';

  export default {
    created() {
      console.log("home")
      console.log("home")
      console.log("home")
     /* Base.getHost().then((res)=>{
        this.$store.dispatch('bottomBarIndexChange', 1);
      }).catch(()=>{
        this.$store.dispatch('bottomBarIndexChange', 1);
      })*/
    },
    components: {
      PageIndex1,
      PageIndex2,
      PageIndex3,
      BottomBar
    },
    data() {
      return {}
    },
    methods: {},
    computed: {
      getBottomBarIndexChange() {
        return this.$store.getters.getBottomBarIndexChange;
      }
    }
  }
</script>


<style lang="less">
  .buy_lottery {
    .van-swipe__indicator {
      /*border-radius: 0;*/
    }
    .van-swipe__indicator--active {
      /*transform: rotate(45deg);*/
    }
  }
</style>

<style scoped lang="less">



  .bottomBar {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }


</style>
