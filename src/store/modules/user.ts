import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import {plusReady} from "@/utils/native";
import store from '@/store';

export interface UserState {
    isLogin: boolean,
    token: string,
    version: string,
    account: string,
    nickname: string,
    avatar: string,
    functionList: string[],
}

@Module({dynamic: true, store, name: 'user'})
export class User extends VuexModule implements UserState {
    isLogin: boolean = false;
    token: string = '';
    version: string = '';
    account: string = '';
    nickname: string = '';
    avatar: string = '';
    functionList: any[] = [];

    constructor() {
        super(VuexModule);
        this.setToken('123');
    }

    @Mutation
    setToken(token: string) {
        this.token = token || '';
        return
    }

    @Mutation
    setAppVersion(version: string) {
        this.version = version || '';
        return
    }

    @Action
    async login(userInfo: { account: string, password: string }) {
        try {
            let clientInfo: any = null;
            await plusReady(() => {
                clientInfo = plus.push.getClientInfo();
            });
            /*const res: any = await AccountAPI.login({
                account: userInfo.account,
                password: userInfo.password,
                clientId: clientInfo ? clientInfo.clientid : '',
            });
            if (res.code !== 200) throw new Error();
            const user = res.data;
            this.setToken(user.token);*/
            plusReady(() => {
                plus.runtime.getProperty(
                    plus.runtime.appid,
                    (wgtInfo: any) => {
                        this.setAppVersion(wgtInfo.version)
                    }
                );
            })
        } catch (e) {
            throw e
        }
    }

    @MutationAction({
        mutate: [
            'account',
            'nickname',
            'functionList'
        ]
    })
    async signOut() {
        localStorage.clear();
        return {
            account: '',
            nickname: '',
            functionList: []
        }
    }

    @MutationAction({
        mutate: [
            'account',
            'nickname',
            'functionList'
        ]
    })
    async getInfo() {
        const state: UserState | any = this.state;
        const res: any = {
            code: 200., data: {
                account: '',
                nickname: '',
                functionList: [],
            }
        }/*await AccountAPI.getUserByToken({spaceId: state.spaceId});*/

        if (res.code !== 200) throw new Error();

        const user = res.data;
        return {
            account: user.account,
            nickname: user.nickname,
            functionList: user.functionList,
        }
    }
}

export const UserModule = getModule(User);

export default UserModule
