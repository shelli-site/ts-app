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
            <div class="user--info-left">
                <div v-if="!status.login" class="un-login-text">立即登录
                    <van-icon name="arrow" color="#5b5959" size="18"
                              style="margin-left: -10px;font-weight: bold"></van-icon>
                </div>
            </div>
            <div class="user--info-right">
                <van-image class="avatar" round fit="cover"
                           src="">
                    <template slot="error">
                        <img src="img/default-avatar.svg" style="width: 100%;height: 100%">
                    </template>
                </van-image>
            </div>
        </div>
        <div :class="['ad',{'ad-un-login':!status.login}]">
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
            <van-cell size="large" is-link>
                <div slot="icon" style="padding-right: 10px;">
                    <van-icon color="#009afe" name="like-o" size="16" style="margin-top: 4px;"/>
                </div>
                <div slot="title" style="font-size: 14px;font-weight: 500;">
                    个人信息
                </div>
            </van-cell>
            <van-cell size="large" is-link>
                <div slot="icon" style="padding-right: 10px;">
                    <van-icon color="#009afe" name="like-o" size="16" style="margin-top: 4px;"/>
                </div>
                <div slot="title" style="font-size: 14px;font-weight: 500;">
                    我的评价
                </div>
            </van-cell>
            <van-cell size="large" is-link>
                <div slot="icon" style="padding-right: 10px;">
                    <van-icon color="#009afe" name="like-o" size="16" style="margin-top: 4px;"/>
                </div>
                <div slot="title" style="font-size: 14px;font-weight: 500;">
                    关于
                </div>
                <div slot="default">
                    <van-tag round type="primary">新版本</van-tag>
                    {{$store.state.app.appVersion}}
                </div>
            </van-cell>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Toast} from "vant";
    import {plusReady} from "@/utils/native";

    @Component
    export default class User extends Vue {
        protected nav: any = {
            title: '',
            height: 60
        };
        status: any = {
            login: this.$store.state.user.isLogin
        }
        version: any = null;

        mounted() {
            window.addEventListener('scroll', this.scrollTo)
            this.scrollTo();
            // this.version = '1.2.6'
            plusReady(() => {
                plus.runtime.getProperty(
                    plus.runtime.appid,
                    (wgt: any) => {
                        this.version = wgt.version
                    }
                );
            })
        }

        handleUpdate() {
            let appUrl: string = 'http://qiandun.qiyundata.cn/images/2020-01-08/lmj.wgt'
            let _this = this;
            dowload(appUrl);

            // 下载更新文件
            function dowload(url: string) {
                let downloadTask = plus.downloader.createDownload(
                    url,
                    {
                        filename: "_downloads/"
                    },
                    function (download: any, status: any) {
                        Toast.loading('下载中')
                        if (status == 200) {
                            console.log("下载成功" + download.filename)
                            Toast.loading('正在安装…')
                            installWgt(download.filename)
                        } else {
                            console.log("下载失败")
                        }
                    }
                )

                downloadTask.addEventListener(
                    "statechanged",
                    (download: any, status: any) => {
                        if (download.totalSize != 0 && download.downloadedSize) {
                            // _this.updateSchedule = ((download.downloadedSize / download.totalSize) * 100).toFixed(1) + '%';
                        } else {
                            // _this.updateSchedule = '0%';
                        }
                        // Toast.loading(`${download.downloadedSize}/${download.totalSize}`)
                        // toast.txt =  + "/" + download.totalSize
//              console.log(download.downloadedSize + "/" + download.totalSize)
                    },
                    false
                )

                downloadTask.start()
            }

            // 更新应用wgt资源
            function installWgt(path: string) {
                plus.runtime.install(path, {force: true},
                    function () {
                        console.log("安装wgt文件成功！");
                        plus.nativeUI.alert("应用更新完成！", function () {
                            plus.runtime.restart();
                        })
                        Toast.clear()
                    },
                    function (e: any) {
//          plus.nativeUI.closeWaiting();
                        console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
                        Toast.clear();
                        plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
                    });
            }
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

        destroyed() {
            window.removeEventListener('scroll', this.scrollTo)
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
            height: 75px !important;
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
