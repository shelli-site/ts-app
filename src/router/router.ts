import Tabbar from '../views/tabs/tabbar.vue'

export default [
    {
        path: '/',
        name: 'Tabbar',
        component: Tabbar,
        meta: {title: 'Tab栏'},
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                meta: {title: '首页'},
                component: () => import(/* webpackChunkName: "Home" */'../views/tabs/home/home.vue')
            },
            {
                path: '/order',
                name: 'Order',
                meta: {title: '订单'},
                component: () => import(/* webpackChunkName: "Order" */ '../views/tabs/order/order.vue')
            },
            {
                path: '/user',
                name: 'User',
                meta: {title: '我的'},
                component: () => import(/* webpackChunkName: "User" */ '../views/tabs/user/user.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {title: '登录'},
        component: () => import(/* webpackChunkName: "Login" */'../views/auth/login/login.vue')
    },
    {
        path: '/UserInfo',
        name: 'UserInfo',
        meta: {title: '用户信息'},
        component: () => import(/* webpackChunkName: "UserInfo" */'../views/auth/UserInfo/UserInfo.vue')
    },
    {
        path: '/SubmitOrder',
        name: 'SubmitOrder',
        meta: {title: '提交订单'},
        component: () => import(/* webpackChunkName: "SubmitOrder" */'../views/order/SubmitOrder.vue')
    },
    {
        path: '/OrderDetail/:id',
        name: 'OrderDetail',
        meta: {title: '订单详情'},
        component: () => import(/* webpackChunkName: "OrderDetail" */'../views/order/OrderDetail.vue')
    },
    {
        path: '/DoRemark/:orderId',
        name: 'DoRemark',
        meta: {title: '评价页面'},
        component: () => import(/* webpackChunkName: "DoRemark" */'../views/remark/DoRemark.vue')
    },
    {
        path: '/user/remark',
        name: 'UserRemark',
        meta: {title: '我的评价'},
        component: () => import(/* webpackChunkName: "UserRemark" */'../views/remark/remark.vue')
    },
    {
        path: '/update',
        name: 'update',
        meta: {title: '更新'},
        component: () => import(/* webpackChunkName: "update" */'../views/update/update.vue')
    },

]

