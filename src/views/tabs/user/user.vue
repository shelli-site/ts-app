<template>
    <div class="user">
        <van-nav-bar ref="navBar"
                     :style="{height: nav.height +'px'}"
                     left-text=""
                     right-text=""
                     :left-arrow="false"
                     :border="false"
                     :z-index="10"
                     fixed>
            <span slot="title" :style="{lineHeight:nav.height+'px'}">{{nav.title}}</span>
            <span slot="right" :style="{fontWeight: 500,lineHeight:nav.height+'px'}">
                <span @click="rightClick('message')">
                   <icon-svg iconClass="xiaoxi"
                             style="font-size: 0.65rem;color:#333333;margin-right: 10px"></icon-svg>
                </span>
                 <span @click="rightClick('setting')">
                   <icon-svg iconClass="shezhi"
                             style="font-size: 0.65rem;color:#333333;"></icon-svg>
                 </span>
            </span>
        </van-nav-bar>
        <div class="bg-nav"></div>
        <div :class="['user--info',{'user--info-un-login':!status.login}]">
            <div class="user--info-left" @click="()=>{$router.push({name:'UserInfo'})}">
                <div v-if="!status.login" class="un-login-text">立即登录
                    <van-icon name="arrow" color="#5b5959" size="18"
                              style="margin-left: -10px;font-weight: bold"></van-icon>
                </div>
                <div v-else class="nickname van-ellipsis">{{$store.state.user.nickname}}</div>
            </div>
            <div class="user--info-right" @click="()=>{$router.push({name:'UserInfo'})}">
                <van-image class="avatar" round fit="cover"
                           :src="avatar">
                    <template slot="error">
                        <img src="img/default-avatar.svg" style="width: 100%;height: 100%">
                    </template>
                </van-image>
            </div>
        </div>
        <div v-if="false" :class="['ad',{'ad-un-login':!status.login}]">
            <template v-if="status.login">
                <div class="vip"></div>
                <div class="red-envelope">
                    <div class="red-envelope-item item-margin-right"></div>
                    <div class="red-envelope-item item-margin-right"></div>
                    <div class="red-envelope-item"></div>
                </div>
            </template>
            <div v-else class="red-envelope red-envelope-un-login">
                <div class="red-envelope-item item-margin-right"></div>
                <div class="red-envelope-item"></div>
            </div>
        </div>
        <div class="menu-list">
            <van-cell size="large" is-link @click="()=>{$router.push({name:'UserInfo'})}">
                <div slot="icon" style="padding-right: 10px;">
                    <van-icon color="#009afe" name="user-o" size="16" style="margin-top: 4px;"/>
                </div>
                <div slot="title" style="font-size: 14px;font-weight: 500;">
                    个人信息
                </div>
            </van-cell>
            <van-cell size="large" is-link>
                <div slot="icon" style="padding-right: 10px;">
                    <van-icon color="#009afe" name="records" size="16" style="margin-top: 4px;"/>
                </div>
                <div slot="title" style="font-size: 14px;font-weight: 500;">
                    我的评价
                </div>
            </van-cell>
            <van-cell size="large" is-link @click="checkVersionUpdate"
                      :style="status.getAppVersion?`pointer-events: none;filter: grayscale(100%);`:''">
                <div slot="icon" style="padding-right: 10px;">
                    <van-icon color="#009afe" name="question-o" size="16" style="margin-top: 4px;"/>
                </div>
                <div slot="title" style="font-size: 14px;font-weight: 500;">
                    关于
                </div>
                <div slot="default">
                    <van-tag round type="primary" v-show="status.newVersion">有新版本!</van-tag>
                    <van-loading v-show="status.getAppVersion" type="spinner" color="#1989fa" size="20px"
                                 style="display: inline-block;"/>
                    {{$store.state.app.appVersion}}
                </div>
            </van-cell>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Toast} from "vant";
    import AppAPI from '@/api/app/app';
    import {plusReady} from "@/utils/native";
    import AppModule from "@/store/modules/app";

    @Component({components: {}})
    export default class User extends Vue {
        protected nav: any = {
            title: '',
            height: 60
        };
        status: any = {
            login: this.$store.state.user.isLogin,
            newVersion: false,
            getAppVersion: false
        }
        version: any = null;

        get avatar() {
            return !this.status.login ? '' : process.env.VUE_APP_IMAGE + this.$store.state.user.avatar;
        }

        created() {
            this.getAppVersion();
        }

        mounted() {
            window.addEventListener('scroll', this.scrollTo)
            this.scrollTo();
            plusReady(() => {
                plus.runtime.getProperty(
                    plus.runtime.appid,
                    (wgt: any) => {
                        AppModule.setAppVersion(wgt.version);
                    }
                );
            })
        }


        async checkVersionUpdate() {
            this.$router.push({name: 'update'})
        }

        rightClick(icon: string) {
            switch (icon) {
                case 'message':
                    Toast('您没有新的消息！');
                    break
                case 'setting':
                    Toast('设置界面开发中！');
                    break
            }
        }

        scrollTo() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.nav.title = scrollTop < 70 ? '' : '我的';
        }

        async getAppVersion() {
            try {
                this.status.getAppVersion = true;
                const res: any = await AppAPI.getAppStatus();
                if (res.code !== 400) {
                    this.version = res.appVersion;
                    this.status.newVersion = this.$store.state.app.appVersion !== this.version;
                    if (this.status.newVersion) {
                        AppModule.setIsUpload(true);
                        AppModule.setUploadApp({
                            newAppVersion: res.appVersion,
                            newAppUrl: res.appDownloadLink
                        });
                    }
                    this.status.getAppVersion = false;
                } else {
                    this.status.getAppVersion = false;
                    throw Error(res.msg)
                }
            } catch (e) {
                throw e
            }
        }

        destroyed() {
            window.removeEventListener('scroll', this.scrollTo);
            Toast.clear(true);
        }
    }
</script>

<style lang="scss" scoped>
    .user {
        overflow: hidden;

        .user--info {
            height: 135px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;

            .user--info-left {
                height: 100%;

                flex: 1;

                .nickname {
                    font-size: 25px;
                    font-weight: bold;
                    padding-top: 35px;
                    padding-left: 22px;
                    text-align: left;
                    color: black;
                    letter-spacing: 2px;
                }

                .un-login-text {
                    font-size: 25px;
                    font-weight: bold;
                    padding-top: 10px;
                    padding-left: 22px;
                    text-align: left;
                    color: black;
                    letter-spacing: 2px;
                }

                .un-login-text::after {
                    margin-top: 5px;
                    display: block;
                    content: "快登录吧！";
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 1px;
                    color: #bfbfbf;
                }
            }

            .user--info-right {
                height: 100%;
                width: 120px;

                .avatar {
                    margin: 10px;
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                }
            }
        }

        .user--info-un-login {
            height: 85px !important;
        }

        .ad {
            padding: 0 10px;
            background-image: linear-gradient(#ffffff, #f5f5f5, #f5f4f1, #ffffff);

            .vip {
                height: 50px;
                border-radius: 6px;
                background-color: #fae9c5;
            }

            .red-envelope {
                height: 65px;
                padding: 10px 0px 20px 0px;
                display: flex;
                align-items: center;
                justify-content: center;

                .red-envelope-item {
                    flex: 1;
                    background-color: white;
                    height: 100%;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); /*px*/
                    /*border: 1px solid #d2d2d2;*/
                }

                .item-margin-right {
                    margin-right: 5px;
                }
            }

            .red-envelope-un-login {
                height: 55px;
            }
        }

        .ad-un-login {
            padding-top: 30px;
        }

        .menu-list {
            /*.menu-item {
                height: 55px;
                border-bottom: 1px solid #f1f1f1;
            }*/
        }

    }

    .bg-nav {
        height: 57px;
    }
</style>
