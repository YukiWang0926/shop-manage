import {request} from "@/network/request";

export function requestMenu() {
  return request({
    method:"get",
    url:'/menus',
  })
}