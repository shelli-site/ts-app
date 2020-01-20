import {getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {plusReady} from "@/utils/native";

export interface AppState {

}

@Module({dynamic: true, store, name: 'app'})
export class App extends VuexModule implements AppState {
    navBarHeight: number = 60;
    appVersion: string = '1.0.0';
    newAppVersion: string = '';
    newAppUrl: string = '';
    isUpload: boolean = false;

    constructor() {
        super(VuexModule);
    }

    @Mutation
    setAppVersion(appVersion: string) {
        this.appVersion = appVersion;
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

    @Mutation
    init() {
        this.navBarHeight = 60;
        plusReady(() => {
            plus.runtime.getProperty(
                plus.runtime.appid,
                (wgt: any) => {
                    this.appVersion = wgt.version
                }
            );
        })
    }
}

export const AppModule = getModule(App);

export default AppModule
