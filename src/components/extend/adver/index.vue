/**
  @desc 适用于各类结果页面的广告推送
  @props {transmission：Boolean}  需请求MSMH0046接口的模块传true；默认值为false；
  @props {pageParams ：Object} 需要处理的参数  
    当transmission值为true时  
      pageParams = {
        busiType:0,                                  //业务类型  0：消费分期；1：普通财智金；2：账单分期
        money:[{billingamt:"1000",responseCode:"0000"}], //消费分期类型传此值，每一对象对应每一笔分期消费
        moneyTotal:"3000",                           //  总金额
        resultCode:"0000",                           //结果页面成功与否代码
        placeCode:"1014",                            //位置参数信息   分期奖励页面  1012-EPP分期 1013-普通财智金 1014-账单分期
        recommend_place_param:"1001",                //位置参数信息   功能结果页面
        moduleId:"cdbank_bill_instalment",           //模块名
      }
    当transmission值为false时   (根据老代码判断具体传参，不需要都传)
      pageParams = {
        bonusInstalment:'',                          //奖励内容id
        isShowBonus: false,                          //是否需要展示奖励
        bonusPoint: {
          point:'',                                  //积分值
          distance:'',                               //里程值
          placeCode : '',                            //显示位置参数   1012-EPP分期 1013-普通财智金 1014-账单分期
        }, 
        recommend_place : '',                        //0-活动结果页面，1-功能结果页面，2-分期奖励结果页面
        recommend_place_param : '',                  //位置参数 活动传活动id
        cardActive: false,                           //卡激活状态
        state:'',                                    //状态   1-成功   2-失败   0-其他
      }    
    
    
    @props {registerflag:Boolean} 标识为简易注册
    @props {registerOptions:Object} 简易注册模块传参
      registerOptions = {
          "isAdvice":true,                      
          "adviceModule":"cdbank_card_newactivate",
          "cardActive":true,
      }

          1001-普通财智金        
          1002-尊享财智金        
          1003-消费分期          
          1004-自动消费分期      
          1005-账单分期          
          1006-立即还款         
          1007-额度调整          
          1008-信用卡激活        
          1009-手机充值          
          1010-希望基金/积分捐赠 
          1011-希望基金/款项捐赠                      
          1012-EPP分期                             
          1013-普通财智金                          
          1014-账单分期                                    
          1015-发现精彩/简易注册
          1016-我的权益
          1017-银联扫码付                              

 */
<template>
  <div :class="rightShow?'right_adver':'adverList_adver'">
    <div class="adverHeader" v-if="show">
      <divider>
        <span class="recommend" v-if = '!active'>为您推荐</span> 
        <span class="recommend" v-if = 'active'>新卡尝鲜</span> 
      </divider>
    </div>
    
     <!--图片参数模板：标准模板-->
    <div class="adverList" v-if='adverShow'>
      <div @click="clickHandler(adverList)">
        <img :src="rootPath + adverList.recommend_img" alt="">
        <p>我的权益</p>
        <p>{{adverList.recommend_img_name}}</p>
      </div>           
    </div>
   <!--图片参数模板：新卡激活-->
    <div class="adverList" v-if='NewCardShow'>
      <div @click="clickNewCardHandler(NewCardList)">
        <img :src="rootPath + (NewCardList.recommend_img||NewCardList.picsAdd)" alt="">
      </div>           
    </div>
    <!-- 我的权益支持多个配置 -->
    <div class='adverGrada' v-if='rightShow' v-for="(item, index) in rightList" :key="index">
        <div @click="clickNewCardHandler(item)">
        <img :src="rootPath + (item.recommend_img||item.picsAdd)" alt="">
      </div> 
    </div>
    <!--图片参数模板：分期奖金-->  
    <div class="adverList" v-if='prize'>  
      <div @click="clickHandler(filtterList)">
        <p v-if = 'desc' >{{filtterList.tempText}}</p>
        <img :src="rootPath + filtterList.recommend_img" alt="">
      </div>           
    </div>
  </div>  
</template>

<script>
import utils from "./utils/index.js";
import { Divider } from 'vux'
import navigate from "@common/libs/navigate/index.js";
import { unzipSync } from 'zlib';
import { setTimeout } from 'timers';
let defaultOptions = {
    recommend_place : '',                        //0-活动结果页面，1-功能结果页面，2-分期奖励结果页面
    recommend_place_param : '',                  //位置参数 活动传活动id
    bonusInstalment:'', //奖励内容id
    isShowBonus: false, //是否需要展示奖励
    bonusPoint: {}, //奖励分,与奖励位置参数1012-EPP分期 1013-普通财智金 1014-账单分期
    cardActive: false, //true 推广商城的广告,默认false调用默认推荐 cdl 2017-02-22
    state:'', //状态   1-成功   2-失败   0-其他
  };
let defaultRegisterAdvice = {
    "isAdvice":true,
    "adviceModule":"cdbank_card_newactivate",
    "cardActive":true,
}
export default {
  name: "adver",
  data() {
    return {
      rootPath:globalEnv.assestRootPath,
      pageParams:{
        busiType:'',          //业务类型  0：消费分期；1：普通财智金；2：账单分期
        money:[],
        installmentAmt:'',    //交易额度下限
        resultCode:'',       //结果页面成功与否代码
      },
      adver:{},
      active:false,
      show:false,
      getCode:'',
      adverList:{},
      adverShow:false,
      NewCardList:{}, //  新卡推荐
      NewCardShow:false,
      filtterList:{},//分期奖金对象
      prize:false,       //分期奖金显示
      rightList:[],  //我的权益多个
      rightShow:false,
      pos:{},   //翻页类
      desc:false,
    };
  },
  components: {
    Divider
  },
  props: {
      pageParams: Object,
      transmission: {
        type: Boolean,
        default: false
      },
      registerOptions:Object,
      registerflag: {
        type: Boolean,
        default: false
      }

  },

  methods: {
    MSMH0046Quest() {
      App.Native.rpc({
        operationType: "com.ifp.MP2021",
        data: {
          tranCode : "MSMH0046",//接口名
          rf : "XML",//报文格式
          srcChannel : "MH",//渠道
          busiType : this.pageParams.busiType,//业务类型  0：消费分期；1：普通财智金；2：账单分期
        },
        processError: ({header,body}) => {
          this.rytAdvice({recommend_place_param:this.pageParams.recommend_place_param});
        }
      }).then(({header,body}) => { 
          let awardSearchIcoll = body.awardSearchIcoll;
          if(awardSearchIcoll.length>0) {
            if (this.pageParams.busiType ==0){    
              this.calibrate2(awardSearchIcoll);
            }else{
              this.calibrate1(awardSearchIcoll);
            }
          }else {
            this.rytAdvice({recommend_place_param:this.pageParams.recommend_place_param});
          }
      })
    },
    //  财智金与账单分期
    calibrate1(awardSearchIcoll) {
      for(let i = 0;i < awardSearchIcoll.length;i++){
        if(this.pageParams.moneyTotal*1 >= awardSearchIcoll[i].startAmount*1 && awardSearchIcoll[i].busiType == this.pageParams.busiType ){
          let bonusPoint = {
              point:awardSearchIcoll[i].awardValue.split("|")[0],
              distance:awardSearchIcoll[i].awardValue.split("|")[1],
              placeCode : this.pageParams.placeCode,//显示位置参数
          }
          let bonusInstalment = utils.sourceString(this.pageParams.moduleId);
          this.rytAdvice({
            recommend_place:'2',
            recommend_place_param:this.pageParams.placeCode,
            'bonusInstalment':bonusInstalment,
            isShowBonus:true,bonusPoint:bonusPoint
          });
          break;
        }else{
          this.rytAdvice({recommend_place_param:this.pageParams.recommend_place_param});
          break;
        }        
      }
    },
    // 消费分期
    calibrate2(awardSearchIcoll) {
        let money = this.pageParams.money;
      
        let tempNum = 0;    //符合条件的多笔分期数

        for(let i = 0;i < awardSearchIcoll.length;i++){
          if (money.length >0 ) {
            for(let j = 0;j <money.length; j++){
            let responseCode =money[j].responseCode;
              if((responseCode == "0000" || responseCode == "0020" || responseCode == "0010") && money[j].billingamt*1 >= awardSearchIcoll[i].startAmount*1){
                tempNum++;
                this.pageParams.moneyTotal = money[j].billingamt*1
              }
            }
          }else {
            tempNum =1;
          }         
          if(this.pageParams.moneyTotal*1 >= awardSearchIcoll[i].startAmount*1 && awardSearchIcoll[i].busiType == '0'){
            let bonusPoint = {
              point:awardSearchIcoll[i].awardValue.split("|")[0]*tempNum,
              distance:awardSearchIcoll[i].awardValue.split("|")[1]*tempNum,
              placeCode : this.pageParams.placeCode,//显示位置参数
            }
            let bonusInstalment = utils.sourceString(this.pageParams.moduleId);
            this.rytAdvice({
              recommend_place:'2',
              recommend_place_param:this.pageParams.placeCode,
              bonusInstalment:bonusInstalment,
              isShowBonus:true,bonusPoint:bonusPoint
              });
          }else{
            this.rytAdvice({recommend_place_param:this.pageParams.recommend_place_param});
          }
        }
 
      
    },  
    registerAdvice (options) {
      defaultRegisterAdvice = Object.assign(defaultRegisterAdvice,options);
      App.Native.rpc({
        operationType: "com.ifp.MP2002",
        data: {
          modNo:"10000000043",//模块编号
          tranCode:'MSMH0015',
          srcChannel: 'MH',
          flag:"0"
        },
        processError: ({header,body}) => {
           App.Native.toast({ content:header.errorMsg, type :none})
        }
      }).then(({header,body}) => {
        if (body.mhPicsList.length>0) {
          this.NewCardList = body.mhPicsList[0];
          this.NewCardShow =true;
          this.show = true;
        }else if(defaultRegisterAdvice.isAdvice){
          this.rytAdvice({ recommend_place_param:'1015', cardActive:defaultRegisterAdvice.cardActive })
        }
      })
    },
    rytAdvice(options) {
      this.adver = Object.assign(defaultOptions,options);   
      if (!this.adver.cardActive) {
        if (this.adver.recommend_place_param == "1016") {     //cdbank_my_grade
          this.invoke_MHYC35();
        } else {
          this.active = false;
          this.invoke_MHYC35();
        }
      } else {
         this.active = true;
        this.invoke_MHYC35();
      }
    },
    invoke_MHYC35() {
      let params = {
        tranCode : "MHYC35",
        turnPageBeginPos : this.pos.getPos(),
        turnPageShowNum : "50",
        recommend_place : this.adver.recommend_place||'1',  //0-活动结果页面，1-功能结果页面，2-分期奖励结果页面
        recommend_place_param : this.adver.recommend_place_param,  //位置参数
        recommend_backup2 :this.adver.state,        // 结果也状态
        // recommend_backup2 :'2',        // 结果也状态
      }
      App.Native.rpc({
        operationType: "com.ifp.MP2077",
        data: params,
        processError: () => {
           App.Native.toast({ content:"网络请求失败。请稍后再试。", type :none})
        }
      }).then(({header,body}) => {    
        let list = body.recommend_icoll;
        if(list.length) {
          if(this.adver.cardActive == true) {      //新卡激活模块  客户权益
              this.show = true
              this.NewCardList = list[0];
              this.NewCardShow = true;
          } else if(this.adver.recommend_place_param == '1016') {
              this.rightList = list;
              this.rightShow = true;
          }else {
            if(this.adver.isShowBonus) {        //分期奖励内容
              this.filtterByBonus(list);
            }else {
              this.show = true
              this.adverList =list[0];
              this.adverShow = true;
            }
          }
        }else {
          this.show = false
        }
      })
    },
    /**
      * @param list
      * @param code 模块代码
      * lww 分期奖金用
     */
    filtterByBonus(list) { 
      let filtterList = list[0];    
      this.filtterList = filtterList;
      
      if(filtterList.recommend_img !="") {
        this.show =true;
        this.prize =true;
      }
      // filtterList.recommend_desc = '赚大发啦！data1积分/data2里程金送给你！多办多送！快呼朋唤友一起来“薅羊毛”吧!';
      // 替换后 ：赚大发啦！8000积分/500里程金送给你！多办多送！快呼朋唤友一起来“薅羊毛”吧!
      if(filtterList.recommend_desc!="") {   
        this.desc =true;
        this.filtterList.tempText = this.filtterList.recommend_desc.replace('data1',this.adver.bonusPoint.point).replace('data2',this.adver.bonusPoint.distance);
      }
    },
    clickHandler(item) {     
      let dir = {}; 
      // let dic = `${item.recommend_id}-${item.recommend_place}-${item.recommend_place_param}-${item.recommend_backup2}`
      // dir[dic] = 1;
      App.Tracker.onEventWithoutMap('m3-wntj',dir)   //埋点 为您推荐   传参-图片ID-显示位置-位置参数-结果页状态
      let  param = {
        linkType: item.recommend_link_type||item.linkType, //图片链接类型
        picsLink: item.recommend_link_param||item.picsLink, //图片链接参数
        subPicsLink: item.recommend_link_param2||item.subPicsLink, //图片链接参数2
        subLinkType1: item.recommend_mall_type||item.subLinkType1, //链接子类型1
        subLinkType2: item.recommend_sub_link||item.subLinkType2, //链接子类型2
        picsAdd:item.recommend_img||item.picsAdd, //图片路径
        picsIsLogined: item.picsIsLogined, //是否登录
        picsIsNeedId: item.picsIsNeedId, //是否需要userId
        picsBackUp: item.picsBackUp, //链接备用
      };
      navigate(param);
    },
    clickNewCardHandler(item) {
      let dic = {};
      dic[item.recommend_id] = 1
      App.Tracker.onEventWithoutMap('m3-02wdqy12',dic)   //埋点 我的-我的权益-活动
      this.clickHandler(item)
    },
    timeFormat(date) {
      if (date.length >= 14) {
          return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8)
              + " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12, 14);
      } else if (date.length == 14) {
          return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8)
              + " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12, 14)
      }
      return date;
    },
  },
  created() {
    this.pos = new utils.Pos();
    if(this.transmission) {
      if(this.pageParams.resultCode == "0000" || this.pageParams.resultCode == "0010" || this.pageParams.resultCode == "0020"||this.pageParams.resultCode == "0"){ 
        this.MSMH0046Quest()
      }else {
         this.rytAdvice(this.pageParams)
      }
    }else if(this.registerflag) {
      this.registerAdvice(this.registerOptions)
    }else {
      this.rytAdvice(this.pageParams)
    }
  }
};
</script>

<style lang="scss" >
.adverList_adver {
  text-align: center;
  .line {
    display: inline-block;
  }
  .adverHeader {
    padding: .4rem 0 0;
    .recommend{
      font-size: $font-h4;
      color:$font-color-t2;
    }
  }
  .vux-divider {
    display: inline-table;
  }
  .vux-divider:after, 
  .vux-divider:before {
    width:1.6rem
  }
  .adverList{
    margin-top: .1rem;
    padding: 0 .3rem;
    text-align: center;
    img {
      display: inline-block;
      // width:6.9rem;
      width:100%;
      height:2.6rem;
    }
  }
}
.right_adver{
    text-align: center;
    background-color: #fff;
    .adverGrada{
      img {
        display: inline-block;
        width:100%;
        height:2.6rem;
      }
      margin-bottom: .2rem;
    }
  }
</style>

