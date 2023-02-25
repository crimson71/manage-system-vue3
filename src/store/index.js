
import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      isCollapse: true,
      menuList: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 'House',
          url: 'Home/Home'
        },
      ]
    }
  },
  mutations: {
    toggleisCollapse(state, payload) {
      state.isCollapse = !state.isCollapse

    },
    //  面包屑，组件间的数据传递
    selectMenu(state, val) {
      if(val.name === 'home') return       
      const index = state.menuList.findIndex(item => item.name === val.name)
      if(index === -1) state.menuList.push(val)
    },
    // 删除tags
    delTag(state,tag) {
      
      const res = state.menuList.findIndex(item => tag.name)
      if(res !== -1) {
        state.menuList.splice(res+1,1)
      }
      

    }
  }
})

export default store
