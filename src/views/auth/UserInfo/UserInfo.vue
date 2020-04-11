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
            <input type="file" ref="file" style="display: none" accept="image/png,image/jpeg,image/gif,image/jpg"
                   @change="addAvatar">
            <van-cell-group>
                <van-cell center is-link title="头像" @click="uploadAvatar">
                    <div style="height: 100%;display: flex;justify-content: flex-end;">
                        <van-image
                                width="60"
                                height="60"
                                radius="4px"
                                :src="avatar">
                            <template slot="loading">
                                <van-loading type="spinner" size="20"/>
                            </template>
                        </van-image>
                    </div>
                </van-cell>
                <van-cell title="账号" is-link :value="$store.state.user.username"/>
                <van-cell title="昵称" is-link :value="$store.state.user.nickname"/>
                <van-cell title="邮箱" is-link :value="$store.state.user.email"/>
                <van-cell title="手机号" is-link :value="$store.state.user.phone"/>
            </van-cell-group>
        </div>
        <van-button type="danger" class="login-out" @click="loginOut">退出登录</van-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UserModule from "@/store/modules/user";
    import UserAPI from "@/api/app/app";
    import {Toast} from "vant";

    @Component({components: {}})
    export default class UserInfo extends Vue {
        protected nav: any = {
            title: '个人信息',
            height: 45
        };
        avatarFile: any = null;

        get avatar() {
            return process.env.VUE_APP_IMAGE + this.$store.state.user.avatar;
        }

        async addAvatar(event: any) {
            let inputDOM = (this.$refs['file'] as any);
            // 通过DOM取文件数据
            this.avatarFile = inputDOM.files.length === 1 && inputDOM.files[0];
            if (this.avatarFile.name) {
                Toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true,
                    message: '头像上传中'
                });
                let formData: FormData = new FormData();
                formData.append("file", this.avatarFile, this.avatarFile.name);
                const res: any = await UserAPI.editUserAvatar(formData);
                Toast.success({
                    duration: 1, // 持续展示 toast
                    forbidClick: true,
                    message: '上传成功'
                });
                UserModule.getInfo();
            } else {
                console.log('取消上传')
            }
        }

        uploadAvatar() {
            (this.$refs['file'] as any).click();
        }

        loginOut() {
            UserModule.loginOut();
            this.$router.go(-1);
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

    .login-out {
        margin: 10px;
        width: calc(100% - 20px);
        border-radius: 5px;
    }
</style>
