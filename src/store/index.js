
import { createStore } from 'vuex'
import cookie from 'js-cookie'
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
      ],
      // 用户对应菜单
      menu:[],
      token:'',
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
    },
    // 设置用户对应菜单
    setMenu(state,val) {
      state.menu = val
      // 存储menu
      localStorage.setItem('menu',JSON.stringify(state.menu))
    },
    // 防止菜单数据在刷新后丢失
    getMenu(state,router) {
      if(!localStorage.getItem('menu')) return
      const menu = JSON.parse(localStorage.getItem('menu'))
      state.menu = menu

      // 动态添加路由
      const menuArray = []
      menu.forEach(item => {
        if(item.children) {
          item.children = item.children.map(item => {
            let url = `../components/views/${item.url}`
            item.component = () => import(/* @vite-ignore */url)
            return item
          })
          menuArray.push(...item.children)
        }else {
          let url = `../components/views/${item.url}`
          item.component = () => import(/* @vite-ignore */url)
          menuArray.push(item)

        }
      })
      menuArray.forEach(item => {
        router.addRoute('home1',item)
      })



    },

    cleanMenu(state) {
      state.menu = []
      localStorage.removeItem('menu')
    },
    setToken(state,token) {
      state.token = token
      cookie.set('token',token)
    },
    clearToken(state) {
      state.token = ''
      cookie.remove('token')
    },
    getToken(state) {
      state.token = state.token || cookie.get('token')
    }
  }
})

export default store
