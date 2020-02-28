import Vue from 'vue'
import Vuex from 'vuex'
import {AppState} from "@/store/modules/app";
import {UserState} from "@/store/modules/user";
import {ShoppingState} from "@/store/modules/shopping";
import {PopupState} from "@/store/modules/popup";
import {Info} from "@/store/modules/info";

Vue.use(Vuex);

export interface RootState {
    app: AppState;
    user: UserState;
    info: Info,
    shopping: ShoppingState;
    popup: PopupState
}

const store = new Vuex.Store<RootState>({
    modules: {}
});
window.$store = store;

export default store;
