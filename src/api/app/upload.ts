import instance from '../index'

function upload(data: any) {
    return instance.request({
        url: '/api/pictures',
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data;'
        },
        data
    })
}

export default {upload}
