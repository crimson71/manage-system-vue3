// 性别：1：男，2：女
let profile = {
  name:'admin',
  gender:"1",
  birth:'1988-01-01',
  email:'123@email.com',
  phone:'1225797879',
  id:'123456789012345678',
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
export default{
  getProfile:() =>{
    return {
      code:200,
      message:'获取个人信息成功',
      data:profile
    }
  },
  editProfile: config => {
    const {name,gender,birth,email,phone,id} = JSON.parse(config.body)
    console.log(name,gender,birth,email,phone,id,'profi');    
    profile.name = name
    profile.gender = gender
    profile.birth = birth
    profile.email = email
    profile.phone = phone
    profile.id = id
    return {
      code:200,
      data:{
        message:'修改成功'

      }
      
    }
    


  }
}