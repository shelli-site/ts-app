import DataFilter from '@/filters/date'
import {toDecimal2} from "@/filters/float2";

const install = function (Vue: any, opts = {}) {
    Vue.filter('formatDate', DataFilter.formatDate);
    Vue.filter('toDecimal2', toDecimal2);
};

export default {install}
