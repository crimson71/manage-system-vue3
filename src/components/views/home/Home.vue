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

    <!-- 拆线图 -->
    <el-card style="height:280px">
      <div ref="echart" style="height: 280px;">

      </div>

    </el-card>

    <div class="graph">
      <!-- 柱状图 -->
      <el-card  >
        <div ref="bar-echart" style="height: 260px;"></div>
      </el-card>
      <!-- 饼状图 -->
      <el-card >
        <div style="height: 260px;" ref="pie-echart"></div>
      </el-card>
    </div>

    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import * as echarts from 'echarts'


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
    // echarts表格的渲染
    let xOptions = reactive(
      {
    legend: {
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
    },
    grid: {
      left: "20%",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 类目轴
      data: [],
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
      },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
  })

  let pieOptions = reactive(
    {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [],
        }
  )
  let userData = reactive({
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: [],
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [],
        })

  let videoData = reactive({
    series:[]
  })
  let orderData = reactive({
    series:[],
    xData:[]
  })

  // 获取数据
  const getEchartList = async () => {
    const result = await proxy.$api.getEchartData()
    
    let res = result.orderData
    let userRes = result.userData
    let videoRes = result.videoData
    
    orderData.xData = res.date
    const keyArray = Object.keys(res.data[0])
    const series = []
    keyArray.forEach(key => {
      series.push({
        name:key,
        data:res.data.map(item => item[key]),
        type:'line'
      })

    })
    orderData.series = series
    xOptions.xAxis.data = orderData.xData
    xOptions.series = orderData.series
    // 设置折线图
    let hEcharts = echarts.init(proxy.$refs['echart'])
    hEcharts.setOption(xOptions)
    // 设置柱状图用户userRes
    userData.xData = userRes.map(item => item.date)
    userData.series = [{
      type:'bar',
      name:'新增用户',
      data:userRes.map(item => item.new)
    },
    {
      type:'bar',
      name:'活跃用户',
      data:userRes.map(item => item.active)
    },
  ]
  xOptions.xAxis.data = userData.xData
    xOptions.series = userData.series
  let barEchart = echarts.init(proxy.$refs['bar-echart'])
  barEchart.setOption(xOptions)

  // 设置饼状图用户videoRes
  
  
  videoData.series = {
    type:'pie',
    data:videoRes
  }
  pieOptions.series = videoData.series
  let pieEchart = echarts.init(proxy.$refs['pie-echart'])
  pieEchart.setOption(pieOptions)


  }
    onMounted(() => {
      getTableList(),
      getCountList(),
      getEchartList()
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
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}

</style>
