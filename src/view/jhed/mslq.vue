<!--激活额度-马上领钱-->
<template>
  <div class="mslq">
    <div class="mslq1" v-show="!isShowContract">
      <div class="van-nav-bar-top">
        <van-nav-bar
          :title="titleName"
          :left-arrow="leftArrow"
          @click-left="back"
          @click-right="">
        </van-nav-bar>
      </div>
      <div class="content">


        <div class="content_top">

          <div class="tv1">您最高可借款<span class="tv2">{{listData.list.limitMoney}}</span>元</div>
        </div>
        <div class="tv3"></div>
        <div class="content_tv">
          <div class="tv7">
            <div class="tv11">
              <div class="tv12">借款金额</div>
              <!--<input class="tv133" type="tel" v-model="listData.list.productQuota" placeholder="请输入您的借款金额"-->
              <!--@change="dzjeChange"/>-->
              <input class="tv133" readonly unselectable="on" disabled="disabled" v-model="listData.list.limitMoney"/>
              <span class="yuan">元</span>
            </div>
          </div>
          <div class="tv7">
            <div class="tv11">
              <div class="tv12">利息费</div>
              <input class="tv133" readonly unselectable="on" disabled="disabled" v-model="listData.list.serviceCostName"/><span
              class="yuan">元</span>
            </div>
          </div>
          <div class="tv7">
            <div class="tv11">
              <div class="tv12">到账金额</div>
              <input class="tv133" readonly unselectable="on" disabled="disabled"
                     v-model="listData.list.accountMoneyName"/><span class="yuan">元</span>
            </div>
          </div>
          <div class="tv7">
            <div class="tv11">
              <div class="tv12">还款时间</div>
              <input class="tv13" readonly unselectable="on" disabled="disabled"
                     v-model="listData.list.repaymentTimeName"/>
            </div>
          </div>
          <div class="tv7" v-show="userInfo.successCount>0">
            <div class="tv11">
              <div class="tv12">到账银行</div>
              <input class="tv13" readonly unselectable="on" disabled="disabled" v-model="bankName"/>
            </div>
          </div>
          <div class="tv7" v-show="userInfo.successCount>0">
            <div class="tv11">
              <div class="tv12">银行卡尾号</div>
              <input class="tv1333" readonly unselectable="on" disabled="disabled" v-model="card"/>
              <span class="gg" @click="goBdyhk">更换银行卡</span>
            </div>
          </div>

        </div>


        <div class="jhcd">
          <div @click="showContract">
            提交
          </div>
        </div>
      </div>
      <div class="tv4">本平台使用银行级数据加密，承诺不会泄露用户数据</div>
    </div>
    <div class="mslq2" v-show="isShowContract">
      <div class="content">
        <h3>个 人 消 费</h3>
        <h3>借</h3>
        <h3>款</h3>
        <h3>合</h3>
        <h3>同</h3>
        <p style="margin-top: 100px">甲方（贷款人）：<span style="border-bottom: 1px solid;">江西赣江新区多来点网络小额贷款有限公司</span></p>
        <p>乙方（借款人）：<span style="border-bottom: 1px solid;">{{userInfo.trueName}}</span></p>
        <!--<p style="margin-bottom: 40px">身份证号：{{userInfo.idCard}}</p>-->

        <div class="line"></div>
        <h3>个人消费借款合同</h3>
        <p style="text-align: right;">合同编号：YDT-JX2019033100514542</p>

        <p style="margin-top: 40px"> 贷款人（甲方）：<span style="border-bottom: 1px solid;">江西赣江新区多来点网络小额贷款有限公司</span></p>
        <p> 借款人（乙方）：<span style="border-bottom: 1px solid;">{{userInfo.trueName}}</span></p>
        <p> 住所地：<span style="border-bottom: 1px solid;">{{userInfo.address}}</span></p>
        <p> 身份证号码：<span style="border-bottom: 1px solid;">{{userInfo.idCard}}</span></p>
        <p> 联系电话：<span style="border-bottom: 1px solid;">{{userInfo.telphone}}</span></p>
        <!--<p> 邮政编码：<span style="border-bottom: 1px solid;">{{userInfo.telphone}}</span></p>-->


        <p class="title">鉴于：</p>
        <p class="item">1. 江西赣江新区多来点网络小额贷款有限公司（“贷款人”）为依法成立并有效存续的小贷公司，具备小额贷款的发放资质，在金融办等相关主管部门的指导监督下发放小额贷款；</p>
        <p class="item">2. 在本合同上签名的自然人（“借款人”）为完全民事行为能力人，拟向贷款人申请小额贷款，用于个人消费事宜。</p>
        <p class="item">根据《中华人民共和国合同法》及相关法律法规、司法解释等，经甲乙双方平等协商一致签订本合同，以明确各方权利和义务。</p>

        <p class="title">第一条 借款用途 </p>
        <p class="item">1. 乙方向甲方借款，用于教育。未经甲方书面同意，乙方不得改变借款用途。</p>

        <p class="title">第二条 借款金额与期限</p>
        <p class="item">1. 借款金额为 ¥<span
          style="border-bottom: 1px solid;">{{"   "+ listData.list.accountMoneyName+"   "}}</span>到账金额<span
          style="border-bottom: 1px solid;">{{"   "+ listData.list.accountMoneyName+"   "}}</span> 元。</p>
        <p class="item">2. 借款期限7天，自<span style="border-bottom: 1px solid;">{{year}}年{{month}}月{{day}}</span>日起至{{this.getDateStr(6)}}止。贷款到期时，如借款人仍有拖欠本合同项下的任何款项，其还款义务并不因此而解除。
        </p>
        <p class="item">3. 实际借款期限、借款金额、发放日期以划款凭证记载为准。划款凭证为本合同组成部分，与本合同具有同等法律效力。</p>


        <p class="title">第三条 还款及还款方式</p>
        <p class="item">1. 乙方应向甲方偿还的贷款本金和利息，借款人应以等额本息的方式按 期 还款，每7天为一期，贷款的分期期数为（1）期
          ，每期应还款本金和利息共计人民币（<span style="border-bottom: 1px solid;">{{"   "+ listData.list.limitMoney+"   " }}</span>）元。
        </p>
        <p class="item">2. 乙方不可撤销地授权：甲方委托第三方支付机构在还款指定日从乙方指定的还款银行账户直接代收甲方贷
          款本息及其他相关费用，而无需进一步通知乙方或者得到其同意。其他相关费用包括但不限于：贷款服务费、资料及档案管理费、账户管理费、提前还款手续费、附加服务费（保险手续费、还款优惠服务费）、逾期管理费、债务追索费及往来的一切相关费用。</p>
        <p class="item">3.
          乙方每期还款日前，应将当期应还款本金、利息及应付的其他款项存入其还款银行账户（以申请表中所列的借款人个人还款账户为准，若该账户变动，借款人应及时与债权人联系进行变更），甲方委托的扣款时间不得早于每期还款到期日。如因任何原因导致本合同项下的代扣失败，乙方在本合同项下的还款义务不得因此而减免，如有必要乙方应采用其它合理方式继续清偿债务。</p>
        <p class="item">4. 乙方对甲方指定支付机构的扣款授权自本合同成立时生效，效力至乙方在本合同项下全部义务履行完毕时止。</p>

        <p class="title">第四条 还款日</p>
        <p class="item">1. 本合同项下第一期期款的还款为<span>{{this.getDateStr(6)}}</span>到期时间日；其后的每一期期款的还款日以本合同第三条第1款的“还款时间”为准。</p>


        <p class="title">第五条 贷款利率计算方式</p>
        <p class="item">1. 利息及每期贷款还款额计算方式：每日利息=贷款本金×期贷款利率÷当期天数，利息总额=贷款本金×期贷款利率×分期期数，每期贷款还款额=（贷款本金+利息总额）÷分期期数。</p>

        <p class="title">第六条 贷款发放 </p>
        <p class="item title">一 、满足下列条件时，甲方有权向乙方发放贷款：</p>
        <p class="item ">1. 本合同已经有权各方签署，且乙方根据甲方要求签署所有必要文书，提供必要证照、证明、单据等文件、资料，并完成相关手续，且前述文件、资料及相关手续持续合法有效；</p>
        <p class="item ">2. 乙方未出现任何影响或可能影响乙方偿付能力的重大不利情形；</p>
        <p class="item ">3. 乙方未出现任何违反本合同约定的情形。</p>
        <p class="item title">二、甲方将贷款划入乙方指定的以下账户：</p>
        <p class="item">户 名：<span style="border-bottom: 1px solid;">{{userInfo.trueName}}</span></p>
        <p class="item">账 号：<span style="border-bottom: 1px solid;">{{bankCard}}</span></p>
        <p class="item">开户银行：<span style="border-bottom: 1px solid;">{{bankName}}</span></p>
        <p class="item title">三、甲方在发放贷款前，发现乙方提供虚假信息与资料、签章不真实，或者有其他足以危及贷款安全的重大情形的，有权停止发放贷款。</p>


        <p class="title">第七条 提前还款</p>
        <p class="item title">一 、乙方提前还款，应同时满足下列条件：</p>
        <p class="item">1. 应在下一个还款日 1 日前电话通知甲方办理提前还款手续</p>
        <p class="item">2. 到甲方指定地点填写《提前还款协议书》或通过甲方客服电话、微信服务端等渠道申请确认（该申请确认视同《提前还款协议书》）；</p>
        <p class="item">3. 乙方在甲方处的其他所有贷款（如有）均没有任何逾期或拖欠款项；</p>


        <p class="item title">二、 提前还款金额：</p>
        <p class="item">1. 包括乙方在本合同项下尚未偿还的全部贷款本金、截至提前还款日的应付利息、滞纳金、提前还款违约金（每笔 80 元）和其他费用；</p>
        <p class="item">2. 提前还款具体金额以甲方审核获批借款人的金额为准。 </p>
        <p class="item">3. 乙方提前还款，其还款方式与本合同约定的偿还期款方式相同，但提前还款时，甲方委托的第三方代扣平台代扣可以在还款日之前发生。</p>
        <p class="item">4. 如果乙方未能于还款日前或还款日当日存入足额资金，使得提前还款未成功的，《提前还款协议书》则自动终止，借款人若需提前还款需重新向甲方申请。</p>


        <p class="title">第八条 逾期还款</p>
        <p class="item">1.
          若乙方未在本合同约定的任一还款日全额偿还应还款额，即构成逾期，乙方应立即偿还拖欠款项，并按本条规定向甲方支付滞纳金，滞纳金以当期逾期期款（指当月应还款额中未按时偿还的部分）为基数，按照每日万分之 0.08
          的比例收取，封顶100。</p>


        <p class="title">第九条 提前到期</p>
        <p class="item">乙方发生以下情形，甲方有权宣布本合同提前到期，要求借款人一次性履行本合同项下全部义务： </p>
        <p class="item title">一 、借款人出现严重逾期行为： </p>
        <p class="item">1. 某一笔期款逾期 1 天以上（含 1 天）；</p>
        <p class="item">2. 同一笔贷款中累计出现 1 期期款逾期。</p>
        <p class="item">3. 乙方做出的与本贷款有关的任何保证或陈述虚假、不真实、不完整或有歧义。</p>
        <p class="item">4. 乙方违背本合同约定的任何保证或承诺或同意。 </p>
        <p class="item">5. 乙方在与甲方或其他贷款方合同中有严重违约行为。</p>
        <p class="item">6. 甲方合理判断乙方在贷款申请时及贷款存续期间存在欺诈行为或借款人可能无能力履行本合同项下付款义务。</p>
        <p class="item">7. 乙方涉及诉讼、仲裁或其资产被扣押、查封、冻结、强制执行或被采取了具有同样效力的其他措施。</p>
        <p class="item">8. 乙方签署对履行本合同项下义务的能力有重大不利影响的合同、协议或承担具有这一影响的有关义务。</p>
        <p class="item">9. 未征得甲方书面同意,乙方擅自转让(包括出售、赠与、抵债、交换等形式)、抵押、质押或以其他方式处分其重大资产的全部或大部分以及为他人债务提供保证。</p>
        <p class="item">10. 乙方发生或可能发生影响贷款人在本合同项下权益的任何其他情形。</p>

        <p class="title">第十条 罚息</p>
        <p class="item">1. 对乙方逾期或未按合同约定用途使用借款的，从逾期或挪用之日起，就逾期或挪用部分，按本款约定的罚息利率计收罚息，直至清偿本息为止。对既逾期又挪用的贷款，按照较高的罚息利率计收罚息。</p>
        <p class="item">2. 对借款人不能按期支付的利息以及罚息，按照 等额本息 方式收取复利。</p>
        <p class="item">3. 罚息利率：逾期贷款罚息利率为本合同约定借款利率上再加收 0.05 ％，挪用贷款罚息利率为本合同约定借款利率上再加收 0.05 ％，封顶100。</p>

        <p class="title">第十一条 债权转让</p>
        <p class="item">1. 对本合同项下借款，甲方可以自由将债权转让于其他第三方，甲方进行债权转让后，乙方应按照本合同的约定向新的债权人偿还借款本息。</p>
        <p class="item">2. 乙方同意甲方进行债权转让后，甲方有权授权债权受让方向乙方发送债权转让通知；通知方式可以短信或其他适合方式向乙方进行告知。</p>
        <p class="item">3. 债权转让的范围为本借款合同未偿还的借款本金、利息、罚息、违约金、滞纳金等。</p>

        <p class="title">第十二条 贷款展期</p>
        <p class="item">1. 乙方申请展期的，应按约定还款期限提前 1
          日向甲方书面提出。甲方经审查同意展期的，双方另行签订书面协议确认；甲方不同意展期的，乙方仍按本合同约定期限履行还款义务或者承担违约责任。 </p>

        <p class="title">第十三条 声明与承诺与保证</p>
        <p class="item title">乙方声明承诺与保证</p>
        <p class="item">乙方作出如下声明和保证，且该声明和保证应视同在甲方每次按照本合同的约定向乙方提供融资时，由乙方重复做出： </p>
        <p class="item">1. 乙方为自然人，具备签订和履行本合同所需的完全民事权利能力和行为能力；签署和履行本合同系基于乙方的真实意思表示，已对其具有法律约束力。</p>
        <p class="item">2. 乙方为获得贷款所提供的所有信息完整、准确、真实并无误导性；</p>
        <p class="item">3. 乙方同意甲方根据有关监管规定，将与本合同有关的信息和乙方其他相关信息提报送小额贷款公司的监管部门、行业自律组织和监管信息系统，供监管部门使用和乙方授权查询使用。</p>
        <p class="item">4. 乙方签订和履行本合同不违反任何法律、法规、条例或任何法庭、仲裁机关或行政机关的命令、判决或决议；</p>
        <p class="item">5. 乙方不得以任何形式涉及任何未决的、进行中的或有危险发生的法律行动、索赔、起诉、仲裁或行政程序等可能影响本合同履行的事件。</p>
        <p class="item">6. 乙方同意并授权甲方根据有关法律法规、监管规定，将与本合同有关的信息和乙方其他相关信息提供给中
          国人民银行征信系统和其他依法设立的信用信息数据库。甲方有权为本合同订立和履行之目的，通过中国人民银行征信系统和其他依法设立的信用信息数据库查询乙方的相关信息（其他个人相关信息包括但不限于个人的收入
          、存款、有价证券、不动产的信息和纳税数额信息。），乙方知晓甲方查询、共享该信息对乙方可能产生的不利后果，并承诺自行承担。</p>
        <p class="item">7. 乙方个人资产、经济状况等发生实质性变化或发生任何影响本合同义务履行的实现时，应立即书面通知甲方，借款人参与可能影响其履行本合同项下义务的活动之前应经贷款人的书面同意。</p>
        <p class="item">8. 未经甲方的书面同意、乙方不得将本合同或其他相关文件下的权利和义务转让给任何第三方。本合同对乙方的任何受让者、继承者继续有效。</p>
        <p class="item">9. 乙方同意甲方或其授权第三方利用借款人向甲方提供的资料进行数据处理和风险管理。</p>
        <p class="item">10.
          若乙方发生违约，借款人同意甲方或其授权的任何第三方有权以上门、电话、短信或网络等其他方式向借款人发出提示。在进行催收和追索债务等工作时，可将乙方有关数据提供与相应单位和个人，因催收和追索债务产生的费用均由乙方承担。</p>
        <p class="item">11. 因乙方过错导致本合同出现效力瑕疵，给甲方造成损失的，乙方应赔偿贷款人因此遭受的损失。</p>
        <p class="item">12. 乙方在其发生死亡、失踪、被监禁、丧失民事行为能力等情况时，其财产共有人、财产代管人、合法财产继承人、受遗赠人将代其继续履行本合同。</p>
        <p class="item">13.
          乙方承诺按本合同的用途使用贷款，并承认本合同所产生的借贷关系和其因使用贷款进行消费而与第三方产生的买卖关系属于完全不同的法律关系，因此不得以在消费行为中与第三方产生的纠纷（包括不限于产品质量
          及售后服务纠纷）为由拒绝履行本合同。</p>
        <p class="item">14.
          乙方在此保证，将按照本合同约定的借款用途使用借款，并按本合同约定的还款、付息时间按期归还借款本息；如违反本合同约定时，甲方除依法追究乙方违约责任外，有权将乙方的违约行为录入行业监管系统和征信系统。</p>
        <p class="item">15. 乙方在此保证，其住址、或联系地址、联系电话等信息发生变更后，自该变更发生之日书面通知甲方。</p>
        <p class="item">16. 乙方保证其为签署、履行本合同所需的所有手续均已合法办理完毕并有效。</p>
        <p class="item">17. 乙方在贷款发放后因使用该贷款资金与他人发生的任何纠纷，均与甲方无关，本借款合同正常履行。</p>
        <p class="item">18. 乙方当在获悉其卷入或可能卷入任何可能对其产生不利影响的经济、民事、刑事、行政诉讼程序或类似仲
          裁程序之日，或在获悉其任何重要资产涉及任何强制执行、查封、扣押、冻结、留置、监管或其他具有同等效力
          的措施之日，立即通知甲方并详细说明所构成的影响及已采取或计划采取的补救措施，并于获悉该事件发生之日
          起三个工作日内将书面通知、证明和说明文件原件（法人和其他组织须加盖公章，自然人须经签署）送达甲方。</p>
        <p class="item">19. 乙方承诺不违反本合同约定的正常偿还次序而对其他贷款予以优先清偿，且现在和将来不签署任何致使本合同项下的贷款处于从属地位的合同。</p>
        <p class="item">20. 签署对乙方履行本合同项下义务的能力有不利影响的合同/协议或承担具有这一影响的有关义务。</p>
        <p class="item">21. 乙方随时通知甲方任何可能影响其履行本合同及与本合同相关的任何文件项下义务的能力的事件。</p>

        <p class="title">第十四条 收费的变更</p>
        <p class="item">1. 在所适用的法律和法规允许的范围内，甲方有权通知乙方按照本合同约定条款变更向甲方应支付的滞纳金等
          的金额、费率、种类和计算基础。在不影响前述规定的基础上，该等变更应自甲方规定的日期开始生效。可根据
          甲方认为合适的方式借记该等经变更的费用和收费至借款人的账户和要求乙方根据付款要求支付该等经变更的费
          用和收费。</p>

        <p class="title">第十五条 甲方违约责任</p>
        <p class="item">1. 满足本合同约定贷款发放条件，甲方无正当理由延期或者拒不发放贷款的，应赔偿乙方因此而发生的经济损失。 </p>

        <p class="title">第十六条 乙方违约责任</p>
        <p class="item">乙方因违反本合同约定，造成借款不能及时足额偿还，甲方有权采取下列一种或数种措施进行处理：</p>
        <p class="item">1. 要求借款人限期纠正其违约行为；</p>
        <p class="item">2. 单方面调整乙方的还款方式；</p>
        <p class="item">3. 单方面调整乙方的贷款支付方式；</p>
        <p class="item">4. 宣布本合同项下的乙方已提用贷款部分的本息立即部分或全部提前到期。</p>
        <p class="item">5. 要求乙方赔偿因其违约而给甲方造成的损失，包括但不限于因实现债权而导致的诉讼费、律师费、公证费、执行费等相关费用损失；</p>
        <p class="item">6. 要求乙方按照本合同的约定向甲方支付违约金及罚息、滞纳金等。</p>
        <p class="item">7. 采取法律法规允许的其他必要措施；</p>
        <p class="item">8. 其他处理方式 。</p>

        <p class="title">第十七条 争议解决</p>
        <p class="item">一、本合同适用中华人民共和国法律（基于本合同之目的，在此不包括香港、澳门特别行政区和台湾地区法律），并按其解释。有关本合同的一切争议可通过友好协商解决；协商不成的，双方当事人选择以下 2
          。方式解决，争议期间，各方仍应继续履行未涉争议的条款： </p>
        <p class="item">1. 向仲裁委员会提起仲裁；</p>
        <p class="item">2. 向有管辖权的人民法院提起诉讼。</p>
        <p class="item">二、在争议解决期间，若该争议不影响本合同其他条款的履行，则其他条款应继续履行。</p>


        <p class="title">第十八条 通知与送达</p>
        <p class="item">1. 本合同书项下任何通知或函件或法律文书（包括但不限于诉讼和仲裁文书）的送达以以电子邮件或短信方式
          发送至对方。如任何一方的联系地址、联系电话发生变更时，应在变更后的三日内以书面形式通知对方，否则另
          一方或法院或仲裁机构按本合同开头载明的联系地址邮寄通知、函件、或法律文书，即视为送达，变动方应自行
          承担相应的法律责任；</p>


        <p class="title">第十九条 权利保留</p>
        <p class="item">1. 一方若未行使本合同项下部分或全部权利，或未要求另一方履行、承担部分或全部义务、责任，并不构成该方对该权利的放弃或对该义务、责任的豁免。</p>
        <p class="item">2. 一方对另一方的任何宽容、展期或者延缓行使本合同项下的权利，均不影响其根据本合同及法律、法规而享有的任何权利，亦不视为其对该权利的放弃。</p>


        <p class="title">第二十条 其他条款</p>
        <p class="item">1. 本合同下乙方任何还款行为应于指定还款账户上进行或甲方认可的其他方式进行。该还款行为根据第三方结算机构提供的交易记录确定。</p>
        <p class="item">2. 乙方知晓并同意：贷款人有权将其在本合同项下部分或全部债权转让给其他第三方。</p>
        <p class="item">3. 若本合同的任何条款被任何司法或有权机关认定为无效或不可强制执行，该条款将被从本合同中分离出来，其余条款仍应有效。</p>
        <p class="item">4. 乙方同意，若相关法律法规和信用政策发生变化，则甲方无需提前发出书面通知，也无需得到乙方的许可，即有权修改本合同相关条款。</p>
        <p class="item">5. 乙方在本合同中对甲方的所有授权，同样适用于甲方指定的授权代理人。</p>
        <p class="item">6. 乙方在本合同中对甲方的所有授权期限自借款人在申请表上签字之日起至本笔贷款全部清偿之日止。</p>


        <p class="title">第二十一条 文本及生效</p>
        <p class="item">1. 本合同涉及的其他合同与协议均为本合同附件，为本合同的组成部分，与本合同具有同等法律效力。</p>
        <p class="item">2. 本合同一式两份，双方各持一份，每份具有同等法律效力。</p>
        <p class="item">3. 本合同生效：（1）自借款人签署后生效。（2）线上签订本合同按照线上签约规则生效。</p>
        <p class="itemtitle">甲方工作人员已提请乙方注意对本合同各条款作全面、准确的理解，并应乙方的要求作了相应的条款说明，现乙方已清楚知悉应承担的所有合同义务和责任。签约各方对本合同条款的含义认识一致。</p>

        <div style="margin-top: 40px;">
          <div>甲方：<span class="border-bottom: 1px solid;">江西赣江新区多来点网络小额贷款有限公司</span></div>
          <div>乙方：<span
            class="border-bottom: 1px solid;">{{userInfo.trueName}}</span></div>
        </div>

        <p>签约日期：{{year}} 年{{month}} 月 {{day}}日</p>

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


    <van-dialog
      v-model="show"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="cCancle">
      <!--<div class="yzm_tv11">-->
      <!--<div class="yzm_tv1">向{{userInfo.telphone}}发送验证码</div>-->
      <!--<div class="yzm_tv22">-->
      <!--<input class="yzm_tv3 mgt" type="tel" v-model="checkCode" placeholder="请输入验证码" maxlength="6"/>-->

      <!--<div class="yzm_tv13 mgt" v-show="!setTimeOut" @click="getVCode">发送验证码</div>-->
      <!--<div class="yzm_tv10 mgt" v-show="setTimeOut">重发<span class="tv12">{{(+dtime + 's')}}</span></div>-->
      <!--</div>-->
      <!--</div>-->
      <div class="yzm_tv11">
        <div class="yzm_tv1">是否确认借款？</div>
      </div>
    </van-dialog>


  </div>

</template>

<script>

  import {Cell, Col, Dialog, Icon, List, NavBar, Row, Toast} from "vant";
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
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [List.name]: List,
      [Cell.name]: Cell,
      [Row.name]: Row,
      [Col.name]: Col,
      [Toast.name]: Toast,
      [Dialog.name]: Dialog,
    },
    data() {
      return {
        leftArrow: true, // 返回箭头
        titleName: '激活额度',
        userInfo: '',
        validateIndex: 0,
        card: '',
        bankName: '',
        bankCard: '',
        listData: {
          list: {
            limitMoney: '',
            productQuota: '',
            productQuotaMax: '',
            serviceCost: '',
            accountMoneyName: '',
            serviceCostName: '',
            repaymentTimeName: ''
          }, bankCard: {bankName: '',card:''}
        },
        canGetCode: true,
        show: false,
        checkCode: '',
        verify: '',
        setTimeOut: false,
        dtime: 60,
        dzje: '',
        serviceCost: '',
        loginIp: '', //登录ip
        phoneNo: '', //设备号
        lat: '', //维度
        lon: '', //经度
        phoneStoreName: '', //手机厂商名
        phoneProName: '', //手机产品名
        phoneBrand: '', //手机品牌
        phoneModel: '', //手机型号
        phoneCpu: '', //手机主板名
        phoneName: '', //设备名
        phoneVersion: '', //系统版本
        wifiName: '', //wifi名称
        netType: '', //0:wifi 1:1G,2:2G,3:3G,4:4G,5:5G,6:6G'
        platform: '', //平台
        version: '', //版本号
        xieyi: false,
        bankData: '',
        year: '',
        month: '',
        day: '',
        isShowContract: false, //显示合同
        isAgree: false,//同意合同内容
      }
    },
    created() {
      console.log('created')
      window.setDevice = this.setDevice;
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.invoke_native("getDevice", "", "jsGetUserInfoCallBack");
      } else if (isiOS) {

        // window.webkit.messageHandlers.getDevice.postMessage()
        window.location.href = 'cashloans://getDevice';
      }


      var myDate = new Date();
      this.year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
      this.month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
      this.day = myDate.getDate();
    },
    mounted() {
      if (!Utils.isEmpty(localStorage.userMes)) {
        this.getUserInfo();
        this.getBankCardList();
      }
      var input = document.getElementsByTagName("input")
      for (var i = 0; i < input.length; i++) {
        console.log(i)

        input[i].addEventListener('blur', function () {
          window.scroll(0, 0);
        });
      }
    },
    // watch: {
    //   'listData.list.productQuota': {
    //     handler(newName, oldName) {
    //       if (parseFloat(this.listData.list.productQuota) > parseFloat(this.userInfo.limitMoney)) {
    //
    //         this.listData.list.productQuota = this.userInfo.limitMoney.toFixed(2);
    //       }
    //       if (!Utils.isEmpty(this.listData.list.productQuota) && !Utils.isEmpty(this.listData.list.serviceCostRate)) {
    //         this.serviceCost = ((parseFloat(this.listData.list.productQuota) * parseFloat(this.listData.list.serviceCostRate)) / 100).toFixed(2);
    //       } else {
    //         this.serviceCost = '0'
    //       }
    //       if (!Utils.isEmpty(this.listData.list.productQuota) && !Utils.isEmpty(this.serviceCost)) {
    //         this.dzje = (parseFloat(this.listData.list.productQuota) - parseFloat(this.serviceCost)).toFixed(2);
    //       } else {
    //         this.dzje = '0'
    //       }
    //
    //     },
    //     deep: true,
    //     immediate: true
    //
    //   },
    //
    // },
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
      setDevice(json) {
        // Toast(json);
        if (!Utils.isEmpty(json)) {
          if (ISIOS) {
            json = JSON.parse(json);
          }
          this.loginIp = json.loginIp;
          this.phoneNo = json.phoneNo;
          this.lat = json.lat;
          this.lon = json.lon;
          this.phoneStoreName = json.phoneStoreName;
          this.phoneProName = json.phoneProName;
          this.phoneBrand = json.phoneBrand;
          this.phoneModel = json.phoneModel;
          this.phoneCpu = json.phoneCpu;
          this.phoneName = json.phoneName;
          this.phoneVersion = json.phoneVersion;
          this.wifiName = json.wifiName;
          this.netType = json.netType;
          this.platform = json.platform;
          this.version = json.version;
        }
      },
      dzjeChange() {
      },
      daojishi() {
        if (this.dtime == 60) {
          this.setTimeOut = !this.setTimeOut;
        }
        this.dtime = this.dtime - 1;

        if (this.dtime > 0 && this.dtime <= 59 && this.setTimeOut) {
          setTimeout(this.daojishi, 1000);
        } else {
          this.setTimeOut = !this.setTimeOut;
          this.dtime = 60;
        }
      },
      goBdyhk() {

        this.$router.push('bdyhkUpdate')
      },
      //通过接口获取验证码
      getVCode() {

        if (this.canGetCode) {
          this.canGetCode = false;
        } else {
          return;
        }

        let params1 = {
          jsonObject: {
            "telphone": this.userInfo.telphone,
            "type": 7
          }
        };
        console.log(JSON.stringify(params1.jsonObject))
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestOther(params1, '/sms/sendCheckCode').then((response) => {
          this.canGetCode = true
          this.hideLoading();
          if (response.data.success == true) {
            Toast({message: "验证码已发送", position: 'center'});
            this.daojishi()
          } else {
            this.hideLoading(response.data.text);
          }
        }).catch((error) => {
          this.canGetCode = true;
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        })
      },
      xyClick() {
        this.xieyi = !this.xieyi;

      },
      xqxyClick() {
        this.$router.push({
          path: 'jkxy',
          query: {
            bankName: this.bankName,
            card: this.bankData.card,
            productQuota: this.listData.list.accountMoneyName,
            dzje: this.listData.list.accountMoneyName
          }
        })
      },
      cCancle() {

        this.show = false;
      },
      showContract() {

        // if (Utils.isEmpty(this.listData.list.productQuota)) {
        //   Toast('请输入借款金额')
        //   return
        // }
        // if (parseFloat(this.listData.list.productQuota) <= 0) {
        //   Toast('借款金额必须大于0')
        //   return
        // }

        //        if (!this.xieyi) {
//          Toast('请同意借款协议')
//          return
//        }


        this.isShowContract = true;

      }
      ,
      showSmsDialog() {

        this.show = true;
      },
      confirmClick() {
        this.show = true;
        if (Utils.isEmpty(this.listData.list.productId)) {
          return;
        }

        // if (Utils.isEmpty(this.checkCode)) {
        //   Toast("验证码不能为空")
        //   return;
        // }
        if (Utils.isEmpty(this.listData.list.accountMoneyName)) {
          Toast("借款金额不能为空")
          return;
        }

        if (this.canGetCode) {
          this.canGetCode = false;
        } else {
          return;
        }
        let params1 = {
          jsonObject: {
            productId: this.listData.list.productId,
            // checkCode: this.checkCode,
            loanMoney: this.listData.list.accountMoneyName,
            lat: this.lat, //维度
            lon: this.lon, //经度
            phoneStoreName: this.phoneStoreName, //手机厂商名
            phoneProName: this.phoneProName, //手机产品名
            phoneBrand: this.phoneBrand, //手机品牌
            phoneModel: this.phoneModel, //手机型号
            phoneCpu: this.phoneCpu, //手机主板名
            phoneName: this.phoneName, //设备名
            phoneVersion: this.phoneVersion, //系统版本
            wifiName: this.wifiName, //wifi名称
            netType: this.netType, //0:wifi 1:1G,2:2G,3:3G,4:4G,5:5G,6:6G'
            platform: this.platform, //平台
            version: this.version, //版本号
          }
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestPos(params1, '/order/add').then((response) => {
          this.canGetCode = true;
          this.show = false;
          this.hideLoading(response.data.text);
          if (response.data.status == 'SUCCESS') {
            this.$router.push('mslqResult')
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
      // 获取贷款商品
      getProductListC() {

        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestPos(params1, '/product/list/c').then((response) => {
          this.hideLoading();
          if (response.data.status == 'SUCCESS') {

            // for (let i = 0; i < response.data.t.list.length; i++) {
            //   if (parseFloat(response.data.t.list[i].limitMoney) == parseFloat( userInfo.limitMoney)) {
            //     this.listData.list = response.data.t.list[i];
            //     break;
            //   }
            //
            // }
            this.listData.list = response.data.t.list;
            this.listData.bankCard = response.data.t.bankCard;
            // if (Utils.isEmpty(this.listData.bankCard.card)) {
            //   this.card = this.listData.bankCard.card.substring(this.listData.bankCard.card.length - 4, this.listData.bankCard.card.length)
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
            this.getProductListC();
          }
        }).catch(error => {
          if (!Utils.isEmpty(error.text)) {
            Toast({message: error.text, position: 'center'});
          } else {
            Toast({message: error.message, position: 'center'});
          }
        });
      },
      //获取银行卡信息
      getBankCardList() {
        let params1 = {
          jsonObject: {}
        };
        params1.jsonObject = Utils.encrypt(Utils.encrypt(JSON.stringify(params1.jsonObject)));
        params1.keyParams = Base.getKeyParams();
        this.showLoading();

        Base.requestCas(params1, '/bankCard/list').then((response) => {
          if (response.data.status == 'SUCCESS') {
            this.hideLoading();
            if (response.data.t.list.length > 0) {
              this.bankData = response.data.t.list[0];
              this.bankName = response.data.t.list[0].bankName;
              this.bankCard = response.data.t.list[0].card;
              this.card = response.data.t.list[0].card.substring(response.data.t.list[0].card.length - 4, response.data.t.list[0].card.length)

            } else {

            }

          } else {

            this.hideLoading(response.data.text);
          }
        }).catch((error) => {
          if (!Utils.isEmpty(error.text)) {
            this.hideLoading(error.text);
          } else {
            this.hideLoading(error.message);
          }
        })
      },

      agreeClick(type) {

        if (type == 1) { //不同意
          this.isShowContract = false;

        } else if (type == 2) { //同意

          this.showSmsDialog()
        }
      },
      getDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);   //获取AddDayCount天后的日期
        var year = dd.getFullYear();
        var mon = dd.getMonth() + 1;                             //获取当前月份的日期
        var day = dd.getDate();
        return year + '年' + (mon < 10 ? ('0' + mon) : mon) + '月' + (day < 10 ? ('0' + day) : day) + '日';
      }
    },

  }
</script>


<style lang="less">
  @import "../../common/base.less";
  @import "../../reset.less";

  /*@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {*/
  /*.mslq {*/
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

  .mslq {
    .mslq1 {
      background-color: #f5f5f5;
      min-height: 100vh;
      .van-nav-bar-top {
        background-color: @title_bgColor;
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

      .content {
        padding: 0.88rem 0 1.2rem;
        .list-block {
          background: #FFFFFF;
          text-align: center;
          padding: 0.36rem 0 0.2rem 0;
          .img1 {
            width: 1rem;
          }
        }
        .content_top {
          position: relative;
          margin-top: 0.4rem;
          width: 100%;
        }
        .tv1 {
          position: relative;
          margin: 0 0.3rem;
          height: 2.4rem;
          text-align: center;
          padding-top: 0.8rem;
          font-weight: bold;
          font-size: 0.38rem;
          color: #463f17;
          background: url("../../assets/bg@3x.png") 50% 50% no-repeat;
          background-size: 100%;
        }
        .tv2 {
          color: #fff;
          font-weight: bold;
          font-size: 0.46rem;
        }
        .tv3 {
          background: #f7f7f7;
          height: 0.4rem;
        }
        .jhcd {
          margin-top: 0.9rem;
          text-align: center;
          & > div {
            .theme_buttom()
          }
        }
        .content_tv {
          background: #fff;
          margin: 0 0.3rem;
          border-radius: 0.2rem;
          overflow: hidden;
        }
        .tv7:not(:last-child) {
          border-bottom: 1px solid #ededed;
        }
        .tv7 {
          .tv11 {
            position: relative;
            .tv12 {
              width: 2rem;
              display: inline-block;
              position: relative;
              left: 0;
              color: #999999;
              font-size: 0.30rem;
              margin: 0 0.3rem;

            }
            .tv13 {
              background: white;
              width: calc(100% - 3rem);
              display: inline-block;
              height: 0.75rem;
              border-width: 0;
              padding: 0.4rem 0;
              color: #333333;
              font-size: 0.30rem;;
              text-align: right;
            }
            .tv1333 {
              background: white;
              display: inline-block;
              width: calc(100% - 4.8rem);
              height: 0.75rem;
              border-width: 0;
              padding: 0.4rem 0;
              color: #333333;
              font-size: 0.30rem;;
              margin-right: 0.14rem;
              text-align: right;
            }
            .tv133 {
              background: white;
              width: calc(100% - 3.3rem);
              display: inline-block;
              height: 0.75rem;
              border-width: 0;
              padding: 0.4rem 0;
              color: #333333;
              font-size: 0.30rem;;
              text-align: right;
            }
            .yuan {
              font-size: 0.30rem;;
            }
            .iv1 {
              width: 0.16rem;
              vertical-align: middle;
              line-height: 1rem;
              margin-left: 0.3rem;
            }
            .gg {
              border-radius: 0.1rem;
              padding: 0.12rem 0.25rem;
              color: #FFFFFF;
              vertical-align: 0.02rem;
              background: @theme_bgColor;
            }
          }
        }
        .tv5 {
          color: #ff9a4c;
          padding: 0.2rem;
          font-size: 0.24rem;
          display: inline-block;
          text-align: center;
          .tv6 {
            margin: 0.2rem;
            width: 0.24rem;
            text-align: center;
            vertical-align: middle;
            display: inline-block;
          }
          .tv9 {
            margin: 0.06rem 0;
            vertical-align: middle;
            display: inline-block;
            text-align: center;
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

      .yzm_tv11 {
        /*border-bottom: 1px solid #bababa;*/
        .yzm_tv1 {
          text-align: center;
        }
      }
      .yzm_tv22 {

        width: 100%;
        height: 1.25rem;
        .yzm_tv3 {
          float: left;
          width: 70%;
          height: 0.75rem;
          border-width: 0;
          font-weight: 500;
          margin-top: 1rem;
          color: #333333;
          font-size: 0.3rem;
        }
        .yzm_tv10 {
          line-height: 0.75rem;
          width: 30%;
          text-align: right;
          float: right;
          margin-top: 1rem;
          height: 0.75rem;
          font-size: 0.32rem;
          color: #333333;
        }
        .yzm_tv13 {
          line-height: 0.65rem;
          width: 30%;
          text-align: center;
          float: right;
          margin-top: 1rem;
          height: 0.65rem;
          font-size: 0.24rem;
          color: #FFFFFF;
          background: @theme_bgColor;
          border-radius: 5px;
          &:active {
            background: #ff6000;
          }

        }
        .mgt {
          margin-top: 0.5rem;
        }
        .hgt {
          height: 1.25rem;
        }
        .imgCode {
          line-height: 0.65rem;
          width: 30%;
          text-align: center;
          float: right;
          margin-top: 1rem;
          height: 0.65rem;
          font-size: 0.24rem;
          border-radius: 5px;
        }
        .tv12 {
          color: rgb(229, 60, 47);
        }
      }
      .van-dialog__content {
        padding: 0.5rem;
      }
    }
    .mslq2 {

      .content {
        padding: 0.88rem 0.2rem 2.2rem 0.2rem;
        background: #FFFFFF;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 6px;
      }
      p {
        margin: 5px 0;
      }
      h3 {
        width: 100%;
        text-align: center;
        margin: 15px 0;
      }

      .titl {
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
      }

      .small {
        font-size: 10px;
      }
      .title {
        font-weight: bold;
        margin-top: 20px
      }
      .item {
        text-indent: 2em;
      }
      .line {
        margin-top: 50px;
        margin-bottom: 50px;
        width: 100%;
        height: 1px;
        background: #666666;
      }
      .jf {
        width: 50%;
        display: inline-block;
        margin-top: 40px;
        text-align: left
      }

      .agree_btn_box {
        background: #FFFFFF;
        position: fixed;
        left: 0;
        bottom: 0;
        text-align: center;
        width: 100%;
        font-size: 0.32rem;
        border-top: #e1e1e1 solid 1px;
        font-weight: bold;
        display: flex;
        display: -webkit-flex;
        .agree_no {
          display: inline-block;
          width: 50%;
          height: 0.9rem;
          line-height: 0.9rem;
          text-align: center;
          margin-right: 0.2rem;
          vertical-align: middle;
          color: #000000;
          flex: 1;
        }
        .agree_yes {
          display: inline-block;
          width: 50%;
          height: 0.9rem;
          vertical-align: middle;
          color: #FFFFFF;
          line-height: 0.9rem;
          background: @theme_bgColor;
          margin-left: 0.2rem;
          text-align: center;
          flex: 1;
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

    .yzm_tv11 {
      border-bottom: 1px solid #bababa;
      z-index: 999;
      .yzm_tv1 {
        text-align: center;
        padding-top: 0.2rem;
      }
    }

    .yzm_tv22 {

      width: 100%;
      height: 1.25rem;
      .yzm_tv3 {
        float: left;
        width: 70%;
        height: 0.75rem;
        border-width: 0;
        font-weight: 500;
        margin-top: 1rem;
        color: #333333;
        font-size: 0.3rem;
      }
      .yzm_tv10 {
        line-height: 0.75rem;
        width: 30%;
        text-align: right;
        float: right;
        margin-top: 1rem;
        height: 0.75rem;
        font-size: 0.32rem;
        color: #333333;
      }
      .yzm_tv13 {
        line-height: 0.65rem;
        width: 30%;
        text-align: center;
        float: right;
        margin-top: 1rem;
        height: 0.65rem;
        font-size: 0.24rem;
        color: #FFFFFF;
        background: @theme_bgColor;
        border-radius: 5px;
        &:active {
          background: #ff6000;
        }

      }
      .mgt {
        margin-top: 0.5rem;
      }
    }

  }
</style>

<style scoped>

</style>
