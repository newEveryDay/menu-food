import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/v1/token',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/v1/userInfo',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
