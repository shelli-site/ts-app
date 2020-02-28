import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

export interface Info {
}

@Module({dynamic: true, store, name: 'info'})
export class ShopInfo extends VuexModule implements Info {
    shopName: string = '';


    constructor() {
        super(VuexModule);
    }


    @Mutation
    init() {
        this.shopName = '乐山钵钵鸡';
    }
}

export const InfoModule = getModule(ShopInfo);

export default InfoModule
