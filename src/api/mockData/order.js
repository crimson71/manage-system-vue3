import Mock from 'mockjs'
// mock出订单数据
let orderList = []
const count = 200
Mock.Random.extend({
  phoneBrand: function () {
    const brand = ['小米', '苹果', 'vivo', 'oppo', '魅族', '三星']
    return this.pick(brand)
  },
  phoneNum: function () {
    const phonePrefix = ['182', '136', '188']
    return this.pick(phonePrefix) + Mock.mock(/\d{8}/)
  }

})
Mock.Random.phoneBrand()
Mock.Random.phoneNum()
for (let i = 0; i < count; i++) {
  orderList.push(
    Mock.mock({
      'orderNum|20230000-20239999': 20230000,
      goodsName: Mock.mock('@phoneBrand'),
      'price|1999-5999': 1999,
      'orderCount|1-5': 1,
      memberName: Mock.Random.cname(),
      memberPhone: Mock.mock('@phoneNum'),
      'orderStatus|1-5': 1,
      orderDate: Mock.Random.date('yyyy-MM-dd')
    })
  )
}

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

export default {
  // 获取订单信息
  // @param  orderNum,goodsName,memberName,orderStatus中其一，page,limit可选
  // @return {code:number,count:number,data:array}
  getOrderList: config => {
    console.log(config, 'cofing');
    let { orderNum, goodsName, memberName, orderStatus, page = 1, limit = 20 } = param2Obj(config.url)
    // console.log('options:'+searchOrderNum+'页码：'+ page,'分页大小limit：' + limit);
    orderNum = parseInt(orderNum)
    orderStatus = parseInt(orderStatus)
    let mockList = orderList
    //订单编号搜索
    if (orderNum) {
      mockList = orderList.filter(order => {
        if (order.orderNum !== orderNum) return false
        return true
      })
    }
    //商品名搜索
    if (goodsName) {
      mockList = orderList.filter(order => {
        if (order.goodsName !== goodsName) return false
        return true
      })
    }
    //会员名搜索
    if (memberName) {
      mockList = orderList.filter(order => {
        if (order.memberName !== memberName) return false
        return true
      })
    }
    //订单状态查询，0全部订单，1待付款，2待发货，3已发货，4已完成，5已取消
    if (orderStatus) {    
      mockList = orderList.filter(order => {
        if (order.orderStatus !== orderStatus) return false
        return true
      })

    }
   
    const orderListInfo = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        count: orderListInfo.length,
        data: orderListInfo
      }
    }

  },
  editOrder: config => {
    let { orderNum, goodsName, price, orderCount,  memberName,memberPhone,status } = JSON.parse(config.body)
    console.log(status ,'editorder');
     orderNum = parseInt(orderNum)
     price = parseInt(price)
     orderCount = parseInt(orderCount)
     status = parseInt(status)
     
    orderList.some(order => {
      if (order.orderNum === orderNum) {        
        order.goodsName = goodsName
        order.price = price
        order.orderCount = orderCount
        order.amountPrice = orderCount * price
        order.memberName = memberName
        order.memberPhone = memberPhone
        order.orderStatus = status       
        return true
      }
      
      console.log(order,'order'); 
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }

  }
