export default {
	value: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: '付款详情'
	},
	width: {
		type: String,
		default: 'auto'
	},
	height: {
		type: String,
		default: '9.6rem'
	},
	hideOnBlur: {
		type: Boolean,
		default: true
	},
	hideOnDeactivated: {
		type:Boolean,
		default: true
	},
	isTransparent: {
		type: Boolean,
		default: false
	},
	position: {
		type: String,
		default: 'bottom'
	},
	showMask: {
		type: Boolean,
		default: true
	},
	addCard: {
		type: Boolean,
		default: true
	},
	popupStyle: {
		type: Object,
		default(){
			return {
				'background-color': 'rgb(246, 246, 246)'
			}
		}
	},
	goodsInfo: {
		type: String,
		default: ''
	},
	paymentCard: {
		type: String,
		default: ''
	},
	paymentCardSequence: {
		type: String,
		default: ''
	},
	mustbePassword: {
		type: Boolean,
		default: true
	},
	mustbeMessage: {
		type: Boolean,
		default: true
	},
	mustbeSelectCard: {
		type: Boolean,
		default: true
	},
	mustbeGoodsInfo: {
		type: Boolean,
		default: true
	},
	multiAddCardSuccessBtnText: {
		type: String,
		default: ''
	},
	showNoWithdrawPasswordTips: {
		type: Boolean,
		default: false
	},
	total: {
		type: [Number, String],
		default: ''
	},
	totalText: {
		type: String,
		default: ''
	},
	discountText: {
		type: String,
		default: ''
	},
	btnPlain: {
		type: Boolean,
		default: false
	},
	btnTxt: {
		type: String,
		default: '确认付款'
	},
	rightBtnText: {
		type: String,
		default: ''
	},
	tips: {
		type: String,
		default: '请输入支付密码'
	},
	enableFingerprintPay: {
		type: Boolean,
		default: true
	},
	keyboardInfo: {
		type: Object,
		default(){
			return {
				isSpecialPassWordRequired: true,
				maxSize: 6,
				ps: 'AE0',
				isRegister: false,
				mobileNo: '',
				pswIndex: '0'
			}
		}
	},
	closeTips:{
		type: String,
		default: '确定放弃支付？'
	},
	autoFactor:{
		type: Boolean,
		default: false
	},
	autoShowKeyboard:{
		type: Boolean,
		default: true
	},
	autoCheckIsSetPayPassword:{
		type: Boolean,
		default: true
	},
	autoClearInputTextIfFailure:{
		type: Boolean,
		default: true
	},
	enableFingerprintPay: {
		type: Boolean,
		default: false
	},
	enableMicroPay: {
		type: Boolean,
		default: false
	},
	priceVisible: {
		type: Boolean,
		default: true
	},
	encryptPassword: {
		type: Boolean,
		default: true
	},
	autoClose: {
		type: Boolean,
		default: false
	},
	backKeyHook: {
		type: Boolean,
		default: true
	},
	showSelectCardLink: {
		type: Boolean,
		default: true
	}
}