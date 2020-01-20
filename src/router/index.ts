import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import UserModule from "@/store/modules/user";
import {getToken} from "@/utils/auth";

Vue.use(Router);

export const router = new Router({
    routes
});

let isUserLoading = false;
router.beforeEach(async (to: any, from, next) => {
    if (to.name === 'Login') {
        isUserLoading = false;
    }
    let blacklist = ['UserInfo'];
    let isInclude = blacklist.includes(to.name);
    if (!getToken() || getToken() === 'undefined') {
        if (isInclude) {// 确认通往需要权限的页面
            next({name: 'Login', query: {to: to.name}});
            return
        }
    } else {
        if (isUserLoading === false) {
            isUserLoading = true;
            await UserModule.getInfo();
        }
    }
    next();
});

window.$router = router;
export default router
