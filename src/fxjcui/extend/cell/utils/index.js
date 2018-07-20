export default {
	property(attr){
		let _default = {
			'title': 'left',
			'value': 'right'
		}
		let align = this[attr].align || _default[attr]
		let _isBreak = this['value'] && this['value'].isBreak === false
		return {
			'align-left': align === 'left',
			'align-center': align === 'center',
			'align-right': align === 'right',
			'flex-1': attr === 'title' ? !_isBreak : _isBreak
		}
	}
}