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
