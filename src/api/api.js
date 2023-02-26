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
 },

 getEchartData(params) {
  return request({
    url:'/home/getEchartData',
    method:'get',
    data:params,
    mock:true
  })
 } ,
 getUserData(params) {  
  return request({
    url:'/user/getuser',
    method:'get',
    mock:false,
    data:params
  })
 },

 addUser(params) {
  return request({
    url:'/user/adduser',
    method:'post',
    data:params,
    mock:false
  })
 },

 editUser(params) {
  return request({
    url:'/user/edituser',
    method:'post',
    data:params,
    mock:false
  })
 },

 delUser(params) {
  return request({
    url:'/user/deluser',
    method:'get',
    data:params,
    mock:false
  })
 },
//  获取用户对应菜单
getUserMenu(params) {
  return request({
    url:'/permission/getmenu',
    data:params,
    method:'get',
    mock:false
  })

}
  
}