<template>
  <el-card style="width: 380px;">
    <template #header>
      <div class="card-header">
        <h3>用户登陆</h3>       
      </div>
    </template>
    <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="loginForm"
    style="max-width: 460px"
  >
    <el-form-item label="用户名">
      <el-input v-model="loginForm.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登陆</el-button>
      
    </el-form-item>
  </el-form>
    
 
  </el-card>
</template>

<script>
import { getCurrentInstance, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const {proxy} = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    let loginForm = reactive({
      username:'',
      password:''
    })

    const onSubmit = async () => {
      let res = await proxy.$api.getUserMenu(loginForm)      
      store.commit('setMenu',res.menu)
      store.commit('getMenu',router)
      store.commit('setToken',res.token)
      router.push({name:'home'})

    }

    return {
      loginForm,
      onSubmit,
    }
  },
}
</script>

<style lang="less" scoped>
.el-card {
  margin:100px auto;
  text-align: center;
  .card-header{
    h3{
      color:#505450;
      font-size: 20px;

    }
    

  }
  .el-button{
    margin-left: 40px;
  }
  
}
</style>>