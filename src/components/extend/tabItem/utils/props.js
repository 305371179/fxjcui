export default {
	item: {
		type: Array,
		default(){
			return Object.freeze([
				{title:'选项一',message:true},
				{title:'选项二',message:false},
				{title:'选项三',message:false},
				{title:'选项四',message:false},
				{title:'选项五',message:false},
			])
		}
	},
	selected: {
		type: [Number,String],
		default: 0
	},
	shadow: {
		type: Boolean,
		default: true
	}
}