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
        <div class="jhed_bg_top">
          <div v-show="validateIndex!=-1">

            <div class="tv1">
              <p>您目前的资料暂时无法获取额度,</p>
              <p>认证更多选项可增加过审记录</p>
            </div>
          </div>
          <div v-show="validateIndex==-1&&listData.list.limitMoney!=''">
            <div class="tv1">
              <div class="tv13">恭喜您已完成全部认证</div>
              <div class="tv11">获得<span class="">{{listData.list.limitMoney}}</span>元额度</div>
            </div>
          </div>
        </div>

        <div class="tv2">温馨提示：请使用本人真实信息填写，有助于申请</div>

        <div class="rzPage">


          <div v-for="(item,index) in autoConfigList" :key="index">
            <div class="cell_content " @click.stop="rzTabClick(item,index)">
              <img class="cell_img"
                   :src="item.imgUrl">
              <span class="cell_title">{{item.autoName}}</span>

              <span class="cell_title_status cell_title_status1" v-show="item.isPass==1">认证通过</span>
              <span class="cell_title_status cell_title_status2" v-show="item.isPass==-1">认证失败</span>
              <span class="cell_title_status cell_title_status3" v-show="item.isPass==2">认证中</span>
              <span class="cell_title_status cell_title_status4" v-show="item.isPass==-2">重新认证</span>
              <img class="cell_right_img middel_gap_img"
                   src="../../assets/more@3x.png">
            </div>
          </div>

        </div>

      </div>
      <div class="jhcd" v-show="validateIndex!=-1&&autoConfigList.length>0">
        <div @click.stop="inTabClick()">
          点击激活({{nextIndex}}/{{autoConfigList.length}})
        </div>
      </div>
      <div class="jhcd" v-show="validateIndex==-1&&autoConfigList.length>0">
        <div @click="mslqClick">
          马上领钱
        </div>
      </div>
    </div>
    <div class="tv4">本平台使用银行级数据加密，承诺不会泄露用户数据</div>
    <div class="agree_box" v-show="isShowAgreeContent">
      <div class="agree_content">
        <div class="agree_text">
          <p class="agree_title">数据采集服务协议</p>
          <div class="title1 mgt2">
            本协议是您（下称“用户”、“您”）与该服务提供方之间就委托我司有限公司（下称“我司”或“我司”）进行“个人数据采集授权”相关事宜（下称“本服务”）所订立的协议。

            本协议包含了我司采集、存储、保护和使用您的个人数据的条款，我们建议您完整地阅读本协议条款，特别是以下划线、加粗等方式标注与您的权益存在或可能存在重大关系的部分。除非您接受本协议所有条款，否则请不要使用本服务。您点击"同意并继续"按钮后，即表示您已同意我们按照本协议来合法使用和保护您的个人数据。

            为充分保障您个人数据的安全性，我司在此特别声明：
          </div>
          <div class="title1 mgt2">
            1、鉴于您须授权该服务提供方（下称“商业伙伴”）并由该商业伙伴告知本服务后方能进入并使用本服务，自您使用本服务时起即视为您与商业伙伴之间已存在合法的、充分的、必要的、不可撤销的授权。即您已明确授权商业伙伴为验证您的真实身份及评估您的信用数据而对您的身份数据及相关信用数据自行或委托包括我司在内的第三方进行获取、验证、存储、汇总、整理、编辑并在商业伙伴对您进行风险评估及相关服务提供范围内使用。
          </div>
          <div class="title1 mgt2">
            2、您在此明确授权并同意，由我司对您的数据进行加工、储存、汇总、整理、编辑并提供给商业伙伴及/或其为（我司的商业伙伴合称“商业伙伴”）就对您进行风险评估及相关服务提供之目的使用。
          </div>
          <div class="title1 mgt2">
            3、未经您的授权，我司不会将您的数据提供给任何其他第三方。我司默认您已通过同意本服务协议的方式认可我司将您的信息提供给商业伙伴。
          </div>

          <div class="title1 mgt2">
            4、我司不会保存您的账户密码数据，我司仅会在您每次单独授权的情况下，方予采集相应数据，我司不会主动自行采集您的任何数据。
          </div>

          <h5>第一章 数据采集服务</h5>

          <div class="title1 mgt2">
            第一条
            我司无法确保您授权采集的个人数据源的准确性、数据采集通道是否持续通畅，因此我司无法保证本服务提供的持续性、及时性、准确性，如您发现经我司采集的个人数据提供给经您授权的商业伙伴存在不准确或错误的情况，可联系您数据所在平台进行更正或删除。
          </div>


          <div class="title1 mgt2">第二条 您在此充分地、有效地、不可撤销地明示同意并授权我司采集以下个人数据：</div>

          <div class="title1 mgt2">1. 在用户使用我司产品服务时，用户根据我司要求提供个人相关数据，包括但不限于姓名、性别、身份证号码、住址、联系方式等；</div>


          <div class="title1 mgt2">2.
            在用户使用我司产品服务，或访问我司产品时，我司自动接收并记录的用户的浏览器和设备上的信息，包括但不限于用户的宽带类型、IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征等数据；
          </div>


          <div class="title1 mgt2">
            3. 用户使用我司产品时进行授权登录、导入账单等操作所提供的相关数据，具体采集范围见附件一《数据采集项》。
          </div>

          <div class="title1 mgt2">
            4.
            在用户使用我司提供的相关业务时，用户应确认已对商业伙伴（如借贷平台、消费金融公司等，本协议统称为商业伙伴）进行有效的、充分的、不可撤销的授权，授权该等商业伙伴查询、验证用户的相关个人数据并为风险评估及相关服务提供之目的进行使用。为实现用户与商业伙伴之间的合作目的，用户及商业伙伴有效地、充分地、不可撤销地授权我司对上述商业伙伴需要查询、验证或评估的用户个人数据进行收集、查询验证、处理（包括但不限于汇总、整理、编辑等）、并提供给商业伙伴就对您进行风险评估及相关服务提供之目的进行使用。我司可通过用户提供的个人数据查询用户的相关信用信息，包括但不限于任何信用记录、信用分、信用报告等信息；
          </div>

          <div class="title1 mgt2">
            5. 我司不会采集用户的宗教信仰、基因、指纹、血型、疾病和病史数据以及法律、行政法规规定禁止采集的其他个人数据。
          </div>


          <h5>第二章 数据使用</h5>

          <div class="title1 mgt2">
            第三条 我司将以高度的勤勉、审慎义务对待用户个人数据，为使用户个人知晓用户数据所经流程，我司特告知如下：我司在授权范围内，对授权采集的用户数据将进行以下处理与使用：
          </div>


          <div class="title1 mgt2">
            1. 将数据进行归类整合和处理（必要的数据清洗、加密与掩码等），以提供给商业伙伴对用户信用情况进行评估，并依此对我司的服务进行改进；
          </div>

          <div class="title1 mgt2">
            2. 比较数据的准确性并与第三方进行验证，例如，将用户向我司提交的身份数据与身份验证的服务机构进行验证；
          </div>

          <div class="title1 mgt2">
            3. 为服务用户的目的，我司可能通过使用用户的个人数据，向用户提供用户感兴趣的通知、营销活动及其他商业性电子信息；
          </div>

          <div class="title1 mgt2">
            4. 经用户明确同意并授权的其他用途：我司将根据所采集的用户数据信息加工形成用户画像并进行安全存储及后续合法使用；
          </div>


          <div class="title1 mgt2">
            5. 除本协议明确阐述和相关法律规定外，我司不会向任何无关第三方提供、披露或交易用户的个人数据；
          </div>


          <h5>第三章 除外责任</h5>

          <div class="title1 mgt2">
            第四条
            因您的过错导致的任何损失，该过错包括但不限于:操作不当、遗忘或泄露密码、密码被他人破解、您使用的计算机系统被第三方侵入、用户委托他人代理使用本服务时他人恶意或不当操作而造成的损失，由您自行负责。除非我司单方故意或重大过失直接导致您遭受损失外，我司不承担责任。
          </div>


          <h5>第四章 账户安全及管理</h5>

          <div class="title1 mgt2">
            第五条 您了解并同意，确保基于使用本服务所需账户及密码的机密安全对您非常重要，您应妥善保管这些机密数据。您将对利用该账户及密码所进行的一切行动及言论，负完全的责任，并同意以下事项：
          </div>

          <div class="title1 mgt2">
            1、您不对其他任何人泄露账户或密码，亦不可使用其他任何人的账户或密码。因黑客、病毒或您的保管疏忽等非我司原因导致您的账户遭他人非法使用的，我司不承担责任；
          </div>

          <div class="title1 mgt2">
            2、冒用他人账户及密码的，我司及第三方机构保留追究实际使用人连带责任的权利。
          </div>


          <div class="title1 mgt2"> 第六条 如发现有第三人冒用或盗用您的账户及密码，或其他任何未经您合法授权而使用的情形，您应立即以有效方式通知我司，且马上修改密码，要求我司暂停相关服务。同时，
            您理解我司对您的请求采取行动需要合理期限，在此之前，我司对第三人使用该服务所导致的损失不承担责任。
          </div>

          <div class="title1 mgt2">
            第七条 我司有权基于单方独立判断，在认为可能不利于我司提供服务或涉及违法违规等情形时，可不经通知而先行暂停、中断或终止向您提供本协议项下的全部或部分服务，且无需因此对您或任何第三方承担任何责任。
          </div>

          <div>
            前述情形包括但不限于：
          </div>

          <div class="title1 mgt2">
            1、我司认为您不是采集数据的数据权利人时；
          </div>

          <div class="title1 mgt2">
            2、我司发现异常情况或有合理理由怀疑操作有风险或有违法之虞时；
          </div>

          <div class="title1 mgt2">
            3、我司认为账户存在未经授权的使用或其他我司认为有风险之情形；
          </div>

          <div class="title1 mgt2">
            4、我司认为您已经违反本协议中规定的各类规则；
          </div>

          <div class="title1 mgt2">
            5、我司基于上述原因之外，根据其单独判断需先行暂停、中断或终止向您提供本协议项下的全部或部分用户服务。
          </div>


          <h5>第五章 服务中断或故障</h5>

          <div class="title1 mgt2">
            第八条 您同意，因下列原因导致我司及第三方机构无法正常提供服务的，我司及第三方机构不承担责任；
          </div>

          <div class="title1 mgt2">
            1、我司及第三方机构等承载本服务系统停机维护期间；
          </div>

          <div class="title1 mgt2">
            2、您的电脑，手机软件和通信线路、供电线路出现故障的；
          </div>

          <div class="title1 mgt2">
            3、您操作不当或通过非我司及第三方机构授权或认可的方式使用本服务的；
          </div>

          <div class="title1 mgt2">
            4、因病毒、木马、恶意程序攻击、网络拥堵、系铳不稳定 、系统或设备故障、通讯故障、电力故障或政府行为等原因；
          </div>

          <div class="title1 mgt2">
            5、由于黑客攻击、网络供应商技术调整或故障、网站升级、网站系统方面的问题等原因而造成的本服务中断或延迟；
          </div>

          <div class="title1 mgt2">
            6、因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可杭力之因素，造成本服务系统障碍不能执行业务的。

            尽管有前款约定，我司及第三方机构将采取合理行动积极促使服务恢复正常。
          </div>

          <h5>
            第六章 隐私权保护及授权条款
          </h5>

          <div class="title1 mgt2">
            第九条 我司不会保存您的密码。
          </div>

          <div class="title1 mgt2">
            第十条 您授权我司到相应的个人数据源网站采集您的授权个人数据，并将在法律允许的范围内对采集信息进行存储、汇总、整理、加工及其他形式的使用；
          </div>

          <div class="title1 mgt2">
            第十一条 本服务的数据获取是一次性的，除非得到您的再次授权，否则我司不会发起登录而采集您的数据。
          </div>

          <div class="title1 mgt2">
            第十二条 我司将对用户提供的数据严格保密，除具备下列情形之一外，不会向任何外部机构披露：
          </div>

          <div class="title1 mgt2">
            1. 经过用户事先同意而披露，即在获得用户明确同意的情况下，我司才会在授权范围内向特定被授权方披露用户的个人数据；
          </div>

          <div class="title1 mgt2">
            2. 应法律法规或公权力部门要求而披露，即我司可能会根据法院、政府部门、上级监管机构等执法机构或法律法规的要求向其披露用户的个人数据；
          </div>

          <div class="title1 mgt2">
            3.
            当我司涉及合并、收购或资产出售等重大交易时，我司有权依据交易的需要将用户数据提供给交易相对方及交易各方聘请的各中介机构(包括但不限于律师、会计师等)，但会在任何个人数据进行转让或受其他隐私权政策约束之前，继续确保其保密性并要求交易向各方及各自聘请的中介机构承担保密责任；
          </div>

          <h5>第七章 条款的解释、法律适用及争端解决</h5>

          <div class="title1 mgt2">
            第十三条 本协议是由您与我司共同签订的，适用于您在本服务项下的全部活动。
          </div>

          <div class="title1 mgt2">
            第十四条
            如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，则应认为该条款可与本协议相分割，并可被尽可能接近各方意图的、能够保留本协议要求的经济目的的、有效的新条款所取代，而且，在此情况下，本协议的其他条款仍然完全有效并具有约束力。
          </div>


          <div class="title1 mgt2">
            第十五条 本协议的有效性、履行与本协议所有事宜，将受中国法律管辖，任何争议仅适用中国法律。
          </div>

          <div class="title1 mgt2">
            第十六条 因本协议所引起的您与我司的任何纠纷或争议，首先应友好协商解决，协商不成的，您在此完全同意将纠纷或争议提交我司所在辖区有管辖权的人民法院诉讼解决。
          </div>

          <div class="title1 mgt2">
            请您再次确认：
            您已充分了解该服务提供方将为您提供的相关服务，且该服务提供方已向您充分披露、提示业务所涉相关法律法规规定、违约责任及其他风险因素。
            您已充分阅读附件一《数据采集项》相关内容，知晓并授权我司采集您的相关数据。
            您已充分知晓、理解并同意接受本协议明确披露的相关风险和可能产生的不利影响。
            如您确认上述内容，请点击"同意并继续"按钮，我司将按照本协议采集并向该服务提供方及/或其为您撮合的实际出借人提供您的相关信息。
          </div>


          <div class="agree_btn_box">
            <div class="agree_no" @click="agreeClick(1)">
              不同意
            </div>
            <div class="agree_yes" @click="agreeClick(2)">
              同意
            </div>
          </div>
        </div>

      </div>

    </div>
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
        nextIndex: 0,
        fkisOk: false,
        listData: {
          list: {productQuota: '', productQuotaMax: '', serviceCost: '', limitMoney: ''},
          bankCard: {bankName: ''}
        },
        clickTag: true,
        autoConfigList: [],
        isShowAgreeContent: false, //弹窗显示
        isAgree: localStorage.isAgree, //是否同意协议
      }
    },
    created() {
      this.getProductListC();
      this.appAutoConfiglist();
      this.getMoxieConfig();
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

      this.getUserInfo();
      window.refreshUserInfo = this.refreshUserInfo;
      window.telPermissionsOk = this.telPermissionsOk;
      this.getAuth();

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
      getAuth(){
        if (!Utils.isEmpty(localStorage.userMes)) {
          this.appAutoConfiglist();
          this.getProductListC();
          let second = 10;
          const timer = setInterval(() => {
            second--;
            if (second) {
              this.appAutoConfiglist();

            } else {
              this.appAutoConfiglist();
              clearInterval(timer);

            }
          }, 3000);
        }
      },
      showAuthDialog(){
        //成功
        const toast = Toast.loading({
          mask: true,
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '正在上传认证请稍等'
        });

        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `正在上传认证请稍等`;
          } else {
            clearInterval(timer);
            Toast.clear();


          }
        }, 1000);
      },
      refreshUserInfo() {
        this.getUserInfo();
        this.getAuth();
        this.showAuthDialog();
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
      mslqClick() {
        this.$router.push('mslq');
      },
      //获取运营商appkey
      getMoxieConfig() {
        let params1 = {
          jsonObject: {}
        };
        console.log(JSON.stringify(params1))
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestMoxie(params1, '/config/getConfig').then((response) => {


          console.log(JSON.stringify(response.data.t))
          localStorage.apiKey = response.data.t.apiKey;
          localStorage.backUrl = response.data.t.backUrl;
          localStorage.riskUserKey = response.data.t.riskUserKey;

        }).catch((error) => {
          localStorage.apiKey = "";
        })
      },
      rzTabClick(item, index) {

        if (!localStorage.isAgree || localStorage.isAgree == 'false') {
          this.isShowAgreeContent = true;
          return;
        }

        if (!this.clickTag) {
          return;
        }
        this.clickTag = false;
        setTimeout(() => {
          this.clickTag = true;
        }, 5000);


        // 不是必填
        if (item.isNeed != 1) {
          if (item.isPass == 1) {
            // 1已认证
            // Toast('您已经完成' + item.autoName.substring(2, item.autoName.length) + '了')
            Toast('您已经完成' + item.autoName)
            return;
          }
          if (item.isPass == 2) {
            // 2认证中
            Toast('认证审核中，请耐心等待1-3分钟')
            return;
          }
          if (item.itemId == 1) {
            this.$router.push('srrz');

          } else if (item.itemId == 2) {
            this.thirdExpenseBillCheck();
          } else if (item.itemId == 3) {

            this.$router.push('grxx');

          } else if (item.itemId == 4) {

            localStorage.rzType = "1";
            if (Utils.isEmpty(this.userInfo.userId) || Utils.isEmpty(this.userInfo.idCard) || Utils.isEmpty(this.userInfo.trueName) || Utils.isEmpty(this.userInfo.telphone)) {
              this.getUserInfo2(2);
            } else {
              window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey + "_" + this.userInfo.idCard + "_" + this.userInfo.trueName + "&idcard=" + this.userInfo.idCard + "&name=" + this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=" + localStorage.backUrl + "&themeColor%3De53c2";
              // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey+"_"+this.userInfo.idCard +"_"+this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor=e53c2f";

            }
          } else if (item.itemId == 5) {

            localStorage.rzType = "2";
            if (Utils.isEmpty(this.userInfo.userId) || Utils.isEmpty(this.userInfo.idCard) || Utils.isEmpty(this.userInfo.trueName) || Utils.isEmpty(this.userInfo.telphone)) {
              this.getUserInfo2(2);
            } else {
              window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/taobao?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey + "_" + this.userInfo.idCard + "_" + this.userInfo.trueName + "&idcard=" + this.userInfo.idCard + "&name=" + this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=" + localStorage.backUrl + "&themeColor%3De53c2";
              // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/taobao?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey+"_"+this.userInfo.idCard +"_"+this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor%3De53c2f&pushname=alipay&_k=ow6xgh";

            }
          } else if (item.itemId == 6) {
            this.$router.push('bdyhk');
          }
        } else {
          //必填
          var indexAuth = 0;

          for (let i = 0; i < this.autoConfigList.length; i++) {
            // 是否可认证下一项 0:不可以 1:可以 && 是认证中
            if (this.autoConfigList[i].isAuthenticating == 0 && this.autoConfigList[i].isPass == 2) {
              indexAuth = i;
              break;
            }
          }

          if (indexAuth > 0 && index >= indexAuth) {
            Toast('认证审核中，请耐心等待1-3分钟')
            return;
          }

          if (item.isPass == 1) {
            // 1已认证
            // Toast('您已经完成' + item.autoName.substring(2, item.autoName.length) + '了')
            Toast('您已经完成' + item.autoName)
            return;
          }
          if (item.isPass == 2) {
            // 2认证中
            Toast('认证审核中，请耐心等待1-3分钟')
            return;
          }
          if (item.isPass == 0 || item.isPass == -1 || item.isPass == -2) {
            // 0未认证 -1认证失败 -2认证失效
            if (index > 0) {
              for (let i = 0; i < this.autoConfigList.length; i++) {
                if (index > i) {
                  if ((this.autoConfigList[i].isPass == 0 || this.autoConfigList[i].isPass == -1 || this.autoConfigList[i].isPass == -2) && this.autoConfigList[i].isNeed == 1) {
                    Toast('请您先完成' + this.autoConfigList[i].autoName);
                    return;
                  }
                }
              }

            }

            if (item.itemId == 1) {
              this.$router.push('srrz');

            } else if (item.itemId == 2) {
              this.thirdExpenseBillCheck();
            } else if (item.itemId == 3) {

              this.$router.push('grxx');

            } else if (item.itemId == 4) {

              localStorage.rzType = "1";
              if (Utils.isEmpty(this.userInfo.userId) || Utils.isEmpty(this.userInfo.idCard) || Utils.isEmpty(this.userInfo.trueName) || Utils.isEmpty(this.userInfo.telphone)) {
                this.getUserInfo2(2);
              } else {
                window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey + "_" + this.userInfo.idCard + "_" + this.userInfo.trueName + "&idcard=" + this.userInfo.idCard + "&name=" + this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=" + localStorage.backUrl + "&themeColor%3De53c2";
                // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey+"_"+this.userInfo.idCard +"_"+this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor=e53c2f";

              }
            } else if (item.itemId == 5) {

              localStorage.rzType = "2";
              if (Utils.isEmpty(this.userInfo.userId) || Utils.isEmpty(this.userInfo.idCard) || Utils.isEmpty(this.userInfo.trueName) || Utils.isEmpty(this.userInfo.telphone)) {
                this.getUserInfo2(2);
              } else {
                window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/taobao?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey + "_" + this.userInfo.idCard + "_" + this.userInfo.trueName + "&idcard=" + this.userInfo.idCard + "&name=" + this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=" + localStorage.backUrl + "&themeColor%3De53c2";
                // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/taobao?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey+"_"+this.userInfo.idCard +"_"+this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor%3De53c2f&pushname=alipay&_k=ow6xgh";

              }
            } else if (item.itemId == 6) {
              this.$router.push('bdyhk');
            }
          }
        }
      },

      inTabClick() {

        if (!localStorage.isAgree || localStorage.isAgree == 'false') {
          this.isShowAgreeContent = true;
          return;
        }

        if (!this.clickTag) {
          return;
        }
        this.clickTag = false;
        setTimeout(() => {
          this.clickTag = true;
        }, 5000);

        //必填
        var indexAuth = 0;

        for (let i = 0; i < this.autoConfigList.length; i++) {
          // 是否可认证下一项 0:不可以 1:可以 && 是认证中
          if (this.autoConfigList[i].isAuthenticating == 0 && this.autoConfigList[i].isPass == 2) {
            indexAuth = i;
            break;
          }
        }

        if (indexAuth > 0 && this.nextIndex >= indexAuth) {
          Toast('认证审核中，请耐心等待1-3分钟')
          return;
        }


        if (this.validateIndex == 1) {
          if (this.autoConfigList[0].isPass == 2) {
            Toast('实名认证审核中，请耐心等待1-3分钟')
            return;
          }
          this.$router.push('srrz');

        } else if (this.validateIndex == 2) {
          if (this.autoConfigList[1].isPass == 2) {
            Toast('人脸识别认证审核中，请耐心等待1-3分钟')
            return;
          }
          this.thirdExpenseBillCheck();
        } else if (this.validateIndex == 3) {
          if (this.autoConfigList[2].isPass == 2) {
            Toast('个人信息认证审核中，请耐心等待1-3分钟')
            return;
          }
          this.$router.push('grxx');
        } else if (this.validateIndex == 4) {

          if (this.autoConfigList[3].isPass == 2) {
            Toast('运营商认证审核中，请耐心等待1-3分钟')
            return;
          }
          localStorage.rzType = "1";
          if (Utils.isEmpty(this.userInfo.userId) || Utils.isEmpty(this.userInfo.idCard) || Utils.isEmpty(this.userInfo.trueName) || Utils.isEmpty(this.userInfo.telphone)) {
            this.getUserInfo2(1);
          } else {
            window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey + "_" + this.userInfo.idCard + "_" + this.userInfo.trueName + "&idcard=" + this.userInfo.idCard + "&name=" + this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=" + localStorage.backUrl + "&themeColor%3De53c2";
            // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey+"_"+this.userInfo.idCard +"_"+this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor=e53c2f";

          }
        } else if (this.validateIndex == 5) {
          if (this.autoConfigList[4].isPass == 2) {
            Toast('淘宝认证审核中，请耐心等待1-3分钟')
            return;
          }
          localStorage.rzType = "2";
          if (Utils.isEmpty(this.userInfo.userId) || Utils.isEmpty(this.userInfo.idCard) || Utils.isEmpty(this.userInfo.trueName) || Utils.isEmpty(this.userInfo.telphone)) {
            this.getUserInfo2(2);
          } else {
            window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/taobao?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey + "_" + this.userInfo.idCard + "_" + this.userInfo.trueName + "&idcard=" + this.userInfo.idCard + "&name=" + this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=" + localStorage.backUrl + "&themeColor%3De53c2";
            // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/taobao?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey+"_"+this.userInfo.idCard +"_"+this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor%3De53c2f&pushname=alipay&_k=ow6xgh";

          }
        } else if (this.validateIndex == 6) {
          this.$router.push('bdyhk');
        }
      },
      telPermissionsOk() {
        //获取通讯录权限成功
        // this.$router.push('grxx');
      },
      setTelList() {
        //获取通讯录权限成功
        this.$router.push('grxx');
      },

      // 第三方余额查询
      thirdExpenseBillCheck() {
        let params1 = {
          jsonObject: {
            'billType': '4'
          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestPos(params1, '/thirdExpenseBill/check').then((response) => {

          if (response.data.t == true) {
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
          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            Toast({message: error.text, position: 'center'});
          } else {
            Toast({message: error.message, position: 'center'});
          }
        });
      },
      // 获取用户信息
      getUserInfo2(type) {
        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();

        Base.requestCas(params1, '/user/info/c').then((response) => {

          if (response.data.status == 'SUCCESS') {
            localStorage['userMes'] = JSON.stringify(response.data.t.userInfo)
            this.userInfo = response.data.t.userInfo;
            if (type == 1) {
              window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey + "_" + this.userInfo.idCard + "_" + this.userInfo.trueName + "&idcard=" + this.userInfo.idCard + "&name=" + this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=" + localStorage.backUrl + "&themeColor%3De53c2";
              // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/verification?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey+"_"+this.userInfo.idCard +"_"+this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor=e53c2f";

            } else if (type == 2) {
              window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/taobao?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey + "_" + this.userInfo.idCard + "_" + this.userInfo.trueName + "&idcard=" + this.userInfo.idCard + "&name=" + this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=" + localStorage.backUrl + "&themeColor%3De53c2";
              // window.location.href = "https://api.51datakey.com/h5/importV3/index.html#/taobao?quitOnLoginDone=YES&apiKey=" + localStorage.apiKey + "&userId=" + this.userInfo.userId + "_hhsj_" + localStorage.riskUserKey+"_"+this.userInfo.idCard +"_"+this.userInfo.trueName + "&phone=" + this.userInfo.telphone + "&backUrl=http%3a%2f%2f192.168.6.37%2f%23%2foperatorResult&themeColor%3De53c2f&pushname=alipay&_k=ow6xgh";

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
            this.listData.list = response.data.t.list;
          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
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
            console.log(JSON.stringify(response.data.t.autoConfig))

            // this.autoConfigList = [{
            //   "autoConfigId": 1,
            //   "autoName": "1.实名认证",
            //   "status": 1,
            //   "sortNum": 600,
            //   "isNeed": 1,
            //   "skipUrl": null,
            //   "imgUrl": "http://cash-loan-img.oss-cn-hangzhou.aliyuncs.com/images_hmm/jihuoedu_2@3x.png",
            //   "itemId": 1,
            //   "type": 0,
            //   "createTime": 1549942423000,
            //   "isAuthenticating": 0,
            //   "nub": null,
            //   "size": null,
            //   "userId": null,
            //   "statusName": "启用",
            //   "isNeedName": "必填",
            //   "createTimeName": "2019-02-12 11:33:43",
            //   "isPass": 1
            // }, {
            //   "autoConfigId": 2,
            //   "autoName": "2.人脸识别",
            //   "status": 1,
            //   "sortNum": 500,
            //   "isNeed": 1,
            //   "skipUrl": null,
            //   "imgUrl": "http://cash-loan-img.oss-cn-hangzhou.aliyuncs.com/images_hmm/jihuoedu_3@3x.png",
            //   "itemId": 2,
            //   "type": 1,
            //   "createTime": 1549942489000,
            //   "isAuthenticating": 0,
            //   "nub": null,
            //   "size": null,
            //   "userId": null,
            //   "statusName": "启用",
            //   "isNeedName": "必填",
            //   "createTimeName": "2019-02-12 11:34:49",
            //   "isPass": 1
            // }, {
            //   "autoConfigId": 4,
            //   "autoName": "3.手机验证",
            //   "status": 1,
            //   "sortNum": 400,
            //   "isNeed": 1,
            //   "skipUrl": null,
            //   "imgUrl": "http://cash-loan-img.oss-cn-hangzhou.aliyuncs.com/images_hmm/jihuoedu_5@3x.png",
            //   "itemId": 4,
            //   "type": 0,
            //   "createTime": 1549942519000,
            //   "isAuthenticating": 0,
            //   "nub": null,
            //   "size": null,
            //   "userId": null,
            //   "statusName": "启用",
            //   "isNeedName": "必填",
            //   "createTimeName": "2019-02-12 11:35:19",
            //   "isPass": 1
            // }, {
            //   "autoConfigId": 3,
            //   "autoName": "4.个人信息",
            //   "status": 1,
            //   "sortNum": 300,
            //   "isNeed": 1,
            //   "skipUrl": null,
            //   "imgUrl": "http://cash-loan-img.oss-cn-hangzhou.aliyuncs.com/images_hmm/jihuoedu_7@3x.png",
            //   "itemId": 3,
            //   "type": 0,
            //   "createTime": 1549942505000,
            //   "isAuthenticating": 0,
            //   "nub": null,
            //   "size": null,
            //   "userId": null,
            //   "statusName": "启用",
            //   "isNeedName": "必填",
            //   "createTimeName": "2019-02-12 11:35:05",
            //   "isPass": 1
            // }, {
            //   "autoConfigId": 5,
            //   "autoName": "5.淘宝认证",
            //   "status": 1,
            //   "sortNum": 300,
            //   "isNeed": 1,
            //   "skipUrl": null,
            //   "imgUrl": "http://cash-loan-img.oss-cn-hangzhou.aliyuncs.com/images_hmm/jihuoedu_9@3x.png",
            //   "itemId": 3,
            //   "type": 0,
            //   "createTime": 1549942505000,
            //   "isAuthenticating": 0,
            //   "nub": null,
            //   "size": null,
            //   "userId": null,
            //   "statusName": "启用",
            //   "isNeedName": "必填",
            //   "createTimeName": "2019-02-12 11:35:05",
            //   "isPass": 1
            // }];
            this.autoConfigList = response.data.t.autoConfig;
            this.validateIndex = response.data.t.validateIndex;
            this.nextIndex = response.data.t.nextIndex;
            // if (response.data.t.validateIndex != -1) {
            //   this.validateIndex = response.data.t.validateIndex;
            // } else {
            //   this.validateIndex = response.data.t.validateIndex;
            // }
          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        });
      },

      agreeClick(type) {
        this.isShowAgreeContent = false;
        if (type == 1) { //不同意
          localStorage.isAgree = false;
        } else if (type == 2) { //同意
          localStorage.isAgree = true;

        }
      }
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

    background-color: #f7f7f7;
    min-height: 100vh;
    .van-nav-bar-top {
      background-color: @title_bgColor;
      position: fixed;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 1;
      /*padding-top: 0.2rem;*/
    }
    .van-nav-bar {
      /*padding-top: 0.4rem;*/
      /*height: 1.28rem;*/
      background-color: transparent;
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
    .rzPage {
      margin: 0 0.3rem;
      border-radius: 0.2rem;
      overflow: hidden;
    }
    .content {
      padding: 0.88rem 0 1.2rem;
      .cell_content {
        position: relative;
        width: 100%;
        height: 0.9rem;
        background-color: #fff;
        padding-left: 0.33rem;
        border-bottom: 0.01rem solid #F5F5F5;
      }

      .cell_img {
        width: 0.44rem;
        vertical-align: middle;
      }

      .cell_title {
        font-size: 0.3rem;
        color: #666666;
        line-height: 0.9rem;
        margin-left: 0.15rem;
        vertical-align: middle;
      }

      .cell_right_img {
        width: 0.16rem;
        height: 0.28rem;
        position: absolute;
        right: 0.3rem;
        vertical-align: middle;
      }

      .cell_title_status {
        font-size: 0.28rem;
        height: 0.28rem;
        position: absolute;
        right: 0.6rem;
        top: 0.24rem;
      }
      .cell_title_status1 {
        color: #ff4545;
      }
      .cell_title_status2 {
        color: #999999;
      }
      .cell_title_status3 {
        color: #ff9a4c;
      }

      .cell_title_status4 {
        color: rgb(78, 126, 247);
      }

      .middel_gap_img {
        top: 0.3rem;
      }
      .tv7 {
        border-bottom: 1px solid #e2e2e2;
        .tv8 {
          position: relative;
          overflow: hidden;
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
          }

        }
      }
      .jhed_bg_top {
        /*background: #ff7825;*/
        margin-top: 0.2rem;
        position: relative;
      }
      .list-block {
        background: @theme_bgColor;
        text-align: center;
        padding: 0.35rem 0 0.2rem 0;
        .img1 {
          width: 1rem;
        }
      }
      .tv1 {
        position: relative;
        margin: 0 0.3rem;
        height: 2.4rem;
        text-align: center;
        padding-top: 0.6rem;
        font-weight: bold;
        font-size: 0.38rem;
        color: #463f17;
        background: url("../../assets/bg@3x.png") 50% 50% no-repeat;
        background-size: 100%;
        & > p {
          margin-bottom: 0.1rem;
        }
      }
      .tv13 {
        text-align: center;
        font-size: 0.32rem;
        color: #333;
        padding-bottom: 0.05rem;
      }
      .tv11 {
        text-align: center;
        font-size: 0.32rem;
        color: #333;
        padding-bottom: 0.42rem;
        margin-bottom: 0.2rem;
        .tv12 {
          color: #fff600;
          font-weight: bold;
          font-size: 0.42rem;
        }
      }
      .tv2 {
        text-align: center;
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.23rem;
        color: #333;
      }
      .tv3 {
        background: #f7f7f7;
        height: 0.2rem;
      }
      .jhcd {
        height: 0.9rem;
        line-height: 0.9rem;
        margin-top: 0.9rem;
        color: #FFFFFF;
        font-size: 0.32rem;
        text-align: center;
        & > div {
          .theme_buttom()
        }
      }
    }
    .page_btn {
      /*background: white;*/
      .magt {
        width: 2.45rem;
        height: 1.91rem;
        margin: 0.1rem auto;
        border-radius: 0.2rem;
      }
      .page_btn_item {
        text-align: center;
        background: #fff;
        position: relative;
        .page_btn_content {
          text-align: center;
          position: absolute;
          top: 50%;
          width: 100%;
          transform: translateY(-40%);
          .page_btn_icon {
            width: 0.7rem;
          }
          .icon_status {
            width: 0.96rem;
          }
          .page_btn_title {
            padding: 0;
            font-size: 0.30rem;
            color: #333
          }

        }
        .status {
          position: absolute;
          right: 0.1rem;
          top: 0;
          transform: translateY(-100%);
          .icon_status {
            margin-left: -6px;
          }
          .icon_status2 {
            margin-left: -12px;
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
      padding-top: 0.2rem;
      bottom: 0;
      padding-bottom: 0.2rem;
      color: #999999;
      font-size: 0.24rem;
    }
    .agree_box {
      position: fixed;
      left: 0;
      top: 0;
      /*opacity:.5;*/
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 998;
      /*pointer-events: none; //不能操作*/
      padding: 0.3rem;

      .agree_content {
        position: relative;
        margin-top: 0.8rem;
        background: #fff;
        border-radius: 10px;

      }
      .agree_title {
        border-radius: 10px 10px 0 0;
        border-bottom: #e1e1e1 solid 1px;
        background: #fff;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        text-align: center;
        font-size: 0.32rem;
        font-weight: bold;
        color: #333;
        padding: 0.2rem 0;
      }
      .agree_text {
        padding: 1rem 0.2rem 1.5rem 0.2rem;
        overflow-x: scroll;
        height: 70vh;
        font-size: 0.25rem;
      }

      .agree_btn_box {
        background: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
        margin-top: 0.2rem;
        text-align: center;
        width: 100%;
        font-size: 0.32rem;
        border-radius: 0 0 10px 10px;
        border-top: #e1e1e1 solid 1px;
        display: flex;
        display: -webkit-flex;
      }

      .agree_no {
        display: inline-block;
        width: 50%;
        height: 0.8rem;
        vertical-align: middle;
        line-height: 0.8rem;
        color: #000000;
        text-align: center;
        border-radius: 0 0 0 10px;
        font-weight: bold;
        flex: 1;
      }
      .agree_yes {
        display: inline-block;
        width: 50%;
        vertical-align: middle;
        height: 0.8rem;
        line-height: 0.8rem;
        background: @theme_bgColor;
        color: #FFFFFF;
        text-align: center;
        border-radius: 0 0 10px 0;
        font-weight: bold;
        flex: 1;
      }
      .title1 {
        text-indent: 2em;
        line-height: 0.4rem;
        font-size: 0.28rem
      }
      .mgt2 {
        margin-top: 0.2rem;
      }
    }
  }
</style>

<style scoped>

</style>
