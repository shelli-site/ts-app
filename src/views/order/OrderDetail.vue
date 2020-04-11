<template>
    <div class="order-detail">
        <van-nav-bar ref="navBar"
                     :style="{height: nav.height +'px'}"
                     :z-index="10"
                     left-arrow fixed
                     @click-left="()=>{$router.go(-1);}">
            <span slot="title" :style="{lineHeight:nav.height+'px'}">{{nav.title}}</span>
            <span slot="right" :style="{fontWeight: 500,lineHeight:nav.height+'px'}">
            </span>
        </van-nav-bar>
        <van-cell-group v-show="orderData.id" class="order-cell-group" :style="{marginTop: nav.height+'px'}">
            <div class="seize-text">
                <div v-if="orderData.status === 'paid'" class="paid">
                    <span class="text">已支付</span>
                    <van-icon name="success" class="icon"/>
                </div>
                <div v-if="orderData.status === 'done'" class="paid">
                    <span class="text">已完成</span>
                    <van-icon name="success" class="icon"/>
                </div>
            </div>
        </van-cell-group>
        <van-cell-group v-show="orderData.id" class="order-cell-group">
            <div class="shop-name">
                <span>{{$store.state.info.shopName}}</span>
                <van-icon style="font-weight: 600;" color="#7f7f7f" name="arrow"/>
            </div>
            <food-card v-for="(food, index) in orderData.orderFoods" :key="index"
                       class="order-food van-hairline--bottom" mode="detail"
                       :counts="food.counts" :food="food.food"/>
            <div class="price-info">
                <div class="food-price">
                    <div class="left-text">商品总价</div>
                    <div class="right-price">￥{{(orderData.priceTotal-orderData.packingCost)|toDecimal2}}</div>
                </div>
                <div class="extra-price">
                    <div class="left-text">打包</div>
                    <div class="right-price">￥{{orderData.packingCost|toDecimal2}}</div>
                </div>
                <div class="order-price">
                    <i class="top"></i>
                    <div class="left-text">订单总价</div>
                    <div class="right-price">￥{{orderData.priceTotal|toDecimal2}}</div>
                </div>
            </div>
        </van-cell-group>
        <van-cell-group v-show="orderData.id" class="order-cell-group margin-bottom">
            <div class="group-title">
                订单信息
            </div>
            <div class="order-info">
                <div v-if="orderData.extra.message" class="info-item">
                    <div class="left-title">留言：</div>
                    <div class="right-content van-ellipsis">{{orderData.extra.message}}</div>
                </div>
                <div v-if="orderData.extra.tel" class="info-item">
                    <div class="left-title">联系方式：</div>
                    <div class="right-content">{{orderData.extra.tel}}</div>
                </div>
                <div class="info-item">
                    <div class="left-title">就餐方式：</div>
                    <div class="right-content">{{transDiningMode(orderData.tableNum)}}</div>
                </div>
                <div v-if="orderData.extra.tableware" class="info-item">
                    <div class="left-title">餐具：</div>
                    <div class="right-content">{{orderData.extra.tableware}}份</div>
                </div>
                <div class="info-item">
                    <div class="left-title">创建时间：</div>
                    <div class="right-content">{{orderData.orderStartTime}}</div>
                </div>
                <div v-if="orderData.orderPayTime" class="info-item">
                    <div class="left-title">付款时间：</div>
                    <div class="right-content">{{orderData.orderPayTime}}</div>
                </div>
                <div v-if="orderData.orderCancelTime" class="info-item">
                    <div class="left-title">取消时间：</div>
                    <div class="right-content">{{orderData.orderCancelTime}}</div>
                </div>
                <div v-if="orderData.orderRemarkTime" class="info-item">
                    <div class="left-title">评价时间：</div>
                    <div class="right-content">{{orderData.orderRemarkTime}}</div>
                </div>
            </div>
        </van-cell-group>
        <div class="foot-bottom">
            <van-button v-if="orderData.status && orderData.status !== 'done'" tag="span" plain hairline round
                        type="primary" size="mini"
                        class="btn" @click="remarkOrPaid(orderData.status)">
                <div class="btn-text">
                    <template v-if="orderData.status === 'paid'">
                        评价
                    </template>
                    <template v-else-if="orderData.status === 'unpaid'">
                        支付
                    </template>
                </div>
            </van-button>
            <van-button v-if="orderData.status && orderData.status !== 'unpaid'" tag="span" plain hairline round
                        size="mini" class="btn"
                        style="border-color: #cacaca">
                <div class="btn-text" style="color: #717171">再次下单</div>
            </van-button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import OrderAPI from "@/api/app/order";
    import FoodCard from "../tabs/home/components/FoodCard/FoodCard.vue";

    @Component({components: {FoodCard}})
    export default class OrderDetail extends Vue {
        protected nav: any = {
            title: '订单详情',
            height: 45
        };
        orderData: any = {
            id: 0,
            userId: 0,
            status: "",
            packingCost: 0,
            priceTotal: 0,
            tableNum: "",
            extra: {},
            orderStartTime: "",
            orderCancelTime: "",
            orderPayTime: "",
            orderFoods: []
        };

        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.getOrder(this.$route.params.id)
                }, 300)
            });

        }

        transDiningMode(mode: string) {
            switch (JSON.stringify(Number(mode))) {
                case "null":
                case "0":
                    return "打包";
                default:
                    return `堂食，${mode}号桌`
            }
        }

        async getOrder(id: any) {
            try {
                this.$elLoading();
                const res: any = await OrderAPI.getOrder(id);
                this.orderData = {
                    ...this.orderData, ...res, ...{
                        extra: res.extra,
                        orderFoods: res.orderFoods.map((food: any) => ({
                            counts: food.foodCounts,
                            food: {
                                id: food.id,
                                name: food.foodName,
                                price: food.priceCost,
                                picture: food.pictureUrl,
                                extra: food
                            }
                        }))
                    }
                }
                setTimeout(() => {
                    this.$elLoading().hide();
                }, 200);
            } catch (e) {
                throw e;
            }
        }

        remarkOrPaid(state: string) {
            switch (state) {
                case 'paid':
                    this.toRemarkPage();
                    break;
                case 'unpaid':
                    break;
            }
        }

        toRemarkPage() {
            this.$router.push({
                name: 'DoRemark', params: {orderId: this.$route.params.id}
                , query: {
                    detailUrl: this.orderData.orderFoods[0].food.picture,
                    name: this.orderData.orderFoods[0].food.name,
                    count: this.orderData.orderFoods.reduce((p: any, c: any) => {
                        p += c.counts;
                        return p;
                    }, 0)
                }
            })
        }
    }
</script>


<style lang="scss" scoped>
    $triangle_width: 8px;
    $order_price_bg: #fdfdfd;
    $order_price_border_color: #eaeaea;
    .order-food {
        padding: 5px 16px 5px 10px;
        background-color: white;
    }

    .order-cell-group {
        .shop-name {
            display: flex;
            align-items: center;
            padding: 10px 10px;
            font-weight: 600;

            span {
                letter-spacing: 1px;
                margin-right: 2px;
                font-size: 14px;
                line-height: 20px;
            }

        }

        .group-title {
            display: flex;
            align-items: center;
            padding: 10px 10px;
            letter-spacing: 1px;
            font-size: 14px;
            line-height: 20px;
        }

        .group-title::before {
            content: "";
            display: inline-block;
            margin-right: 4px;
            width: 2px;
            height: 14px;
            background-color: #c4663b;
        }

        .seize-text {
            height: 110px;

            .paid {
                height: 100%;
                display: flex;
                align-items: center;

                .text {
                    font-weight: 600;
                    font-size: 20px;
                    padding-left: 30px;
                }

                .icon {
                    flex: 1;
                    text-align: center;
                    font-size: 40px;
                    color: #1989fa;
                }
            }


        }

        margin-top: 8px;
        padding-left: 6px;
        padding-right: 6px;
    }

    .margin-bottom {
        margin-bottom: 60px;
    }

    .foot-bottom {
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 0px;
        height: 50px;
        background-color: #ffffff;
        border-top: solid 1px #e7e7e7;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;


        .btn {
            margin-right: 16px;
            height: 30px;

            .btn-text {
                letter-spacing: 1px;
                line-height: 30px;
                width: 85px;
            }
        }

        /*justify-content: right;*/
    }

    .price-info {
        padding-bottom: 10px;

        .food-price, .extra-price, .order-price {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 30px;
            padding: 0 10px;

            .left-text {
                letter-spacing: 1px;
            }
        }

        .food-price, .extra-price {
            font-size: 14px;
            color: #989898;

            .left-text {
                font-size: 13px;
            }
        }

        .order-price {
            position: relative;
            font-size: 15px;
            background-color: $order_price_bg;
            border-top: 1px solid $order_price_border_color;
            margin: 5px -6px -10px -6px;
            padding: 0 16px 10px;
            color: #373737;

            .right-price {
                color: #fb530d;
            }
        }
    }

    .order-info {
        padding: 0 10px 10px;
        color: #666666;

        .info-item {
            display: flex;
            height: 30px;
            align-items: center;
            /*justify-content: space-between;*/

            .left-title {
                width: 70px;
                text-align: right;
                letter-spacing: 1px;
            }

            .right-content {
                margin-left: 30px;
            }
        }
    }


    .top {
        position: absolute;
        right: 43px;
        top: -$triangle_width*2;
    }

    .top:before, .top:after {
        position: absolute;
        content: '';
        border-top: $triangle_width transparent dashed;
        border-left: $triangle_width transparent dashed;
        border-right: $triangle_width transparent dashed;
    }

    .top:before {
        border-bottom: $triangle_width $order_price_border_color solid;
    }

    .top:after {
        top: 1px; /*覆盖并错开1px*/
        border-bottom: $triangle_width $order_price_bg solid;
    }
</style>
