import DataFilter from '@/filters/date'

const install = function(Vue: any, opts = {}) {
    Vue.filter('formatDate', DataFilter.formatDate)
};

export default { install }
