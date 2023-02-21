
<template>
  <div class="common-layout">
    <el-container>
      <common-aside></common-aside>
      <el-container class="r-container">
        <el-header>
          <common-header></common-header>
        </el-header>
        <el-main>
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
export default defineComponent({
  setup() {
    
  },
  components:{
    CommonHeader,
    CommonAside
  }
})
</script>



<style lang="less" scoped>
.r-container {
  flex-wrap: wrap;
}


</style>