import axios from 'axios'

 const instance = axios.create({

  baseURL: "http://106.12.11.162:8888/api/private/v1/",
  timeout: 15000,
})


//请求拦截
instance.interceptors.request.use(config => {
  return config;
}, err => {
  alert(err);
})
//响应拦截
instance.interceptors.response.use(res => {
  return res.data
}, err => {
  alert(err)
})

export function request(config) {
  //发送真正的请求
  return instance(config)
}

