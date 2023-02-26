import Mock from "mockjs";
import HomeApi from './mockData/home.js'
import UserApi from './mockData/user.js'
import PermissionApi from "./mockData/permission.js";
// 拦截请求
Mock.mock('/home/getDate',HomeApi.getHomeData)
Mock.mock(/user\/getuser/,'get',UserApi.getUserList)
Mock.mock(/user\/adduser/,'post',UserApi.createUser)
Mock.mock(/user\/edituser/,'post',UserApi.updateUser)
Mock.mock(/user\/deluser/,'get',UserApi.deleteUser)
Mock.mock(/permission\/getmenu/,'get',PermissionApi.getMenu)