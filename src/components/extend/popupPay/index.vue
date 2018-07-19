/**
 * Y表示必填,N表示非必填
 * @desc - 弹出支付组件,基本使用请参数vux的 popup
 * @props {enableMicroPay: Boolean} Y - 是否允许使用小额轻松付（为避免业务场景使用不明确，该值建议明确给定，请确定当前使用场景是否允许使用小额轻松付；当为true时，total、paymentCardSequence必须要给值，自动根据订单总额及小额支付单笔、日累计限额判断是否使用小额轻松付）
 * @props {enableFingerprintPay: Boolean} Y - 是否允许使用指纹（面容）支付 （为避免业务场景使用不明确，该值建议明确给定，请确定当前使用场景是否允许使用指纹支付）
 * @props {autoFactor: Boolean} N - 是否根据价格自动判断使用单、双因子验证（当为true时：total必须要给值，mustbePassword、mustbeMessage会被忽略）
 * @props {autoClose:Boolean} N - 完成支付时是否自动隐藏支付组件
 * @props {autoShowKeyboard:Boolean} N - 切换页面时是否自动弹出键盘
 * @props {autoCheckIsSetPayPassword:Boolean} N - 是否自动判断是否设置支付密码
 * @props {autoClearInputTextIfFailure:Boolean} N - 支付失败时是否自动清空密码、验证码输入框
 * @props {backKeyHook:Boolean} N - 是否监听物理返回键及左上角返回键事件，优先询问用户是否放弃支付
 * @props {title:String} N - 付款详情页标题(若付款详情页不显示则用作身份验证页标题)
 * @props {disabled:Boolean} N - 是否禁用组件业务功能（若为true，则继续支付、确认支付、小额轻松付确认开启按钮均为置灰状态）
 * @props {goodsInfo:String} N - 订单信息
 * @props {paymentCard: String} N - 付款卡片
 * @props {paymentCardSequence: String} N - 付款卡片序列号(当enableMicroPay为true时必填)
 * @props {mustbeSelectCard: Boolean} N - 显示付款卡
 * @props {showSelectCardLink: Boolean} N - 卡片栏是否显示右箭头
 * @props {multiAddCardSuccessBtnText: String} N - 卡片加挂成功页按钮话术（如：继续支付、继续提现、完成等，根据业务逻辑决定。默认为空，由加挂成功页决定）mustbeSelectCard为true时有效
 * @props {mustbeGoodsInfo: Boolean} N - 显示订单信息
 * @props {mustbePassword: Boolean} N - 显示支付密码框
 * @props {mustbeMessage: Boolean} N - 显示短信验证码框
 * @props {showNoWithdrawPasswordTips: Boolean} N - 是否显示未设置提现密码提示
 * @props {total: String | Number} N - 订单总额
 * @props {totalText: String} N - 订单总额描述（优先显示该项，若无则根据total显示“需支付：**元”）
 * @props {discountText: String} N - 优惠信息
 * @props {priceVisible: Boolean} N - 订单总额是否可见
 * @props {tips: String} N - 密码框上方的提示话术
 * @props {btnPlain: Boolean} N - 按钮提供两种样式可选择
 * @props {btnTxt: String} N - 按钮文字
 * @props {rightBtnText: String} N - 右上角按钮文字（单、双因子验证页，为空则不显示）
 * @props {closeTips: String} N - 用户放弃（关闭组件）时提示话术
 * @props {height: String} N - 组件默认高度
 * @props {keyboardInfo: Object} N - 键盘的参数，详情请查看props.js
 * @props {encryptPassword: Boolean} N - 是否需要二次加密密码键盘给出的密文（上传到接口前需要二次加密）
 * @props {hideOnDeactivated: Boolean} N - 页面deactivated时是否隐藏弹框
 * @props {hideOnBlur: Boolean} N - 点击遮罩时是否自动关闭
 * @slot  {totalText} N - 订单总额插槽（显示优先级totalText [slot] > totalText [props] > total [props]）
 * @slot  {discountText} N - 优惠信息插槽（显示优先级discountText [slot] > discountText [props]）
 * @event {startInputPassword: Function} N - 用户开始输入密码事件
 * @event {finishInputPassword: Function} N - 用户输入密码完成事件
 * @event {startInputSmsCode: Function} N - 用户开始输入短信验证码事件
 * @event {finishInputSmsCode: Function} N - 用户输入验证码完成事件
 * @event {forgotPassword: Function} N - 用户点击忘记密码事件
 * @event {setPassword: Function} N - 用户点击设置支付密码按钮事件
 * @event {abortPayment: Function} N - 用户放弃支付事件
 * @event {on-show: Function} N - 组件显示时触发的回调函数  
 * @event {on-hide: Function} N - 组件隐藏时触发的回调函数
 * @event {notSetPayPasswordHandler: Function} N - 当未设置支付密码时触发的回调函数
 * @event {rightBtnClickHandler: Function} N - 右上角按钮点击回调函数（单、双因子验证页右上角按钮；rightBtnText不为空才有效）
 * @event {selectCardHandler: Function} N - 选择卡片时触发的回调函数
 * @event {messageCode(参数): Function} N - 点击获取短信验证码的时候触发的回调 提供了一个回调函数作为参数，用于复位短信计时器 

		用法: @messageCode="sendSms" 
		sendSms(resetSms){
			//TODO 发送短信...
			resetSms() //若发送失败则调用回调方法复位短信倒计时
		}

 * @event {clickHandler(参数): Function} N - 点击按钮的回调函数,当使用指纹（面容）支付时，参数为{type,typeName,errorMessage,data,feedBack}，详细见App.Native.fingerprintPay()；使用小额轻松付时，参数为{type,data,feedBack} 否则参数为{data:{password, smsCode}, feedBack}，data内容表示密码密文和短信验证码；feedBack封装了两个回调函数，分别处理成功和失败反馈，调用时入参为rpc方法返回值{header,body}。feedBack里的回调一定要调用，否则组件无法处理收尾工作
		可判断type是否有值从而判断当前用户使用的支付方式是否为指纹（面容）支付，用法如下：
		//verData为clickHandler回调函数的参数
		if(verData.type==='finger'){//如果为指纹（面容）支付
			Object.assign(params,verData.data)//合并指纹（面容）支付所需的接口参数到上送参数对象里
		}else if(verData.type==='microPay'){//小额轻松付
			Object.assign(params,verData.data,{
				flag:'0' //合并小额轻松付参数及特殊接口需要的字段(特殊字段视接口而定)
			})
		}else{
			Object.assign(params,verData.data) 
			//密码支付、密码+验证码支付逻辑... password ; smsCode
		}
		//TODO 这里调用支付接口完成支付
		App.Native.rpc({
			operationType: '...',
			data: params
		}).then(({header,body})=>{
			//支付成功
			verData.feedBack.success({header,body})
		},({header,body})=>{
			//支付失败
			//TODO 继续其他支付失败时的异常处理，比如弹框（视业务逻辑而定）
			App.Native.toast({
				content: header.errorMsg,
				type: 'exception'
			})
			verData.feedBack.failure({header,body})
		})

 * @example <popup-pay></popup-pay>
 * ps 组件的按钮本身会对显示的短信验证码(6位数字)及密码输入框校验(6位数字)的长度校验，不校验正确性，当校验不通过的时候按钮会被禁用
 */
   
<template>
	<div v-transfer-dom :class="className" @click.stop="hideAllKeyboard">
		<popup 
		ref="popup"
		:value="isOpen" 
		:height="height" 
		:hide-on-blur="hideOnBlur"
		:position="position"
		:show-mask="showMask"
		:hide-on-deactivated="isHideOnDeactivated"
		:popup-style="popupPayStyle"
		:class="{toLeft,isReady}"
		@on-show="popupShow"
		@on-hide="onHide"
		@transitionend.native="transitionFinish"
		>
			<transition :name="needFirstPage?'move':'nomove'">
				<!-- 订单详情页 -->
				<div class="popupPayWarp orderInfoPage" key="orderInfoPage" @touchmove.prevent v-if="!toLeft && step === 0">
					<div class="popup-pay-header">
						<i class="iconfont icon-icon_close onClose" @click="popuphide"></i>
						{{title}}
					</div>
					<div class="pay-warp notSetPwd" v-if="isNotSetPayPassword">
						<img src="~@/assets/payment_notSetPwd.png">
						<p>请设置发现精彩支付密码</p>
						<p>再进行交易</p>
						<div class="total">
							<v-button :plain="btnPlain" @clickHandler="setPayPassword">设置支付密码</v-button>
						</div>
					</div>
					<div class="pay-warp" v-else>
						<Group :top="false" :topLine="false" v-if="enableMicroPay && microPayBoxVisible && !microPaySwitchState">
							<cell :title="{desc:'小额轻松付', subDesc:'小额支付时免【支付密码】', isBreak: false,descStyle:{'font-size':'0.3rem'},subDescStyle:{'font-size':'0.26rem',color:'#f47000'}}">
								<v-inline-switch v-model="microPaySwitchState" @clickHandler="microPayClick" slot="cell-ft" :disabled="disabled || !paymentCardSequence"></v-inline-switch>
							</cell>
						</Group>
						<Group :top="microPayBoxVisible" :topLine="microPayBoxVisible" v-if="mustbeGoodsInfo || mustbeSelectCard">
							<cell :title="{desc:'订单信息',isBreak: true,descStyle:{'font-size':'0.3rem'}}" :value="{desc:goodsInfo,isBreak:false,descStyle:{'font-size':'0.3rem',color:'#222222'}}" v-if="mustbeGoodsInfo"></cell>
							<cell :isLink="showSelectCardLink" :title="{desc:'付款卡片', isBreak: false,descStyle:{'font-size':'0.3rem'}}" :value="{desc:paymentCard,descStyle:{'font-size':'0.3rem',color:'#222222'}}" v-if="mustbeSelectCard" @touchend.native="selectCard"></cell>
						</Group>
						
						<div class="setPassword" v-if="showNoWithdrawPasswordTips">
							<img src="~@/assets/paySetting/lockIcon.png">
							<p>该卡片未设置提现密码，无法进行交易</p>
							<p>请拨打客服电话 95508，设置提现密码</p>
						</div>
						<div class="total">
							<p v-if="priceVisible && !showNoWithdrawPasswordTips">
								<slot v-if="$slots.totalText" name="totalText"></slot>
								<span v-else-if="totalText!==''">{{totalText}}</span>
								<span v-else-if="total!==''">需支付：<span class="bigNum"><span class="num">{{total}}</span>元</span></span>
							</p>
							<v-button :plain="btnPlain" @clickHandler="callPhone" v-if="showNoWithdrawPasswordTips">拨打电话设置</v-button>
							<v-button :disabled="disabled" :plain="btnPlain" @clickHandler="startPay" v-else>{{btnTxt}}</v-button>
						</div>
					</div>
				</div>
				<!-- 小额轻松付开通页 -->
				<div class="popupPayWarp openMicroPayPage" key="openMicroPayPage" @touchmove.prevent v-else-if="!toLeft && step > 0 && isShowOpenMicroPay" >
					<div class="popup-pay-header">
						<i class="iconfont icon-icon_back onPrev" @click="prev" v-if="needFirstPage"></i>
						<i class="iconfont icon-icon_close onClose" @click="popuphide" v-else></i>
						小额轻松付
					</div>
					<div class="pay-warp">
						<div class="msgTips">
							<p>用于APP小额支付免支付密码</p>
							<p>当前限额: 单笔 <a>￥{{microPay.singleLimit}}</a>，每日累计 <a>￥{{microPay.totalLimit}}</a></p>
						</div>
						<Group :top="false" :topLine="false" :bottomLine="false">
							<cell-input label="支付密码" type="password" :focus="isShowKeyboard" :readonly="true" :value="password|passwordPoint" placeholder="请输入密码" ref="passwordBox" @clickHandler="showKeyboard(false)"></cell-input>
							<tiny-msg-code :isCountDown.sync="countdown" :isFocus="isShowNumKeyboard" keyboardType="native" v-model="smsCode" @sendCodeHandler="sendCodeForOpenMicroPayment" ref="smsBox" @clickHandler="showNumKeyboard(false)"></tiny-msg-code>
						</Group>
						<div class="total">
							<v-button :disabled="disable" :plain="btnPlain" @clickHandler="openMicroPay">确认开启</v-button>
						</div>
					</div>
				</div>
				<!-- 单因子验证页 -->
				<div class="popupPayWarp singleFactorPage" key="singleFactorPage" @touchmove.prevent v-else-if="!toLeft && step > 0 && isSingleFactor" >
					<div class="popup-pay-header">
						<i class="iconfont icon-icon_back onPrev" @click="prev" v-if="needFirstPage"></i>
						<i class="iconfont icon-icon_close onClose" @click="popuphide" v-else></i>
						{{verifyTitle}}
						<a class="rightBtn" @click.prevent="rightBtnClick" v-if="rightBtnText!==''">{{rightBtnText}}</a>
					</div>
					<div class="pay-warp">
						<div v-if="verifyPriceVisible" class="price">
							<p>
								<slot v-if="$slots.totalText" name="totalText"></slot>
								<span v-else-if="totalText!==''">{{totalText}}</span>
								<span v-else-if="total!==''">&yen; {{total}}</span>
							</p>
							<slot v-if="$slots.discountText" name="discountText"></slot>
							<div class="discount border" v-else-if="discountText!==''">{{discountText}}</div>
						</div>
						<div class="msg" :class="{moveDown:!verifyPriceVisible}">{{tips}}</div>
						<div class="pwd" @click.stop="showKeyboard(false)" ref="passwordBox">
							<div><div :class="{'on': password.length >= 1}"></div></div>
							<div><div :class="{'on': password.length >= 2}"></div></div>
							<div><div :class="{'on': password.length >= 3}"></div></div>
							<div><div :class="{'on': password.length >= 4}"></div></div>
							<div><div :class="{'on': password.length >= 5}"></div></div>
							<div><div :class="{'on': password.length >= 6}"></div></div>
						</div>
						<p class="forgotPassword" ref="forgotPasswordLink"><a @click.prevent="forgotPassword">忘记密码</a></p>
					</div>
				</div>
				<!-- 双因子验证页 -->
				<div class="popupPayWarp doubleFactorPage" key="doubleFactor" @touchmove.prevent v-else-if="!toLeft">
					<div class="popup-pay-header">
						<i class="iconfont icon-icon_back onPrev" @click="prev" v-if="needFirstPage"></i>
						<i class="iconfont icon-icon_close onClose" @click="popuphide" v-else></i>
						{{verifyTitle}}
						<a class="rightBtn" @click.prevent="rightBtnClick" v-if="rightBtnText!==''">{{rightBtnText}}</a>
					</div>
					<div class="pay-warp">
						<div v-if="verifyPriceVisible" class="price">
							<p>
								<slot v-if="$slots.totalText" name="totalText"></slot>
								<span v-else-if="totalText!==''">{{totalText}}</span>
								<span v-else-if="total!==''">&yen; {{total}}</span>
							</p>
							<slot v-if="$slots.discountText" name="discountText"></slot>
							<div class="discount border" v-else-if="discountText!==''">{{discountText}}</div>
						</div>
						<Group :top="false" :topLine="false" :bottomLine="false">
							<cell-input v-if="needPassword" label="支付密码" type="password" :focus="isShowKeyboard" :readonly="true" :value="password|passwordPoint" placeholder="请输入密码" ref="passwordBox" @clickHandler="showKeyboard(false)"></cell-input>
							<tiny-msg-code :isCountDown.sync="countdown" :isFocus="isShowNumKeyboard" keyboardType="native" v-model="smsCode" @sendCodeHandler="getCode" ref="smsBox" @clickHandler="showNumKeyboard(false)"></tiny-msg-code>
						</Group>
						<div class="finish">
							<p ref="forgotPasswordLink"><a @click.prevent="forgotPassword">忘记密码</a></p>
							<v-button :disabled="disable" :plain="btnPlain" @clickHandler="postFactor">{{verifyBtnText}}</v-button>
						</div>
					</div>
				</div>
			</transition>
		</popup>
	</div>
</template>
<script>
	import { Popup, TransferDom } from 'vux'
	import Group from '@comp/group'
	import Cell from '@comp/cell'
	import cellInput from '@comp/cellInput'
	import tinyMsgCode from '@comp/tinyMsgCode'
	import vInlineSwitch from '@comp/inlineSwitch'
	import props from './utils/props'
	import {getMicropaymentLimit, canUseMicropayment, isDobuleFactor, verifyPayPasswordAndSmsCode, openMicropayment, closeMicropayment} from '@common/libs/extend/serviceLogic'
	let cb = null,keyboardHeight = 380
	export default {
		name: 'popupPay',
		data (){
			return {
				toLeft: false, //控件是否向左隐藏
				isOpen: false, //是否允许显示弹框
				isReady: false, //组件是否准备就绪
				password: '', //密码
				smsCode: '', //短信验证码
				mobileNo: '', //开通小额轻松付发送短信手机号
				className: 'vux-popup-pay',
				countdown: false,//短信获取按钮倒计时状态
				boxHeight: '', //组件高度暂存
				isGoingOut: false,//是否准备跳页，是则禁止组件在跳页时自动隐藏
				isShowOpenMicroPay: false,//是否显示开通小额轻松付页面
				isShowKeyboard: false, //是否已显示键盘
				isShowNumKeyboard: false, //是否显示数字键盘
				isNotSetPayPassword: false, //是否未设置支付密码
				needPassword: this.mustbePassword, //是否显示密码输入框
				needMessage: this.mustbeMessage, //是否显示短信验证码框
				useMicroPay: false, //支付时是否使用小额轻松付
				microPayVisible: false, //小额轻松付框是否可见
				microPaySwitchState: false, //小额轻松付开关按钮状态
				isFallBackFromFingerpringPay: false, //是否从指纹识别中回落至密码验证
				step: 0, //步骤下标(用于切换页面)
				disableRequest: false, //请求防重变量
				microPay:{
					singleLimit: '300', //小额轻松付单笔限额（仅用于显示）
					totalLimit: '300' //小额轻松付日累计限额（仅用于显示）
				}
			}
		},
		directives: {
			TransferDom
		},
		props,
		async created(){
			this.KeyboardId = `id_${new Date().getTime()}` //初始化键盘监听过滤ID
			if(this.value){
				await this.showPopupPay()
			}
		},
		filters:{
			passwordPoint(password){
				return '•'.repeat(password.length)
			}
		},
		computed: {
			//小额轻松付框是否可见
			microPayBoxVisible(){
				return this.microPayVisible && !this.microPaySwitchState
			},
			//页面失效后（跳页）是否隐藏组件
			isHideOnDeactivated(){
				return this.hideOnDeactivated && !this.selectCardVisible && !this.isGoingOut
			},
			//身份验证页（单、双因子）价格是否可见
			verifyPriceVisible(){
				return this.priceVisible && !this.needFirstPage && (
					this.$slots.totalText||this.totalText!==''||this.total!==''||this.$slots.discountText||this.discountText!==''
				)
			},
			//身份验证页（单、双因子）标题
			verifyTitle(){
				return this.needFirstPage ? '身份验证' : this.title
			},
			//身份验证页（单、双因子）底部按钮话术
			verifyBtnText(){
				return this.needFirstPage ? '完成付款' : this.btnTxt
			},
			//是否单因子
			isSingleFactor(){
				return !this.needMessage && !this.isShowOpenMicroPay
			},
			//弹框背景
			popupPayStyle(){
				if((this.step === 1 && this.isSingleFactor) || this.isNotSetPayPassword){
					return {
						'background-color': '#ffffff'
					}
				}else{
					return this.popupStyle
				}
			},
			//是否显示首屏（付款详情）
			needFirstPage(){
				return !!(this.mustbeGoodsInfo || this.mustbeSelectCard)
			},
			//是否禁用完成付款按钮
			disable(){
				let reg = /^\d{6}$/
				let { needPassword, password, needMessage, smsCode, isShowOpenMicroPay } = this
	
				return this.disabled || this.disableRequest || !((needPassword && needMessage) || isShowOpenMicroPay ? (reg.test(password) && reg.test(smsCode)) : 
						needPassword ? reg.test(password) : needMessage ? reg.test(smsCode) : true)
			},
			//选卡控件显示状态
			selectCardVisible(){
				return this.$store.state.selectCardVisible
			}
		},
		watch:{
			//v-model 为true时判断是否需先初始化，false时直接隐藏
			async value(status){
				if(status){//显示
					await this.showPopupPay()
				}else{//关闭
					this.isOpen = false
				}
			},
			//显示单、双因子验证页时自动弹出键盘
			step(value){
				if(value > 0 && this.autoShowKeyboard && !this.disabled){
					this.showKeyboard(true)
				}
			},
			//监听密码，单因子验证且密码等于6位时自动提交
			password(value){
				if(this.step > 0 && this.isSingleFactor && value.length === 6){
					this.postFactor()
				}
				if(!this.isShowOpenMicroPay && value.length === 6){//非开通小额轻松付场景且密码输够6位则触发事件
					this.$emit('finishInputPassword')
				}
			},
			//监听短信验证码
			smsCode(value){
				if(value.length === 6){
					this.$emit('finishInputSmsCode')
				}
			},
			//监听mustbePassword，防止弹框弹出后无法再变动验证模式
			mustbePassword(value){
				this.needPassword = value
			},
			//监听mustbeMessage，防止弹框弹出后无法再变动验证模式
			mustbeMessage(value){
				this.needMessage = value
			},
			//选卡控件显示状态
			selectCardVisible(value = false){
				if(this.$store.state.popupPayVisible){
					this.toLeft = value
					if(value){
						this.setMultiAddCardBtnText()
					}else{
						this.resetMultiAddCardBtnText()
					}
				}
			}
		},
		async activated(){
			if(!this.isHideOnDeactivated && this.isNotSetPayPassword){//若已显示未设支付密码页，从其他webview回来时（或设置支付密码后回来）更新是否设置了支付密码标志
				if(this.value){
					this.showPopupPay()
				}else{
					this.$emit('input', true)
				}
			}
			if(this.isGoingOut){
				this.isGoingOut = false
			}
		},
		methods: {
			//根据条件显示弹框
			async showPopupPay(){
				this.toLeft = false
				if(this.fallBackFromFingerpringPay){//若有指纹回落标志，则直接显示弹框
					this.isOpen = true
				}else{
					try{
						this.step = 0
						this.resetStatus()
						App.Native.showLoading()
						if(this.autoCheckIsSetPayPassword){
							this.isNotSetPayPassword = !await App.Native.passwordAlready(false)
							if(this.isNotSetPayPassword){
								this.$emit('notSetPayPasswordHandler')
							}
						}
						if(!this.isNotSetPayPassword){//已经设置支付密码
							await this.initPayStatus() //等待初始化小额轻松付、指纹支付完成后才显示收银台
							if(!this.needFirstPage){
								this.isOpen = await this.startPay() //当需要显示单、双因子验证页时会返回true，显示弹框，否则不显示（进行指纹、小额轻松付）
								!this.isOpen && this.$emit('input', false) //若isOpen为false,则同步v-model
							}else{//需要显示第一屏的时候默认先弹框
								this.isOpen = true
							}
						}else{//未设置支付密码
							this.isOpen = true
						}
					}catch(e){
						this.$emit('input', false)
					}
					App.Native.hideLoading()
				}
			},
			//判断是否可使用指纹支付
			async isSupportFingerprintPay(){
				return (this.enableFingerprintPay && !this.useMicroPay && !this.needPassword && !this.needMessage && await App.Native.isSupportFingerprintPay())//当且仅当使用支付密码支付场景且支持指纹支付时为真
			},
			//尝试显示小额轻松付框（显示次数达到3次则不再显示）
			async toggleMicroPayVisible(){
				if(this.enableMicroPay && !this.microPaySwitchState){
					let userInfo = await App.Native.userInfo()
					if(!userInfo){
						App.Native.login()
						return false
					}
					let toggleTimesObj = await App.Native.getAPDataStorage('microPayVisibleToggleTimes')
					if(toggleTimesObj && toggleTimesObj[userInfo.customerId]){
						let times = toggleTimesObj[userInfo.customerId]
						if(times >= 3){//判断显示次数是否达3次，是则不再显示
							this.microPayVisible = false
						}else{
							this.microPayVisible = true
							App.Native.setAPDataStorage('microPayVisibleToggleTimes',Object.assign({},toggleTimesObj,{
								[userInfo.customerId]: ++times
							}))
						}
					}else{
						this.microPayVisible = true
						App.Native.setAPDataStorage('microPayVisibleToggleTimes',Object.assign({},toggleTimesObj,{
							[userInfo.customerId]: 1
						}))
					}
				}
			},
			//初始化小额轻松付、指纹支付、密码框、验证码框状态
			async initPayStatus(){
				let needPassword = this.needPassword,needMessage = this.needMessage
				if(this.total!==''){//若订单总额不为空
					if(this.enableMicroPay){
						await this.checkCanUseMicropay()
					}
					if(this.useMicroPay){//可用小额轻松付时关闭密码、验证码、指纹支付
						needPassword = false
						needMessage = false
					}else if(this.autoFactor){//小额轻松付不可用时且开启了自动单双因子自动判断
						if(await isDobuleFactor(this.total)){//双因子
							needPassword = true
							needMessage = true
						}else{//单因子
							needPassword = true
							needMessage = false
						}
					}
				}else{
					this.useMicroPay = false //订单金额为空时禁用小额轻松付
					if(this.autoFactor || this.enableMicroPay){
						console.error('组件警告：[autoFactor]为真或[enableMicroPay]为真时[total]必须给值')
					}
				}
				this.toggleMicroPayVisible()//异步执行，判断是否显示小额轻松付框（显示次数限制）
				if(needPassword && !needMessage && await App.Native.isSupportFingerprintPay()){//若单因子验证则判断是否支持指纹支付
					needPassword = false//隐藏支付密码输入框，取消支付密码校验
				}
				//更新密码框、验证码框可见状态
				this.needPassword = needPassword
				this.needMessage = needMessage
			},
			//根据金额判断是否可用小额轻松付
			async checkCanUseMicropay(){
				if(this.enableMicroPay && this.total!==''){
					let { status, useable } = await canUseMicropayment(this.total).catch(({header}) => {
						App.Native.toast({
							content: header.errorMsg
						})
						return { status: false , useable: false }
					}) //判断是否可使用小额轻松付，更新按钮状态
					this.microPaySwitchState = status
					this.useMicroPay = useable
				}
			},
			//显示小额轻松付开通界面
			async microPayClick(){
				if(!this.paymentCardSequence){
					throw "组件警告：缺少卡片序列号[paymentCardSequence]"
				}
				if(this.microPaySwitchState){//关闭小额
					App.Native.confirm({
						title: '',
						message: '确认要关闭小额轻松付功能吗？',
						okButton: '确定关闭'
					}).then(async res => {
						if(res.ok){
							let isSuccess = await closeMicropayment(false)
							if(isSuccess){
								App.Native.toast({
									content: '关闭成功'
								})
								this.useMicroPay = false
								this.microPaySwitchState = false
							}else{
								App.Native.toast({
									content: '小额轻松付关闭失败'
								})
							}
						}
					})
				}else{//跳转到小额轻松付开通页
					App.Native.showLoading()
					let { body: microPayLimit } = await getMicropaymentLimit(true, true) //获取小额轻松付限额
					if(microPayLimit){
						this.microPay = microPayLimit
					}
					App.Native.hideLoading()
					this.isShowOpenMicroPay = true
					this.step = 1
				}
			},
			//开启小额轻松付
			async openMicroPay(){
				if(!this.mobileNo){
					App.Native.toast({
						content: '请先获取短信验证码'
					})
					return
				}
				this.disableRequest = true
				App.Native.showLoading()
				if(await verifyPayPasswordAndSmsCode(this.paymentCardSequence, this.password, this.mobileNo, this.smsCode)){
					if(await openMicropayment()){
						App.Native.toast({
							content: '开启成功'
						})
						await this.checkCanUseMicropay()
						this.prev()
					}else{
						App.Native.toast({
							content: '小额轻松付开启失败'
						})
					}
				}
				this.disableRequest = false
				App.Native.hideLoading()
			},
			//复位小额轻松付、指纹支付、密码框、验证码框状态
			resetStatus(){
				this.needPassword = this.mustbePassword
				this.needMessage = this.mustbeMessage
				this.isGoingOut = false
				this.useMicroPay = false
				this.microPaySwitchState = false
				this.isShowOpenMicroPay = false
				this.fallBackFromFingerpringPay = false
				this.disableRequest = false
				this.countdown = false
				this.password = ''
				this.smsCode = ''
				this.mobileNo = ''
			},
			//开始支付（判断支付方式，显示对应支付界面）
			async startPay(){
				if(this.useMicroPay){//使用小额轻松付
					let [{ os, utdid: UTDID, uuid }, { result: withdrawPwd }] = await Promise.all([App.Native.clientInfo(), App.Native.fingerMark()])
					this.postResult({
						type: 'microPay',
						data:{
							userOs: os === 'ios' ? 'i' : 'a',UTDID,uuid,withdrawPwd,isWithdrawPwd: 'Y',safeToolType: '6'
						}
					})
					return false
				}else if(await this.isSupportFingerprintPay()){//使用指纹支付
					//验证指纹
					let fallBackFunc = ()=>{//当用户点击输入密码按钮或设备不支持指纹识别时回调该函数
                        this.needPassword = true //显示支付密码输入框
						this.step = 1 //切换至单因子验证页
						this.isOpen = true //显示弹框
						this.fallBackFromFingerpringPay = true //设置回落标志
						this.$emit('input', true)
                    }
					App.Native.fingerprintPay(fallBackFunc).then(result=>{
						if(result){//用户正常验证，未主动取消
							if(result.data.withdrawPwd){
								this.postResult(Object.assign(result,{
									type: 'finger'
								}))
							}else{
								fallBackFunc()
								App.Native.toast({
									content: '解析设备指纹出错'
								})
							}
						}else{
							if(!this.isOpen){//若弹框不可见则更新 v-model
								this.$emit('input', false)
							}
						}
					},error=>{
						//异常，提示用户错误信息
						if(error.status === -1){
							fallBackFunc()
							return
						}
                        App.Native.toast({
                            content: error.errorMessage,
                            type: 'exception'
						})
						if(!this.isOpen){//若弹框不可见则更新 v-model
							this.$emit('input', false)
						}
					})
					return false
				}else{
					this.step = 1 //切换至单双因子验证页
					return true
				}
			},
			//提交单双因子信息给上层
			postFactor(){
				let {password, smsCode} = this;
				let safeToolType = this.needMessage ? this.needPassword ? '12' : '2' : '6' //2:只验证短信验证码；12:验证短信验证码+支付密码；6:只验证支付密码
				if(this.encryptPassword && password){//若需要对密码二次加密
					App.Native.pwdEncrypt({
						pwd:[password],
						ps:'AE0'
					}).then(res=>{
						this.postResult({data: { password: res[0].apin, smsCode, safeToolType }})
					})
				}else{//不需要对密码二次加密，返回偏移后的密码字符
					this.postResult({data: { password, smsCode, safeToolType }})
				}
			},
			postResult(data){
				//防重处理
				if(this.disableRequest){ //若禁止请求，直接返回
					return false
				}else{
					this.disableRequest = true //否则设置禁止请求
				}
				this.$emit('clickHandler', Object.assign(data,{
					feedBack:{
						success: this.success,
						failure: this.failure
					}
				}))
				if(this.autoClose){
					this.$emit('input', false)
				}else{
					this.hideAllKeyboard()
				}
			},
			//弹框显示时回调函数
			popupShow(){
				cb = this.$refs.popup.popup.params.onClose
				this.$refs.popup.popup.params.onClose = this.popuphide
				this.boxHeight = this.$refs.popup.$el.style.height
				this.backKeyHook && App.on('back',this.backHook)
				this.$set(this.$store.state, 'popupPayVisible', true)
				this.showBarMask()
				this.$emit('on-show')
			},
			//用户点击关闭或遮罩层触发函数
			popuphide(){
				if(!this.isReady){
					return
				}
				if(this.needPassword || this.needMessage){
					this.hideAllKeyboard()
				}
				if(App.device.alipayClient){
					this.$nextTick(()=>{
						App.Native.confirm({title:'',message:this.closeTips}).then(({ok}) => {
							if(ok){
								this.$emit('abortPayment')
								if(this.value){
									this.$emit('input', false)
								}else{
									this.isOpen = false
								}
							}
						})
					})
				}else{
					this.$emit('abortPayment')
					if(this.value){
						this.$emit('input', false)
					}else{
						this.isOpen = false
					}
				}
			},
			//弹框隐藏时回调函数
			onHide(){
				this.$refs.popup.popup.params.onClose = cb
				this.resetStatus()
				this.hideAllKeyboard()
				this.isReady = false  //此处不能放resetStatus里
				this.$set(this.$store.state, 'popupPayVisible', false)
				this.hideBarMask()
				App.off('back',this.backHook)
				this.resetMultiAddCardBtnText()
				this.$emit('input', false)
				this.$emit('on-hide')
			},
			//动画完成回调（动画完成后才响应遮罩层点击事件）
			transitionFinish(e){
				if(!this.isOpen){//隐藏动画完成时复位toLeft标志
					this.toLeft = false
				}else{
					e.target === this.$refs.popup.$el && (this.isReady = true)
				}
			},
			//物理返回键事件回调
			backHook(e){
				if(this.backKeyHook){
					e.preventDefault()
					this.popuphide()
					return false
				}else{
					return true
				}
			},
			//显示头部遮罩层
			showBarMask(){
				if(this.showMask){
					App.Native.showBarMask()
					window.addEventListener("beforeunload", this.hideBarMask)
				}
			},
			//隐藏头部遮罩层
			hideBarMask(){
				if(this.showMask){
					App.Native.hideBarMask()
					window.removeEventListener("beforeunload", this.hideBarMask)
				}
			},
			//返回上一页
			prev(){
				if(this.fallBackFromFingerpringPay){//若之前使用的是指纹支付并fallBack到密码验证则复位密码验证，允许下次点击继续支付再次调用
					this.needPassword = false
					this.fallBackFromFingerpringPay = false
				}
				this.password = ''
				this.smsCode = ''
				this.step = 0
				this.countdown = false
				this.isShowOpenMicroPay = false
			},
			//获取验证码按钮触发函数
			getCode(){
				this.countdown = true
				this.$emit('messageCode',()=>{
					this.resetSms()
				})
			},
			//开通小额轻松付发送验证码回调函数
			sendCodeForOpenMicroPayment(){
				this.countdown = true
				App.Native.rpc({
					operationType: 'com.ifp.MP1108',
					data: {
						tranCode : 'MH0240',
						srcChannle : 'MH',
						busCode : 'MM',//业务类型
						SMSID : 'M1',//短信业务代码
						TEMPLATEID : '081M100104',//模板编号
						STDINFOTYP : '开通小额轻松付',//业务名称(此处不encodeURI,否则会乱码)
						smsLimitFlag : 'Y',//短信限制标识
						SMSFlag: '1',
						accountNo_sequence : this.paymentCardSequence
					},
					processError: false
				}).then(({ body }) => {
					let mobileNo = this.mobileNo = body.mobileNo;
					if(body.optionFlag == '1'){
						App.Native.toast({
							content: '您刚已获取了短信验证码，无需重新获取。'
						})
					}else{
						App.Native.toast({
							content: "已向尾号" + mobileNo.slice(mobileNo.length - 4) + "的手机号发送验证码"
						})
					}
				},({ header }) => {
					header.errorCode == 'ERROR' ? App.Native.toast({
						content: '未查到核心手机号'
					}) : App.Native.toast({
						content: header.errorMsg
					})
					this.resetSms()
				})
			},
			//点击卡片信息触发函数
			selectCard(){
				this.$emit('selectCardHandler')
			},
			//右上角按钮点击事件
			rightBtnClick(){
				this.$emit('rightBtnClickHandler')
			},
			//弹出键盘
			async showKeyboard(delay = false){
				this.password = ''
				if(delay){
					setTimeout(()=>{
						this.showKeyboard(false)
					},200)
				}else{
					await this.hideNumKeyboard(false) //隐藏数字键盘，不复位组件高度
					App.on("inputMsg", this.inputMsg)
					let { height } = await App.Native.showKeyboard(Object.assign({}, this.keyboardInfo, {
						actionName: this.KeyboardId
					}))
					this.isShowKeyboard = true
					this.isShowNumKeyboard = false
					this.fitHeightForItem(this.isShowOpenMicroPay?this.$refs.smsBox:this.$refs.forgotPasswordLink, height)
					this.$emit('startInputPassword')
				}
			},
			//隐藏键盘
			async hideKeyboard(isResetHeight = true){
				if(this.isShowKeyboard){
					isResetHeight && this.resetHeight()
					App.off("inputMsg", this.inputMsg)
					await App.Native.hideKeyboard()
					this.isShowKeyboard = false
				}
			},
			//弹出数字键盘
			async showNumKeyboard(delay = false){
				this.smsCode = ''
				if(delay){
					setTimeout(()=>{
						this.showNumKeyboard(false)
					},200)
				}else{
					await this.hideKeyboard(false) //隐藏密码键盘，不复位组件高度
					App.on("inputMsg", this.inputNumMsg)
					let { height } = await App.Native.showNumKeyboard()
					this.isShowNumKeyboard = true
					this.isShowKeyboard = false
					this.fitHeightForItem(this.isShowOpenMicroPay?this.$refs.smsBox:this.$refs.forgotPasswordLink, height)
					this.$emit('startInputSmsCode')
				}
			},
			//隐藏数字键盘
			async hideNumKeyboard(isResetHeight = true){
				if(this.isShowNumKeyboard){
					isResetHeight && this.resetHeight()
					App.off("inputMsg", this.inputNumMsg)
					await App.Native.hideNumKeyboard()
					this.isShowNumKeyboard = false
				}
			},
			//监听键盘
			inputMsg({data}){
				if(!data.isHidden){
					if(data.actionName === this.KeyboardId){
						this.password = data.psw
					}
				}else{
					this.hideKeyboard()
				}
			},
			//隐藏所有键盘
			async hideAllKeyboard(){
				await this.hideKeyboard()
				await this.hideNumKeyboard()
			},
			//监听键盘
			inputNumMsg({data}){
				if(!data.isHidden){
					if(data.delete == '1'){
						this.smsCode = this.smsCode.substring(0, this.smsCode.length-1)
					}else if(this.smsCode.length < 6){
						this.smsCode += data.psw
					}
				}else{
					this.hideNumKeyboard()
				}
			},
			//调整组件高度，以防键盘遮盖对应元素
			fitHeightForItem(target, height = keyboardHeight){
				let boxBottom = document.documentElement.clientHeight - this.getTop(target.$el?target.$el:target) - (target.$el?target.$el:target).offsetHeight - 3
				if(boxBottom < height){
					this.$refs.popup.$el.style.height = this.$refs.popup.$el.offsetHeight + height - boxBottom + 'px'
				}
			},
			//恢复组件高度
			resetHeight(){
				if(this.boxHeight){
					this.$refs.popup.$el.style.height = this.boxHeight
				}
			},
			//获取元素距离页面顶部距离
			getTop(e){ 
				let offset=e.offsetTop; 
				if(e.offsetParent!=null) offset+=this.getTop(e.offsetParent); 
				return offset;
			},
			//重置短信验证码计时器
			resetSms(){
				this.$refs.smsBox.finish()
			},
			//忘记密码链接点击事件
			forgotPassword(){
				this.$emit('forgotPassword')
				this.isGoingOut = true
				App.Native.pushWindow({
					url: '/base/cdbank_pay_pwd/index.html',
					data: {
						pageNum: "1",
						pageId: "forgetPayPwd",
						interfaceType: "MH0349"
					}
				})
			},
			//设置支付密码按钮点击事件
			setPayPassword(){
				this.$emit('setPassword')
				this.isGoingOut = true
				App.Native.pushWindow({
					url: '/base/cdbank_pay_pwd/index.html',
					data: {
						pageNum: "1",
						pageId: "setPayPwd",
						interfaceType: "MH0349"
					}
				})
			},
			//设置加挂结果页按钮话术
			setMultiAddCardBtnText(){
				this.multiAddCardSuccessBtnText!=='' && App.Native.setSessionData('multiAddBtn', { btnName: this.multiAddCardSuccessBtnText })
			},
			//复位加挂结果页按钮话术
			resetMultiAddCardBtnText(){
				this.multiAddCardSuccessBtnText!=='' && App.Native.setSessionData('multiAddBtn', '')
			},
			//拨打电话
			callPhone(){
				App.Native.callPhone('95508')
			},
			//清除密码输入框、短信验证码输入框
			clearInputText(){
				this.password = ''
				this.smsCode = ''
			},
			//根据错误码判断是否关闭指纹支付（本地）
			disableFingerprintPayByErrorCode(errorCode){
				if (['PBMH0250', 'PBMH0251', 'PBMH0252', 'PBMH0253'].includes(errorCode)) {
					App.Native.disableFingerprintPay()
					return true
				} else {
					return false
				}
			},
			//支付成功回调
			success(rpcResult = {}){
				this.clearInputText()  //清空表单
				this.disableRequest = false //复位防重标志
			},
			//支付失败回调
			failure(rpcResult = {}){
				if(this.autoClearInputTextIfFailure){ //支付失败时是否清空表单
					this.clearInputText()  //清空表单
				}
				this.disableRequest = false  //复位防重标志
				if(typeof rpcResult === 'object'){
					let header = rpcResult.header ? rpcResult.header : rpcResult
					this.disableFingerprintPayByErrorCode(header.errorCode)
				}
			}
		},
		components: {
			Popup,
			Group,
			Cell,
			cellInput,
			vInlineSwitch,
			tinyMsgCode
		}
	}
</script>
<style lang="scss">
	@import './scss/index.scss';
</style>