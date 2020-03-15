import axios from 'axios'
import {Message} from 'element-ui';

const instance = axios.create({

  baseURL: "http://106.12.11.162:8888/api/private/v1/",
  timeout: 15000,
})


//请求拦截
instance.interceptors.request.use(config => {
  // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config;
}, err => {
  alert(err);
})
//响应拦截
instance.interceptors.response.use(res => {
  if (Math.floor(res.data.meta.status / 100)  === 2) {
    return res.data.data
  } else {
    return Promise.reject(res.data.meta.msg)
  }
}, err => {
  Message.error(err)
})

export function request(config) {
  //发送真正的请求
  return instance(config)
}

