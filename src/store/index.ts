import Vue from 'vue'
import Vuex from 'vuex'
import {AppState} from "@/store/modules/app";
import {UserState} from "@/store/modules/user";

Vue.use(Vuex);

export interface RootState {
    app: AppState;
    user: UserState;
}

const store = new Vuex.Store<RootState>({
    modules: {}
});
window.$store = store;

export default store;
