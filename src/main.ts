import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import filter from '@/filters'
import './registerServiceWorker'
import 'lib-flexible/flexible.js'
// @ts-ignore
import Navigation from 'vue-navigation'
import Vant, {Toast} from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import '@/assets/icon/iconfont.js';
import '@/style/index.css'
import '@/components/icon'

// import VConsole from 'vconsole'
// const vconsole = new VConsole();

// 取消 Uncaught (in promise) undefined  vue-router.esm.js?c478:2051  错误
// （原因为版本问题，npm i vue-router@3.0 -S 降版本应该也可解决）
import Router from 'vue-router'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location:any) {
    // @ts-ignore
    return originalPush.call(this, location).catch((err:any) => err)
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location:any) {
    // @ts-ignore
    return originalReplace.call(this, location).catch((err:any) => err)
};

// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
// @ts-ignore
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)

// 将所有 loading Toast 设置为背景不可点击 (2.2.10 版本开始支持)
// @ts-ignore
Toast.setDefaultOptions('loading', { forbidClick: true });

import Loading from "@/components/loading"

Vue.use(Loading)
Vue.use(filter);
Vue.use(Vant);
Vue.use(Navigation, {router, store});
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
