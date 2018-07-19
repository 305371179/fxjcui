export default {
	data: {
		type: Array,
		default(){
			return []
		}
	},
	probeType: {
		type: Number,
		default: 1
	},
	click: {
		type: Boolean,
		default: true
	},
	listenScroll: {
		type: Boolean,
		default: false
	},
	listenBeforeScroll: {
		type: Boolean,
		default: false
	},
	direction: {
		type: String,
		default: 'vertical'
	},
	startY: {
		type: Number,
		default: 0
	},
	scrollbar: {
		type: null,
		default: false
	},
	pullDownRefresh: {
		type: null,
		default: false
	},
	pullUpLoad: {
		type: null,
		default: false
	},
	refreshDelay: {
		type: Number,
		default: 20
	},
	freeScroll: {
		type: Boolean,
		default: false
	}
}