<template>
    <div class="un-login">
        <img class="un-login-img" src="img/un-login.png" style="object-fit: cover;"/>
        <div class="tip-text">{{tipText}}</div>
        <van-button tag="span" type="info" class="login-btn" @click="toLogin">{{loginText}}</van-button>
    </div>
</template>

<script>
    export default {
        name: "UnLogin",
        props: {
            tipText: {
                default: "您还没有登录哦",
                type: String
            },
            loginText: {
                default: "立即登录",
                type: String
            }
        }, methods: {
            toLogin() {
                this.$router.push({name: 'Login'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .un-login {
        width: 100%;
        height: 340px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .un-login-img {
            margin: 40px 0px;
            display: inline-block;
            width: 187px;
            height: 170px;
            /*background-image: url("/img/un-login.png");
            background-size: 100% 100%;*/
        }

        .tip-text {
            color: #676767;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 1px;
        }

        .login-btn {
            color: #f1fbff;
            letter-spacing: 1px;
            margin: 20px 0px;
        }
    }
</style>
