import { createRouter,createWebHashHistory }from "vue-router";

const routes = [
  {
    path:'/',
    redirect:'/home',
    name:'home1',
    // 按需导入组件
    component:() => import('../components/views/Main.vue'),
    // children:[
    //   {path:'home',name:'home',component:() => import('../components/views/home/Home.vue')},
    //   {path:'mall',name:'mall',component:() => import('../components/views/mall/Mall.vue')},
    //   {path:'user',name:'user',component:() => import('../components/views/user/User.vue')},
    //   {path:'page1',name:'page1',component:() => import('../components/views/other/PageOne.vue')},
    //   {path:'page2',name:'page2',component:() => import('../components/views/other/PageTwo.vue')},
    // ],
    children:[]
  },
  {path:'/login',name:'login',component:() => import('../components/Login.vue')  },
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router