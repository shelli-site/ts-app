<template>
    <div class="submit-order">
        <van-nav-bar ref="navBar"
                     :style="{height: nav.height +'px'}"
                     :z-index="10"
                     left-arrow
                     @click-left="()=>{$router.go(-1);}">
            <span slot="title" :style="{lineHeight:nav.height+'px'}">{{nav.title}}</span>
            <span slot="right" :style="{fontWeight: 500,lineHeight:nav.height+'px'}">
            </span>
        </van-nav-bar>
        <h2 class="submit-order__title">基础用法</h2>
        <van-card v-for="(food, index) in $store.state.shopping.foodList"
                  :key="index"
                  :num="food.count"
                  :price="food.food.price"
                  :title="food.food.name"
                  :thumb="food.food.picture"
        />
        <van-submit-bar
                :price="totalPrice"
                button-text="提交订单"
                @submit="onSubmit"
        />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import ShoppingModule from "@/store/modules/shopping";

    @Component
    export default class SubmitOrder extends Vue {
        protected nav: any = {
            title: '确认订单',
            height: 45
        };

        get totalPrice() {
            let totalPrice: number = ShoppingModule.foodList.reduce((previous, current) => {
                return previous + current.food.price * current.count;
            }, 0);
            return Number((totalPrice * 100).toFixed(2));
        }

        onSubmit() {
        }
    }
</script>

<style lang="scss" scoped>
    .submit-order {
        .submit-order__title {
            margin: 0;
            padding: 32px 16px 16px;
            color: rgba(69, 90, 100, 0.6);
            font-weight: normal;
            font-size: 14px;
            line-height: 16px;
        }
    }
</style>
