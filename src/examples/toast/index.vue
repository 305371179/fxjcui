<template>
  <div>
    <group title="toast轻提示/文字">
      <v-button @clickHandler="showToast1">纯文字</v-button>
    </group>
    <group title="toast轻提示/成功">
      <v-button @clickHandler="showToast2">成功</v-button>
    </group>
    <group title="toast轻提示/失败">
      <v-button @clickHandler="showToast3">失败</v-button>
    </group>
  </div>
</template>
<script>
import Group from '../../fxjcui/extend/group/index'
import ToastPlugin from '../../fxjcui/extend/toast/plugin'
import Vue from 'vue'
Vue.use(ToastPlugin,{
  position:'middle'
})
export default {
  components: {
    Group
  },
  data() {
    return {}
  },
  mounted(){

  },
  methods: {
    showToast1(){
      this.$toast.show({
        type:'text',
        text:'asdfasdfasdf'
      })
    },
    showToast2(){
      this.$toast.show({
        text:'我是toast，文字很长啊啊啊啊啊sdfgsfgsdfgsdfgsdfgsdfgsdfgsdfgdfsgdsfgfsdgsfdg',
      })
    },
    showToast3(){
      this.$toast.show({
        type: 'cancel',
        text:'我是toast，文字很长啊啊啊啊啊sdfgsfgsdfgsdfgsdfgsdfgsdfgsdfgdfsgdsfgfsdgsfdg',
        time:20000000
      })
    },
  }
}
</script>
