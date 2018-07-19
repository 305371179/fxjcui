<template>
  <div>
    <group title="两个选项">
      <tab-filter :selected="selected" :tabs="tabs1" @tabClick="tabClick"></tab-filter>
    </group>
    <group title="三个选项">
      <tab-filter :tabs="tabs2" @tabClick="tabClick"></tab-filter>
    </group>
    <group title="四个选项">
      <tab-filter :tabs="tabs3" @tabClick="tabClick"></tab-filter>
    </group>
  </div>
</template>
<script>
import Group from '../../components/extend/group/index'
import TabFilter from '../../components/extend/tabFilter/index'
export default {
  components: {
    Group, TabFilter
  },
  data() {
    return {
      selected: 'tab1',
      tabs1:[
        {key:'选项一',value:'tab1',selected:true,status: 'down'},
        {key:'选项二',value:'tab2'},
      ],
      tabs2:[
        {key:'选项一',value:'tab1'},
        {key:'选项二',value:'tab2',selected:true,status: 'down'},
        {key:'选项三',value:'tab3'}
      ],
      tabs3:[
        {key:'选项一',value:'tab1'},
        {key:'选项二',value:'tab2'},
        {key:'选项三',value:'tab3',selected:true,status: 'down'},
        {key:'选项四',value:'tab4'}
      ]
    }
  },
  methods: {
    tabClick(item){
      console.log(item)
    }
  }
}
</script>
