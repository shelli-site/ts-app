import instance from '../index'

function getOrderList(params: any = {
    pageNo: 1,
    pageSize: 10
}) {
    return instance.request({
        url: '/api/app_order',
        method: "get",
        params
    })
}

function submitOrder(data: any = {}) {
    return instance.request({
        url: '/api/app_order',
        method: "post",
        data
    })
}

function paidOrder(id: number = 0) {
    return instance.request({
        url: `/api/app_order/${id}`,
        method: "put"
    })
}

export default {getOrderList, submitOrder, paidOrder}
