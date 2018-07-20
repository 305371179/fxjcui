export default {
		cardType: {
			type: Object,
			default () {
				return {
					credit: true,
					debit: true,
					other: true
				}
			}
		},
		cardList: {
			type: Object,
			default () {
				return {
					normal: [{
						key: '',
						value: '',
						iconType: '',
						selected: ''
					}]		
				}
			}
		},
		selectedCard: {
			type: String,
			default: ''
		},
		value:{
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
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
		isTransparent: {
			type: Boolean,
			default: true
		},
		showMask: {
			type: Boolean,
			default: true
		},
		addCard: {
			type: String,
			default: '添加卡片'
		},
		preventAddcard: {
			type: Boolean,
			default: false
		},
		hideOnDeactivated: {
			type:Boolean,
			default: true
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
			default: '禁用卡片列表'
		}
	}

