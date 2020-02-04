<template>
    <div class="shopping-cart">
        <div class="right-bottom-icon" @click="popupModelChange">
            <div class="icon">
                <van-icon name="cart" size=".6rem" color="#ffffff"
                          :info="statisticsFood"/>
            </div>
        </div>
        <van-popup v-model="popupShow" class="shopping-popup" round position="bottom" safe-area-inset-bottom>
            <div class="statistics-msg">
                <span class="statistics-food">共点了{{statisticsFood}}份菜</span>
                <span class="shopping-clear">清空</span>
            </div>
            <div class="food-list">
                <div v-for="(food, index) in $store.state.shopping.foodList" :key="index" class="food-list-item">
                    <div class="food-picture">
                        <van-image :src="food.food.picture" width="60" height="60" style="border: 1px solid #fcfcfc"
                                   radius="4px" fit="cover"/>
                    </div>
                    <div class="food-msg">
                        <div class="food-name">{{food.food.name}}</div>
                        <div class="food-price">￥<span>{{food.food.price}}</span></div>
                    </div>
                    <div class="food-count">
                        <van-stepper v-model="food.count" min="0" integer input-width="35px" button-size="22px"/>
                    </div>
                </div>
            </div>
            <div class="settlement-bar">
                <div class="settlement-icon"></div>
                <div class="settlement-msg"></div>
                <div class="settlement-btn"></div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {ShoppingModule} from "../../../../../store/modules/shopping";
    import {Toast} from "vant";

    export default {
        name: "ShoppingCart",
        computed: {
            statisticsFood() {
                let counts = ShoppingModule.foodList.reduce((previous, current) => {
                    return previous + current.count;
                }, 0);
                return counts || '';
            }
        },
        data() {
            return {
                popupShow: false
            }
        },
        created() {
            ShoppingModule.init();
        },
        methods: {
            popupModelChange() {
                if (this.statisticsFood) {
                    this.popupShow = true;
                } else {
                    Toast('先填满购物车吧！');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
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
        max-height: 600px;
        width: calc(100% - 32px);
        padding: 0 16px;

        .statistics-msg {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 16px 0;

            .statistics-food {
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
            height: 50px;
            background-color: aqua;
            margin: 10px 0px;
            border-radius: 25px;
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
