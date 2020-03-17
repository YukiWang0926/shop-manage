import {request} from "@/network/request";

function requestUsers(query,pagenum,pagesize) {
  return request({
    url:"/users",
    params:{
      query,pagenum,pagesize
    }
  })
}
function changeUsersStatus(uId,type) {
  return request({
    method:'put',
    url:`users/${uId}/state/${type}`,
  })
}

function addPostUser(userForm) {
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
function putEditUserForm(id, userForm) {
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

function queryUserForm(id) {
  return request({
    method:'get',
    url:`users/${id}`,
    params:{
      id
    }
  })
}
function deleteUser(id) {
  return request({
    method:'delete',
    url:`users/${id}`,
  })
}

function AssignUserRole(id,rid) {
  const data = new URLSearchParams()
  data.append('rid',rid)
return request({
  method:'put',
  url:`users/${id}/role`,
  data
})
}

export default {
  requestUsers,
  changeUsersStatus,
  addPostUser,
  putEditUserForm,
  queryUserForm,
  deleteUser,
  AssignUserRole
}