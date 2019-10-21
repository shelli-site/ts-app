<template>
    <div class="about" style="display: flex;flex-direction: column;justify-content:space-between">
        <van-nav-bar
                title=""
                left-text=""
                right-text="其他订单"
                :left-arrow="false"
                @click-left="onClickLeft"
                @click-right="onClickRight"></van-nav-bar>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Toast} from "vant";

    @Component
    export default class Order extends Vue {
        onClickLeft() {
            this.$router.go(-1)
            // Toast('返回');
        }

        onClickRight() {
            Toast('按钮');
        }
    }
</script>
