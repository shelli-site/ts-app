<template>
    <div class="home">
        <van-nav-bar
                title="主页"
                left-text="返回"
                right-text="关于"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"></van-nav-bar>
        <img alt="Vue logo" src="../assets/logo.png">
        <!--<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Toast} from "vant";

    @Component({
        components: {},
    })
    export default class Home extends Vue {
        onClickLeft() {
            Toast('返回');
        }

        onClickRight() {
            this.$router.push({name:'about'})
        }
    }
</script>
