
<template>
  <div class="common-layout">
    <el-container>
      <common-aside></common-aside>
      <el-container class="r-container">
        <el-header>
          <common-header></common-header>
        </el-header>
        <el-main>
          <common-tag></common-tag>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
import { defineComponent } from 'vue'
import CommonHeader from '../CommonHeader.vue';
import CommonAside from '../CommonAside.vue';
import CommonTag from '../CommonTag.vue';
export default defineComponent({
  setup() {
    
  },
  components:{
    CommonHeader,
    CommonAside,
    CommonTag
  }
})
</script>



<style lang="less" scoped>

.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      padding: 0;
    }

  }
  
}

</style>