<template>
    <div class="order-item" @click="()=>{$emit('click', value)}">
        <div class="item-left">
            <van-image :src="value.detailUrl" width="40" height="40" style="border: 1px solid #fcfcfc" class="img"
                       radius="5px" fit="cover"/>
        </div>
        <div class="item-right">
            <div class="title">
                            <span class="title__left">{{$store.state.info.shopName}}
                            <van-icon style="font-weight: 600;" name="arrow" color="#7f7f7f"></van-icon></span>
                <span class="title__right">{{value.statusLabel}}</span>
            </div>
            <div class="time">{{value.orderStartTime}}</div>
            <div class="des">
                <span class="des__left">{{value.firstFoodName}} <template v-if="value.foodCounts>0">等{{value.foodCounts}}件</template></span>
                <span class="des__right">￥{{value.priceTotal|toDecimal2}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderItem",
        props: {
            value: {
                default: () => ({
                    status: '',
                    statusLabel: '',
                    detailUrl: '',
                    orderStartTime: '',
                    firstFoodName: '',
                    foodCounts: 0,
                    priceTotal: ''
                }), type: Object
            }
        }
    }
</script>

<style lang="scss" scoped>
    .order-item {
        background: #ffffff;
        height: 100px;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1); /*px*/
        border-top-width: 0px !important; /*px*/
        margin: 0 10px 10px 10px;
        border-radius: 4px;
        display: flex;

        .item-left {
            text-align: center;

            .img {
                width: 40px;
                height: 40px;
                border-radius: 5px;
                margin: 15px;
                background: #f7f7f7;
            }
        }

        .item-right {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-right: 15px;

            .title {
                padding-top: 15px;
                font-size: 14px;
                font-weight: 600;
                display: flex;
                justify-content: space-between;

                .title__left {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .title__right {
                    font-weight: 400;

                }
            }

            .time {
                color: #7f7f7f;
                display: flex;
                align-items: center;
                justify-content: left;
                height: 30px;
                border-bottom: solid 1px #f2f2f2;
            }

            .des {
                flex: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .des__left {
                    font-weight: 500;
                }

                .des__right {
                    font-weight: 500;
                }
            }
        }
    }

    .order-item:active {
        background-color: #f2f3f5;
    }
</style>
