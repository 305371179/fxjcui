export default {
	title: {
		type: null,
		default(){
			return {
				desc: '',
				subDesc: '',
				isBreak: false,
				align: 'left',
				descStyle: null,
				subDescStyle: null
			}
		}
	},
	isLink: {
		type: Boolean,
		default: false
	},
	value: {
		type: null,
		default(){
			return {
				desc: '',
				subDesc: '',
				isBreak: true,
				align: 'right',
				descStyle: null,
				subDescStyle: null
			}
		}
	},
	icon: {
		type: String,
		default: ''
	},
	text: {
		type: null,
		default(){
			return {
				desc: '',
				isBreak: false,
				style: ''
			}
		}
	}
}