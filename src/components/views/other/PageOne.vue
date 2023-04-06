<template>
  <div class="profile-setting-container">
    <el-row>
      <el-col :span="8" class="avatar">
        <div class="avatar-wrapper">
          <img src="../../../assets/images/avatar.jpg" class="avatar-img" />
          <h1>个人资料设置</h1>
        </div>
      </el-col>
      <el-col :span="16" class="profile">
        <el-form 
        label-width="100px" 
        :model="profileInfo" 
        style="width: 400px"
        :rules="profileRules"
        ref="profileRef">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="profileInfo.name" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="profileInfo.gender" class="ml-4">
              <el-radio label="1" size="large">男</el-radio>
              <el-radio label="2" size="large">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="profileInfo.birth"
              type="date"
              size="default"
              format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="profileInfo.email" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="profileInfo.phone" />
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="profileInfo.id" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">
              保存
            </el-button>
           
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue'
const { proxy } = getCurrentInstance()
const profileRef = ref()
let profileInfo = reactive({
  name: '',
  gender: '',
  birth: '',
  email: '',
  phone: '',
  id: ''
})
const profileRules = reactive({
  name: [{ required: true, message: '姓名不能为空' ,trigger: 'blur' },
  { min: 3, max: 5, message: '长度3-5', trigger: 'blur' }],
  phone:[
  { required: true, message: '手机号不为空', trigger: 'blur' },
    { min: 11, max:11, message: '手机号长度为11', trigger: 'blur' },

  ]
})
const initProfile = async () => {
  const res = await proxy.$api.getProfile()
  nextTick(() => {
    Object.assign(profileInfo, res)
  })
}
const submitForm = () => {
  profileRef.value.validate(async (valid) => {
    if(valid) {
      const res = await proxy.$api.editProfile(profileInfo)
      initProfile()
      ElMessage({
        type:'success',
        message:res.message
      })
    }
  })
  
}


onMounted(() => {
  initProfile()
})
</script>

<style lang="less" scoped>
.profile-setting-container {
  position: relative;
  width: 100%;
  background: #eee;
  height: 600px;
  .el-row {
    height: 500px;
    width: 90%;
    background: #fff;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .avatar {
      position: relative;
      background: #409eff;
      border-radius: 20px 0 0 20px;
      .avatar-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        .avatar-img {
          margin-bottom: 50px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }

        h1 {
          font-size: 30px;
        }
      }
    }
    .profile {
      position: relative;
      .el-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
