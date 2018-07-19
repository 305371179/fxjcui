<template>
  <div class="cards">
    <group>
      <cell @click.native="toPick" is-link>
        <i slot="title" v-if="curCard.iconType" :class="`icon-bank-${curCard.iconType}`"></i>
        <span slot="title" class="curCard">{{curCard.key}}</span>
      </cell>
    </group>
    <select-card :cardList="cardList" v-model="isShown" @clickNormalItem="afterSelected" :defaultCard = "curCard.value"></select-card>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
import selectCard from '@comp/selectCard'
import props from './props'

export default {
  name: 'pickCard',
  props,
  components: {
    Group,
    Cell,
    selectCard,
  },
  data () {
    return {
      isShown: false,
      card: this.pickedCard
    }
  },
  computed: {
    curCard () {
      return this.card;
    }
  },
  methods: {
    toPick () {
      this.isShown = true;
    },
    afterSelected (cardData) {
      if (!cardData) return;
      this.card = cardData;
      this.$emit('input', cardData)
    }
  }
}
</script>

<style lang="sass">
@import '~@common/scss/bank.scss';
.cards {
  .weui-cells {
    margin-top: .24rem;
    font-size: .32rem;
  }

  .weui-cell {
    height: .64rem;
    padding: .2rem .3rem;
  }
}
</style>

