<template>
  <div>
    <group title="两个选项">
      <tab-item :item="item1" :selected="selected" @clickHandler="clickHandler"></tab-item>
    </group>
    <group title="三个选项">
      <tab-item :item="item2" :selected="selected" @clickHandler="clickHandler"></tab-item>
    </group>
    <group title="四个选项">
      <tab-item :item="item3" :selected="selected" @clickHandler="clickHandler"></tab-item>
    </group>
    <group title="五个选项">
      <tab-item :item="item4" :selected="selected" @clickHandler="clickHandler"></tab-item>
    </group>
    <group title="六个选项">
      <tab-item :item="item5" :selected="selected" @clickHandler="clickHandler"></tab-item>
    </group>

  </div>
</template>
<script>
import Group from '../../components/extend/group/index'
import TabItem from '../../components/extend/tabItem/index'
export default {
  components: {
    Group, TabItem
  },
  data() {
    return {
      barStyle:'black',
      selected:1,
      item1:[
          {title:'选项一',message:true},
          {title:'选项二'}
        ],
      item2:[
          {title:'选项一',message:true},
          {title:'选项二'},
          {title:'选项三'},
        ],
      item3:[
          {title:'选项一',message:true},
          {title:'选项二'},
          {title:'选项三'},
          {title:'选项四'},
        ],
      item4:[
          {title:'选项一',message:true},
          {title:'选项二'},
          {title:'选项三'},
          {title:'选项四'},
          {title:'选项五'},
        ],
      item5:[
          {title:'选项一',message:true},
          {title:'选项二'},
          {title:'选项三'},
          {title:'选项四'},
          {title:'选项五'},
          {title:'选项六'},
        ],
    }
  },
  mounted(){
    setTimeout(()=>{
      this.selected=3
    },1000)
  },
  methods: {
    clickHandler(item){
      console.log(item)
    }
  }
}
</script>
