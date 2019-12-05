import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';

export interface AppState {

}

@Module({dynamic: true, store, name: 'app'})
export class App extends VuexModule implements AppState {
    menu: any = [];
    statusBarHeight: number = 20;
    navBarHeight: number = 45;
    newAppVersion: string = '';
    newAppUrl: string = '';
    isUpload: boolean = false;

    constructor() {
        super(VuexModule);
    }

    @Mutation
    setUploadApp(params: any = {newAppVersion: '', newAppUrl: ''}) {
        this.newAppVersion = params.newAppVersion;
        this.newAppUrl = params.newAppUrl;
    }

    @Mutation
    setIsUpload(isUpload: boolean) {
        this.isUpload = isUpload;
    }
}

export const AppModule = getModule(App);

export default AppModule
