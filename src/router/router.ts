import Tabbar from '../views/home/tabbar.vue'

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
                component: () => import(/* webpackChunkName: "Home" */'../views/home/home.vue')
            },
            {
                path: '/order',
                name: 'Order',
                component: () => import(/* webpackChunkName: "Order" */ '../views/home/order.vue')
            },
            {
                path: '/user',
                name: 'User',
                component: () => import(/* webpackChunkName: "User" */ '../views/home/user.vue')
            }
        ]
    },

]

