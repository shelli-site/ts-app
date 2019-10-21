import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// @ts-ignore
import Navigation from 'vue-navigation'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Navigation, {router, store})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
