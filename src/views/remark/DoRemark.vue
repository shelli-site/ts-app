<template>
    <div class="do-remark">
        <van-nav-bar ref="navBar"
                     :style="{height: nav.height +'px'}"
                     :z-index="10"
                     left-arrow fixed
                     @click-left="()=>{$router.go(-1);}"
                     @click-right="doRemark">
            <span slot="title" :style="{lineHeight:nav.height+'px'}">{{nav.title}}</span>
            <span slot="right" :style="{fontWeight: 500,lineHeight:nav.height+'px',color: '#07c160',display: 'flex'}">
                <van-loading v-show="nav.loading" size="16" color="#07c160" style="margin-right: 5px;"/>提交
            </span>
        </van-nav-bar>
        <van-cell-group :style="{marginTop: nav.height+'px'}">
            <van-cell :border="false">
                <div class="order-des">
                    <van-image :src="$route.query.detailUrl" width="60" height="60" style="border: 1px solid #fcfcfc"
                               radius="8px" fit="cover"/>
                    <div class="text">{{$route.query.name}}{{$route.query.count>1?` 等${$route.query.count}件`:''}}</div>
                </div>
            </van-cell>
            <van-cell :border="false">
                <div class="radio-group">
                    <div class="radio" @click="remarkData.changeServiceState('满意')">
                        <icon-svg :svg-color="remarkData.serviceState==='满意'?'#1989fa':'#dcdee0'" :icon-class="remarkData.serviceState==='' ?
                                  'biaoqing-dai-tianchong' : 'biaoqing-weixiao-tianchong'"/>
                        <span :style="{color:remarkData.serviceState==='满意'?'#1989fa':''}">满意</span>
                    </div>
                    <div class="radio" @click="remarkData.changeServiceState('不满意')">
                        <icon-svg :svg-color="remarkData.serviceState==='不满意'?'#07c160':'#dcdee0'" :icon-class="remarkData.serviceState==='' ?
                                  'biaoqing-dai-tianchong' : 'biaoqing-nanguo-tianchong'"/>
                        <span :style="{color:remarkData.serviceState==='不满意'?'#07c160':''}">不满意</span>
                    </div>
                </div>
            </van-cell>
            <van-cell :border="false">
                <van-field
                        v-model="remarkData.content"
                        style="background-color: #fafafa;border-radius: 8px;"
                        rows="3"
                        autosize
                        type="textarea"
                        maxlength="200"
                        show-word-limit
                />
            </van-cell>
            <van-cell :border="false">
                <van-uploader v-model="upload.fileList" :before-read="upload.beforeRead" :after-read="upload.afterRead"
                              style="margin-top: 15px;" :max-count="3"/>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import RemarkAPI from '@/api/app/remark'
    import UploadAPI from '@/api/app/upload'
    import {Toast} from "vant";

    @Component({components: {}})
    export default class DoRemark extends Vue {
        protected nav: any = {
            title: '发表评价',
            height: 45,
            loading: false
        };
        remarkData: any = {
            serviceState: '',
            content: '',
            changeServiceState: (serviceState: string) => {
                this.remarkData.serviceState = serviceState;
                this.$forceUpdate();
            }
        };
        upload: any = {
            fileList: [],
            beforeRead: function (file: any) {
                if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
                    Toast('请上传 JPG/PNG/GIF 格式图片');
                    return false;
                }
                return true;
            },
            afterRead: function (file: any) {
                file.status = 'uploading';
                file.message = '上传中...';
                let f = new FormData();
                f.append('file', file.file, file.file.name)
                UploadAPI.upload(f).then((res: any) => {
                    file.status = 'done';
                    file.response = res;
                }).catch(() => {
                    file.status = 'failed';
                    file.message = '上传失败';
                })

            }
        };

        doRemark() {
            this.nav.loading = true;
            this.validation().then(() => {
                let data: any = {
                    orderId: this.$route.params.orderId,
                    serviceState: this.remarkData.serviceState,
                    content: this.remarkData.content,
                    pictureIds: this.upload.fileList.reduce((p: any, c: any) => {
                        (c.status === 'done' && c.response.id) && p.push(c.response.id);
                        return p;
                    }, []).join(',')
                };
                RemarkAPI.remarkOrder(data).then((res: any) => {
                    this.nav.loading = false;
                    this.$router.go(-1);
                })
            }).catch((msg: any) => {
                this.nav.loading = false;
                Toast(msg);
            })
        }

        validation() {
            return new Promise((resolve: Function, reject: Function) => {
                if (!this.$route.params.orderId) {
                    reject("系统错误，请退出重试！");
                } else if (!this.remarkData.serviceState) {
                    reject("请选择服务状态！");
                } else if (!this.remarkData.content) {
                    reject("评价不能为空哦！");
                } else {
                    resolve();
                }
            })
        }


    }
</script>

<style lang="scss" scoped>
    .do-remark {
        padding: 16px;
        width: calc(100% - 32px);
    }

    .order-des {
        display: flex;

        .text {
            margin-left: 10px;
            letter-spacing: 1px;
            font-size: 14px;
            line-height: 25px;
            color: #666666;
        }
    }

    .radio-group {
        display: flex;

        .radio {
            font-size: 20px;
            margin-right: 20px;

            span {
                font-size: 15px;
                margin: 0 10px;
            }
        }
    }
</style>
