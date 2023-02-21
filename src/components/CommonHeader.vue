<template>
  <div class="header">
    <div class="l-container">
    <!-- 图标展示 -->
    <el-button size="small">
      <el-icon :size="20">
        <Menu />
      </el-icon>

    </el-button>
  </div>
  <div class="r-container">
    <el-dropdown>
    <span class="el-dropdown-link">
      <img class="user" :src="getImgSrc('avatar.jpg')" alt="">      
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
        
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  </div>

  </div>
 
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  
  setup() {
    const getImgSrc = (img) => {
    return  new URL(`../assets/images/${img}`,import.meta.url).href
  };
    return {
      getImgSrc
    }
    
  },
})
</script >


<style lang="less" scoped>
.header {
  display: flex;
  justify-content:space-between ;
  align-items: center;
  width: 100%;
  .r-container {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border:0;
    }
  }
}

</style>