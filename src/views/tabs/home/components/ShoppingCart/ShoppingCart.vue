<template>
    <div class="shopping-cart">
        <div class="right-bottom-icon" @click="popupModelChange(true)">
            <div class="icon">
                <van-icon name="cart" size=".6rem" color="#ffffff"
                          :info="statisticsFood"/>
            </div>
        </div>
        <van-popup v-model="popupShow" class="shopping-popup" round
                   position="bottom" safe-area-inset-bottom
                   @close="popupClosed">
            <div class="statistics-msg">
                <span class="statistics-food"><span v-show="statisticsFood">共点了{{statisticsFood}}份菜</span></span>
                <span class="shopping-clear" @click="clearFoodList">清空</span>
            </div>
            <div class="food-list">
                <!--<div v-for="(food, index) in $store.state.shopping.foodList" :key="index" class="food-list-item">
                    <div class="food-picture">
                        <van-image :src="food.food.picture" width="60" height="60" style="border: 1px solid #fcfcfc"
                                   radius="4px" fit="cover"/>
                    </div>
                    <div class="food-msg">
                        <div class="food-name">{{food.food.name}}</div>
                        <div class="food-price">￥<span>{{food.food.price}}</span></div>
                    </div>
                    <div class="food-count">
                        <van-stepper v-model="food.count" min="0" integer input-width="35px" button-size="22px"
                                     :key="food.food.name" @change="foodListCountsChange"/>
                    </div>
                </div>-->
                <food-card v-for="(food, index) in $store.state.shopping.foodList" :key="index" :counts="food.count"
                           :food="food.food">
                    <template slot="count">
                        <van-stepper v-model="food.count" min="0" integer input-width="35px" button-size="22px"
                                     :key="food.food.name" @change="foodListCountsChange"/>
                    </template>
                </food-card>
            </div>
            <div class="settlement-bar">
                <div class="settlement-icon">
                    <van-icon name="cart" size=".75rem" color="#1989fa"
                              :info="statisticsFood"/>
                </div>
                <div class="settlement-msg">
                    <div class="settlement-price"><span v-show="totalPrice">￥{{totalPrice}}</span></div>
                    <div class="settlement-bottom-msg">
                        <span>打包另需 ￥1</span>
                    </div>
                </div>
                <div class="settlement-btn">
                    <van-button round type="info" size="small" color="#00a8fe"
                                style="letter-spacing: 2px;padding: 0 15px;"
                                @click="SettlementOnClick">结算
                    </van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {ShoppingModule} from "../../../../../store/modules/shopping";
    import {Toast, Dialog} from "vant";
    import {PopupModule} from "../../../../../store/modules/popup";
    import FoodCard from "../FoodCard/FoodCard.vue";

    export default {
        name: "ShoppingCart",
        components: {FoodCard},
        computed: {
            statisticsFood() {
                let counts = ShoppingModule.foodList.reduce((previous, current) => {
                    return previous + current.count;
                }, 0);
                return counts || '';
            },
            totalPrice() {
                let totalPrice = ShoppingModule.foodList.reduce((previous, current) => {
                    return previous + current.food.price * current.count;
                }, 0);
                return totalPrice ? totalPrice.toFixed(2) : '';
            },
            popupVuex() {
                return PopupModule.statusChange;
            }
        },
        watch: {
            popupVuex(value) {
                this.$emit('statusChange', value);
                if (value) {
                    this.popupShow = PopupModule.popup[this.$route.name].shopping.show;
                    if (PopupModule.popup[this.$route.name].dialog) {
                        if (PopupModule.popup[this.$route.name].dialog.show === false) {
                            Dialog.close();
                        }
                    }
                    PopupModule.statusChanged();
                }
            }
        },
        data() {
            return {
                popupShow: false
            }
        },
        created() {
            ShoppingModule.init();
            PopupModule.addPopup({
                route: this.$route, conf: {
                    shopping: {/*购物车弹框*/
                        priority: 10,
                        show: false
                    }
                }
            });
        },
        methods: {
            popupClosed() {
                this.popupModelChange(false);
            },
            popupModelChange(showCmd) {
                if (showCmd) {
                    if (this.statisticsFood) {
                        PopupModule.showPopup({popupName: "shopping", route: this.$route});
                    } else {
                        Toast('先填满购物车吧！');
                    }
                } else {
                    PopupModule.closePopup({popupName: "shopping", route: this.$route})
                }
            },
            clearFoodList() {
                PopupModule.addPopup({
                    route: this.$route, conf: {
                        dialog: {/*清空弹框*/
                            priority: 20,
                            show: true
                        }
                    }
                });
                Dialog.confirm({
                    message: '您确定要清空购物车吗？'
                }).then(() => {
                    PopupModule.closePopup({route: this.$route, popupName: 'dialog'});
                    ShoppingModule.clearShopping();
                    this.popupModelChange(false);
                }).catch(() => {
                    PopupModule.closePopup({route: this.$route, popupName: 'dialog'});
                    console.log('cancel');
                });
            },
            SettlementOnClick() {
                PopupModule.addPopup({
                    route: this.$route, conf: {
                        dialog: {/*提交订单弹框*/
                            priority: 20,
                            show: true
                        }
                    }
                });
                Dialog.confirm({
                    message: '您确定要提交订单吗？'
                }).then(() => {
                    // PopupModule.closePopup({route: this.$route, popupName: 'dialog'});
                    this.$router.push({name: 'SubmitOrder'});
                }).catch(() => {
                    PopupModule.closePopup({route: this.$route, popupName: 'dialog'});
                    console.log('cancel');
                });
            },
            foodListCountsChange(value) {
                if (value === 0) {
                    ShoppingModule.refreshFoodList();
                    this.$forceUpdate;
                    if (!this.statisticsFood) {
                        this.popupModelChange(false);
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $st-z-index: 2010;

    .right-bottom-icon {
        position: fixed;
        right: 0px;
        bottom: 140px;
        width: 45px;
        height: 40px;
        background-color: #f8f8f8;
        padding-left: 5px;
        border-radius: 20px 0px 0px 20px;
        border: 1px solid #e6e6e7;
        border-right-width: 0px;
        z-index: 15;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .icon {
            background-color: #1989fa;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }

    .shopping-popup {
        min-height: 200px;
        max-height: 520px;
        width: calc(100% - 32px);
        padding: 0 16px;

        .statistics-msg {
            position: sticky;
            top: 0;
            left: 16px;
            right: 16px;
            z-index: $st-z-index;
            background-color: #ffffff;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 16px 0;

            .statistics-food {
                height: 23px;
                font-size: 17px;
                letter-spacing: 2px;
            }

            .shopping-clear {
                line-height: 15px;
                font-size: 12px;
                color: #8c8c8c;
            }
        }

        .food-list {
            margin-top: 12px;
            min-height: 65px;

            .food-list-item {
                height: 65px;
                display: flex;

                .food-picture {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .food-msg {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 8px;

                    .food-name {
                        letter-spacing: 1px;
                        font-size: 12px;
                        line-height: 25px;
                    }

                    .food-price {
                        letter-spacing: -1px;
                        color: #f22839;
                        padding-bottom: 3px;

                        span {
                            letter-spacing: -1px;
                            font-size: 18px;
                        }
                    }
                }

                .food-count {
                    width: 85px;
                    display: flex;
                    align-items: flex-end;
                    text-align: center;
                }
            }
        }

        .settlement-bar {
            position: sticky;
            left: 16px;
            right: 16px;
            bottom: 10px;
            z-index: $st-z-index;
            height: 50px;
            background-color: #3d3d3e;
            margin: 10px 0px;
            border-radius: 25px;
            display: flex;

            .settlement-icon {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 15px;
            }

            .settlement-msg {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 6px 20px;

                .settlement-price {
                    color: #ffffff;
                    font-size: 16px;
                    line-height: 16px;
                    letter-spacing: -1px;
                }

                .settlement-bottom-msg {
                    padding-left: 3px;
                    color: #b2b4ad;
                    font-size: 12px;
                    line-height: 12px;
                }
            }

            .settlement-btn {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-right: 12px;
            }
        }
    }
</style>
<style lang="scss">
    .icon {
        .van-info {
            right: -5px !important;
        }
    }

    .shopping-popup.van-popup--bottom.van-popup--round {
        border-radius: 14px 14px 0 0;
    }

    .food-count {
        .van-stepper {
            .van-stepper__minus, .van-stepper__plus {
                border-radius: 11px;

            }

            .van-stepper__minus {
                background-color: #ffffff;
                color: #1badf5;
                border: 1px solid #1badf5;
            }

            .van-stepper__plus {
                background-color: #1badf5;
                color: #ffffff;
                border: 1px solid #ffffff;
            }

            .van-stepper__input {
                background-color: #ffffff;
            }
        }
    }
</style>
