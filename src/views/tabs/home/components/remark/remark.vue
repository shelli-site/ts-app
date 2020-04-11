<template>
    <div :class="{'background':true}">
        <div v-for="(remark, index) in remarkList"
             :class="{'remark':true, 'remark-bottom':index!==remarkList.length-1, 'remark-first':index===0, 'remark-end':index===remarkList.length-1}"
             :key="index">
            <div class="remark-head">
                <van-image class="avatar" round fit="cover"
                           :src="baseImageUrl + (remark.avatar || user.avatar)">
                    <template slot="error">
                        <img src="img/default-avatar.svg" style="width: 100%;height: 100%">
                    </template>
                    <template slot="loading">
                        <img src="img/default-avatar.svg" style="width: 100%;height: 100%">
                    </template>
                </van-image>
                <div class="remark-info">
                    <div class="username">
                        <div class="name van-ellipsis">{{remark.username || user.username || '未知用户'}}</div>
                        <div class="remark-status">
                            <van-tag v-if="remark.serviceState==='不满意'" type="danger">不满意</van-tag>
                            <van-tag v-else type="primary">满意</van-tag>
                        </div>
                    </div>
                    <div class="remark-time van-ellipsis">{{remark.createTime|formatDate}}</div>
                </div>
            </div>
            <div class="remark-content">
                <div class="remark-words van-multi-ellipsis--l3">
                    {{remark.content||'用户未填写评价'}}
                </div>
                <div class="remark-pictures">
                    <template v-if="remark.pictureList.length!==0">
                        <van-image :src="remark.pictureList[0]?remark.pictureList[0].url:''" fit="cover"
                                   radius="3px 0px 0px 3px"
                                   class="remark-picture first-picture">
                            <div v-if="!remark.pictureList[0]" slot="error" :class="{'img-none':true}"></div>
                        </van-image>
                        <van-image :src="remark.pictureList[1]?remark.pictureList[1].url:''" fit="cover"
                                   class="remark-picture">
                            <div v-if="!remark.pictureList[1]" slot="error" :class="{'img-none':true}"></div>
                        </van-image>
                        <van-image :src="remark.pictureList[2]?remark.pictureList[2].url:''" fit="cover"
                                   radius="0px 3px 3px 0px" class="remark-picture end-picture">
                            <div v-if="!remark.pictureList[2]" slot="error" :class="{'img-none':true}"></div>
                        </van-image>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Remark",
        computed: {
            baseImageUrl() {
                return process.env.VUE_APP_IMAGE;
            }
        },
        props: {
            remarkList: {default: () => [], type: Array},
            user: {default: () => ({}), type: Object}
        }

    }
</script>

<style lang="scss" scoped>
    .background {
        background-color: #ffffff;
        border-radius: 5px;
    }

    .remark {
        padding-top: 5px;
        padding-left: 15px;
        padding-right: 15px;
    }

    .remark:active {
        background-color: #f2f3f5;
    }

    .remark-bottom::after {
        content: "";
        transform: translateY(3px);
        display: inline-block;
        margin-right: -15px;
        width: calc(100% + 15px);
        height: 1px;
        background-color: #f8f9fa;
    }

    .remark-first {
        padding-top: 15px;
    }

    .remark-end {
        padding-bottom: 15px;
    }

    .remark-head {
        display: flex;
        align-items: center;

        .avatar {
            width: 45px;
            height: 45px;
        }

        .remark-info {
            flex: 1;
            display: flex;
            justify-content: space-between;
            font-size: 13px;

            .username {
                padding: 5px 8px;
                display: flex;
                flex-direction: column;

                .name {
                    letter-spacing: 1px;
                    line-height: 18px;
                    height: 18px;
                    font-weight: 800;
                }

                .remark-status {
                    flex: 1;
                }

            }

            .remark-time {
                padding: 5px 0px;
                color: cadetblue;
            }
        }
    }

    .remark-content {
        margin: 5px 0px;
        padding-left: 53px;

        .remark-words {
            text-align: justify;
        }

        .remark-pictures {
            margin: 5px 0px;
            display: flex;
        }
    }

    .remark-picture {
        width: 84px;
        height: 84px;
    }

    .first-picture {
        margin-right: 4px;
    }

    .end-picture {
        margin-left: 4px;
    }

    .img-none {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
    }

</style>
