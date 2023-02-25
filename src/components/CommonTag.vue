<template>
  <div class="tags">
    <el-tag
    v-for="(tag,index) in tags"
    :key="tag.name"
    class="mx-1"
    :closable="tag.name !== 'home'"
    :effect="tag.name === $route.name ? 'dark' : 'plain'"
    :type="tag.type"
    size="large"
    @click="changeMenu(tag)"
    @close="closetag(tag,index)"
    
  >
    {{ tag.label }}
  </el-tag>

  </div>
  
</template>

<script>
import { useRouter,useRoute } from "vue-router";
import {useStore} from 'vuex'
export default {
  
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const tags = store.state.menuList
    const changeMenu = (item) => {
      router.push({name:item.name})

    }
    const closetag =(item,i) => {
      let length = tags.length-1
      store.commit('delTag',item)
      // 如果点击的关闭tag不是当前页面
      if(item.name !== route.name ) return
      // 如果点击的关闭tag是当前页面
      if(item.name === route.name) {
        // 当点击的是最后一个tag
        if(i === length) {
          // 路由向前一个tag的跳转
          router.push({
            name:tags[i-1].name
          })
        } else {
          // 路由向后一个tag跳转
          router.push({
            name:tags[i].name
          })
        }

      }

    }
    
    return {
      tags,
      changeMenu,
      closetag,
    }
    
  },
}
</script>>

<style lang="less" scoped>
.tags {  
  width: 100%;
  padding-bottom: 20px;

 :deep(.el-tag) {
    margin-right: 10px;
    cursor: pointer;
    
  }
}

</style>>