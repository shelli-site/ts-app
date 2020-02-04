<template>
    <van-col :span="prop.span" v-bind="$attrs" class="picture--food">
        <div v-if="prop.span===24" class="large--picture--food">
            <van-image :src="prop.pictureUrl"
                       radius="5px 5px 0 0" class="picture--detail" fit="cover"/>
            <div class="food--content">
                <div class="food--content--desc">
                    <div class="food--name van-ellipsis">{{prop.foodName}}</div>
                    <div class="food--price_and_tag">
                        {{prop.price&&`￥${prop.price}元`}}
                    </div>
                </div>
                <div class="food--content--add-button">
                    <van-button class="add--button" icon="plus" color="#ff5e09" round size="small"
                                @click="addFood2Shopping()"/>
                </div>
            </div>
        </div>
        <div v-else-if="prop.span===12" class="middle--picture--food">
            <van-image :src="prop.pictureUrl"
                       radius="5px 5px 0 0" class="picture--detail" fit="cover"/>
            <div class="food--content">
                <div class="food--content--desc">
                    <div class="food--name van-ellipsis">{{prop.foodName}}</div>
                    <div class="food--price_and_tag">
                        {{prop.price&&`￥${prop.price}元`}}
                    </div>
                </div>
                <div class="food--content--add-button">
                    <van-button class="add--button" icon="plus" color="#ff5e09" round size="mini"
                                @click="addFood2Shopping()"/>
                </div>
            </div>
        </div>
        <div v-else-if="prop.span===8" class="small--picture--food">
            <van-image :src="prop.pictureUrl"
                       radius="5px 5px 0 0" class="picture--detail" fit="cover"/>
            <div class="food--content">
                <div class="food--content--desc">
                    <div class="food--name van-ellipsis">{{prop.foodName}}</div>
                    <div class="food--monthly_sales_volume">
                        {{prop.monthlySalesVolume&&`月售${prop.monthlySalesVolume}`}}
                    </div>
                    <div class="food--tags"></div>
                    <div class="food--price">
                        {{prop.price&&`￥${prop.price}元`}}
                    </div>
                </div>
                <div class="food--content--add-button">
                    <van-button class="add--button" icon="plus" color="#ff5e09" round size="mini"
                                @click="addFood2Shopping()"/>
                </div>
            </div>
        </div>
    </van-col>
</template>

<script>
    import {Food, ShoppingModule} from "../../../../../store/modules/shopping";

    export default {
        name: "FoodPicture",
        props: {
            prop: {
                default: () => ({
                    span: 24,
                    pictureUrl: '',
                    foodId: 0,
                    foodName: '',
                    price: 0.01,
                    monthlySalesVolume: '',
                    tags: []
                }),
                type: Object
            }
        },
        methods: {
            addFood2Shopping() {
                let food = new Food();
                food.count = 1;
                food.food = {
                    id: this.prop.foodId,
                    name: this.prop.foodName,
                    picture: this.prop.pictureUrl,
                    price: this.prop.price,
                    extra: {}
                }
                ShoppingModule.addFood(food);
            }
        }
    }
</script>

<style lang="scss" scoped>
    $step: 4px;
    .picture--food {
        margin-top: 11px;
        padding: 0 $step;
    }

    .large--picture--food {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); /*px*/
        height: 265px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;

        .picture--detail {
            height: 195px;
            width: 100%;
        }

        .food--content {
            display: flex;
            align-items: center;
            flex: 1;

            .food--content--desc {
                flex: 1;
                height: 44px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 15px;

                .food--name {
                    font-size: 16px;
                    font-weight: 500;
                    height: 17px;
                    line-height: 17px;
                }

                .food--price_and_tag {
                    height: 17px;
                }
            }

            .food--content--add-button {
                align-self: flex-end;
                width: 56px;
                height: 56px;

                display: flex;
                align-items: center;
                justify-content: center;

                .add--button {
                    height: 32px;
                    width: 32px;
                    min-width: 32px;
                }
            }
        }
    }

    .middle--picture--food {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); /*px*/
        height: 192px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;

        .picture--detail {
            height: 126px;
            width: 100%;
        }

        .food--content {
            display: flex;
            align-items: center;
            flex: 1;

            .food--content--desc {
                flex: 1;
                height: 43px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 9px;
                font-size: 14px;

                .food--name {
                    font-weight: 500;
                    height: 16px;
                    line-height: 16px;
                }

                .food--price_and_tag {
                    font-size: 12px;
                    height: 16px;
                }
            }

            .food--content--add-button {
                align-self: flex-end;
                width: 43px;
                height: 43px;

                display: flex;
                align-items: center;
                justify-content: center;

                .add--button {
                    height: 26px;
                    width: 26px;
                    min-width: 26px;
                }
            }
        }
    }

    .small--picture--food {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); /*px*/
        height: 172px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;

        .picture--detail {
            min-height: 82px;
            height: 82px;
            width: 100%;
        }

        .food--content {
            display: flex;
            align-items: center;
            flex: 1;

            .food--content--desc {
                flex: 1;
                height: 70px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 8px;
                font-size: 12px;

                .food--name {
                    font-weight: 500;
                    font-size: 13px;
                    height: 13px;
                    line-height: 13px;
                }

                .food--monthly_sales_volume {
                    height: 12px;
                    line-height: 12px;
                    font-size: 12px;
                    color: #c8c8c8;
                    transform: scale(0.9);
                    transform-origin: 0 0;
                }

                .food--tags {
                    height: 15px;
                    line-height: 15px;
                    font-size: 12px;
                }

                .food--price {
                    font-size: 12px;
                    height: 12px;
                    line-height: 12px;
                }
            }

            .food--content--add-button {
                width: 43px;
                height: 43px;
                align-self: flex-end;
                display: flex;
                align-items: center;
                justify-content: center;

                .add--button {
                    height: 23px;
                    width: 23px;
                    min-width: 23px;
                }
            }
        }
    }
</style>
