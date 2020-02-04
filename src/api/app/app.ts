import instance from '../index'

function getAppStatus() {
    return instance.request({
        url: "/api/app_status",
        method: "get"
    })
}

function login(data: any = {
    username: '',
    password: '',
    clientId: ''
}) {
    return instance.request({
        url: '/api/app_auth/login',
        method: "post",
        data
    })
}

function getUserInfo() {
    return instance.request({
        url: '/auth/info',
        method: "get"
    })
}

export default {getAppStatus, login, getUserInfo}
