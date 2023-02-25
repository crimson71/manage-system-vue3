<template>
  <div class="user-container">
    <div class="user-header">
      <el-button type="primary" size="large" @click="dialogVisible = !dialogVisible">+</el-button>
      <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>添加用户</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
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
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
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
      page: 1
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
        item.sexlabel = item.sex === 0 ? '女' : '男'
        return item
      })
    }
    const changePage = (page) => {
      console.log(page)
      config.page = page
      getUserList(config)
    }

    // 添加用户
    const dialogVisible  = ref(false)
  
    return {
      tableData,
      tableLabel,
      config,
      changePage,
      dialogVisible
    }
  }
}
</script>
>

<style lang="less" scoped>
.user-container {
  position: relative;
  width: 100%;
  height: 80%;
  .el-pagination {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
>
