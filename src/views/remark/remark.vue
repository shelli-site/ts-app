<template>
    <div class="user-remark">
        <van-nav-bar ref="navBar"
                     :style="{height: nav.height +'px'}"
                     :z-index="10"
                     left-arrow fixed
                     @click-left="()=>{$router.go(-1);}">
            <span slot="title" :style="{lineHeight:nav.height+'px'}">{{nav.title}}</span>
            <span slot="right" :style="{fontWeight: 500,lineHeight:nav.height+'px',color: '#07c160',display: 'flex'}">
            </span>
        </van-nav-bar>
        <van-pull-refresh v-model="nav.loading" @refresh="onRefresh" class="list" :head-height="80">
            <svg class="load-msg"
                 slot="pulling"
                 slot-scope="props"
                 src="../../../assets/img/load.svg"
                 :style="{ transform: `scale(${props.distance / 80})` }"
                 version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" x="0px"
                 y="0px"
                 viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <path fill="#e0edf6" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
                    c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z" :transform="`rotate(${(props.distance / 80)*360} 50 50)`">
                    </path>
                <path fill="#96c9f8" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
                    c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z" :transform="`rotate(${(props.distance / 40)*(-360)} 50 50)`">
                    </path>
                <path fill="#2295ff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
                        L82,35.7z" :transform="`rotate(${(props.distance / 80)*360} 50 50)`">
                    </path>
    </svg>
            <!-- 释放提示 -->
            <img class="load-msg"
                 slot="loosing"
                 src="../../assets/img/load.svg"
            >
            <!-- 加载提示 -->
            <img class="load-msg"
                 slot="loading"
                 src="../../assets/img/loading.svg"
            >
            <remark :remark-list="userRemark.list" :user="user" :style="{marginTop: nav.height+'px'}" class=""/>
        </van-pull-refresh>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Remark from "../tabs/home/components/remark/remark.vue";
    import RemarkAPI from '@/api/app/remark'

    @Component({components: {Remark}})
    export default class UserRemark extends Vue {
        nav: any = {
            title: '我的评价',
            height: 45,
            loading: false
        };
        user: any = {};
        userRemark: any = {
            list: [],
            pageTotal: 0,
            pageSize: 10,
            pageNo: 1
        };

        created() {
            this.user = {
                username: this.$store.state.user.username,
                avatar: this.$store.state.user.avatar,
            };
            this.getRemarkList();
        }

        async onRefresh() {
            this.getRemarkList();
        }

        getRemarkList() {
            this.nav.loading = true;
            RemarkAPI.getRemarkUserList().then((res: any) => {
                this.userRemark.list = res.list;
                this.userRemark.pageTotal = res.pageTotal;
                this.userRemark.pageSize = res.pageSize;
                this.userRemark.pageNo = res.pageNo;
                this.nav.loading = false;
            })
        }
    }
</script>

<style lang="scss" scoped>
    .user-remark {
        padding: 0 16px;
        width: calc(100% - 32px);
    }

    .list {
        margin: 0 -16px;
        /*padding: 0 16px;*/
    }

    .load-msg {
        height: 35px;
        margin: 22.5px 0;
    }
</style>
