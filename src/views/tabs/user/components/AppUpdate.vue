<template>
    <van-overlay :show="value">
        <div class="wrapper" @click="closeClick">
            <div class="block">
                <div class="block-bottom">
                    <van-icon v-if="downloadFileProgress===100" name="success" size="20px" class="status--icon line30"/>
                    <van-loading v-else type="spinner" size="20px" color="#1989fa" class="status--icon"/>
                    <span class="block--title">{{title}}</span>
                    <van-button v-show="downloadFileProgress===100" type="default" size="small" class="block--btn"
                                :loading="status.btnLoading" :disabled="status.btnLoading"
                                loading-text="安装中"
                                @click="updateAppWgt()">{{btnText}}
                    </van-button>
                </div>
                <van-progress :percentage="downloadFileProgress" pivot-color="#7232dd"
                              color="linear-gradient(to right, #be99ff, #7232dd)" style="width: 280px;"></van-progress>
            </div>
        </div>
    </van-overlay>
</template>

<script>
    export default {
        name: "AppUpdate",
        props: {
            value: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                model: 1,/*1. 下载中 2.等待安装 3.安装中 4.安装完成*/
                title: '安装包下载中',
                btnText: '',
                downloadFileProgress: 0,
                status: {
                    btnLoading: false
                }
            }
        },
        watch: {
            value(value) {
                if (value) {
                    let timer = setInterval(() => {
                        if (this.downloadFileProgress < 100) {
                            this.model = 1;
                            this.downloadFileProgress += 10;
                        } else {
                            this.model = 2;
                            window.clearInterval(timer)
                        }
                    }, 500)
                } else {
                    setTimeout(() => {this.model = 1;}, 200)
                }
            },
            model(model) {
                switch (model) {
                    case 1:
                        this.title = '安装包下载中';
                        break;
                    case 2:
                        this.title = '下载完成';
                        this.btnText = '点击安装';
                        break;
                    case 3:
                        this.title = '安装中';
                        break;
                    case 4:
                        this.title = '安装完成';
                        this.btnText = '点击重启';
                        break;
                }
            }
        },
        methods: {
            closeClick(e) {
                if (e.target.className === 'wrapper') {
                    this.$emit('input', false);
                }
            },
            updateAppWgt() {
                switch (this.model) {
                    case 1:
                    case 2:
                        this.status.btnLoading = true;
                        setTimeout(() => {
                            this.status.btnLoading = false;
                            this.model = 4;
                        }, 2000);
                        break;
                    case 3:
                    case 4:
                        break;
                }

            }
        }
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .block {
        width: 280px;
        height: 50px;
        border-radius: 10px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px 0px 10px 0px;
    }

    .block-bottom {
        padding-left: 20px;
        line-height: 30px;
        height: 30px;
    }

    .status--icon {
        display: inline-block;
        margin-right: 10px;
    }

    .line30 {
        vertical-align: -5px;
    }

    .block--title {
        font-size: 18px;
        line-height: 30px;
        font-weight: 600;
    }

    .block--btn {
        float: right;
        margin-right: 10px;
        width: 80px;
    }
</style>
