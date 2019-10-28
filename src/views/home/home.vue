<template>
    <div class="home">
        <!--<div class="bg-t"></div>-->
        <van-nav-bar title=""
                     left-text=""
                     right-text=""
                     :border="false"
                     :left-arrow="false"
                     :fixed="false">
            <span slot="left">
                <van-icon name="location" size="0.65rem"></van-icon>
                <span>浙江省杭州市西湖区<van-icon name="arrow-down" style="vertical-align: 0px;"></van-icon></span>
            </span>
            <span slot="right">
                <van-icon name="scan" size="0.65rem" style="padding:0 5px"></van-icon>
                <span>扫码</span>
                <icon-svg iconClass="Hailstorm-Night" style="font-size: 0.6rem;padding:0 5px"></icon-svg>
                <span>21℃</span>
            </span>
        </van-nav-bar>
        <van-sticky>
            <van-search class="home"
                        v-model="form.search"
                        placeholder=""
                        :show-action="false"
                        readonly
                        shape="round">
            <span slot="left-icon" style="color: #969799;display: flex">
                <van-icon name="search" size="0.5rem"></van-icon>
                <span class="text">炒饭</span></span>
            </van-search>
        </van-sticky>
        <van-swipe :autoplay="3000" indicator-color="white" class="swipe" :height="90">
            <van-swipe-item class="swipe__item">
                <div class="swipe__step"></div>
                <div class="swipe__content">1</div>
                <div class="swipe__step"></div>
            </van-swipe-item>
            <van-swipe-item class="swipe__item">
                <div class="swipe__step"></div>
                <div class="swipe__content">2</div>
                <div class="swipe__step"></div>
            </van-swipe-item>
            <van-swipe-item class="swipe__item">
                <div class="swipe__step"></div>
                <div class="swipe__content">3</div>
                <div class="swipe__step"></div>
            </van-swipe-item>
            <van-swipe-item class="swipe__item">
                <div class="swipe__step"></div>
                <div class="swipe__content">4</div>
                <div class="swipe__step"></div>
            </van-swipe-item>
        </van-swipe>

        <div class="list-title">推荐商家</div>
        <van-sticky :offset-top="53" @scroll="scrollTop">
            <el-collapse-transition>
                <div v-show="dropdownMenu.show">
                    <van-dropdown-menu class="dropdown-menu">
                        <van-dropdown-item v-model="value1" :options="option1" title-class=""></van-dropdown-item>
                        <div class="menu-b">距离</div>
                        <div class="menu-b">销量</div>
                        <div class="menu-block"></div>
                        <div class="menu-right">筛选
                            <van-icon name="filter-o" size="0.45rem"></van-icon>
                        </div>
                    </van-dropdown-menu>
                </div>
            </el-collapse-transition>
            <div class="filter-group">
                <div class="filter-button">津贴联盟</div>
                <div class="filter-button">满减优惠</div>
                <div class="filter-button">品质联盟</div>
                <div class="filter-button">配送费优惠</div>
            </div>
        </van-sticky>
        <div class="sell-list">
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
            <div class="sell-item">
                <div class="sell-img"></div>
                <div class="sell-content">
                    <div class="title">火星烧烤</div>
                    <div class="no">4.7</div>
                    <div class="cost">起送￥20 夜间配送￥4.5</div>
                    <div class="tags">
                        <div class="tag">西湖区烧烤性价比第3名</div>
                    </div>
                </div>
            </div>
        </div>
        <van-divider
                :style="{ fontSize:'12px',color: '#969799', borderColor: '#969799', padding: '0 16px'}">
            我有底线
        </van-divider>
        <div class="block"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class Home extends Vue {
        protected form: any = {search: ''};
        protected dropdownMenu: any = {
            show: true,
            cash: false
        }
        loading: boolean = false;
        list: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        value1 = 0;
        option1 = [
            {text: '综合排序', value: 0},
            {text: '好评优先', value: 1},
            {text: '起送价最低', value: 2},
            {text: '配送最快', value: 3},
            {text: '配送费最低', value: 4},
            {text: '人均从低到高', value: 5},
            {text: '人均从高到低', value: 6},
            {text: '通用排序', value: 7},
        ];
        private lastTop: any = 0;

        created() {
            // @ts-ignore
            this.dropdownMenu.cash = this.$navigation.getRoutes().length > 1;


        }


        scrollTop(data: any) {
            if (this.dropdownMenu.cash) {
                this.dropdownMenu.cash = false;
                this.lastTop = data.scrollTop;
                return
            }
            if (data.isFixed) {
                let _step: number = data.scrollTop - this.lastTop
                // console.log(_step)
                if (_step > 10)
                    this.dropdownMenu.show = false
                else if (_step < -5)
                    this.dropdownMenu.show = true
            }
            this.lastTop = data.scrollTop
        }

        destroyed() {

        }
    }
</script>

<style lang="scss">
    .home {
        background-color: #ffffff;

        .bg-t {
            position: absolute;
            left: 0px;
            right: 0px;
            top: 0px;
            height: 100%;
            overflow: hidden;
            z-index: -999;
            background-color: #ffffff;
        }

        .van-field__left-icon {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .swipe {
        .van-swipe__indicator {
            width: 18px !important;
            height: 2px !important;
            border-radius: 2px !important;
        }

        .swipe__item {
            display: flex;

            .swipe__step {
                width: 16px;
            }

            .swipe__content {
                width: 100%;
                line-height: 90px;
                background-color: violet;
                border-radius: 10px;
                color: white;
            }
        }
    }

    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
        border-width: 0;
    }

    .dropdown-menu {
        display: flex;
        justify-content: center;
        height: 20px;
        padding-bottom: 5px;
        background-color: white;

        .van-dropdown-menu__item {
            flex: none;
            width: 100px;
            justify-content: left;
            margin-left: 8px;
        }

        .van-dropdown-menu__title, .van-cell__title {
            font-size: 13px;
        }

        .menu-a {
        }

        .menu-b {
            /*flex: 1;*/
            width: 60px;
            font-size: 13px;
            display: flex;
            align-items: center;
            justify-content: center;

            .button {

            }
        }


        .menu-block {
            flex: 1;
        }

        .menu-right {
            font-size: 13px;
            display: flex;
            align-items: center;
            text-align: right;
            padding-right: 16px;
        }
    }
</style>

<style lang="scss" scoped>
    .list-title {
        font-size: 16px;
        font-weight: bolder;
        text-align: left;
        margin: 16px 0px 12px 16px;
    }

    .text {
        font-size: 14px;
    }

    .filter-group {
        display: flex;
        height: 34px;
        margin: 0 16px;
        justify-content: space-between;
        background-color: white;
        padding: 6px 2px;

        .filter-button {
            display: flex;
            font-size: 12px;
            align-items: center;
            justify-content: center;
            background-color: #f3f3f3;
            color: #333333;
            padding: 0 14px;
            border-radius: 5px;
        }
    }

    .sell-list {
        margin: 10px 16px;

        .sell-item {
            display: flex;
            min-height: 80px;
            align-items: flex-start;
            margin: 10px 0px;

            .sell-img {
                height: 80px;
                width: 80px;
                border-radius: 10px;
                background-color: #f7f7f7;
            }

            .sell-content {
                flex: 1;
                margin: 0 10px;
                border-bottom: 1px solid #f3f3f3;
                display: flex;
                flex-direction: column;

                .title {
                    font-size: 15px;
                    text-align: left;
                    font-weight: bolder;
                }

                .no {
                    color: #ff6300;
                    padding-top: 6px;
                    text-align: left;
                }

                .cost {
                    padding-top: 6px;
                    text-align: left;
                }

                .tags {
                    background-color: #fff4eb;
                    border-radius: 2px;
                    color: #ff6300;
                    font-size: 12px;
                    transform-origin: 0px;
                    transform: scale(0.75);
                    padding: 2px 4px;
                    margin: 6px 0;
                    text-align: left;
                    width: fit-content;
                }
            }
        }
    }
</style>
