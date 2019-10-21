import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from './views/home/tabbar.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Tabbar',
            component: Tabbar,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'Home',
                    component: () => import(/* webpackChunkName: "Home" */'./views/home/home.vue')
                },
                {
                    path: '/order',
                    name: 'Order',
                    component: () => import(/* webpackChunkName: "Order" */ './views/home/order.vue')
                },
                {
                    path: '/user',
                    name: 'User',
                    component: () => import(/* webpackChunkName: "User" */ './views/home/user.vue')
                }
            ]
        },

    ]
})
