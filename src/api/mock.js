import Mock from "mockjs";
import HomeApi from './mockData/home.js'
// 拦截请求
Mock.mock('/home/getDate',HomeApi.getHomeData)