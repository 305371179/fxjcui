<template>
  <div></div>
</template>
<script>
export default {
  props: {
    sequence: String,
    mask: String
  },
  activated () {
    App.Native.getSessionData('unionPay').then(a => {
      if (a.result) {
        this.loadMp1146()
      }
    })
  },
  computed: {
    /**
     * [银联扫码付签名验签]
     * @author 黄武韬
     * @param {string} [cardNoParams] 需开通扫码付的卡片
     * @param {string} [phone] 获取短信验证码的手机号
    */
    mp1145Params () {
      return {
        srcChannel: 'MH',
        signData: '',
        remark: '',
        sensitivityData: 'accNo|customerInfo',
        cardNo_sequence: this.sequence
      }
    },
    /**
     * [查询加挂状态]
     * @author 黄武韬
     * @param {string} [cardNoParams] 需加挂的卡号
     * @param {string} [cardFrontNo] 需加挂的卡号前6位
     * @param {string} [cardEndNo] 需加挂的卡号后4位
    */
    mp1146Params () {
      return {
        srcChannel: 'MH',
        merName: '',
        merAbbr: '',
        subMerId: '',
        subMerName: '',
        subMerAbbr: '',
        accNo: '',
        encryptCertId: '',
        cardFrontNo: this.mask.substr(0, 6),
        cardEndNo: this.mask.substr(-4, 4),
        cardNo_sequence: this.sequence
      }
    }
  },
  methods: {
    /**
     * [银联扫码付签名验签]
     * @author 黄武韬
    */
    loadMp1145 () {
      App.Native.rpc({
        operationType: 'com.ifp.MP1145',
        data: this.mp1145Params,
        processError: false
      }).then(data => {
        let param = data.body
        param.encoding = data.body.mp_encoding
        param.version = data.body.mp_version
        param.url = data.body.YLlink
        param.customerInfo = data.body.newCustomerInfoMo
        param.tokenPayData = data.body.tokenPayData.replace('|', '&')
        App.Native.setSessionData('unionPay', {
          result: true
        })
        App.Native.setSessionData('unionPayParams', {
          data: param
        })
        App.Native.pushWindow({
          url: '/base/cdbank_add_credit/yinlian.html'
        })
      },(header)=>{
        App.Native.toast({content: header.header.errorMsg})
      })
    },
    /**
     * [查询加挂状态,以这个接口为准判断是否加挂成功]
     * @author 黄武韬
    */
    loadMp1146 () {
      App.Native.setSessionData('unionPay', {
        result: false
      })
      App.Native.rpc({
        operationType: 'com.ifp.MP1146',
        data: this.mp1146Params,
        processError: false
      }).then(data => {
        this.mp_currentSID = data.body.mp_currentSID
        this.goResult()
      },(header)=>{
        App.Native.toast({content: header.header.errorMsg})
      })
    },
    goResult () {
      App.Native.pushWindow({
        url: '/base/cdbank_add_credit/xieyiResult.html',
        data: {
          type: '1'
        },
        param: {
          hasTitle: false
        }
      })
    },
    go (s, m) {
      if (s && m) {
        this.sequence = s;
        this.mask = m;
      }
      this.loadMp1145()
    }
  }
}
</script>
