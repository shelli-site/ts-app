<template>
    <div>
        <div style="padding-bottom: 50px">
            <router-view></router-view>
        </div>
        <van-tabbar route class="taber">
            <van-tabbar-item to="/home">
                <span class="no-select">外卖</span>
                <van-icon slot="icon"
                          slot-scope="props"
                          :name="props.active ? 'wap-home' : 'wap-home-o'"></van-icon>
            </van-tabbar-item>
            <van-tabbar-item to="/order">
                <span class="no-select">订单</span>
                <van-icon slot="icon"
                          slot-scope="props"
                          :name="props.active ? 'balance-list' : 'balance-list-o'"></van-icon>
            </van-tabbar-item>
            <van-tabbar-item to="/user">
                <span class="no-select">我的</span>
                <van-icon slot="icon"
                          slot-scope="props"
                          :name="props.active ? 'manager' : 'manager-o'"></van-icon>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Tabbar extends Vue {
    }
</script>

<style scoped>
    .taber {
        border-top: solid 1px #ebedf0; /*px*/
        background: #f8f8f8;
    }
</style>
