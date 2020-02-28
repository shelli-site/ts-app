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
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="refresh"
                          :disabled="!$store.state.user.isLogin">
            <div class="order-list">
                <div class="list-title">我的订单</div>
                <template v-if="$store.state.user.isLogin">
                    <template v-for="(order, index) in orderList">
                        <order-item :value="order" :key="index"/>
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
</style>

