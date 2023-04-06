<template>
  <div class="order-container">
    <!-- 订单详情卡片 -->
    <el-dialog
      v-model="dialogTableVisible"
      :title="dialogTitle"
      center
      width="50%"
    >
      <el-form
        :model="orderDetail"
        label-width="120px"
        label-position="left"
        inline
        ref="editOrderRef"
        :rules="editOrderRules"
      >
        <el-form-item label="订单编号">
          <p style="display: inline-block; width: 100px">
            {{ orderDetail.orderNum }}
          </p>
        </el-form-item>
        <el-form-item label="商品" prop="goodsName">
          <el-input v-model.trim="orderDetail.goodsName" />
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="orderDetail.price" />
        </el-form-item>
        <el-form-item label="数量" prop="orderCount">
          <el-input v-model="orderDetail.orderCount" />
        </el-form-item>
        <el-form-item label="金额" prop="amountPrice">
          <el-input v-model="orderDetail.amountPrice" />
        </el-form-item>
        <el-form-item label="会员" prop="memberName">
          <el-input v-model="orderDetail.memberName" />
        </el-form-item>
        <el-form-item label="会员电话" prop="memberPhone">
          <el-input v-model="orderDetail.memberPhone" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input
            v-model="orderDetail.status"
            v-if="action === 'showDetail'"
          />
          <el-select
            v-model="orderDetail.status"
            placeholder="选择订单状态"
            style="width: 115px"
            v-if="action === 'edit'"
            >
            <el-option label="待付款" value="1" />
            <el-option label="待发货" value="2" />
            <el-option label="已发货" value="3" />
            <el-option label="已完成" value="4" />
            <el-option label="已取消" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="action === 'edit'" prop="status">
          <el-button type="primary" @click="submitOrder">提交</el-button>
          <el-button @click="dialogTableVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="search-order">
      <el-form
        :inline="true"
        :model="orderSearchForm"
        class="demo-form-inline"
        width=""
        ref="searchFormRef"
        :rules="searchRules"
      >
        <el-form-item label="订单编号" prop="orderNum">
          <el-input v-model="orderSearchForm.orderNum" />
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model.trim="orderSearchForm.goodsName" />
        </el-form-item>

        <el-form-item label="会员">
          <el-input
            v-model.trim="orderSearchForm.memberName"
            placeholder="请输入昵称"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchOrder">搜索</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">导出</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <ul class="order-select">
      <li
        :class="currentIndex === 0 ? 'active-li' : ''"
        @click="selectOrderTab(0, 0)"
      >
        全部订单
      </li>
      <li
        :class="currentIndex === 1 ? 'active-li' : ''"
        @click="selectOrderTab(1, 1)"
      >
        待付款
      </li>
      <li
        :class="currentIndex === 2 ? 'active-li' : ''"
        @click="selectOrderTab(2, 2)"
      >
        待发货
      </li>
      <li
        :class="currentIndex === 3 ? 'active-li' : ''"
        @click="selectOrderTab(3, 3)"
      >
        已发货
      </li>
      <li
        :class="currentIndex === 4 ? 'active-li' : ''"
        @click="selectOrderTab(4, 4)"
      >
        已完成
      </li>
      <li
        :class="currentIndex === 5 ? 'active-li' : ''"
        @click="selectOrderTab(5, 5)"
      >
        已取消
      </li>
    </ul>

    <!-- 订单列表table -->
    <div class="order-list">
      <el-table
        :data="orderList"
        border
        stripe
        height="800"
        style="width: 100%"
        class=""
      >
        <el-table-column
          v-for="item in tableLabel"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 120"
        />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-link type="primary" @click="showOrderDetail(scope.row)"
              >订单详情</el-link
            >
            <el-link type="primary" @click="editOrder(scope.row)"
              >修改订单</el-link
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, getCurrentInstance, ref, nextTick } from 'vue'
const editOrderRef = ref()
const { proxy } = getCurrentInstance()
const orderSearchForm = reactive({
  orderNum: '',
  goodsName: '',
  memberName: ''
})
const searchRules = reactive({
  orderNum: [{ min: 8, max: 8, message: '订单编号长度为8', trigger: 'blur' }]
})
let orderList = ref([])
//初始化订单列表
const initOrderList = async (config) => {
  const { data } = await proxy.$api.getOrderList(config)
  orderList.value = data.map((item) => {
    switch (item.orderStatus) {
      case 1:
        item.status = '待付款'
        break
      case 2:
        item.status = '待发货'
        break
      case 3:
        item.status = '已发货'
        break
      case 4:
        item.status = '已完成'
        break
      case 5:
        item.status = '已取消'
        break
    }

    item.amountPrice = item.price * item.orderCount
    return item
  })
}
const searchFormRef = ref()
//查询订单
const searchOrder = () => {
  searchFormRef.value.validate(async (valid) => {
    if (valid) {
      initOrderList({
        orderNum: orderSearchForm.orderNum,
        goodsName: orderSearchForm.goodsName,
        memberName: orderSearchForm.memberName,
        page: 1,
        limit: 20
      })
    } else {
      ElMessage({
        type: 'error',
        message: '请输入正确的数据'
      })
    }
  })
}
//订单状态tab栏
let currentIndex = ref(0)
const selectOrderTab = (status, index) => {
  initOrderList({ orderStatus: status, limit: 20, page: 1 })
  currentIndex.value = index
}
const tableLabel = reactive([
  { prop: 'orderNum', label: '订单编号', width: 180 },
  { prop: 'goodsName', label: '商品', width: 150 },
  { prop: 'price', label: '单价' },
  { prop: 'orderCount', label: '数量' },
  { prop: 'amountPrice', label: '金额' },
  { prop: 'memberName', label: '会员' },
  { prop: 'status', label: '状态' },
  { prop: 'orderDate', label: '创建时间', width: 200 }
])
//订单详情显示代码块
const dialogTableVisible = ref(false)
const action = ref('show')
const dialogTitle = ref('')
let orderDetail = reactive({
  orderNum: '',
  goodsName: '',
  price: 0,
  orderCount: 0,
  amountPrice: 0,
  memberName: '',
  memberPhone: '',
  status: ''
})
const showOrderDetail = (row) => {
  action.value = 'showDetail'
  dialogTitle.value = '订单详情'
  dialogTableVisible.value = true
  switch (orderDetail.status) {
    case 1:
      orderDetail.status = '待付款'
      break
    case 2:
      orderDetail.status = '待发货'
      break
    case 3:
      orderDetail.status = '已发货'
      break
    case 4:
      orderDetail.status = '已完成'
      break
    case 5:
      orderDetail.status = '已取消'
      break
  }
  nextTick(() => {
    Object.assign(orderDetail, row)
    console.log(orderDetail, 'orderlist')
  })
}
//修改价格
const editOrderRules = reactive({
  goodsName: [{ required: true, message: '商品名不能为空', trigger: 'blur' }],
  price: [{ required: true, message: '价格不能为空', trigger: 'blur' }],
  orderCount: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
  amountPrice: [{ required: true, message: '总价不能为空', trigger: 'blur' }],
  memberName: [{ required: true, message: '会员名不能为空', trigger: 'blur' }],
  memberPhone: [
    { required: true, message: '会员电话不能为空', trigger: 'blur' }
  ],
  status: [{ required: true, message: '请选择订单状态', trigger: 'change' }]
})
const editOrder = (row) => {
  action.value = 'edit'
  dialogTableVisible.value = true
  dialogTitle.value = '修改订单'
  nextTick(() => {
    Object.assign(orderDetail, row)
    console.log(orderDetail, 'orderlist')
  })
}
const submitOrder = () => {
  editOrderRef.value.validate(async (valid) => {
    if (valid) {
     switch(orderDetail.status ) {
      case '待付款' :
      orderDetail.status = 1
      break
      case '待发货' :
      orderDetail.status = 2
      break
      case '已发货' :
      orderDetail.status = 3
      break
      case '已完成' :
      orderDetail.status = 4
      break
      case '已取消' :
      orderDetail.status = 5
      break
     }
       const res = await proxy.$api.editOrder(orderDetail)
      console.log(res)
      if (res) {
        editOrderRef.value.resetFields()
        initOrderList({ page: 1, limit: 20 })
        dialogTableVisible.value = false
        ElMessage({
          message: res.message,
          type: 'success'
        })
      }
    }
  })
}

onMounted(() => {
  initOrderList({ limit: 20, page: 1 })
})
</script>

<style lang="less" scoped>
.order-container {
  .search-order {
    .el-input {
      width: 150px;
    }
  }
  .order-select {
    display: flex;
    border-bottom: 1px solid #7cb6f0;
    li {
      cursor: pointer;
      color: #999;
      font-size: 16px;
      padding: 10px 40px;
      border: 1px solid #7cb6f0;
      margin-right: 10px;
      border-bottom: 0;
    }
    .active-li {
      color: #409eff;
    }
  }
}
</style>
