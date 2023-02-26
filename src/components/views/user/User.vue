<template>
  <div class="user-container">
    <div class="user-header">
      <!-- 添加用户 -->
      <el-button type="primary" size="large" @click="handelAdd"
        >+新增</el-button
      >
      <el-dialog
        v-model="dialogVisible"
        :title="action === 'add' ? '添加用户' : '编辑用户'"
        width="35%"
      >
        <el-form
          :inline="true"
          :model="formUser"
          :rules="userFormRule"
          ref="userForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="formUser.name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄" prop="age">
                <el-input
                  v-model.number="formUser.age"
                  placeholder="请输入年龄"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-select v-model="formUser.sex" placeholder="请选择性别">
                  <el-option label="女" value="1"></el-option>
                  <el-option label="男" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生日" prop="birth">
                <el-date-picker
                  v-model="formUser.birth"
                  type="date"
                  placeholder="选择生日"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item label="地址" prop="addr">
              <el-input v-model="formUser.addr" placeholder="请输入地址" />
            </el-form-item>
          </el-row>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
            <el-button @click="handelCancel">取消</el-button>
          </el-form-item>
        </el-form>
        <!-- <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              Confirm
            </el-button>
          </span>
        </template> -->
      </el-dialog>
      <!-- 搜索区 -->
      <el-form :inline="true" :model="searchform" class="demo-form-inline">
        <el-form-item label="搜索">
          <el-input v-model="searchform.keywords" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 用户信息表格 -->
    <el-table :data="tableData" stripe style="width: 100%" height="450">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 100"
        v-for="item in tableLabel"
        :key="item.label"
      />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="config.total"
      @current-change="changePage"
    />
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'

export default {
  setup() {
    const { proxy } = getCurrentInstance()
    onMounted(() => {
      getUserList(config)
    })
    const tableData = ref([])
    const config = reactive({
      total: 0,
      page: 1,
      name: ''
    })

    const tableLabel = reactive([
      { prop: 'name', label: '姓名' },
      { prop: 'age', label: '年龄' },
      { prop: 'sexlabel', label: '性别' },
      { prop: 'birth', label: '生日', width: 200 },
      { prop: 'addr', label: '地址', width: 320 }
    ])
    const getUserList = async (config) => {
      let res = await proxy.$api.getUserData(config)
      console.log(res, 'userlist')
      config.total = res.count
      tableData.value = res.list.map((item) => {
        item.sexlabel = item.sex === 0 ? '男' : '女'
        return item
      })
    }
    const changePage = (page) => {
      console.log(page)
      config.page = page
      getUserList(config)
    }

    // 添加用户
    let dialogVisible = ref(false)
    // 添加用户表单
    const formUser = reactive({
      name: '',
      age: '',
      sex: '',
      birth: '',
      addr: ''
    })

    // 搜索用户
    const searchform = reactive({
      keywords: ''
    })
    const handleSearch = () => {
      config.name = searchform.keywords
      searchform.keywords = ''
      getUserList(config)
    }
    // 控制用户信息添加模态框

    // 日期格式化
    const timeFormat = (time) => {
      let date = new Date(time)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d

      return `${y}-${m}-${d}`
    }

    const onSubmit = () => {
      // 提交数据同时校验
      proxy.$refs.userForm.validate(async (valid) => {
        if (valid) {
          if (action === 'add') {
            formUser.birth = timeFormat(formUser.birth)
            let res = await proxy.$api.addUser(formUser)
            if (res) {
              proxy.$refs.userForm.resetFields()
              getUserList(config)
              dialogVisible.value = false
            }
          } else {
            formUser.sex = formUser.sex === '男' ? 1 : 0
            let res = await proxy.$api.editUser(formUser)
            console.log(res);
            if(res)  {
              dialogVisible.value = false
              proxy.$refs.userForm.resetFields()
              getUserList(config)
            }
          }
        } else {
          ElMessage({
            type: 'error',
            message: '请输入正确的数据'
          })
        }
      })
    }

    // 点击取消按钮
    const handelCancel = () => {
      proxy.$refs.userForm.resetFields()
      dialogVisible.value = false
    }

    // 控制添加或编辑的模态框
    const action = ref('add')
    // 新增用户按钮功能的实现
    const handelAdd = () => {
      action.value = 'add'
      dialogVisible.value = true
    }

    // 编辑按钮功能的实现
    const handleEdit = async (row) => {
      action.value = 'edit'
      dialogVisible.value = true
      row.sex = row.sex === '0' ? '女' : '男'
      proxy.$nextTick(() => {
        Object.assign(formUser, row)
      })
    }
    const handleDelete =  (row) => {
      ElMessageBox.confirm('确定删除吗')
      .then(async () => {
        await proxy.$api.delUser({
          id:row.id
        })
        ElMessage({
          type:'success',
          message:'删除成功',
          showBox:true
        })
        getUserList(config)

      })
      .catch(() => {

      })


    }

    // 定义添加用户表单校验
    const userFormRule = reactive({
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
        { min: 2, max: 5, message: '长度为2-5', trigger: 'blur' }
      ],

      age: [
        { required: true, message: '请输入年龄', trigger: 'blur' },
        { type: 'number', message: '请输入数字', trigger: 'blur' }
      ],

      sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
      birth: [
        {
          type: 'date',
          required: true,
          message: '请选择出生日期',
          trigger: 'change'
        }
      ],
      addr: [{ required: true, message: '请输入地址', trigger: 'blur' }]
    })

    return {
      tableData,
      tableLabel,
      config,
      changePage,
      dialogVisible,
      formUser,
      searchform,
      handleSearch,
      onSubmit,
      timeFormat,
      userFormRule,
      handelCancel,
      action,
      handleEdit,
      handelAdd,
      handleDelete
    }
  }
}
</script>
>

<style lang="less" scoped>
.user-container {
  position: relative;
  width: 100%;
  height: 100%;
  .el-pagination {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .user-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
>
