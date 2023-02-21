import { createRouter,createWebHashHistory }from "vue-router";

const routes = [
  {
    path:'/',
    redirect:'/home',
    // 按需导入组件
    component:() => import('../components/views/Main.vue'),
    children:[
      {path:'home',component:() => import('../components/views/home/Home.vue')}
    ],
  },
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router