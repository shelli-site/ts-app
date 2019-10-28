<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {plusReady} from '@/utils/native'

    @Component
    export default class App extends Vue {
        created() {
            let _this = this;
            plusReady(() => {
                //仅支持竖屏显示
                plus.screen.lockOrientation("portrait-primary");

                // 监听返回键
                let backButtonPress = 0;
                plus.key.addEventListener('backbutton', () => {
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
                    if (codeType === "patrol") {
                        id = JSON.parse(payload.params).patrolTaskId;
                        _this.$router.push({name: 'PatrolInfo', params: {id}});
                    }
                    if (codeType === "exam") {
                        _this.$router.push({name: 'AnswerList'});
                    }
                    if (codeType === "circle") {
                        id = JSON.parse(payload.params).articleId;
                        _this.$router.push({name: "CircleArticle", params: {id}});
                    }
                    if (codeType === "attendance") {
                        _this.$router.push({name: "Worksigin"});
                    }
                    if (codeType === "hazard") {
                        id = JSON.parse(payload.params).hazardExampleId;
                        _this.$router.push({name: "HazardInfo", params: {id}});
                    }
                    if (codeType === "space" || codeType === "platform") {
                        _this.$router.push({name: 'Message'})
                    }
                    if (codeType === "workOrder") {
                        id = JSON.parse(payload.params).id;
                        if (id) {
                            _this.$router.push({name: "WorkOrderInfo", params: {id}});
                        }
                    }
                    if (codeType === "facility") {
                        _this.$router.push({name: "WorkOrderRegister"});
                    }
                }
            });
        }
    }

</script>
<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*background-color: #ffffff;*/
    }

</style>
