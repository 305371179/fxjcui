const setOptionMenu = menus => {

	if(menus.length <= 0){
		return AlipayJSBridge.call('hideOptionMenu')
	}

	let options = {
		override: true,
		menus
	}

	if(App.device.os === 'ios'){
		if(menus.length === 1){
			options = {
				...menus[0]
			}
		}
	}

	AlipayJSBridge.call('setOptionMenu', options)
	AlipayJSBridge.call('showOptionMenu')
}

export default {
	setOptionMenu,
	clientHeadInit(){

		let {leftOptions, rightOptions, barStyle = 'black', backStyle, titleColor} = this

		if(leftOptions.type === 'none'){
			AlipayJSBridge.call('hideBackButton')
		}

		if(barStyle != 'black'){
			AlipayJSBridge.call('setTitleBarStyle', {
				theme: barStyle
			})
		}
		
		if(leftOptions.preventGoback){
			App.on('back', e => {
				//注意：iOS端侧滑返回，由于手势操作具有可中途撤销的特性，无法触发back事件
				//备注: 容器内部有保护机制，如果用户多次重复点击返回按钮依然未能退出当前页，将会触发强制退出，忽略preventDefault。
        		e.preventDefault();
        		this.$emit('leftHandler')
      		})
		}

		if(rightOptions && rightOptions.length > 0){
			setOptionMenu(rightOptions)
		}

		App.on('optionMenu', e => {
			this.$emit('rightHandler', e.data.index)
		})
	}
}