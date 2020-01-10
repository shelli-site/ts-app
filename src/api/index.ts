import Axios from 'axios'

let instance = Axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    timeout: 30000
});

// 接口请求拦截器
instance.interceptors.request.use(request => {
    request.headers.Authorization = window.localStorage.token;
    request.headers.AppVersion = window.localStorage.version;
    return request
});

// 接口回调拦截器
instance.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        if(!error.response) {
            return {
                code: 400
            }
        }
        switch (error.response.status) {
            case 401:
                localStorage.clear();
                if(window.$route.name !== 'Login'){
                    window.$router.replace({name: 'Login'});
                }
                break;
            case 500:
                break
        }
        return error
    }
);

export default instance
