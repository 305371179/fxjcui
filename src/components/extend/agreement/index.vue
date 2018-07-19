<template>
  <div class="agreement">
    <p v-for="(item, index) in paragraphes" :key="index">{{item}}</p>
  </div>   
</template>

<script>
export default {
  name: 'agreement',
  props: {
    operationType: {
      type: String,
      default: 'com.ifp.MP1031'
    },
    rpcData: {
      type: Object,
      default () {
        return { pactNo: 'PB030014' };
      }
    }
  },
  data () {
    return {
      agreeContent: ''
    }
  },
  computed: {
    paragraphes () {
      return this.agreeContent
    }
  },
  created () {
    const { operationType, rpcData } = this.$props;
    App.Native.rpc({
      operationType,
      data: rpcData
    }).then(({body}) => {
      this.agreeContent = body.pactText.split('\n');
    })
  }
}
</script>

<style lang="sass">
.agreement {
  padding: .3rem;
  background: #ffffff;

  p {
    line-height: .46rem;
    margin-bottom: .14rem;
  }
}
</style>
