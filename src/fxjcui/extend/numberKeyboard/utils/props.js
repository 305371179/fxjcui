export default {
	value: {
		type: Boolean,
		default: false
	},
	width:{
		type: String,
		default: '100%'
	},
	hideOnBlur: {
		type: Boolean,
		default: true
	},
	showMask:{
		type: Boolean,
		default: true
	},
	type: {
		type: String,
		default: 'init'
	},
	popupStyle: {
		type: Object,
		default(){
			return { }
		}
	},
	tips: {
		type: null,
		default(){
			return {
				min: '1,000',
				max: '50,000',
				init: '1000'
			}
		}
	},
	len: {
		type: [Number,String],
		default: 6
	},
	limit: {
		type: [Number,String],
		default: 2
	},
	content: {
		type: String,
		default: ''
	},
	isTransparent: {
		type: Boolean,
		default: true
	}
}