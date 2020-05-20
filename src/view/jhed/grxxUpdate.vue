<!--个人信息-->
<template>
  <div class="grxx">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">

      <div class="tv1">*如实填写有助借款通过</div>

      <div class="tv7" @click="selectClick(1)">
        <div class="tv8">
          <div class="tv9">学历</div>
          <input class="tv10" readonly unselectable="on" disabled="disabled" v-model="formData.education"
                 placeholder="请选择"/>
          <img class="iv1" src="../../assets/more@3x.png"/>
        </div>
      </div>
      <div class="tv7" @click="areaClick">
        <div class="tv8">
          <div class="tv9">现居地址</div>
          <input class="tv10" readonly unselectable="on" disabled="disabled"
                 v-model="formData.provinceNow+' '+formData.cityNow+' '+formData.districtNow" placeholder="请选择"/>
          <img class="iv1" src="../../assets/more@3x.png"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv11">
          <div class="tv12">请填写详细地址</div>
          <input class="tv13" v-model="formData.addressNow" placeholder="请填写详细地址"/>
        </div>
      </div>
      <div class="tv7" @click="selectClick(2)">
        <div class="tv8">
          <div class="tv9">现居时长</div>
          <input class="tv10" readonly unselectable="on" disabled="disabled" v-model="formData.liveTime"
                 placeholder="请选择"/>
          <img class="iv1" src="../../assets/more@3x.png"/>
        </div>
      </div>
      <div class="tv7" @click="selectClick(3)">
        <div class="tv8">
          <div class="tv9">婚姻状态</div>
          <input class="tv10" readonly unselectable="on" disabled="disabled" v-model="formData.isMarry"
                 placeholder="请选择"/>
          <img class="iv1" src="../../assets/more@3x.png"/>
        </div>
      </div>
      <div class="tv7" @click="selectClick(4)">
        <div class="tv8">
          <div class="tv9">职业</div>
          <input class="tv10" readonly unselectable="on" disabled="disabled" v-model="formData.job"
                 placeholder="请选择"/>
          <img class="iv1" src="../../assets/more@3x.png"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv8">
          <div class="tv9">工作单位</div>
          <input class="tv14" v-model="formData.companyName" placeholder="请输入工作单位"/>
        </div>
      </div>
      <div class="tv7">
        <div class="tv8">
          <div class="tv9">公司地址</div>
          <input class="tv14" v-model="formData.companyAddress" placeholder="请输入公司地址"/>
        </div>
      </div>

      <div class="tv1">*直系亲属联系人</div>

      <div class="tv7" @click="selectClick(5)">
        <div class="tv8">
          <div class="tv9">与本人关系</div>
          <input class="tv10" readonly unselectable="on" disabled="disabled" v-model="formData.linealRelation"
                 placeholder="请选择"/>
          <img class="iv1" src="../../assets/more@3x.png"/>
        </div>
      </div>

      <div class="tv7" @click="setLxr()">
        <div class="tv8">
          <div class="tv9">联系人</div>
          <input class="tv10" readonly unselectable="on" disabled="disabled" v-model="formData.linealMail"
                 placeholder="请选择"/>
          <img class="iv1" src="../../assets/more@3x.png"/>
        </div>
      </div>
      <!--<div class="tv7" @click="selectClick(6)">-->
        <!--<div class="tv8">-->
          <!--<div class="tv9">与本人关系</div>-->
          <!--<input class="tv10" readonly unselectable="on" disabled="disabled" v-model="formData.linealRelation2"-->
                 <!--placeholder="请选择"/>-->
          <!--<img class="iv1" src="../../assets/more@3x.png"/>-->
        <!--</div>-->
      <!--</div>-->

      <div class="tv7" @click="setLxr2()">
        <div class="tv8">
          <div class="tv9">紧急联系人</div>
          <input class="tv10" readonly unselectable="on" disabled="disabled" v-model="formData.linealMail2"
                 placeholder="请选择"/>
          <img class="iv1" src="../../assets/more@3x.png"/>
        </div>
      </div>
    </div>

    <div class="tv4">
      <div class="jhcd">
        <div @click="validateInfo">
          确认提交
        </div>
      </div>
      本平台使用银行级数据加密，承诺不会泄露用户数据
    </div>
    <van-popup
      v-model="show"
      position="bottom">
      <van-picker
        show-toolbar
        :columns="selectList"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup>
    <van-popup
      v-model="showArea"
      position="bottom">
      <van-area :area-list="areaList"
                @confirm="areaConfirm"
                @cancel="showArea = false"/>
    </van-popup>
  </div>

</template>

<script>

  import {Area, Cell, Col, Icon, List, NavBar, Picker, Popup, PullRefresh, Row, Toast} from "vant";

  import Utils from '../../utils'
  import AreaList from '@/common/area.js'
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
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [Area.name]: Area,
    },
    data() {
      return {
        leftArrow: true, // 返回箭头
        titleName: '个人信息',
        show: false,
        showArea: false,
        areaList: AreaList,
        formData: {
          'education': '', //'： 博士 硕士 本科 大专 中专 高中 初中 初中以下',
          'provinceNow': '', // '省',
          'cityNow': '', // '市',
          'districtNow': '', // '区',
          'addressNow': '', // '现居住地',
          'liveTime': '', // '居住时长:半年以内 半年到一年 一年以上 单位年 半年0.5 一年1',
          'isMarry': '', // '未婚 已婚未育 已婚已育 离异 0 1 2 3',
          'job': '', // '上班族 自由职业 学生',
          'companyName': '', // '工作单位',
          'companyAddress': '', // '公司地址',
          'linealRelation': '', //'父亲 母亲 兄弟 姐妹 儿子 女儿 配偶 1 2 3 4 5',
          'linealMail': '', //'直系联系方式',
          'linealRelation2': '', //'父亲 母亲 兄弟 姐妹 儿子 女儿 配偶 1 2 3 4 5',
          'linealMail2': '', //'紧急联系方式',
        },
        selectList: [], //当前筛选数据
        selectAllList: {}, //所有筛选数据
        clickIndex: '',//记录点击的条目eg:1学历 2现居时长 3婚姻状态 4.职业 5与本人关系,
        userInfo: ''
      }
    },
    created() {
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.userInfo = JSON.parse(localStorage.userMes);
        this.formData.education = this.userInfo.education;
        this.formData.provinceNow = this.userInfo.provinceNow;
        this.formData.cityNow = this.userInfo.cityNow;
        this.formData.districtNow = this.userInfo.districtNow;
        this.formData.addressNow = this.userInfo.addressNow;
        this.formData.liveTime = this.userInfo.liveTime;
        this.formData.isMarry = this.userInfo.isMarry;
        this.formData.job = this.userInfo.job;
        this.formData.companyName = this.userInfo.companyName;
        this.formData.companyAddress = this.userInfo.companyAddress;
        this.formData.linealRelation = this.userInfo.linealRelation;
        this.formData.linealMail = this.userInfo.linealMail;
        this.formData.linealRelation2 = this.userInfo.linealRelation2;
        this.formData.linealMail2 = this.userInfo.linealMail2;
      }
      this.systemConfigList();
      window.setTelPerson = this.setTelPerson;
      window.setTelPerson2 = this.setTelPerson2;
    }
    ,
    mounted() {
      var input = document.getElementsByTagName("input")
      for (var i = 0; i < input.length; i++) {
        console.log(i)

        input[i].addEventListener('blur', function () {
          window.scroll(0, 0);
        });
      }
    }
    ,
    activated() {
      // this.onRefresh();


    }
    ,
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Utils.formatDate(date, 'hh:mm')
      }
    }
    ,
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
      setLxr() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.android.invoke_native("getTelPerson", this.userInfo.userId, "jsGetUserInfoCallBack");
        } else if (isiOS) {
          window.location.href = 'xianjindai://getTelPerson';
        }
      },
      setTelPerson(json) {
        this.formData.linealMail = json;
      },
      setLxr2() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.android.invoke_native("getTelPerson2", this.userInfo.userId, "jsGetUserInfoCallBack");
        } else if (isiOS) {
          window.location.href = 'xianjindai://getTelPerson2';
        }
      },
      setTelPerson2(json) {
        this.formData.linealMail2 = json;
      },
      tjClick() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.android.invoke_native("getAddressBook", this.userInfo.userId, "jsGetUserInfoCallBack");
        } else if (isiOS) {

          window.webkit.messageHandlers.getAddressBook.postMessage(type)
        }
      },
      onConfirm(value, index) {

        if (1 == this.clickIndex) {
          this.formData.education = value.systemConfigName;
        } else if (2 == this.clickIndex) {
          this.formData.liveTime = value.systemConfigName;
        } else if (3 == this.clickIndex) {
          this.formData.isMarry = value.systemConfigName;
        } else if (4 == this.clickIndex) {
          this.formData.job = value.systemConfigName;
        } else if (5 == this.clickIndex) {
          this.formData.linealRelation = value.systemConfigName;
        } else if (6 == this.clickIndex) {
          this.formData.linealRelation2 = value.systemConfigName;
        }
        this.show = false;
      },
      selectClick(type) {
        this.clickIndex = type;
        this.show = true;
        if (1 == type) {
          this.selectList = this.selectAllList.edu;
        } else if (2 == type) {
          this.selectList = this.selectAllList.settle;
        } else if (3 == type) {
          this.selectList = this.selectAllList.marry;
        } else if (4 == type) {
          this.selectList = this.selectAllList.job;
        } else if (5 == type || 6 == type) {
          this.selectList = this.selectAllList.relation;
        }
      },
      //现居地址点击事件
      areaClick() {
        this.showArea = true;
      },
      areaConfirm(value, index) {
        if (value[0].name == '选择省份') {
          Toast('请选择省份');
          return;
        }
        if (value[1].name == '选择城市') {
          Toast('请选择城市');
          return;
        }
        if (value[2].name == '选择地区') {
          Toast('请选择地区');
          return;
        }
        this.formData.provinceNow = value[0].name;
        this.formData.cityNow = value[1].name;
        this.formData.districtNow = value[2].name;
        this.showArea = false
      },
      tabClick(type) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          window.android.invoke_native("goAuth", type, "jsGetUserInfoCallBack");
        } else if (isiOS) {

          // window.webkit.messageHandlers.getUserId.postMessage(type)
          // getUserId(type)
          window.location.href = 'cashloans://goAuth';
        }

        console.log(type)
      },
      // 获取下拉配置信息
      systemConfigList() {

        let params1 = {
          jsonObject: {
            'perSystemConfigCodeIn': [
              'edu',
              'settle',
              'marry',
              'job',
              'relation',
            ]
          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestPos(params1, '/systemConfig/list').then((response) => {
          if (response.data.status == 'SUCCESS') {

            for (let i = 0; i < response.data.t.list.edu.length; i++) {
              response.data.t.list.edu[i].text = response.data.t.list.edu[i].systemConfigName;
            }
            for (let i = 0; i < response.data.t.list.settle.length; i++) {
              response.data.t.list.settle[i].text = response.data.t.list.settle[i].systemConfigName;
            }
            for (let i = 0; i < response.data.t.list.marry.length; i++) {
              response.data.t.list.marry[i].text = response.data.t.list.marry[i].systemConfigName;
            }
            for (let i = 0; i < response.data.t.list.job.length; i++) {
              response.data.t.list.job[i].text = response.data.t.list.job[i].systemConfigName;
            }
            for (let i = 0; i < response.data.t.list.relation.length; i++) {
              response.data.t.list.relation[i].text = response.data.t.list.relation[i].systemConfigName;
            }
            this.selectAllList = response.data.t.list;


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
      ///validate/info 完善用户信息
      validateInfo() {

        if (Utils.isEmpty(this.formData.education)) {
          Toast('学历不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.provinceNow) || Utils.isEmpty(this.formData.cityNow) || Utils.isEmpty(this.formData.districtNow)) {
          Toast('现居地址不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.addressNow)) {
          Toast('详细地址不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.liveTime)) {
          Toast('现居时长不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.isMarry)) {
          Toast('婚姻状态不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.job)) {
          Toast('职业不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.companyName)) {
          Toast('工作单位不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.companyAddress)) {
          Toast('公司地址不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.linealRelation)) {
          Toast('与本人关系不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.linealMail)) {
          Toast('联系人不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.linealRelation2)) {
          Toast('与本人关系不能为空')
          return;
        }
        if (Utils.isEmpty(this.formData.linealMail2)) {
          Toast('紧急联系人不能为空')
          return;
        }
        // if (!Utils.verifyInt(this.formData.linealMail) || this.formData.linealMail.length != 11) {
        //   Toast("请输入正确的手机号")
        //   return;
        // }
        let params1 = {
          jsonObject: this.formData
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestCas(params1, '/user/updateUserInfo').then((response) => {
          if (response.data.status == 'SUCCESS') {
            this.hideLoading(response.data.text);
            this.getUserInfo();
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
            this.userInfo = response.data.t.userInfo;
            this.$router.back();
          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            Toast({message: error.text, position: 'center'});
          } else {
            Toast({message: error.message, position: 'center'});
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
  /*.grxx {*/
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

  .grxx {

    /*background-color: #ffffff;*/
    min-height: 100vh;
    .van-nav-bar-top {
      background-color: #ffffff;
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
      padding-top: 0.2rem;
    }
    .van-nav-bar {
      /*padding-top: 0.4rem;*/
      /*height: 1.28rem;*/
      background-color: @title_bgColor;
      height: 0.88rem;
      line-height: 0.88rem;
      color: #FFFFFF;
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

    .van-picker__cancel, .van-picker__confirm {
      font-size: 0.3rem;
    }
    .content {
      margin: 1.08rem 0 1rem 0;
      /*margin-bottom: 1.2rem;*/
      background: #FFFFFF;
      .tv1 {
        background: #f7f7f7;
        font-size: 0.24rem;
        color: #999999;
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
            font-size: 0.28rem;
            margin: 0 0.3rem;
          }
          .tv10 {
            background: white;
            width: calc(100% - 3rem);
            display: inline-block;
            height: 0.75rem;
            border-width: 0;
            font-weight: 500;
            padding: 0.4rem 0;
            color: #333333;
            font-size: 0.28rem;;
            text-align: right;
          }
          .tv14 {
            background: white;
            width: calc(100% - 2.5rem);
            display: inline-block;
            height: 0.75rem;
            border-width: 0;
            font-weight: 500;
            padding: 0.4rem 0;
            color: #333333;
            font-size: 0.28rem;;
            text-align: right;
          }
          .iv1 {
            width: 0.2rem;
            vertical-align: middle;
            line-height: 1rem;
            margin-left: 0.3rem;
            margin-bottom: 0.1rem;
          }

        }
        .tv11 {
          position: relative;
          .tv12 {
            width: 2.4rem;
            display: inline-block;
            position: relative;
            left: 0;
            color: #333333;
            font-size: 0.28rem;
            margin: 0 0.3rem;
          }
          .tv13 {
            background: white;
            width: calc(100% - 3.4rem);
            display: inline-block;
            height: 0.75rem;
            border-width: 0;
            font-weight: 500;
            padding: 0.4rem 0;
            color: #333333;
            font-size: 0.28rem;;
            text-align: right;
          }
          .iv1 {
            width: 0.16rem;
            vertical-align: middle;
            line-height: 1rem;
            margin-left: 0.3rem;
          }

        }
      }
    }
    .jhcd {

      height: 0.9rem;
      text-align: center;
      line-height: 0.9rem;
      margin: 0.2rem 0;
      color: #FFFFFF;
      font-size: 0.37rem;
      fontFamily: "PingFangSC-Medium";
      &>div{
        .theme_buttom();
      }
    }
    .tv4 {
      width: 100%;
      text-align: center;
      position: fixed;
      /*background: #FFFFFF;*/
      padding-top: 0.2rem;
      bottom: 0;
      padding-bottom: 0.2rem;
      color: #999999;
      font-size: 0.24rem;
    }
    input:disabled, input[disabled] {
      -webkit-opacity: 1;
      opacity: 1;
    }
  }
</style>

<style scoped>

</style>
