<template>
  <el-aside :width="$store.state.isCollapse ? '180px' : '90px'" >
    <el-menu
    
      class="el-menu-vertical-demo"
      
      text-color="#fff"
      background-color="#545c64"
      active-text-color="#ffd04b"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
    <h3 v-show="$store.state.isCollapse">地瓜后台管理</h3>
    <h3 v-show="!$store.state.isCollapse">后台</h3>
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <el-icon><icon-menu /></el-icon>
        <!-- 动态引入icon -->
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.path"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group >
          <el-menu-item v-for="(subItem,subIndex) in item.children" :key="subIndex"  @click="clickMenu(subItem)">
            <component class="icons" :is="subItem.icon"></component>
          <span>{{ subItem.label }}</span>  
          </el-menu-item>          
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const list = JSON.parse(localStorage.getItem('menu')) 
    
    const hasChildren = () => {
      return list.filter((item) => item.children)
    }
    const noChildren = () => {
      return list.filter((item) => !item.children)
    }
    const clickMenu = (item) => {
      console.log(item.path);
      router.push({
        name:item.name
      })
      // 管理面包屑
      store.commit('selectMenu',item)
    }
    
    return {
      hasChildren,
      noChildren,
      clickMenu
      
    }
  }
}
</script>

<style lang="less" scoped>

.icons {
  width: 28px;
  height: 28px;
}
.el-aside {
  background: #545c64;
  border-right: 0 solid transparent;
  .el-menu {
    border-right: 0;
    h3 {
      color: #fff;
      font-weight: 400;
      font-size: 18px;
      text-align: center;
      padding-top: 20px;
    }
  }
}


</style>
