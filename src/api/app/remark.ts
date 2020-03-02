import instance from '../index'

function getRemarkUserList(params: any = {
    pageNo: 1,
    pageSize: 10
}) {
    return instance.request({
        url: '/api/app_remark',
        method: "get",
        params
    })
}

function getRemarkAllList(params: any = {
    pageNo: 1,
    pageSize: 10
}) {
    return instance.request({
        url: '/api/app_remark/all',
        method: "get",
        params
    })
}

export default {getRemarkUserList, getRemarkAllList}
