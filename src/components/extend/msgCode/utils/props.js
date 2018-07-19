export default {
  os: {
    type: String,
    default: window.navigator.userAgent.toLocaleLowerCase().indexOf('ios')!==-1?'ios':'android'
  },
  msgVC: {
    type: String,
    default: ''
  },
  startNum: {
    type: [Number, String],
    default: 59
  },
  rpcOperationType: {
    type: String,
    default: ''
  },
  rpcData: {
    type: Object,
    default () {
      return {}
    }
  },
  isValidBeforeFetch: {
    type: Boolean,
    default: false
  },
  isDemo: { // demo时，方便控制rpc请求，非demo情况请缺省之
    type: Boolean,
    default: false
  },
  showMask: {
    type: Boolean,
    default: false
  },
  keyboardType: {
    type: String,
    default: 'h5'
  },
  hasRpc: {
    type: Boolean,
    default: true
  }
}
