<template>
    <div class="food-list-item">
        <div class="food-picture">
            <van-image :src="food.picture" width="60" height="60" style="border: 1px solid #fcfcfc"
                       radius="4px" fit="cover"/>
        </div>
        <template v-if="mode==='submit'">
            <div class="food-msg">
                <div class="food-name">{{food.name}}</div>
                <div class="food-price">￥<span>{{food.price|toDecimal2}}</span></div>
            </div>
            <div class="food-count">
                <slot name="count">
                    <div class="count-number">x{{counts}}</div>
                </slot>
            </div>
        </template>
        <template v-else-if="mode==='detail'">
            <div class="food-msg">
                <div class="food-name">{{food.name}}</div>
                <div class="food-detail-count">
                    <slot name="count">
                        <div class="count-number">x{{counts}}</div>
                    </slot>
                </div>
            </div>
            <div class="food-detail-price">
                ￥<span>{{food.price|toDecimal2}}</span>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "FoodCard",
        props: {
            mode: {
                default: "submit", type: String
            },
            counts: {
                default: 0, type: Number
            },
            food: {
                default: () => ({
                    picture: '',
                    name: '',
                    price: '',
                }), type: Object
            }
        }
    }
</script>

<style lang="scss" scoped>
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

            .count-number {
                width: 100%;
                text-align: right;
                line-height: 20px;
                font-size: 12px;
                color: #969799;
            }
        }
    }

    .food-detail-count {
        .count-number {
            line-height: 20px;
            color: #969799;
        }
    }

    .food-detail-price {
        font-size: 13px;
        line-height: 20px;
        margin-right: -6px;
        align-self: flex-end;
    }
</style>
