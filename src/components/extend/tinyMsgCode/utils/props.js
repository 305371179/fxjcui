export default {
	label: {
		type: String,
		default: '验证码'
	},
	align: {
		type: String,
		default: 'left'
	},
	placeholder: {
		type: String,
		default: '请输入短信验证码'
	},
	keyboardType: {
		type: String,
		default: 'h5'
	},
	value: {
		type: [String,Number],
		default: ''
	},
	maxlength:{
		type: Number,
		default: 6
	},
	isFocus: {
		type: Boolean,
		default: false
	},
	isCountDown: {
		type: Boolean,
		default: false
	},
	time: {
		type: Number,
		default: 59
	}
}