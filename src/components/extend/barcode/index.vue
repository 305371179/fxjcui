<template>
  <div class="barcode-container">
    <svg ref="barcode" v-if="valid"></svg>
    <div v-if="!valid">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  // 基于lindell/JsBarcode做的vue封装
  import JsBarcode from '@common/libs/jsBarcode'
  import props from './utils/props'
  import _ from 'lodash'
  export default {
    name: 'barcode',
    data () {
      return {
        valid: true
      }
    },
    props,
    methods: {
      render () {
        let settings = {

          // lodash的pickBy方法，将对象下的一级属性挑选出来，undefined的属性不选出来
          ...(_.omitBy(this.$props, _.isUndefined)),
          valid: (valid) => { this.valid = valid }
        }
        JsBarcode(this.$refs.barcode, this.$props.value, settings)
      }
    },
    mounted () {
      this.$watch('$props', this.render, { deep: true, immediate: true })
      this.render()
    }
  }
</script>

<style lang="scss">
  @import './scss/index.scss'
</style>
