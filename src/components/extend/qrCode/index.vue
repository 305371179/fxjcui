<template>
	<div class="qr-code">
		<div class="qr-content">
			<canvas ref="canvas" v-show="type === 'canvas'"></canvas>
			<img :src="imgData" v-if="type === 'img'">
			<img class="logo" v-if="logo" src="./images/logo.png">
		</div>
	</div>
</template>
<script>
	import QRCodeImpl from 'qr.js/lib/QRCode'
	import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'
	import utils from './utils'
	import props from './utils/props'

	export default {
		name:'qr-code',
		data(){
			return {imgData:''}
		},
		props,
		mounted(){
			this.$nextTick(() => {
				this.render()
			})
		},
		methods: {
			render(){
				if(typeof this.value === 'undefined') return

				const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[this.level])
				qrcode.addData(this.value)
				qrcode.make()

				const canvas = this.$refs.canvas
				const ctx = canvas.getContext('2d')
				const cells = qrcode.modules
				const tileW = this.size / cells.length
				const tileH = this.size / cells.length
				// window.devicePixelRatio 
				const scale = 1 / utils.getBackingStorePixelRatio(ctx)
				canvas.height = canvas.width = this.size * scale
				ctx.scale(scale, scale)


				cells.forEach((row, rdx) => {
					row.forEach((cell, cdx) => {
					ctx.fillStyle = cell ? this.fgColor : this.bgColor
					const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
					const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
					ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
					})
				})


				if (this.type === 'img') {
					this.imgData = canvas.toDataURL('image/png')
				}
			}
		}
	}
	
</script>
<style lang="scss">
	@import './scss/index.scss'
</style>
