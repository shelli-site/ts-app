<template>
    <div>
        <van-nav-bar title="登录" left-text="" left-arrow @click-left="()=>{$router.go(-1);}"/>
        <div class="login">
            <div class="login-title">
                欢迎登录
            </div>
            <div class="login-input">
                <van-field v-model="loginForm.username" placeholder="手机/用户名" clearable size="large"
                           :disabled="status.isLogining"
                           style="background-color: #f8f8f8;"/>
                <van-field v-model="loginForm.password" placeholder="密码" type="password" class="input-hr" size="large"
                           :disabled="status.isLogining"
                           style="background-color: #f8f8f8;"/>
            </div>
            <div class="login-btn">
                <van-button type="info" size="small" :disabled="status.loginBtnDis" :loading="status.isLogining"
                            loading-type="spinner" loading-text="登录中..."
                            style="width: 100%;letter-spacing: 2px;" @click="userLogin">
                    登录
                </van-button>
            </div>
            <div class="register-btn">立即注册</div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import AppAPI from '@/api/app/app';
    import UserModule from "@/store/modules/user";

    @Component({
        components: {}
    })
    export default class Login extends Vue {
        loginForm: any = {
            username: '',
            password: ''
        };
        status: any = {
            loginBtnDis: true,
            isLogining: false
        };

        userLogin() {
            this.status.isLogining = true;
            UserModule.login(this.loginForm).then((res: any) => {
                this.status.isLogining = false;
                if (this.$route.query.to) {
                    this.$router.replace({name: (this.$route.query.to as string)}).catch((e: any) => {
                    })
                } else {
                    this.$router.go(-1);
                }
            }).catch((e: any) => {
                this.status.isLogining = false;
                console.log(e);
            })
            // Login
        }

        @Watch('loginForm', {deep: true})
        onWatch(loginForm: any) {
            this.status.loginBtnDis = !(loginForm.username && loginForm.password);
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        margin: 0 16px;

        .login-title {
            font-size: 30px;
            font-weight: 500;
            margin: 40px 0 30px 0;
        }

        .login-input {
            margin: 20px -16px 1px -16px;
        }

        .login-btn {
            margin-top: 40px;
        }

        .register-btn {
            padding-top: 15px;
            color: #1989fa;
            font-size: 13px;
            text-align: right;
            letter-spacing: 1px;
        }
    }

    .input-hr::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 1px solid #ebedf0;
        transform: scaleY(.5);
    }
</style>
<style lang="scss">
    .login-input {
        .van-cell:not(:last-child)::after {
            right: 16px;
        }
    }
</style>
