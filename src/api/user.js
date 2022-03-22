import request from '@/utils/request'


//机构登录
export function agencyLogin(data) {
  return request({
    url: '/institutionAccount/institutionLogin',
    method: 'post',
    data
  })
}

//管理员登录
export function rootLogin(data) {
  return request({
    url: '/institutionAccount/rootLogin',
    method: 'post',
    data
  })
}

//查询当前登录用户信息
export function queryUserInfo() {
  return request({
    url: '/institutionAccount/queryLoginInstitutionDate',
    method: 'get'
  })
}

//添加机构
export function addAgency(data) {
  return request({
    url: '/institutionAccount/register',
    method: 'post',
    data
  })
}


//修改机构
export function reviseAgency(data) {
  return request({
    url: '/institutionAccount/modifiedData',
    method: 'post',
    data
  })
}
//查询机构
export function queryInstitutionList(params) {
  return request({
    url: '/institutionAccount/queryInstitutionList',
    method: 'get',
    params
  })
}

//重置密码
export function resetPassword(data) {
  return request({
    url: '/institutionAccount/resetPassword',
    method: 'post',
    data
  })
}

//查询用户
export function queryUser(params) {
  return request({
    url: '/user/queryUsers',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
