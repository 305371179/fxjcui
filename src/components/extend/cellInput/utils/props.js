export default {
	label: {
		type: String,
		default: '标准五个字'
	},
	align: {
		type: String,
		default: 'left'
	},
	iconType: {
		type: String,
		default: ''
	},
	placeholder: {
		type: String,
		default: '标准五个字'
	},
	readonly: {
		type: Boolean,
		default: false
	},
	value: {
		type: [String,Number],
		default: ''
	},
	maxlength:{
		type: Number,
		default: 6
	},
	focus: {
		type: Boolean,
		default: false
	}
}