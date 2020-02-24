import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

export interface PopupState {
    popup: any;
}


@Module({dynamic: true, store, name: 'popup'})
export class MyPopup extends VuexModule implements PopupState {
    popup: any = {};
    /*
     * 状态改变标志位
     */
    statusChange: boolean = false;
    /*
     * 屏蔽返回键标志位
     */
    shieldBack: boolean = false;

    constructor() {
        super(VuexModule);
    }

    @Mutation //注册弹出
    addPopup(params: any = {route: {}, conf: {}}) {
        if (this.popup[params.route.name]) {
            this.popup[params.route.name] = {
                ...this.popup[params.route.name], ...params.conf
            }
        } else {
            this.popup[params.route.name] = params.conf;
        }
    }

    @Mutation //显示弹出
    showPopup(params: any = {popupName: '', route: {}}) {
        if (this.popup[params.route.name][params.popupName].show === false) {
            this.popup[params.route.name][params.popupName].show = true;
            this.statusChange = true;
        }
    }

    @Mutation //关闭弹出
    closePopup(params: any = {popupName: '', route: {}}) {
        if (this.popup[params.route.name][params.popupName].show === true) {
            this.popup[params.route.name][params.popupName].show = false;
            this.statusChange = true;
        }
    }

    @Mutation //关闭最外层弹出
    closePriorityFirst(route: any) {
        this.shieldBack = false;
        let keys: string[] = Object.keys(this.popup[route.name] || {});
        keys.sort((key1: string, key2: string) => {
            return this.popup[route.name][key2].priority - this.popup[route.name][key1].priority;
        });
        for (let i = 0, length = keys.length; i < length; i++) {
            if (this.popup[route.name][keys[i]].show === true) {
                this.popup[route.name][keys[i]].show = false;
                this.statusChange = true;
                this.shieldBack = true;
                break;
            }
        }
    }

    @Mutation
    removeDialog(params: any = {popupName: '', route: {}}) {
        if (this.popup[params.route.name][params.popupName].show === false) {
            delete this.popup[params.route.name][params.popupName];
        }
    }

    @Mutation
    statusChanged() {
        this.statusChange = false;
    }

    @Mutation
    init() {
        this.popup = {};
    }
}

export const PopupModule = getModule(MyPopup);

export default PopupModule
