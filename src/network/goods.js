import {request} from "@/network/request";

export function addGoods() {
  return request({
    method: 'post',
    url: 'goods',
  })
}

export function getCategories(type, pagenum, pagesize) {
  return request({
    url: 'categories',
    params: {
      type, pagenum, pagesize
    }
  })
}

export function AddCategories(form) {
  const data = new URLSearchParams()
  for (let key of Object.keys(form)) {
    data.append(key, form[key])
  }
  return request({
    method: 'post',
    url: 'categories',
    data
  })
}

export function deleteCategories(id) {
  return request({
    url: `categories/${id}`,
    method: 'delete'
  })
}

export function queryCateById(id) {
  return request({
    url:`categories/${id}`,
    method:'get'
  })
}

export function editCategories(id,cat_name) {
  const data= new URLSearchParams()
  data.append('cat_name',cat_name)
return request({
  url:`categories/${id}`,
  method:'put',
  data
})
}
