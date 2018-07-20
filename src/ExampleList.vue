<template>
  <div>
    <group title="组件列表">
        <cell @clickHandler="goto(item)" :key="index" v-for="item,index in data"  :title="{desc:item}" :isLink="true"></cell>
    </group>
  </div>
</template>

<script>
  import Group from './fxjcui/extend/group'
  import Cell from './fxjcui/extend/cell'
  import {componentsName} from './demo/js/routerTools'
export default {
  components:{
    Group, Cell
  },
  data:function(){
    return {
      data:componentsName
    }
  },
  methods:{
    goto(item){
      this.$router.push({name:item})
    }
  },
  mounted(){
  }
}
</script>

<style>
</style>
