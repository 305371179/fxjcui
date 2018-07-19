// const data = [
// 	{name:'全部月份',value:'all',parent:0},
// 	{name:'-',value:'all',parent:'all'},

// 	{name:'2018年',value:'2018',parent:0},
// 	{name:'1月',value:'1',parent:'2018'},
// 	{name:'2月',value:'2',parent:'2018'},
// 	{name:'3月',value:'3',parent:'2018'},

// 	{name:'2017年',value:'2017',parent:0},
// 	{name:'4月',value:'4',parent:'2017'},
// 	{name:'5月',value:'5',parent:'2017'},
// 	{name:'6月',value:'6',parent:'2017'},

// 	{name:'2016年',value:'2016',parent:0},
// 	{name:'7月',value:'7',parent:'2016'},
// 	{name:'8月',value:'8',parent:'2016'},
// 	{name:'9月',value:'9',parent:'2016'},

// 	{name:'2015年',value:'2015',parent:0},
// 	{name:'10月',value:'10',parent:'2015'},
// 	{name:'11月',value:'11',parent:'2015'},
// 	{name:'12月',value:'12',parent:'2015'},
// ]

export default {
	value: {
		type: Boolean,
		default: false
	},
	popupTitle: {
		type: String,
		default: '订单月份筛选'
	},
	fixedColumns: {
		type: Number,
		default: 2
	},
	columns: {
		type: Number,
		default: 2
	},
	times: {
		type: [Number,String],
		default: 3
	},
	allTime:{
		type: Boolean,
		default: true
	}
}