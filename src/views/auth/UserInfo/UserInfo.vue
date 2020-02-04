<template>
    <div class="user-info">
        <van-nav-bar ref="navBar"
                     :style="{height: nav.height +'px'}"
                     :z-index="10"
                     left-arrow
                     @click-left="()=>{$router.go(-1);}">
            <span slot="title" :style="{lineHeight:nav.height+'px'}">{{nav.title}}</span>
            <span slot="right" :style="{fontWeight: 500,lineHeight:nav.height+'px'}">
            </span>
        </van-nav-bar>
        <div class="user-info-cell-group">
            <van-cell-group>
                <van-cell center is-link title="头像">
                    <div style="height: 100%;display: flex;justify-content: flex-end;">
                        <van-image
                                width="60"
                                height="60"
                                radius="4px"
                                :src="avatar"
                        />
                    </div>
                </van-cell>
                <van-cell title="账号" is-link :value="$store.state.user.username"/>
                <van-cell title="昵称" is-link :value="$store.state.user.nickname"/>
                <van-cell title="邮箱" is-link :value="$store.state.user.email"/>
                <van-cell title="手机号" is-link :value="$store.state.user.phone"/>
            </van-cell-group>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({components: {}})
    export default class UserInfo extends Vue {
        protected nav: any = {
            title: '个人信息',
            height: 45
        };
        status: any = {
            getAppVersion: false,
            newVersion: false,
            progressBar: 0
        };
        get avatar(){
            return process.env.VUE_APP_IMAGE+this.$store.state.user.avatar;
        }
    }
</script>

<style lang="scss" scoped>
    .user-info {
        .user-info-cell-group {
        }
    }

    .col-middle {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
