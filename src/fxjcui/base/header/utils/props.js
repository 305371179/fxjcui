export default {
  clientInfo: {
    type:Object,
    default() {return {}}
  },
	title: {
		type: String,
		default: '模拟标题'
	},
	barStyle: {
		type: String,
		default: 'black'
	},
	backStyle: {
		type: String,
		default: '#fff'
	},
	titleColor: {
		type: String,
		default: '#222'
	},
	leftOptions: {
		type: Object,
		default(){
			return {
				preventGoBack: false
			}
		}
	},
	rightOptions: {
		type: Array,
		default(){
			return []
		}
	},
	show: {
		type: Boolean,
		default: false
	}
}
