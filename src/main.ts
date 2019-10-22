import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'lib-flexible/flexible.js'
// @ts-ignore
import Navigation from 'vue-navigation'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/icon/iconfont.js'
import '@/style/index.css'
import '@/components/icon'

Vue.use(Vant);
Vue.use(Navigation, {router, store})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
