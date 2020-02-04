<template>
    <div class="update">
        <van-nav-bar ref="navBar"
                     :style="{height: nav.height +'px'}"
                     :z-index="10"
                     left-arrow
                     fixed
                     @click-left="()=>{$router.go(-1);}">
            <span slot="title" :style="{lineHeight:nav.height+'px'}">{{nav.title}}</span>
            <span slot="right" :style="{fontWeight: 500,lineHeight:nav.height+'px'}">
                <van-loading v-show="status.getAppVersion" type="" color="#1989fa" size="20px"
                             style="display: inline-block;"/>
                <div v-if="status.newVersion&&status.progressBar===0" style="color: #1989fa;" @click="updateNow">
                    立即更新
                </div>
                <div v-else-if="status.newVersion&&status.progressBar!==0" style="color: #1989fa;">
                    {{status.progressBar}}%
                </div>
                <div v-else>
                    已是最新版本
                </div>
            </span>
        </van-nav-bar>
        <div class="bg-nav"></div>
        <div class="version-update-records">
            <div v-for="(version, index) in versionUpdateRecords" :key="index" class="version-item">
                <div class="title">【{{version.title}}】</div>
                <div class="time">{{version.time}}</div>
                <div class="content">{{version.content}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AppAPI from '@/api/app/app';
    import {Toast} from "vant";
    import AppModule from "../../store/modules/app";

    @Component({components: {}})
    export default class update extends Vue {
        protected nav: any = {
            title: '',
            height: 45
        };
        status: any = {
            getAppVersion: false,
            newVersion: false,
            progressBar: 0
        };
        version: any = null;
        versionUpdateRecords: any[] = [];

        created() {
            this.getAppVersion();
        }

        updateNow() {
            let appUrl: string = this.$store.state.app.newAppUrl;
            let _this = this;
            const toast = Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: ''
            });
            try {
                download(appUrl);
            } catch (e) {
                Toast.clear();
                console.log(e.message);
                throw e
            }

            // 下载更新文件
            function download(url: string) {
                let downloadTask = plus.downloader.createDownload(
                    url, {filename: "_downloads/"}, function (download: any, status: any) {
                        toast.message = `下载中${_this.status.progressBar}%`;
                        if (status == 200) {
                            console.log("下载成功" + download.filename)
                            Toast.loading('正在安装…');
                            installWgt(download.filename)
                        } else {
                            console.log("下载失败")
                        }
                    })

                downloadTask.addEventListener("statechanged", (download: any, status: any) => {
                    if (download.totalSize != 0 && download.downloadedSize) {
                        _this.status.progressBar = ((download.downloadedSize / download.totalSize) * 100).toFixed(1);
                        toast.message = `下载中${_this.status.progressBar}%`;
                    } else {
                        _this.status.progressBar = 0;
                        toast.message = `下载中${_this.status.progressBar}%`;
                    }
                }, false);

                downloadTask.start()
            }

            // 更新应用wgt资源
            function installWgt(path: string) {
                plus.runtime.install(path, {force: true},
                    function () {
                        console.log("安装wgt文件成功！");
                        toast.message = `安装成功`;
                        Toast.clear();
                        plus.nativeUI.alert("应用更新完成！", function () {
                            plus.runtime.restart();
                        });
                    },
                    function (e: any) {
                        console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
                        Toast.clear();
                        plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
                    });
            }

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
                    this.versionUpdateRecords = res.versionUpdateRecords;
                    this.status.getAppVersion = false;
                } else {
                    this.status.getAppVersion = false;
                    throw Error(res.msg)
                }
            } catch (e) {
                throw e
            }
        }
    }
</script>

<style lang="scss" scoped>
    .update {
        .version-update-records {
            .version-item {
                padding: 30px 16px;

                .title {
                    font-size: 16px;
                    display: inline-block;
                }

                .time {
                    font-size: 12px;
                    display: inline-block;
                    vertical-align: bottom;
                    color: #bfbfbf;
                }

                .content {
                    margin-top: 18px;
                    font-size: 14px;
                    line-height: 20px;
                    text-indent: 28px;
                }
            }
        }
    }

    .bg-nav {
        height: 42px;
    }
</style>
