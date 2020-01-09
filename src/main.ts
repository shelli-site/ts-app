import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import './registerServiceWorker'
import 'lib-flexible/flexible.js'
// @ts-ignore
import Navigation from 'vue-navigation'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import '@/assets/icon/iconfont.js'
import '@/style/index.css'
import '@/components/icon'

import VConsole from 'vconsole'
// const vconsole = new VConsole();

// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
// @ts-ignore
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)

import Loading from "@/components/loading"

Vue.use(Loading)

Vue.use(Vant);
Vue.use(Navigation, {router, store})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
