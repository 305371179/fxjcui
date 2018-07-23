<template>
  <div>
    <div class="main" v-if="tabs.length !== 0">
      <div class="tabs">
        <div @click="click(index)" :class="{'choiced': item.value === selected}" :key="index"
             v-for="(item, index) in tabs">{{item.key}}
          <s-logo :logo="selected === item.value ? 'tabs_icon_selected_u' : 'tabs_icon_normal_dow'"
                  class="icon" style="display: none;"></s-logo>
          <svg v-if="selected !== item.value" class="icon" id="icon-tabs_icon_normal_dow" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M512 770.50082026l459.55701213-517.00164052H52.44298787l459.55701213 517.00164052z" fill="#999999"></path></svg>
          <svg v-else class="icon" id="icon-tabs_icon_selected_u" viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M512 253.49917974L52.44298787 770.50082026h919.11402426L512 253.49917974z" fill="#D83B35"></path></svg>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="show" class="mask">
        <div style="position:fixed;width:100%;height:100%;background-color:rgba(0,0,0,0.5);" @click="hide"></div>
        <slot :scope="currentScope"></slot>
      </div>
    </transition>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        show: this.value ? true : false,
        currentScope: {}
      }
    },
    watch: {
      value() {
        this.initData()
      }
    },
    computed: {
      selected() {
        return this.value
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        this.show = this.value ? true : false
        this.tabs.forEach(item => {
          if (item.value === this.value) {
            this.currentScope = item
          }
        })
      },
      hide() {
        this.$emit('input', '')
      },
      click(e) {
        if (this.selected === this.tabs[e].value) {
          this.$emit('input', '')
        } else {
          this.$emit('input', this.tabs[e].value)
        }
      }
    },
    props: {
      tabs: {
        type: Array,
        default() {
          return []
        }
      },
      value: null
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../common/scss/index";

  .mask {
    position: fixed;
    width: 100%;
    height: 90rem;
    opacity: 1;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .main {
    position: relative;
    z-index: 1;
    background-color: white;
    box-shadow: 0 1px old2new(0.08) rgba(51, 51, 51, 0.06);
    height: old2new(1.1733);
    > .tabs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      > div {
        flex: 1 1 1px;
        font-size: $font-h4;
        color: $font-color-t2;
        line-height: initial;
        display: flex;
        align-items: center;
        justify-content: center;
        > .icon {
          font-size: px2rem(16);
          margin-left: px2rem(16);
        }
      }
      > .choiced {
        color: #d81e06;
      }
    }
  }
</style>
