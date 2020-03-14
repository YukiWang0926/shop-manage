import {request} from "@/network/request";

export function requestUsers(query,pagenum,pagesize) {
  return request({
    url:"/users",
    params:{
      query,pagenum,pagesize
    }
  })
}
export function changeUsersStatus(uId,type) {
  return request({
    method:'put',
    url:`users/${uId}/state/${type}`,
  })
}

export function addPostUser(userForm) {
  const data = new URLSearchParams()
  for (let key of Object.keys(userForm)) {
    data.append(key,userForm[key])
  }
  return request({
    method:'post',
    url:'/users',
    data
  })
}
export function putEditUserForm(id, userForm) {
  const data = new URLSearchParams()
  for (let key of Object.keys(userForm)) {
    data.append(key,userForm[key])
  }
  return request({
    method:'put',
    url:`users/${id}`,
    data
  })
}

export function queryUserForm(id) {
  return request({
    method:'get',
    url:`users/${id}`,
    params:{
      id
    }
  })
}
export function deleteUser(id) {
  return request({
    method:'delete',
    url:`users/${id}`,
  })
}
