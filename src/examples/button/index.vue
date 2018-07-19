<template>
  <div>
    <group title="各种按钮/cm">
      <div class="flexx">
        <v-button size="m"></v-button>
        <v-button size="s"></v-button>
      </div>
    </group>
    <group title="各种按钮/cm/plain">
      <div class="flexx">
        <v-button size="m" :plain="true"></v-button>
        <v-button size="s" :plain="true"></v-button>
      </div>
    </group>
    <group title="各种按钮/cm/禁用">
      <div class="flexx">
        <v-button size="m" :disabled="true" @clickHandler="click"></v-button>
        <v-button size="s" :disabled="true"></v-button>
      </div>
    </group>
    <group title="各种按钮/cm/plain/禁用">
      <div class="flexx">
        <v-button size="m" :disabled="true"></v-button>
        <v-button size="s" :disabled="true"></v-button>
      </div>
    </group>
    <group title="各种按钮/cg">
      <div class="flexx">
        <v-button size="m" type="cg"></v-button>
        <v-button size="s" type="cg"></v-button>
      </div>
    </group>

    <group title="各种按钮/cg/plain">
      <div class="flexx">
        <v-button size="m" type="cg" :plain="true"></v-button>
        <v-button size="s" type="cg" :plain="true"></v-button>
      </div>
    </group>

    <group title="各种按钮/cg/禁用">
      <div class="flexx">
        <v-button size="m" type="cg" :disabled="true"></v-button>
        <v-button size="s" type="cg" :disabled="true"></v-button>
      </div>
    </group>

    <group title="各种按钮/cg/plain/禁用">
      <div class="flexx">
        <v-button size="m" type="cg" :plain="true" :disabled="true"></v-button>
        <v-button size="s" type="cg" :plain="true" :disabled="true"></v-button>
      </div>
    </group>

    <group title="各种按钮/co">
      <div class="flexx">
        <v-button size="m" type="co"></v-button>
        <v-button size="s" type="co"></v-button>
      </div>
    </group>

    <group title="各种按钮/co/禁用">
      <div class="flexx">
        <v-button size="m" type="co" :disabled="true"></v-button>
        <v-button size="s" type="co" :disabled="true"></v-button>
      </div>
    </group>


    <group title="普通大按钮/cm/cg">
      <p style="padding:0.1rem"></p>
      <v-button></v-button>
      <p style="padding:0.1rem"></p>
      <v-button :plain="true"></v-button>
      <p style="padding:0.1rem"></p>
      <v-button type="cg"></v-button>
      <p style="padding:0.1rem"></p>
      <v-button type="cg" :plain="true"></v-button>
      <p style="padding:0.1rem"></p>
      <v-button type="co" :plain="true"></v-button>
      <p style="padding:0.1rem"></p>
    </group>

    <group title="并排按钮">
      <global-button-multiple></global-button-multiple>
    </group>
    <group title="并排按钮/禁用">
      <global-button-multiple :disabled="true"></global-button-multiple>
    </group>

    <group title="大按钮">
      <global-big-button>
        ￥<b style="padding:0 0.1rem">199999.00</b>确认支付
      </global-big-button>
    </group>

    <group title="交易类按钮/type1">
      <trade-button type="cg" slot-type="type1" @clickHandler="click" button-text="提交订单">
        <template slot="type1">
          <span class="tip">合计:</span>
          <span class="number">144</span>
          <span class="currency">元</span>
        </template>
      </trade-button>
    </group>
    <group title="交易类按钮/type2">
      <trade-button type="cm" slot-type="type2" @clickHandler="click" button-text="提交订单">
        <template slot="type2">
          <span class="number">144</span>
          <span class="currency">元</span>
        </template>
      </trade-button>
    </group>
    <group title="交易类按钮/type3">
      <trade-button type="cg" slot-type="type3" @clickHandler="click" button-text="提交订单">
        <template slot="type3">
          <span class="number">144<span class="currency">元</span>+<span>2323424</span><span class="currency">积分</span></span>
        </template>
      </trade-button>
    </group>
    <group title="交易类按钮/type4">
      <trade-button slot-type="type4" @clickHandler="click" button-text="提交订单">
        <template slot="type4">
          <span class="number">144<span class="currency">元</span></span>
          <span class="desc">优惠抵扣10元</span>
        </template>
      </trade-button>
    </group>
  </div>
</template>
<script>
import Group from '../../components/extend/group/index'
import GlobalButtonMultiple from '../../components/extend/globalButtonMultiple/index'
import GlobalBigButton from '../../components/extend/globalBigButton/index'
import TradeButton from '../../components/extend/tradeButton/index'

export default {
  components: {
    Group, GlobalButtonMultiple, GlobalBigButton, TradeButton
  },
  data() {
    return {}
  },
  methods: {
    click() {
      console.log('点击触发')
    }
  }
}
</script>
