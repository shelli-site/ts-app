<template>
    <div class="background">
        <food-card v-for="(food, index) in list" :key="food.foodId"
                   :class="{'food':true, 'bottom':index!==list.length-1, 'first':index===0, 'end':index===list.length-1}"
                   :food="{
                        picture: food.pictureUrl,
                        name: food.foodName,
                        price: food.price
                        }">
            <template slot="count">
                <div style="text-align: right;flex: 1;">
                    <van-button class="add--button" icon="plus" color="#ff5e09" round size="mini"
                                @click="addFood2Shopping(food)"/>
                </div>
            </template>
        </food-card>
    </div>
</template>

<script>
    import FoodCard from "@/views/tabs/home/components/FoodCard/FoodCard";
    import {Food, ShoppingModule} from "@/store/modules/shopping";

    export default {
        name: "old-food",
        components: {FoodCard},
        props: {
            list: {default: () => [], type: Array}
        },
        methods: {
            addFood2Shopping(data) {
                let food = new Food();
                food.count = 1;
                food.food = {
                    id: data.foodId,
                    name: data.foodName,
                    picture: data.pictureUrl,
                    price: data.price,
                    extra: {}
                }
                ShoppingModule.addFood(food);
            }
        }
    }
</script>

<style scoped>
    .background {
        background-color: #ffffff;
        border-radius: 3px;
    }

    .food {
        position: relative;
        padding-top: 5px;
        padding-left: 15px;
        padding-right: 10px;
    }

    /*    .food:active {
            background-color: #f2f3f5;
        }*/

    .bottom::after {
        content: "";
        position: absolute;
        display: inline-block;
        left: 15px;
        bottom: 0;
        right: 0;
        height: 1px;
        background-color: #f8f9fa;
    }

    .add--button {
        height: 26px;
        width: 26px;
        min-width: 26px;
        margin-bottom: 5px;
    }

    /*  .first {
          padding-top: 15px;
      }

      .end {
          padding-bottom: 15px;
      }*/
</style>
