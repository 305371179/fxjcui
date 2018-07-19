const makeDate = ({targetYear,targerMonth, distance, originMonth, showAll}) => {
	
	let dataArr = []

	for(let i = 0; i <= distance; i++){
		
		let k = i == distance ? originMonth : 12
		dataArr.unshift({
			name: (targetYear + i) + '年',
			value: String(targetYear + i),
			parent: 0
		})

		for(let j = targerMonth || 1; j <= k; j++){
			dataArr.unshift({
				name:  j +'月',
				value: String(j),
				parent: String(targetYear + i)
			})
		}
		targerMonth = null
	}

	let defaultData = showAll ? [
		{name:'全部月份',value:'all',parent:0},
		{name:'-',value:'all',parent:'all'}
	] : []
	return Object.freeze(defaultData.concat(dataArr))
}


export default (step = 3, showAll = true) => {
	let base = new Date().getFullYear() * 12 + new Date().getMonth() - step * 12
	
	return makeDate({
		originMonth: new Date().getMonth() + 1,
		targetYear: parseInt(base / 12),
		targerMonth: (base % 12) + 1,
		distance: Math.floor(step),
		showAll
	})
}