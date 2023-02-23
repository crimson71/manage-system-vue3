// 环境配置文件
// 一般有三个环境
// 开发环境
// 测试环境
// 线上环境

// 判断当前环境，默认为prod线上环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  // 开发环境
  development:{
    baseApi:'/api',
    mockApi:'https://www.fastmock.site/mock/993ba76d0dda79a331b1d841362f459f/api'

  },
  test:{
    baseApi:'test.future.com/api',
    mockApi:'https://www.fastmock.site/mock/993ba76d0dda79a331b1d841362f459f/api'

  },
  pro:{
    baseApi:'//future.com/api',
    mockApi:'https://www.fastmock.site/mock/993ba76d0dda79a331b1d841362f459f/api'

  },
}

export default {
  env,
  // mock开关
  mock:true,
  ...EnvConfig[env]
}