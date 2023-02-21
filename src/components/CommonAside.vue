<template>
  <el-aside width="200px" >
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      text-color="#fff"
      background-color="#545c64"
      active-text-color="#ffd04b"
      :collapse="false"
    >
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
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
          <el-menu-item v-for="(subItem,subIndex) in item.children" :key="subIndex" >
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
export default {
  setup() {
    const list = [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'House',
        url: 'Home/Home'
      },
      {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'MallManage/MallManage'
      },
      {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'UserManage/UserManage'
      },
      {
        label: '其他',
        path: '/other',
        icon: 'location',
        children: [
          {
            path: '/page1',
            name: 'page1',
            label: '页面1',
            icon: 'setting',
            url: 'Other/PageOne'
          },
          {
            path: '/page2',
            name: 'page2',
            label: '页面2',
            icon: 'setting',
            url: 'Other/PageTwo'
          }
        ]
      }
    ]
    const hasChildren = () => {
      return list.filter((item) => item.children)
    }
    const noChildren = () => {
      return list.filter((item) => !item.children)
    }
    
    return {
      hasChildren,
      noChildren
    }
  }
}
</script>

<style lang="less" scoped>
.el-aside {
  height: 100vh;
}
.icons {
  width: 28px;
  height: 28px;
}
</style>
