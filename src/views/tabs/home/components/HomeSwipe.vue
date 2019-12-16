<template>
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
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    /*
     * 【轮播图】
     */
    @Component
    export default class HomeSwipe extends Vue {

    }
</script>

<style lang="scss">
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
</style>
