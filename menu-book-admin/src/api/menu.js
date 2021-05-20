import request from '@/utils/request'
// 添加分类
export function addCategory (data) {
  return request({
    url: 'v1/category/addCategory',
    method: 'post',
    data
  })
}
// 修改分类
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

export function addmMenu (data) {
  return request({
    url: `v1/menu/addmMenu`,
    method: 'post',
    data
  })
}
// 修改分类

export function updataMenu (data) {
  return request({
    url: `v1/menu/updataMenu/${data.id}`,
    method: 'post',
    data
  })
}


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

// 获取菜谱列表
export function getMenuList (params) {
  return request({
    url: `v1/menu/getMenuList`,
    method: 'get',
    params
  })
}



// 通过id获取菜谱信息
export function getMenuById (id) {
  return request({
    url: `v1/menu/getMenuById/${id}`,
    method: 'get'
  })
}


