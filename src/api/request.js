// 二次封装axios
import axios  from "axios";
import config from "./config";

import { ElMessage } from 'element-plus'
const NETWORK_ERROR = '糟糕，网络异常，请稍后重试'
// 创建一个axios实例对象
const service = axios.create({
  baseURL:config.baseApi
})

service.interceptors.request.use((req) => {
  return req
})

service.interceptors.response.use((res) => {
  const {code,data,msg} = res.data
  if(code === 200) {    
    return data
  }else {
    ElMessage.error({
      message:msg || NETWORK_ERROR ,
      duration:3000
    })
    return Promise.reject(msg || NETWORK_ERROR)
  }
})
/*传递过来的options格式是{
  method:'get'||'post',
  data:.....,
  mock:true||false
}

*/
function request(options) {
  // axios请求的类型默认是get
  options.method  = options.method || 'get'
  if(options.method.toLowerCase() == 'get') {
    options.params = options.data
  }

  // 对mock的处理,config.mock是mock总开关
  let isMock = config.mock
  if(typeof options.mock !== 'undefined') {
    // 不同的接口可以自定义mock
    isMock = options.mock
  }

  if(config.env == 'prod') {
    // 判断环境,如果是prod开发环境则不能使用mockapi
    service.defaults.baseURL = config.baseApi
  }else {
    // 根据传过来的参数使用api如果打开了mock使用mockapi,没有内里用baseapi
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  
  return service(options)
}

export default request