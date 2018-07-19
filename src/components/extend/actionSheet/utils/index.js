import _ from 'lodash'
export default {
	getSelected: data => _.result(_.find(data, item => item.selected === true), 'value')
}