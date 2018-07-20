<template>
  <div>
    <group title="font-weight">
      <div class="h2">
        <div style="font-weight: 100;">文字粗细对照表font-weight: 100</div>
        <div style="font-weight: 200;">文字粗细对照表font-weight: 200</div>
        <div style="font-weight: 300;">文字粗细对照表font-weight: 300</div>
        <div style="font-weight: 400;">文字粗细对照表font-weight: 400</div>
        <div style="font-weight: 500;">文字粗细对照表font-weight: 500</div>
        <div style="font-weight: 600;">文字粗细对照表font-weight: 600</div>
        <div style="font-weight: 700;">文字粗细对照表font-weight: 700</div>
      </div>
    </group>
    <group title="字体排版">
      <div class="h1">h1:用于导航标题，全局按钮</div>
      <div class="h2">h2:用于列表标题</div>
      <div class="h3">h3:用于导航两侧文字按钮、文本标题、正文</div>
      <div class="h4">h4:用于副标题、段落正文、正文、二级banner、tabbar切换文字、表单小题/副标题</div>
      <div class="h5">h5:用于副标题、辅助性或提示文字、小按钮文字</div>
      <div class="h6">h6:用于副标题、辅助性或提示文字</div>
    </group>
  </div>
</template>
<script>
import Group from '../../fxjcui/extend/group/index'
export default {
  components: {
    Group
  },
  data() {
    return {}
  },
  methods: {
  }
}
</script>
