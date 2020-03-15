import {request} from "@/network/request";

export function requestRightsList(type) {
  return request({
    method: 'get',
    url: `/rights/${type}`,
  })
}

export function requestRolesList() {
  return request({
    url: '/roles'
  })

}

//添加角色
export function addRoles(form) {
  const data = new URLSearchParams()
  for (let key of Object.keys(form)) {
    data.append(key, form[key])
  }
  return request({
    method: 'post',
    url: 'roles',
    data
  })
}

export function deleteRoles(id) {
  return request({
    method: 'delete',
    url: `roles/${id}`,
  })
}

export function queryRoleForm(id) {
  return request({
    method: 'get',
    url: `roles/${id}`,
    params: {
      id
    }
  })
}

export function editRole(id, form) {
  const data = new URLSearchParams()
  for (let key of Object.keys(form)) {
    data.append(key, form[key])
  }
  return request({
    method: 'put',
    url: `roles/${id}`,
    data
  })
}

export function deleteRight(roleId, rightId) {
  return request({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`,
  })
}

//角色授权
export function allowRights(roleId,rids) {
  const data=new URLSearchParams()
  data.append('rids',rids)
  return request({
    method:'post',
    url:`roles/${roleId}/rights`,
    data
  })
}
