import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router);

export const router = new Router({
    routes
});

router.beforeEach(async (to, from, next) => {
    next();
    return;
});

window.$router = router;
export default router
