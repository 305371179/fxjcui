export default {
	slotType: {
		type: String,
		default: 'type1',
	},
	disabled: {
		type: Boolean,
		default: false
	},
	buttonText: {
		type: String,
		default: '确定'
	},
	plain: {
		type: null,
		default: false
	},
	buttonStyle: {
		type: Object,
		default(){
			return {}
		}
	},
	size: {
		type: String,
		default: 'L' //S,M,L
	},
	type: {
		type: String,
		default: 'CM'  //CM,CB,CO,CG
	}
}
