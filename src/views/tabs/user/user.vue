<template>
    <div class="user">
        <van-nav-bar ref="navBar"
                     :style="{height: nav.height+'px'}"
                     left-text=""
                     right-text=""
                     :left-arrow="false"
                     :border="false"
                     fixed>
            <span slot="title" :style="{lineHeight:nav.height+'px'}">{{nav.title}}</span>
            <span slot="right" :style="{fontWeight: 500,lineHeight:nav.height+'px'}">
                <span @click="rightClick('message')">
                   <icon-svg iconClass="xiaoxi"
                             style="font-size: 0.65rem;color:#333333;margin-right: 10px"></icon-svg>
                </span>
                 <span @click="rightClick('setting')">
                   <icon-svg iconClass="shezhi"
                             style="font-size: 0.65rem;color:#333333;"></icon-svg>
                 </span>
            </span>
        </van-nav-bar>
        <div class="bg-nav"></div>
        <div class="user--info">
            <div class="user--info-left"></div>
            <div class="user--info-right">
                <div class="img"></div>
            </div>
        </div>
        <div class="ad">
            <div class="vip"></div>
            <div class="red-envelope">
                <div class="red-envelope-item"></div>
                <div class="red-envelope-item middle"></div>
                <div class="red-envelope-item"></div>
            </div>
        </div>
        <div class="menu-list">
            <div class="menu-item"></div>
            <div class="menu-item"></div>
            <div class="menu-item"></div>
            <div class="menu-item"></div>
            <div class="menu-item"></div>
            <div class="menu-item"></div>
            <div class="menu-item"></div>
            <div class="menu-item"></div>
            <div class="menu-item"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Toast} from "vant";

    @Component
    export default class User extends Vue {
        protected nav: any = {
            title: '',
            height: 60
        };

        mounted() {
            window.addEventListener('scroll', this.scrollTo)
            this.scrollTo()
        }

        rightClick(icon: string) {
            switch (icon) {
                case 'message':
                    Toast('您没有新的消息！');
                    break
                case 'setting':
                    Toast('设置界面开发中！');
                    break
            }
        }

        scrollTo() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.nav.title = scrollTop < 70 ? '' : '我的';
        }

        destroyed() {
            window.removeEventListener('scroll', this.scrollTo)
            Toast.clear(true);
        }
    }
</script>

<style lang="scss" scoped>
    .user {
        .user--info {
            height: 135px;
            display: flex;
            align-items: center;
            justify-content: center;
            /*background-color: violet;*/

            .user--info-left {
                height: 100%;
                flex: 1;
            }

            .user--info-right {
                height: 100%;
                width: 120px;

                .img {
                    background-color: red;
                    margin: 10px;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                }
            }
        }

        .ad {
            padding: 0 10px;
            background-image: linear-gradient(#ffffff, #f5f5f5, #f5f4f1, #ffffff);

            .vip {
                height: 50px;
                border-radius: 6px;
                background-color: #fae9c5;
            }

            .red-envelope {
                height: 65px;
                padding: 10px 0px 20px 0px;
                display: flex;
                align-items: center;
                justify-content: center;

                .red-envelope-item {
                    flex: 1;
                    background-color: white;
                    height: 100%;
                    border-radius: 6px;
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1); /*px*/
                    /*border: 1px solid #d2d2d2;*/
                }

                .middle {
                    margin: 0 5px;
                }
            }
        }

        .menu-list {
            .menu-item {
                height: 55px;
                border-bottom: 1px solid #f1f1f1;
            }
        }

    }

    .bg-nav {
        height: 60px;
    }
</style>
