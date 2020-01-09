<template>
    <div class="home">
        <van-nav-bar title=""
                     left-text=""
                     right-text=""
                     :border="false"
                     :left-arrow="false"
                     :z-index="10"
                     fixed>
            <span slot="left">
            </span>
            <div slot="right" style="display: flex;height:46px;align-items: center">
                <div class="right-icon" @click="status.loading = !status.loading">
                    <van-icon style="display: table-cell;vertical-align: middle;" name="search"
                              size="0.65rem"></van-icon>
                </div>
                <div class="right-icon">
                    <van-icon name="scan" style="display: table-cell;vertical-align: middle;" size="0.65rem"></van-icon>
                </div>

            </div>
        </van-nav-bar>

        <!--<van-sticky>
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
        </van-sticky>-->
        <!--<home-swipe></home-swipe>&lt;!&ndash;轮播图&ndash;&gt;-->
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
        status: any = {
            loading: false
        };

        mounted() {
            this.$elLoading({duration: 10000});
        }

        destroyed() {
            this.$elLoading().hide();
        }
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

    .right-icon {
        height: 40px;
        width: 40px;
        display: table;
    }

    .right-icon:active {
        background-color: #f2f3f5;
    }

</style>
