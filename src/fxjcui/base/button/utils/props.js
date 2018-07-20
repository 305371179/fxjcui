export default {
	disabled: {
		type: Boolean,
		default: false
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