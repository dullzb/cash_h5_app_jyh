<!--激活额度-->
<template>
  <div class="jhed">
    <div class="van-nav-bar-top">
      <van-nav-bar
        :title="titleName"
        :left-arrow="leftArrow"
        @click-left="back"
        @click-right="">
      </van-nav-bar>
    </div>
    <div class="content">
      <div>
        <div v-show="validateIndex!=-1">
          <div class="list-block">
            <img class="img1" src="../../assets/jiesuoedu@3x.png">
          </div>
          <div class="tv1">请依次完成下方认证解锁额度</div>
        </div>
        <div v-show="validateIndex==-1&&userInfo.limitMoney!=null">
          <div class="list-block">
            <img class="img1" src="../../assets/chenggong@3x.png">
          </div>
          <div class="tv13">恭喜您已完成全部认证</div>
          <div class="tv11">获得<span class="tv12">{{userInfo.limitMoney}}</span>元额度</div>
        </div>
        <!--<div v-show="validateIndex==-1&&fkisOk">-->
        <!--<div class="list-block">-->
        <!--<img class="img1" src="../../assets/shibai@3x.png">-->
        <!--</div>-->
        <!--<div class="tv13">您目前的资料暂时无法获取额度，认证</div>-->
        <!--<div class="tv11">更多选项可增加过审记录</div>-->
        <!--</div>-->


        <div class="tv3"></div>
        <div class="tv2">温馨提示：请使用本人真实信息填写，有助于申请</div>
        <van-row class="page_btn">
          <van-col span="8">
            <div class="page_btn_item magt" @click.stop="tabClick(1)">
              <div class="page_btn_content">
                <img class="page_btn_icon"
                     src="../../assets/shiming@3x.png">
                <div class="page_btn_title">1.实名认证</div>

                <div class="status" v-show="userInfo.isRealnameValidate==1">
                  <img class="icon_status icon_status2"
                       src="../../assets/kuang@3x.png">
                </div>
                <div class="status" v-show="userInfo.isRealnameValidate==-1">
                  <img class="icon_status icon_status3"
                       src="../../assets/kuang1-@3x.png">
                </div>
                <div class="status" v-show="userInfo.isRealnameValidate==2">
                  <img class="icon_status icon_status3"
                       src="../../assets/kuang-@3x.png">
                </div>
                <div class="status" v-show="userInfo.isRealnameValidate==-2">
                  <img class="icon_status icon_status3"
                       src="../../assets/cxrz.png">
                </div>
              </div>

            </div>
          </van-col>
          <van-col span="8">
            <div class="page_btn_item magt magl" @click.stop="tabClick(2)">
              <div class="page_btn_content">
                <img class="page_btn_icon"
                     src="../../assets/shouji@3x.png">
                <div class="page_btn_title">2.手机验证</div>
                <div class="status" v-show="userInfo.isOperatorValidate==1">
                  <img class="icon_status icon_status3"
                       src="../../assets/kuang@3x.png">
                </div>
                <div class="status" v-show="userInfo.isOperatorValidate==-1">
                  <img class="icon_status icon_status3"
                       src="../../assets/kuang1-@3x.png">
                </div>
                <div class="status" v-show="userInfo.isOperatorValidate==2">
                  <img class="icon_status icon_status3"
                       src="../../assets/kuang-@3x.png">
                </div>
                <div class="status" v-show="userInfo.isOperatorValidate==-2">
                  <img class="icon_status icon_status3"
                       src="../../assets/cxrz.png">
                </div>
              </div>

            </div>
          </van-col>
          <van-col span="8">
            <div class="page_btn_item magt magl" @click.stop="tabClick(3)">
              <div class="page_btn_content">
                <img class="page_btn_icon"
                     src="../../assets/renlian@3x.png">
                <div class="page_btn_title">3.人脸识别</div>
                <div class="status" v-show="userInfo.isFaceValidate==1">
                  <img class="icon_status"
                       src="../../assets/kuang@3x.png">
                </div>
                <div class="status" v-show="userInfo.isFaceValidate==-1">
                  <img class="icon_status icon_status3"
                       src="../../assets/kuang1-@3x.png">
                </div>
                <div class="status" v-show="userInfo.isFaceValidate==2">
                  <img class="icon_status icon_status3"
                       src="../../assets/kuang-@3x.png">
                </div>
                <div class="status" v-show="userInfo.isFaceValidate==-2">
                  <img class="icon_status icon_status3"
                       src="../../assets/cxrz.png">
                </div>
              </div>
            </div>
          </van-col>


        </van-row>
        <van-row class="page_btn">
          <van-col span="8">
            <div class="page_btn_item " @click.stop="tabClick(4)">
              <div class="page_btn_content">
                <img class="page_btn_icon"
                     src="../../assets/xinxi@3x.png">
                <div class="page_btn_title">4.个人信息</div>
                <div class="status" v-show="userInfo.userMailFlg==1">
                  <img class="icon_status icon_status2"
                       src="../../assets/kuang@3x.png">
                </div>
                <div class="status" v-show="userInfo.userMailFlg==-1">
                  <img class="icon_status icon_status3"
                       src="../../assets/kuang1-@3x.png">
                </div>
                <div class="status" v-show="userInfo.userMailFlg==2">
                  <img class="icon_status icon_status3"
                       src="../../assets/kuang-@3x.png">
                </div>
                <div class="status" v-show="userInfo.userMailFlg==-2">
                  <img class="icon_status icon_status3"
                       src="../../assets/cxrz.png">
                </div>
              </div>
            </div>
          </van-col>
          <!--<van-col span="8">-->
          <!--<div class="page_btn_item" @click.stop="tabClick(5)">-->
          <!--<div class="page_btn_content">-->

          <!--<img class="page_btn_icon"-->
          <!--src="../../assets/zhifubao@3x.png">-->
          <!--<div class="page_btn_title">淘宝认证</div>-->
          <!--<div class="status" v-show="userInfo.isAlipayValidate==1">-->
          <!--<img class="icon_status icon_status3"-->
          <!--src="../../assets/kuang@3x.png">-->
          <!--</div>-->
          <!--<div class="status" v-show="userInfo.isAlipayValidate==-1">-->
          <!--<img class="icon_status icon_status3"-->
          <!--src="../../assets/kuang1-@3x.png">-->
          <!--</div>-->
          <!--<div class="status" v-show="userInfo.isAlipayValidate==2">-->
          <!--<img class="icon_status icon_status3"-->
          <!--src="../../assets/kuang-@3x.png">-->
          <!--</div>-->
          <!--<div class="status" v-show="userInfo.isAlipayValidate==-2">-->
          <!--<img class="icon_status icon_status3"-->
          <!--src="../../assets/cxrz.png">-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</van-col>-->
          <!--<van-col span="8">-->
          <!--<div class="page_btn_item magl" @click.stop="tabClick(6)">-->
          <!--<div class="page_btn_content">-->
          <!--<img class="page_btn_icon"-->
          <!--src="../../assets/yinhangka@3x.png">-->
          <!--<div class="page_btn_title">绑定银行卡</div>-->
          <!--<div class="status" v-show="userInfo.isBankValidate==1">-->
          <!--<img class="icon_status icon_status3"-->
          <!--src="../../assets/kuang@3x.png">-->
          <!--</div>-->
          <!--<div class="status" v-show="userInfo.isBankValidate==-1">-->
          <!--<img class="icon_status icon_status3"-->
          <!--src="../../assets/kuang1-@3x.png">-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</van-col>-->

        </van-row>
      </div>
      <div class="jhcd" v-show="validateIndex!=-1" @click.stop="inTabClick()">
        点击激活({{validateIndex}}/4)
      </div>
      <div class="jhcd" v-show="validateIndex==-1" @click="mslqClick">
        马上领钱
      </div>
    </div>
    <div class="tv4">本平台使用银行级数据加密，承诺不会泄露用户数据</div>
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
        titleName: '激活额度',
        userInfo: JSON.parse(localStorage['userMes']),
        validateIndex: 0,
        fkisOk: false,
        listData: {list: {productQuota: '', productQuotaMax: '', serviceCost: '',}, bankCard: {bankName: ''}},
        clickTag: true
      }
    },
    created() {
    },
    updated() {
      // Toast('updated')

      console.log('updated')

    },
    beforeMount() {

      console.log('beforeMount')

    },

    activated() {
      // Toast('activated')
      console.log('activated')


    },
    mounted() {
      window.refreshUserInfo = this.refreshUserInfo;
      window.telPermissionsOk = this.telPermissionsOk;
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.getUserInfo();
        this.getProductListC();
        this.getUserInfo();
        let second = 5;
        const timer = setInterval(() => {
          second--;
          if (second) {
            this.getUserInfo();

          } else {
            this.getUserInfo();
            clearInterval(timer);

          }
        }, 3000);
      }

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
      refreshUserInfo() {
        this.getUserInfo();
      },
      mslqClick() {


        this.$router.push('mslq');

      },
      inTabClick() {
        if (!this.clickTag) {
          return;
        }
        this.clickTag = false;
        setTimeout(() => {
          this.clickTag = true;
        }, 5000);
        if (this.userInfo.validateIndex == 1) {
          this.$router.push('srrz');

        } else if (this.userInfo.validateIndex == 2) {
          if (this.userInfo.isOperatorValidate == 2) {
            Toast('运营商认证审核中，请耐心等待1-3分钟')
            return;
          }
          localStorage.rzType = "1";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f118.190.152.176%3a8082%2fcash_loans%2fdist_cash_loan_app_test%2f%23%2foperatorResult&themeColor=ff7825";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&themeColor=ff7825&backUrl=http%3a%2f%2f47.96.167.201%2fweb%2fdist_cash_loan_app_test%2f%23%2foperatorResult";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId  + "&phone=" + this.userInfo.telphone +  "&themeColor%3Dff7825&backUrl=https%3a%2f%2fapi.finchsys.com%2fweb%2fdist_cash_loan_app_pro%2f%23%2foperatorResult";
          window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor=@theme_bgColor";

        } else if (this.userInfo.validateIndex == 3) {
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          let params = JSON.stringify({
            userId: JSON.parse(localStorage.userMes).userId,
            idcardName: JSON.parse(localStorage.userMes).trueName,
            idcardNum: JSON.parse(localStorage.userMes).idCard,
            token: localStorage.token,
            idCardPosition: JSON.parse(localStorage.userMes).idCardPosition
          });
          if (isAndroid) {
            window.android.invoke_native("goAuth", params, "jsGetUserInfoCallBack");
            // window.android.invoke_native("goAuth", this.userInfo.userId, "jsGetUserInfoCallBack");
          } else if (isiOS) {

            window.webkit.messageHandlers.goAuth.postMessage(params)
            // getUserId(type)
            // window.location.href = 'cashloans://goAuth';
          }
        } else if (this.userInfo.validateIndex == 4) {
          this.$router.push('grxx');
        } else if (this.userInfo.validateIndex == 5) {

          localStorage.rzType = "2";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/baseinfo?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f118.190.152.176%3a8082%2fcash_loans%2fdist_cash_loan_app_test%2f%23%2foperatorResult&themeColor=FF0000&pushname=alipay&_k=ow6xgh";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/baseinfo?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f47.96.167.201%2fweb%2fdist_cash_loan_app_test%2f%23%2foperatorResult&themeColor=FF0000&pushname=alipay&_k=ow6xgh";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/baseinfo?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId  + "&phone=" + this.userInfo.telphone + "&themeColor=FF0000&pushname=alipay&_k=ow6xgh&backUrl=https%3a%2f%2fapi.finchsys.com%2fweb%2fdist_cash_loan_app_pro%2f%23%2foperatorResult";
          window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/baseinfo?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor=FF0000&pushname=alipay&_k=ow6xgh";
        } else if (this.userInfo.validateIndex == 6) {
          this.$router.push('bdyhk');
        }
      },
      tabClick(type) {
        if (!this.clickTag) {
          return;
        }
        this.clickTag = false;
        setTimeout(() => {
          this.clickTag = true;
        }, 5000);
        if (this.userInfo.isRealnameValidate == 1 && type == 1) {
          Toast('您已经完成实名认证了')
          return;
        }
        if (this.userInfo.isFaceValidate == 1 && type == 2) {
          Toast('您已经完成手机验证了')
          return;
        }
        if (this.userInfo.userMailFlg == 1 && type == 3) {
          Toast('您已经完成人脸识别了')
          return;
        }
        if (this.userInfo.isOperatorValidate == 1 && type == 4) {
          Toast('您已经完成个人信息了')
          return;
        }
        if (this.userInfo.isOperatorValidate == 2 && type == 2) {
          Toast('运营商认证审核中，请耐心等待1-3分钟')
          return;
        }
        if (this.userInfo.isAlipayValidate == 1 && type == 5) {
          Toast('您已经完成淘宝认证了')
          return;
        }
        if (this.userInfo.isBankValidate == 1 && type == 6) {
          Toast('您已经完成绑定银行卡了')
          return;
        }

        if (this.userInfo.validateIndex == 1 && type != 1) {
          Toast('请您先完成实名认证')
          return;
        }
        if (this.userInfo.validateIndex == 2 && type != 2) {
          Toast('请您先完成手机验证')
          return;
        }
        if (this.userInfo.validateIndex == 3 && type != 3) {
          Toast('请您先完成人脸识别')
          return;
        }
        if (this.userInfo.validateIndex == 4 && type != 4) {
          Toast('请您先完善个人信息')
          return;
        }

        if (this.userInfo.validateIndex == 5 && type != 5) {
          Toast('请您先完成淘宝认证')
          return;
        }
        if (this.userInfo.validateIndex == 6 && type != 6) {
          Toast('请您先绑定银行卡')
          return;
        }

        if (type == 1) {
          this.$router.push('srrz');

        } else if (type == 2) {
          localStorage.rzType = "1";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f118.190.152.176%3a8082%2fcash_loans%2fdist_cash_loan_app_test%2f%23%2foperatorResult&themeColor=ff7825";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&themeColor=ff7825&backUrl=http%3a%2f%2f47.96.167.201%2fweb%2fdist_cash_loan_app_test%2f%23%2foperatorResult";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId  + "&phone=" + this.userInfo.telphone +  "&themeColor%3Dff7825&backUrl=https%3a%2f%2fapi.finchsys.com%2fweb%2fdist_cash_loan_app_pro%2f%23%2foperatorResult";
          window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor=@theme_bgColor";

        } else if (type == 3) {

          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          let params = JSON.stringify({
            userId: JSON.parse(localStorage.userMes).userId,
            idcardName: JSON.parse(localStorage.userMes).trueName,
            idcardNum: JSON.parse(localStorage.userMes).idCard,
            token: localStorage.token,
            idCardPosition: JSON.parse(localStorage.userMes).idCardPosition
          });
          if (isAndroid) {
            window.android.invoke_native("goAuth", params, "jsGetUserInfoCallBack");
            // window.android.invoke_native("goAuth", this.userInfo.userId, "jsGetUserInfoCallBack");
          } else if (isiOS) {

            window.webkit.messageHandlers.goAuth.postMessage(params)
            // getUserId(type)
            // window.location.href = 'cashloans://goAuth';
          }

        } else if (type == 4) {
          this.$router.push('grxx');
        } else if (type == 5) {
          localStorage.rzType = "2";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/baseinfo?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f118.190.152.176%3a8082%2fcash_loans%2fdist_cash_loan_app_test%2f%23%2foperatorResult&themeColor=FF0000&pushname=alipay&_k=ow6xgh";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/baseinfo?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&themeColor=FF0000&pushname=alipay&_k=ow6xgh&backUrl=http%3a%2f%2f47.96.167.201%2fweb%2fdist_cash_loan_app_test%2f%23%2foperatorResult";
          // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/baseinfo?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId  + "&phone=" + this.userInfo.telphone + "&themeColor=FF0000&pushname=alipay&_k=ow6xgh&backUrl=https%3a%2f%2fapi.finchsys.com%2fweb%2fdist_cash_loan_app_pro%2f%23%2foperatorResult";
          window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/baseinfo?quitOnLoginDone=YES&apiKey=547a7777cb514a42acb40cf50eeb41e1&userId=" + this.userInfo.userId + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor=FF0000&pushname=alipay&_k=ow6xgh";
        } else if (type == 6) {
          this.$router.push('bdyhk');
        }


        console.log(type)
      },
      telPermissionsOk() {
        //获取通讯录权限成功
        // this.$router.push('grxx');
      },
      setTelList() {
        //获取通讯录权限成功
        this.$router.push('grxx');
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
            if (this.userInfo.validateIndex != -1) {
              this.validateIndex = this.userInfo.validateIndex - 1;
            } else {
              this.validateIndex = this.userInfo.validateIndex;
            }

          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            Toast({message: error.text, position: 'center'});
          } else {
            Toast({message: error.message, position: 'center'});
          }
        });
      },
      // 调用风控接口
      getLimitC() {

        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestCas(params1, '/validate/limit/c ').then((response) => {
          if (response.data.status == 'SUCCESS') {
            this.fkisOk = true;
            this.$router.push('mslq');
          } else {
            this.fkisOk = false;
            Toast('您目前的资料暂时无法获取额度！');
          }
        }).catch(error => {
          this.fkisOk = false;
          if (!Utils.isEmpty(error.text)) {
            Toast({message: error.text, position: 'center'});
          } else {
            Toast({message: error.message, position: 'center'});
          }
        });
      },
      // 获取贷款商品
      getProductListC() {

        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestPos(params1, '/product/list/c').then((response) => {
          if (response.data.status == 'SUCCESS') {
            this.listData.list = response.data.t.list[0];
          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        });
      },
    },

  }
</script>

<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.jhed {*/
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

  .jhed {

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
        font-family: "PingFangSC-Medium";
        color: #333333;
        font-size: 0.36rem;
        font-weight: bold
      }
    }
    .van-nav-bar .van-icon {
      color: #333;
      width: 0.4rem;
      vertical-align: middle;
    }
    .content {
      padding: 0.88rem 0 1.2rem;
      .list-block {
        background: #FFFFFF;
        text-align: center;
        padding: 0.35rem 0 0.2rem 0;
        .img1 {
          width: 1rem;
        }
      }
      .tv1 {
        text-align: center;
        background: white;
        font-size: 0.3rem;
        color: #333333;
        padding-bottom: 0.3rem;
        margin-bottom: 0.2rem;
      }
      .tv13 {
        text-align: center;
        background: white;
        font-size: 0.3rem;
        color: #333333;
        padding-bottom: 0.05rem;
      }
      .tv11 {
        text-align: center;
        background: white;
        font-size: 0.3rem;
        color: #333333;
        padding-bottom: 0.3rem;
        margin-bottom: 0.2rem;
        .tv12 {
          color: @theme_color;
          font-weight: bold;
          font-size: 0.4rem;
        }
      }
      .tv2 {
        background: #ffefde;
        font-size: 0.23rem;
        padding: 0.2rem 0.3rem;
      }
      .tv3 {
        background: #f7f7f7;
        height: 0.2rem;
      }
      .jhcd {

        background: url("../../assets/anniu@3x.png") 50% 50% no-repeat;
        background-size: 75% 100%;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        margin-top: 0.9rem;
        color: #FFFFFF;
        font-size: 0.37rem;
        fontFamily: "PingFangSC-Medium"
      }
    }
    .page_btn {
      background: white;
      .magt {
        margin-top: 0.64rem;
        margin-bottom: 0.54rem;
      }
      .magl {
        margin-left: -0.6rem;
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
          .icon_status {
            margin-left: -6px;
          }
          .icon_status2 {
            margin-left: -10px;
          }
          .icon_status3 {
            margin-left: -14px;
          }
          .page_btn_icon {
            width: 0.4rem;
            height: 0.4rem;
          }
        }

      }

    }
    .tv4 {
      width: 100%;
      text-align: center;
      position: fixed;
      background: #FFFFFF;
      padding-top: 0.2rem;
      bottom: 0;
      padding-bottom: 0.2rem;
      color: #999999;
      font-size: 0.24rem;
    }
  }
</style>

<style scoped>

</style>
