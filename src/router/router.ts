import Tabbar from '../views/tabs/tabbar.vue'

export default [
    {
        path: '/',
        name: 'Tabbar',
        component: Tabbar,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import(/* webpackChunkName: "Home" */'../views/tabs/home/home.vue')
            },
            {
                path: '/order',
                name: 'Order',
                component: () => import(/* webpackChunkName: "Order" */ '../views/tabs/order/order.vue')
            },
            {
                path: '/user',
                name: 'User',
                component: () => import(/* webpackChunkName: "User" */ '../views/tabs/user/user.vue')
            }
        ]
    },

]

