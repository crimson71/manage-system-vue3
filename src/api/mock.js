import Mock from "mockjs";
import HomeApi from './mockData/home.js'
import UserApi from './mockData/user.js'
import PermissionApi from "./mockData/permission.js";
import OrderApi from './mockData/order.js'
import profile from "./mockData/profile.js";
// 拦截请求
Mock.mock('/home/getDate',HomeApi.getHomeData)
Mock.mock(/user\/getuser/,'get',UserApi.getUserList)
Mock.mock(/user\/adduser/,'post',UserApi.createUser)
Mock.mock(/user\/edituser/,'post',UserApi.updateUser)
Mock.mock(/user\/deluser/,'get',UserApi.deleteUser)
Mock.mock(/permission\/getmenu/,'get',PermissionApi.getMenu)
Mock.mock(/order\/getorderlist/,'get',OrderApi.getOrderList)
Mock.mock(/order\/editorder/,'post',OrderApi.editOrder)
Mock.mock(/profile\/editprofile/,'post',profile.editProfile)
Mock.mock(/profile\/getprofile/,'get',profile.getProfile)