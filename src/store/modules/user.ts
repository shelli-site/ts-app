import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import {plusReady} from "@/utils/native";
import store from '@/store';
import {getToken, setToken} from "@/utils/auth";
import AppAPI from '@/api/app/app';

export interface UserState {
    isLogin: boolean,
    token: string,
    version: string,
    username: string,
    nickname: string,
    avatar: string,
    roles: string[],
}

@Module({dynamic: true, store, name: 'user'})
export class User extends VuexModule implements UserState {
    isLogin: boolean = false;
    navHeight: number = 60;
    token: string = '';
    version: string = '';
    username: string = '';
    nickname: string = '';
    email: string = '';
    phone: string = '';
    avatar: string = '';
    roles: any[] = [];

    constructor() {
        super(VuexModule);
        this.setToken(getToken());
    }

    @Mutation
    setToken(token: string) {
        this.token = token || '';
        setToken(token);
        return
    }

    @Action
    async login(userInfo: { username: string, password: string }) {
        try {
            let clientInfo: any = null;
            await plusReady(() => {
                clientInfo = plus.push.getClientInfo();
            });
            const res: any = await AppAPI.login({
                username: userInfo.username,
                password: userInfo.password,
                clientId: clientInfo ? clientInfo.clientid : 'pc-debug',
            });
            this.setToken(res.token);
            this.setUser(res.user);
            return res;
        } catch (e) {
            throw e
        }
    }

    @MutationAction({
        mutate: [
            'username',
            'nickname',
            'roles'
        ]
    })
    async signOut() {
        localStorage.clear();
        return {
            username: '',
            nickname: '',
            roles: []
        }
    }

    @Action
    async getInfo() {
        try {
            const user: any = await AppAPI.getUserInfo();
            this.setUser(user);
            return user
        } catch (e) {
            throw e
        }

    }

    @Mutation
    init() {
        return;
    }

    @Mutation
    setUser(user: any) {
        this.username = user.username;
        this.nickname = user.nickName;
        this.email = user.email;
        this.phone = user.phone;
        this.avatar = user.avatar;
        this.roles = user.roles;
        this.isLogin = !!user;
    }
}

export const UserModule = getModule(User);

export default UserModule
