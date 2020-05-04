import instance from '../index'

function getHomeFood() {
    return instance.request({
        url: '/api/app_food',
        method: "get",
    })
}

function getOrderedDishes(params: any) {
    return instance.request({
        url: '/api/app_food/history',
        method: "get",
        params
    })
}

export default {getHomeFood, getOrderedDishes}
