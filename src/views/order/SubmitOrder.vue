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
        <van-cell-group class="submit-order-cell-group" style="margin-top: 20px;">
            <van-cell title="就餐方式" is-link :value="`${$store.state.shopping.diningModeData.mode}
            ${$store.state.shopping.diningModeData.position?`，${$store.state.shopping.diningModeData.position}号桌`:''}`"
                      @click="diningMode=true;"/>
            <van-cell title="支付方式" is-link value="支付宝"/>
        </van-cell-group>

        <van-cell-group class="submit-order-cell-group" title="已选菜单" style="margin-top: 0px;">
            <food-card v-for="(food, index) in $store.state.shopping.foodList" :key="index"
                       class="submit-order-food van-hairline--bottom"
                       :counts="food.count" :food="food.food"/>
        </van-cell-group>

        <van-cell-group class="submit-order-cell-group">
            <van-cell title="餐具份数" is-link value="一份"/>
            <van-field v-model="tel" type="tel" label="联系电话" input-align="right"/>
            <van-field v-model="message" rows="2" autosize label="备注" type="textarea" maxlength="50"
                       placeholder="有什么话，就写在这里吧！"
                       show-word-limit/>
        </van-cell-group>

        <van-submit-bar
                :price="totalPrice"
                button-text="确认支付"
                @submit="onSubmit"
        />

        <dining-mode-dialog :value="diningMode"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import ShoppingModule from "@/store/modules/shopping";
    import FoodCard from "@/views/tabs/home/components/FoodCard/FoodCard.vue";
    import DiningModeDialog from "@/views/tabs/home/components/DiningModeDialog/DiningModeDialog.vue";
    import PopupModule from "@/store/modules/popup";

    @Component({components: {FoodCard, DiningModeDialog}})
    export default class SubmitOrder extends Vue {
        protected nav: any = {
            title: '确认订单',
            height: 45
        };
        tel: any = '18582598128';
        message: any = '';
        diningMode: boolean = false;

        get totalPrice() {
            let totalPrice: number = ShoppingModule.foodList.reduce((previous, current) => {
                return previous + current.food.price * current.count;
            }, 0);
            return Number((totalPrice * 100).toFixed(2));
        }

        @Watch('$store.state.popup.statusChange')
        statusChange(value: boolean) {
            if (value) {
                if (PopupModule.popup[this.$route.name as string].dialog) {
                    if (PopupModule.popup[this.$route.name as string].dialog.show === false) {
                        this.diningMode = false;
                    }
                }
                PopupModule.statusChanged();
            }
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

        .submit-order-food {
            padding: 5px 16px 5px 10px;
            background-color: white;
        }

        .submit-order-cell-group {
            margin-top: 8px;
            margin-left: 6px;
            margin-right: 6px;
        }
    }
</style>
