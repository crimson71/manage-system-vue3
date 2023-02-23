// 整个项目api的管理

import request from "./request";
export default {
  // home组件左侧表格数据的获取
  getTableData(params) {
    return request({
      url:'/home/getDate',
      methods: 'get',
      data:params,
      mock:true
    }) 
  },
 getCountData(params) {
  return  request({
    methods:'get',
    url:'/home/getCountData',
    data:params,
    mock:true
  })
 }
  
}