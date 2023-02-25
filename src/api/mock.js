import Mock from "mockjs";
import HomeApi from './mockData/home.js'
import UserApi from './mockData/user.js'
// 拦截请求
Mock.mock('/home/getDate',HomeApi.getHomeData)
Mock.mock(/user\/getuser/,'get',UserApi.getUserList)