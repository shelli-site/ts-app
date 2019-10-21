<template>
    <div class="home">
        <van-nav-bar title=""
                     left-text=""
                     right-text=""
                     :border="false"
                     :left-arrow="false"
                     :fixed="false">
            <span slot="left">
                <van-icon name="location" size="1.5rem"></van-icon>
                <span>浙江省杭州市西湖区V</span>
            </span>
            <span slot="right">
                <van-icon name="scan" size="1.3rem" style="padding:0 5px"></van-icon>
                <span>扫码</span>
                <icon-svg iconClass="Moon-" style="font-size: 1.3rem;padding:0 5px"></icon-svg>
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
                <van-icon name="search" size="1rem"></van-icon>
                <sapn style="font-size: 14px;">炒饭</sapn></span>
            </van-search>
        </van-sticky>
        <van-swipe :autoplay="3000" indicator-color="white" style="background-color: blueviolet;height: 180px">
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
        </van-swipe>
        <van-list
                finished-text="没有更多了">
            <van-cell
                    v-for="item in list"
                    :key="item"
                    :title="item"></van-cell>
        </van-list>
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            被看到底线了
        </van-divider>
        <div style="height: 50px"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class Home extends Vue {
        protected form: any = {search: ''};
        loading: boolean = false;
        list: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    }
</script>

<style lang="scss">
    .home {
        .van-field__left-icon {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>
