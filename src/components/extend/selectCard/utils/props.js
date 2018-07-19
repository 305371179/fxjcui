export default {
		permissionList: {
			type: Array,
			default () {
				return []
			}
		},
		permissionOpen: {
			type: String,
			default: '0'
		},
		nativeBackSwitch: {
			type: Boolean,
			default: true
		},
		cardType: {
			type: Object
		},
		cardList: {
			type: Object,
			default () {
				return {
					normal: [],
          disable:[]
				}
				// return null
			}
		},
		defaultCard: {
			type: String,
			default: ''
		},
		value:{
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '选择卡片'
		},
		width: {
			type: String,
			default: 'auto'
		},
		position: {
			type: String,
			default: 'bottom'
		},
		hideOnBlur: {
			type: Boolean,
			default: true
		},
		showMask: {
			type: Boolean,
			default: true
		},
		addCard: {
			type: Boolean,
			default: true
		},
		hideOnDeactivated: {
			type:Boolean,
			default: false
		},
		popupStyle: {
			type: Object,
			default(){
				return {
					'background-color': 'rgb(246, 246, 246)'
				}
			}
		},
		disableCardListTitle: {
			type: String,
			default: '该卡片不支持当前交易'
		},
		params: {
			type: Object
		},
		autoDrump: {
			type: Boolean,
			default: true
		},
		alwaysRunResult: {
			type: Boolean,
			default: false
		},
		addCardText:{
			type:String,
			default:'添加卡片'
		}
	}

