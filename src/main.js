import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import router from './router/index.js'
// 全局引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/less/index.less'
import store from './store/index.js'
import './api/mock.js'
import api from './api/api.js'
const app = createApp(App)
// icon图标注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
app.use(store)
app.config.globalProperties.$api = api
app.mount('#app')
