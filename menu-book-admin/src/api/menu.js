import request from '@/utils/request'

export function addCategory (data) {
  return request({
    url: 'v1/category/addCategory',
    method: 'post',
    data
  })
}

export function upDateCategory (data) {
  return request({
    url: 'v1/category/upDateCategory',
    method: 'post',
    data
  })
}

// 获取商品分类
export function getCategory (params) {
  return request({
    url: `v1/category/getCategory`,
    method: 'get',
    params
  })
}

export function deleteProductCategory (id) {
  return request({
    url: `/category/${id}`,
    method: 'get'
  })
}

// 新增商品

export function postGoods (data) {
  return request({
    url: `cms/goods/addGood`,
    method: 'post',
    data
  })
}

// 修改商品
export function putGoods (data) {
  return request({
    url: '/goods',
    method: 'put',
    data
  })
}

// 查询商品列表

export function getGoods (params) {
  return request({
    url: `/cms/goods/getGoods`,
    method: 'get',
    params
  })
}

