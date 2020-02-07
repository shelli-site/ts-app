<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view class="child-view"/>
        </transition>
        <div class="bg"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import {plusReady} from '@/utils/native'
    import UserModule from "@/store/modules/user";
    import AppModule from "@/store/modules/app";
    import PopupModule from "@/store/modules/popup";

    @Component
    export default class App extends Vue {
        transitionName: string = 'van-fade';

        created() {
            UserModule.init();
            AppModule.init();
            let _this = this;
            plusReady(() => {
                //仅支持竖屏显示
                plus.screen.lockOrientation("portrait-primary");

                // 监听返回键
                let backButtonPress = 0;
                plus.key.addEventListener('backbutton', () => {
                    PopupModule.closePriorityFirst(this.$route);
                    if (PopupModule.shieldBack) {
                        return false
                    }

                    // 双击退出程序
                    let routeName = this.$route.name;
                    let whitelist = ['Login'];
                    let blackList = ['Home', 'Order', 'User'];
                    let whiteIndex = blackList.findIndex(whiteName => whiteName === routeName);
                    if (whiteIndex !== -1) {
                        backButtonPress++;
                        if (backButtonPress > 1) {
                            plus.runtime.quit()
                        } else {
                            plus.nativeUI.toast('再按一次退出应用');
                        }
                        setTimeout(function () {
                            backButtonPress = 0;
                        }, 1000);
                        return false
                    }
                    this.$router.go(-1);
                    return false
                });

                document.addEventListener("newintent", function () {
                    openWebviewFromOthers()
                });

                //获取通知栏（app未启动）点击、第三方程序启动本app
                function openWebviewFromOthers() {
                    let args = plus.runtime.arguments;
                    if (args) {
                        let payload = JSON.parse(args);
                        handlePushGetRun(payload)
                    }
                }

                // 监听在线消息事件
                plus.push.addEventListener("receive", (msg: any) => {
                    let payload = JSON.parse(msg.payload);

                    // 离线推送标记检测
                    // 处理ios端离线推送触发receive事件
                    if (!payload.local) {
                        payload.local = true;
                        plus.push.createMessage(
                            payload.content,
                            JSON.stringify(payload),
                            {
                                title: payload.title
                            }
                        )
                    }
                }, false);

                // 监听推送点击事件
                plus.push.addEventListener("click", (msg: any) => {
                    let payload = JSON.parse(msg.payload);
                    handlePushGetRun(payload)
                }, false);

                function handlePushGetRun(payload: any) {
                    let codeType = JSON.parse(payload.params).code.split(".")[0];
                    let id = "";
                    console.log(codeType);
                }
            });

            let whitelist = ['User', 'Order', 'Home'];
            // bind event ， 更多参数移步vue-navigation
            // @ts-ignore
            this.$navigation.on('forward', (to, from) => {
                let whiteIndex = whitelist.findIndex(whiteName => whiteName === to.route.name);
                if (whiteIndex === -1) {
                    this.transitionName = 'slide-left'
                } else {
                    this.transitionName = 'van-fade'
                }
            });
            // @ts-ignore
            this.$navigation.on('back', (to, from) => {
                let toWhiteIndex = whitelist.findIndex(whiteName => whiteName === to.route.name);
                let fromWhiteIndex = whitelist.findIndex(whiteName => whiteName === from.route.name);


                if (toWhiteIndex > -1 && fromWhiteIndex === -1) {
                    this.transitionName = 'slide-right'
                } else {
                    if (toWhiteIndex === -1) {
                        this.transitionName = 'slide-right'
                    } else {
                        this.transitionName = 'van-fade'
                    }
                }
            })
        }

        @Watch('$route')
        onWatchRouter(to: any, from: any) {
            console.log(`from ${from.name} to ${to.name}`);
        }

        @Watch('$store.state.shopping.foodList')
        onWatchFoodList(foodList: any[]) {
            localStorage['foodList'] = JSON.stringify(foodList);
        }
    }

</script>
<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        background-color: #f8f8f8;
    }

    .bg {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f8f8f8;
        z-index: -99;
    }


    .child-view {
        position: absolute;
        background-color: #f8f8f8;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .slide-left-enter-active, .slide-right-enter-active {
        transition: all .3s cubic-bezier(.25, .1, .25, 1);
    }

    .slide-left-leave-active, .slide-right-leave-active {
        transition: all .5s cubic-bezier(.25, .1, .25, 1);
    }

    .slide-left-enter, .slide-right-leave-to {
        transform: translate(100%, 0);
    }

    .slide-left-leave-to, .slide-right-enter {
        opacity: 0;
    }
</style>
