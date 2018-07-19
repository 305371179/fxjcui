<template>
  <div>
    <v-header :show="true" :barStyle="barStyle" :rightOptions="rightOptions">
      <div slot="overwrite-title">标题</div>
    </v-header>
    <p class="h1" style="color:red;">v-header控件要在app环境下运行才能看到效果</p>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      barStyle:'black',
      rightOptions:[
          {title:'选项一'}
        ]
    }
  },
  methods: {
  }
}
</script>
