import Vue from 'vue'
import confirm from './index.vue'

Vue.component('v-confirm', confirm)

const ConfirmExtend = Vue.extend({
  template: '<v-confirm :options="options" :extend="extend" @click="click" @hide="hide"></v-confirm>',
  data () {
    return {
      options: {
        title: '',
        message: '',
        img: '',
        okButton: '确认',
        cancelButton: ''
      },
      extend: []
    }
  },
  methods: {
    click (e) {
      console.log(e)
    },
    hide () {
      console.log()
    }
  }
})
ConfirmExtend.prototype.close = function () {
  this.$el.parentNode.removeChild(this.$el)
}
export const Confirm = (options) => {
  var instance = new ConfirmExtend().$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
  instance.options = Object.assign({
    title: '',
    message: '',
    okButton: '确认',
    img: '',
    cancelButton: ''},options)
  instance.extend = options.extendBtns
  let back = new Promise((a)=>{
    instance.click = (e) => {
      if (e.target.className === 'submit') {
        a({
          ok: true
        })
      } else if (e.target.className === 'cancel') {
        a({
          ok: false
        })
      } else {
        a({
          ok: e.target.dataset.back
        })
      }
    }
    instance.hide = () => {
      instance.close()
    }
  })
  return back
}

Vue.$confirm = Vue.prototype.$confirm = Confirm
