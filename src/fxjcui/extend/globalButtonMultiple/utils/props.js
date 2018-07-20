export default {
	disabled: {
		type: Boolean,
		default: false
	},
	btnText: {
		type: Object,
		default(){
			return {
				text1: '我要报名',
				text2: '我要办卡'
			}
		}
	}
}