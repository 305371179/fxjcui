
<template>
  <div :style="checkedStyle" style="width:0.4rem;height:0.4rem;position:absolute;right:0.3rem;top:0;bottom:0;margin: auto;fill:red;" alt="" width="0.2rem"></div>
</template>
<script>
  let list_radio = require('../../common/svg/list_radio.svg')
	export default {
		data(){
			return {
        checkedStyle:{
          background:`url(${list_radio}) no-repeat center`,
          backgroundSize:'100% auto'
        },
			}
		},
	}
</script>
<style lang="scss">
</style>
