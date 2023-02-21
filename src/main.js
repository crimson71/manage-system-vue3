import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import router from './router/index.js'
// 全局引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// icon图标注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(router)

app.mount('#app')