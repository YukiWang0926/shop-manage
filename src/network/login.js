import {request} from './request'

export function requestLogin(username,password) {
    const data = new URLSearchParams();
    data.append('username',username);
    data.append('password',password);
    return request({
        method:'post',
        url:'/login',
        data

    })

}