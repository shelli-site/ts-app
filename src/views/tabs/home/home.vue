<template>
    <div class="home">
        <van-nav-bar title=""
                     left-text=""
                     right-text=""
                     :border="false"
                     :left-arrow="false"
                     :fixed="false">
            <span slot="left">
                <van-icon name="location" size="0.65rem"></van-icon>
                <span>浙江省杭州市西湖区<van-icon name="arrow-down"
                                         style="vertical-align: -3px;padding-left: 3px"></van-icon></span>
            </span>
            <span slot="right">
                <van-icon name="scan" size="0.65rem" style="padding:0 5px"></van-icon>
                <span>扫码</span>
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
        <home-swipe></home-swipe><!--轮播图-->
        <div class="list-title">商家推荐</div>
        <van-skeleton style="margin-top: 30px" :row="20" :row-width="'100%'"></van-skeleton>
        <van-divider :style="{ fontSize:'12px',color: '#969799', borderColor: '#969799', padding: '0 16px' }">
            我有底线
        </van-divider>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import HomeSwipe from "@/views/tabs/home/components/HomeSwipe.vue";

    @Component({
        components: {HomeSwipe},
    })
    export default class Home extends Vue {
        protected form: any = {search: ''};

        destroyed() {

        }
    }
</script>

<style lang="scss">
    .home {
        background-color: #ffffff;

       /* .bg-t {
            position: absolute;
            left: 0px;
            right: 0px;
            top: 0px;
            height: 100%;
            overflow: hidden;
            z-index: -999;
            background-color: #ffffff;
        }*/

        .van-field__left-icon {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }
    }


    /*.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {*/
        /*border-width: 0;*/
    /*}*/

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


</style>
