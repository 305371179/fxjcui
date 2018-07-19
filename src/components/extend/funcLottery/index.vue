/**
@desc 功能抽奖
@props {associateData ：Object }
associateData = {
raffleFuncId: "cdbank_bill_instalment",//2018.05 以2.x版本对应模块名为准(参照2.x代码)
raffleMoney: "80", //金额
rafflePhase: "4", //期数
rafflePoint: "2", //积分,
}
*/
<template>
    <div class="lotteryBox">
        <div class="tips" v-model="tips" v-if="showTips">{{tips}}</div>
        <div class="boonContainer" v-if="showBoon">
            <div class="buttonImg" v-if="showButtonImg" :style="{background:'url('+bmg+') no-repeat'}"
                 @click="hideButtonImg">
                <!--<p>{{raffleName}}</p>-->
                <!--<v-button size='M' @clickHandler="hideButtonImg">点我刮奖</v-button>-->
            </div>
            <canvas id="canvas" v-if="showCanvas" ref="canvas"></canvas>
            <div class="mrpImgUrl" v-if="showResultImg" :style="{background:'url('+resultImage+') no-repeat'}"
                 @click="drump">
            </div>
        </div>
        <x-dialog v-model="showRedBag" :dialog-style="dialogStyle">
            <div>
                <div class="closeBtn" @click="closeRedBag"></div>
                <img src="~@/assets/prizedrawing/redbag1.png" alt="" class="redbag" @click="openRedBag"
                     v-if="!showRedBagPrize">
                <img :src="resultImage" alt="" :class="redBagPrize" @click="drump"
                     v-if="showRedBagPrize">
			    <!-- 未中奖话术
					<p v-if="showRedBagPrize" class="undrawDesc">{{undrawDesc}}</p> 
				-->
            </div>
        </x-dialog>
    </div>
</template>

<script>
	import ScratchCard from './utils/scratchCard'
	import {XDialog} from 'vux'
	import timeFormat from './utils/timeFormat'
	import {mapGetters} from 'vuex'
	import _ from 'lodash'

	let drumpType = '', dic = {};

	export default {
		name: "index",
		data() {
			return {
				rootPath: globalEnv.assestRootPath,
				backgroundImg: "",
				prizeInfo: {},
				getWidth: "",
				getHeight: "",
				raffleName: '',  //抽奖活动名称
				showBoon: false,  //刮刮乐组件
				showButtonImg: true,  //抽奖
				showCanvas: true,  //刮刮乐
				showResultImg: false,  //奖品
				isDown: false,
				showRedBag: false,   //红包组件弹框
				showRedBagPrize: false,  //红包
				tips: "",
				showTips: false,  //文字提示
				MP2028_result: {},
				resultImage: "",  //是否中奖图片
				preCanvasPic: "",
				canvasPic: "",
				dialogStyle: {
					backgroundColor: "initial"
				},
				bmg: '',
				drawDesc: '',  //是否中奖话术
				undrawDesc: '',
				btnText: '',  //是否中奖按钮文字描述
				prizeType: '',
				raffleUnDrawUrl:'',  //未中奖图片	
				redBagPrize:'redBagPrize',  //开奖样式				
			}
		},
		props: {
			associateData: {
				type: Object,
				default: false
			}
		},
		components: {
			XDialog
		},
		computed: {
			...mapGetters({loginStatus: 'loginStatus', 'userInfo': 'getUserInfo'}),
		},
		methods: {
			drump() {
				if (drumpType == "0") {
					let dic = {};
					dic[this.prizeType] = 1;
					let prizeInfo = this.prizeInfo;
					//奖品类型为免还款签账额或者积分
					let params = _.defaults({'raffleAcTType': '0'}, prizeInfo);
					App.Tracker.onEventWithoutMap('m3-gncj06', dic); //功能抽奖-获得奖品-点击领取奖品
					App.Native.pushWindow({
						url: "/prize/cdbank_my_prizedrawing/prize.html",
						param: {},
						data: params
					})
				} else if (drumpType == "1") {
					let dic = {};
					dic[this.prizeType] = 1;
					App.Tracker.onEventWithoutMap('m3-gncj05', dic); //功能抽奖-获得奖品-点击查看奖品
					App.Native.pushWindow({
						url: "/rights/cdbank_my_prizelist/index.html",
						data: {"evaluateFlag": "true"}
					});
				} else {
					//未中奖
					return;
				}
			},
			openRedBag() {
				if (this.showRedBag) {
					this.MP2029(this.MP2028_result)
				}
			},
			closeRedBag() {
				this.showRedBag = false
			},
			hideButtonImg() {
				App.Tracker.onEventWithoutMap('m3-gncj02');
				/*点击刮刮乐顶层图片*/
				this.showButtonImg = false;
				let scratchCard = new ScratchCard();
				scratchCard.init(this, () => {
					//刮完回调
					this.showCanvas = false
					this.MP2029(this.MP2028_result);
				});
				this.showResultImg = true
			},
			MP2029(MP2028_result) {
				let MP2029_Params = {
					srcChannel: "MH",
					raffleId: MP2028_result.raffleId, //2028返回值字段
					ratId: MP2028_result.ratId, //2028返回值字段
					raffleMoney: MP2028_result.raffleMoney, //金额
					rafflePhase: MP2028_result.rafflePhase, //期数
					rafflePoint: MP2028_result.rafflePoint, //积分
					flagTypes: this.userInfo.groupFlag, //加挂卡客群
					customerNameCN: this.userInfo.customerNameCN
				};
				App.Native.rpc({
					operationType: "com.ifp.MP2029",
					data: MP2029_Params,
					processError: ({errorCode, errorMsg}) => {
						if(errorCode != 0){
							App.Native.toast({
								content: '小发正在努力加载中，请稍候再试！'
							});
						}
					}
				}).then(({header, body}) => {
					let prizeType = this.prizeType
					prizeType = body.mrpType;
					let dic = {};
					dic[prizeType] = 1;
					this.showRedBagPrize = true
					if (body.resultFlag == "0") {
						App.Tracker.onEventWithoutMap('m3-gncj04', dic);
						// this.drawDesc = body.raffleDrawDesc		
						this.resultImage = this.rootPath + body.mrpPrizePic
						if (prizeType == "2" || prizeType == "4") {
							this.btnText = '领取奖品'
							this.prizeInfo = {
								activeCode: MP2028_result.raffleId,
								activeName: MP2028_result.raffleName,
								beginDate: MP2028_result.raffleStarTTime,
								endDate: MP2028_result.raffleEndTime,
								activeType: body.mrpType,
								prize_name: body.mrpName,
								prevSrcCaseId: body.rapId,
								oneMoney: body.mrpAmount,
								type: 2,
								count: 1,//2018-05-25
								mrpRelayDays: "90",//2018-05-25
								mrpBSDetails: body.mrpBSDetails	//信用卡积分入账
							}
							drumpType = "0"
						} else {
							drumpType = "1"
						}
					}else{
						App.Tracker.onEventWithoutMap('m3-gncj03');
						this.redBagPrize = 'unredBagPrize'
						this.resultImage = this.rootPath + this.raffleUnDrawUrl
						drumpType = "3"							
					}
				})
			},
			initBoon() {
				let MP2028_Params = this.associateData
				let params = {
					tranCode: 'MSMH0054',
					srcChannel: 'MH',
					raffleAcTType: '0', //抽奖类型  0-功能抽奖
					// userName:MP2028_Params.userName,
					raffleFuncId: MP2028_Params.raffleFuncId, //活动功能id
					raffleMoney: MP2028_Params.raffleMoney, //金额
					rafflePhase: MP2028_Params.rafflePhase, //期数
					rafflePoint: MP2028_Params.rafflePoint, //积分
					flagTypes: this.userInfo.groupFlag //加挂卡客群
				}
				App.Native.rpc({
					operationType: "com.ifp.MP2028",
					data: params,
					processError: ({header, body}) => {
						if (header.errorCode == "YDRR0001") {
							// App.Native.alert({
							// 	title: '提示',
							// 	message: '当前没有适合的活动',
							// 	button: '确定'
							// })
						} else if (header.errorCode == "YDRR0000") {
							// App.Native.alert({
							// 	title: '提示',
							// 	message: '活动已下架或者已过期',
							// 	button: '确定'
							// })
						}
					}
				}).then(({header, body}) => {
					this.raffleUnDrawUrl = body.raffleUnDrawUrl	
					this.undrawDesc = body.raffleUnDrawDesc
					if (body.resultFlag == "0") {  //0有活动，1无活动
						App.Tracker.onEventWithoutMap('m3-gncj01'); //功能抽奖-活动出现
						this.MP2028_result = body
						if (body.raffleType == "0") { //刮刮乐
							this.showTips = body.raffleActDesc ? true : false
							this.showBoon = true   //显示刮刮乐组件
							this.showButtonImg = true
							this.tips = body.raffleActDesc
							// this.preCanvasPic = body.rafflePreCarvePic
							this.raffleName = body.raffleName
							this.bmg = this.rootPath + body.rafflePreCarvePic
							this.canvasPic = body.raffleCarvePic
						} else if (body.raffleType == "1") { //拆红包
							this.showRedBag = true					        							
						}
					} else {
						this.showBoon = false //刮刮乐组件
						this.showButtonImg = false  //抽奖
						this.showCanvas = false  //刮刮乐
					}
				});
			}
		},
		created() {
			this.initBoon();
		}
	}
</script>

<style lang="scss" scoped>
    @import './scss/index.scss'
</style>