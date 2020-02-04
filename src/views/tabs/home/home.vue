<template>
    <div class="home">
        <van-nav-bar title=""
                     left-text=""
                     right-text=""
                     :style="{backgroundImage:style.navBarBackgroundImage,backgroundColor:style.navBarBackgroundColor}"
                     :border="false"
                     :left-arrow="false"
                     :z-index="10"
                     fixed>
            <span slot="left">
            </span>
            <div slot="right" style="display: flex;height:46px;align-items: center">
                <div class="right-icon" @click="status.loading = !status.loading">
                    <van-icon name="search"
                              :style="{display: 'table-cell',verticalAlign: 'middle'}"
                              :color="style.navBarIconColor" size="0.65rem"></van-icon>
                </div>
                <div class="right-icon">
                    <van-icon name="scan"
                              :style="{display: 'table-cell',verticalAlign: 'middle'}"
                              :color="style.navBarIconColor"
                              size="0.65rem"></van-icon>
                </div>
            </div>
        </van-nav-bar>
        <div class="content-background" ref="backgroundImg">
            <van-sticky :container="backgroundImg">
                <div class="content-background-img">
                    <img src="img/home-1.jpg" class="content-background-before"/>
                    <div class="content-background-after"></div>
                </div>
            </van-sticky>
        </div>
        <div class="content-body" style="height: 100%">
            <div class="title-box">
                <div class="name">
                    <div class="name-content">
                        <div class="shop-name">乐山钵钵鸡</div>
                        <div class="shop-desc">
                            ⭐⭐⭐⭐⭐ <span class="shop-desc-text">地方特色小吃 | 评价(25)</span>
                        </div>
                    </div>
                    <van-image class="name-img" fit="cover" radius="3px"
                               src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578683960352&di=1877f727c12bae8d3d30a63f55a18376&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170726%2F2c20691f7e204d0d82837d46b2305a1f_th.jpg">
                    </van-image>
                </div>
                <div class="address">
                    <van-icon name="location" size="0.5rem" color="#c8c8c8" style="margin-right: 10px"/>
                    <span style="flex: 1;transform: scale(0.8);transform-origin: 0 0;">文三路453号</span>
                    <van-icon name="arrow" size="0.35rem" color="#c8c8c8"/>
                </div>
                <div class="vip-ad">
                    <van-icon class="vip-ad-left-icon" name="vip-card" color="#edd288" size="0.8rem"/>
                    <div class="vip-ad-right">
                        <div class="vip-ad-right-button">低至8.9元
                        </div>
                        <div style="color: #000000;background-color: #fbebc5;" class="vip-ad-right-button">
                            立即开通
                        </div>
                    </div>
                    <div class="vip-ad-title">成为本店会员</div>
                    <div class="vip-ad-desc">预计每单预计省4.86元，享3大会员特权</div>
                </div>
            </div><!--标题块-->
            <div class="dining-mode">
                <van-icon name="column" size="0.5rem" color="#c8c8c8" style="margin-right: 10px"/>
                <span style="flex: 1">堂食，8号桌</span>
                <van-icon name="arrow" size="0.35rem" color="#c8c8c8"/>
            </div><!--就餐方式-->
            <food-tabs v-model="activeTab">
                <tab-item value="tab1" label="点餐">
                    <div class="food-list">
                        <van-row class="list-group-content">
                            <template v-for="(category, categoryIndex) in foodData.categoryList">
                                <van-col v-if="category.foodList.length>0" :span="24" :key="`category-${categoryIndex}`"
                                         class="list-group-title">
                                    {{category.categoryName}}
                                </van-col>
                                <food-picture v-for="(food, foodIndex) in category.foodList"
                                              :key="`${categoryIndex}-${foodIndex}`" :prop="food"/>
                            </template>
                        </van-row>
                        <van-divider :style="{ fontSize:'12px',color: '#969799', borderColor: '#969799' }">
                            我有底线
                        </van-divider>
                    </div>
                </tab-item>
                <tab-item value="tab2" label="点过的菜">
                    <div class="empty">暂无点过的菜</div>
                </tab-item>
                <tab-item value="tab3" label="评价">
                    <div class="empty">暂无评价</div>
                </tab-item>
            </food-tabs><!--tab 分类-->
        </div>
        <shopping-cart></shopping-cart>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import FoodTabs from "@/views/tabs/home/components/food-tabs/FoodTabs.vue";
    import TabItem from "@/views/tabs/home/components/food-tabs/TabItem.vue";
    import FoodPicture from "@/views/tabs/home/components/FoodPicture/FoodPicture.vue";
    import HomeAPI from '@/api/app/home';
    import ShoppingCart from "@/views/tabs/home/components/ShoppingCart/ShoppingCart.vue";

    @Component({
        components: {FoodTabs, TabItem, FoodPicture, ShoppingCart},
    })
    export default class Home extends Vue {
        protected form: any = {search: ''};
        style: any = {
            navBarIconColor: '#333333',
            navBarBackgroundColor: '#ffffff',
            navBarBackgroundImage: ''
        };
        status: any = {
            loading: false
        };
        activeTab: any = 'tab1';
        foodData: any = {
            categoryList: []
        };
        backgroundImg: any = null;

        async mounted() {
            await this.getHomeFoodList();
            window.addEventListener('scroll', this.scrollTo)
            // this.scrollTo();
        }

        async getHomeFoodList() {
            try {
                this.$elLoading();
                this.backgroundImg = (this.$refs['backgroundImg'] as any);
                const res: any = await HomeAPI.getHomeFood();
                this.foodData.categoryList = res.filter((c: any) => c.foodList.length > 0).map((category: any, index: number) => ({
                    categoryId: category.categoryId,
                    categoryName: category.categoryName,
                    foodList: category.foodList.map((food: any) => ({
                        ...food, ...{
                            span: (index === 0 || index === 1) ? (24 / (index + 1)) : 8
                        }
                    }))
                }));
                this.$elLoading().hide();
                this.style.navBarBackgroundColor = 'rgba(255,255,255,0)'
                this.style.navBarIconColor = '#ffffff'
            } catch (e) {
                throw e;
            }
        }

        destroyed() {
            this.$elLoading().hide();
        }

        scrollTo() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop <= 20) {
                this.style.navBarIconColor = '#ffffff';
                this.style.navBarBackgroundColor = 'rgba(0,0,0,0)';
                this.style.navBarBackgroundImage = '';
            } else if (20 < scrollTop && scrollTop < 100) {
                this.style.navBarIconColor = '#ffffff';
                this.style.navBarBackgroundColor = `rgba(255,255,255,${1 - ((100 - scrollTop) / 20)})`
                this.style.navBarBackgroundImage = '';
            } else {
                this.style.navBarIconColor = '#333333';
                this.style.navBarBackgroundImage = 'linear-gradient(#ffffff, #f8f8f8)';
            }
        }
    }
</script>

<style lang="scss" scoped>
    $padding-L-R: 16px;
    .home {
        padding: 0 $padding-L-R;
        height: 100%;

        .content-background {
            position: absolute;
            left: 0px;
            right: 0px;
            top: 0px;
            overflow: hidden;
            z-index: 2;
            height: 280px;

            .content-background-img {
                position: relative;
                height: 106px;
            }
        }

        .content-background-before {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            height: 116px;
            filter: blur(5px);
            margin: -5px;
        }

        .content-background-after {
            height: 30px;
            position: absolute;
            background-color: #f8f8f8;
            top: 106px;
            left: 0;
            right: 0;
        }

        .content-body {
            position: relative;
            top: 46px;
            z-index: 3;

            .title-box {
                padding: 13px;
                background-color: #ffffff;
                height: 137px;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); /*px*/
                border-top-width: 0 !important;

                .name {
                    color: #000000;
                    height: 45px;
                    display: flex;

                    .name-content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;

                        .shop-name {
                            height: 30px;
                            line-height: 30px;
                            font-weight: 500;
                            font-size: 16px;

                        }

                        .shop-desc {
                            height: 15px;
                            line-height: 15px;

                            .shop-desc-text {
                                color: #cbcbcb;
                                letter-spacing: 1px;
                                font-size: 12px;
                                vertical-align: -3px;
                            }
                        }
                    }

                    .name-img {
                        height: 45px;
                        width: 45px;
                        border-radius: 3px;
                        background-color: #3190e8;
                    }
                }

                .address {
                    flex: 1;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                }

                .vip-ad {
                    border-radius: 4px;
                    background-color: #f36852;
                    padding: 10px 80px 10px 45px;
                    color: #ffffff;
                    position: relative;

                    .vip-ad-left-icon {
                        position: absolute;
                        top: 8px;
                        left: 10px;
                    }

                    .vip-ad-right {
                        width: 70px;
                        height: 50px;
                        position: absolute;
                        top: -10px;
                        right: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .vip-ad-right-button {
                            width: 100%;
                            background-color: #fd6306;
                            color: #ffffff;
                            text-align: center;
                            height: 22px;
                            line-height: 22px;
                            border-radius: 11px;
                        }
                    }

                    .vip-ad-title {
                        font-size: 14px;
                        line-height: 20px;
                    }

                    .vip-ad-desc {
                        font-size: 12px;
                        line-height: 12px;
                        transform: scale(0.8);
                        transform-origin: 0 0;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }

            .dining-mode {
                padding: 13px;
                margin-top: 8px;
                height: 17px;
                background-color: #ffffff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); /*px*/
                border-top-width: 0 !important;
                border-radius: 4px;
                display: flex;
                align-items: center;
            }

            .dining-mode:active {
                background-color: #f2f3f5;
            }
        }
    }

    $step: 4px;
    .food-list {
        background-color: #f8f8f8;
        margin-left: -$padding-L-R;
        margin-right: -$padding-L-R;
        padding: 0 $padding-L-R;

        .list-group-title {
            padding-left: $step !important;
            font-size: 15px;
            line-height: 15px;
            font-weight: 500;
            text-align: left;
            margin-top: 15px;
        }

        .list-group-content {
            margin: 0 -$step;

        }

        padding-bottom: 50px;
    }

    .right-icon {
        height: 40px;
        width: 40px;
        display: table;
    }

    .right-icon:active {
        /*background-color: #f2f3f5;*/
    }

    .empty {
        overflow: hidden;
        min-height: 340px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
