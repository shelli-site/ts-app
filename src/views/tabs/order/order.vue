<template>
    <div class="order">
        <van-nav-bar ref="navBar"
                     :style="{height: nav.height+'px'}"
                     left-text=""
                     right-text=""
                     :left-arrow="false"
                     :border="false"
                     :z-index="10"
                     @click-right="onClickRight"
                     fixed>
            <span slot="title" :style="{opacity:nav.opacity,lineHeight:nav.height+'px'}">{{nav.title}}</span>
            <span v-if="$store.state.user.isLogin" slot="right" style="font-weight: 500">其他订单</span>
        </van-nav-bar>
        <div class="bg-nav"></div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="refresh" :head-height="80"
                          :disabled="!$store.state.user.isLogin">
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
            <img
                    class="load-msg"
                    slot="loosing"
                    src="../../../assets/img/load.svg"
            >
            <!-- 加载提示 -->
            <img
                    class="load-msg"
                    slot="loading"
                    src="../../../assets/img/loading.svg"
            >
            <div class="order-list">
                <div class="list-title">我的订单</div>
                <template v-if="$store.state.user.isLogin">
                    <template v-for="(order, index) in orderList">
                        <order-item :value="order" :key="index"
                                    @click="o=>{$router.push({name: 'OrderDetail', params: {id: o.orderId}});}"/>
                    </template>
                </template>
                <un-login v-else tip-text="登陆后查看订单"/>
            </div>
            <van-divider v-if="orderList.length>5 && $store.state.user.isLogin" class="margin-b"
                         :style="{ fontSize:'12px',color: '#969799', borderColor: '#969799', padding: '0 16px' }">
                我有底线
            </van-divider>
            <div v-else class="seize"></div>
        </van-pull-refresh>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Toast} from "vant";
    import OrderItem from "@/views/tabs/order/OrderItem.vue";
    import UnLogin from "@/components/un-login/un-login.vue";
    import OrderAPI from "@/api/app/order";

    @Component({components: {OrderItem, UnLogin}})
    export default class Order extends Vue {
        isLoading: boolean = false;
        protected nav: any = {
            title: '我的订单',
            opacity: 0,
            height: 60
        };
        pageNo: number = 1;
        pageSize: number = 10;
        orderList: any[] = [];

        mounted() {
            window.addEventListener('scroll', this.scrollTo)
            this.scrollTo();
            this.$store.state.user.isLogin && this.getOrderList();
        }

        onClickRight() {
            Toast('按钮');
        }

        scrollTo() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let navBar: any = document.getElementsByClassName('van-nav-bar__title van-ellipsis')[0]
            if (scrollTop <= 20) {
                this.nav.opacity = 0
            } else if (20 < scrollTop && scrollTop < 38) {
                this.nav.opacity = 1 - ((38 - scrollTop) / 20);
            } else {
                this.nav.opacity = 1
            }
        }

        async onRefresh() {
            await this.getOrderList();
        }

        async getOrderList() {
            try {
                this.isLoading = true;
                const res: any = await OrderAPI.getOrderList({
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                });
                this.orderList = res.list;
                setTimeout(() => {
                    this.isLoading = false;
                }, 500);
            } catch (e) {
                throw e;
            }
        }

        destroyed() {
            window.removeEventListener('scroll', this.scrollTo)
            Toast.clear(true);
        }
    }
</script>

<style lang="scss" scoped>
    .order {
        height: 100%;

        .refresh {
            min-height: calc(100% - 60px); /*px*/
        }
    }

    .bg-nav {
        height: 57px;
    }

    .order-list {
        background-color: #f8f8f8;

        .list-title {
            text-align: left;
            font-size: 20px;
            font-weight: 600;
            padding: 15px 25px;
            background-image: linear-gradient(#ffffff, #f8f8f8);
        }
    }

    .margin-b {
        margin-bottom: 66px;
    }

    .seize {
        margin-bottom: 60px;
    }

    .load-msg {
        height: 35px;
    }
</style>

