import instance from '../index'

function getHomeFood() {
    return instance.request({
        url: '/api/app_food',
        method: "get",
    })
}

export default {getHomeFood}
