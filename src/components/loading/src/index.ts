import Vue from 'vue';
import elLoading from './elLoading.vue';

interface Options {
    loading?: boolean,
    duration?: number,
    text?: string
}

declare module 'vue/types/vue' {
    interface Vue {
        $elLoading(options?: Options): {
            hide: Function
        },

        $navigation: {
            on(eventName: 'forward' | 'back' | 'replace' | 'refresh' | 'reset', callback?: (to: any, from: any) => any): any,
            once(eventName: 'forward' | 'back' | 'replace' | 'refresh' | 'reset', callback?: (to: any, from: any) => any): any,
            off(eventName: 'forward' | 'back' | 'replace' | 'refresh' | 'reset', callback?: (to: any, from: any) => any): any,
            getRoutes(): any,
            cleanRoutes(): any,
        }
    }
}

class defaults extends Option {
    loading = false;
    text = '';
}

let loadingVueLoading: any;
const loadingVueConstructor: any = Vue.extend(elLoading);
loadingVueConstructor.prototype.hide = function () {
    var vm = this;
    loadingVueLoading = null;
    var promise = new Promise(function (resolve, reject) {
        if (vm.$el && vm.$el.parentNode) {
            vm.$el.parentNode.removeChild(vm.$el);
        }
        resolve();
        vm.$destroy();
        vm.loading = false;
    });
    return promise;
};

const loading = (options = {}) => {
    if (Vue.prototype.$isServer) return;
    options = Object.assign({}, defaults, options);
    let parent = document.body;
    if (loadingVueLoading) {
        return loadingVueLoading
    }
    let instance = new loadingVueConstructor({
        el: document.createElement('div'),
        data: options
    });

    parent.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance.loading = true;
    });

    loadingVueLoading = instance;
    return instance;
};

export default loading;


export function install(Vue: { prototype: { $elLoading: (options?: {}) => any; }; }): void {
    Vue.prototype.$elLoading = loading;
}
