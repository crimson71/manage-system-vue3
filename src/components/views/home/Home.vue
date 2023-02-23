<template>
  <el-row :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <!-- 用户信息卡片 -->
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <img
              src="../../../assets/images/avatar.jpg"
              alt=""
              class="avatar"
            />
            <div class="user-info">
              <h3 class="username">Admin</h3>
              <p class="access">超级管理员</p>
            </div>
          </div>
        </template>
        <div class="login-info">
          <p>上次登陆信息: <span>2023-03-03</span></p>
          <p>上次登陆地点: <span>中国</span></p>
        </div>
      </el-card>
      <!-- 销量卡片 -->
      <el-card shadow="hover" style="margin-top: 20px; height: 450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧卡片部分 -->
    <el-col :span="16" style="margin-top: 20px"> 
    <div class="count">
      <el-card 
      :body-style="{display:'flex',padding:0}"
      v-for="item in countData"
      :key="item.name" 
      >
      <component class="icons" :is="item.icon" :style="{background:item.color,textAlign:'center'}"
      size="20"></component>
      <div class="detail">
        <p class="txt">{{item.name}}</p>
      <p class="price">￥{{item.value}}</p>

      </div>
      
      


      </el-card>
    </div>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
import axios from 'axios'


export default defineComponent({
  setup() {
    const {proxy} = getCurrentInstance()
    let tableData = ref([])
    const tableLabel = {
      name: '品牌',
      todayBuy: '今日销量',
      monthBuy: '月销量',
      totalBuy: '总销量'
    }
    let countData = ref([])
    const getTableList = async () => {
      const res = await proxy.$api.getTableData()
      // console.log(res);
      tableData.value = res
     
      
    }

    const getCountList = async () => {
      const res = await proxy.$api.getCountData()
      
      countData.value = res


    }
    
    onMounted(() => {
      getTableList(),
      getCountList()
    })

    return {
      tableData,
      tableLabel,
      countData
    }
  }
})
</script>
>

<style lang="less" scoped>
.card-header {
  display: flex;
  text-align: center;
  padding: 0 30px;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 50px;
  }
  .username {
    font-size: 24px;
    margin: 20px 0;
  }
}
.login-info {
  p {
    color: #999;
    line-height: 30px;
    font-size: 14px;
    span {
      color: #666;
      padding-left: 60px;
    }
  }
}
.count {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      color: #fff;
    }
    .detail{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;
      .txt {
        margin-bottom: 10px;
        font-size: 14px;
        color: #999;
       
      }
      .price {
          font-size: 30px;

        }
    }
  }
}
</style>
