<template>
    <van-dialog v-model="diningMode" title="请选择就餐方式" show-cancel-button :before-close="validation"
                @open="dialogOnOpen" @close="dialogOnClose" @confirm="dialogOnConfirm">
        <div class="dining-mode-dialog van-sku-group-container">
            <div class="van-sku-row van-hairline--bottom">
                <div class="van-sku-row__title">就餐方式</div>
                <span v-for="(modeName, index) in diningModeConf.mode" :key="index"
                      :class="['van-sku-row__item',{'van-sku-row__item--active':diningModeData.mode===modeName}]"
                      @click="()=>{diningModeData.mode=modeName;if(modeName==='打包')diningModeData.position=0;}">
                        <span class="van-sku-row__item-name">{{modeName}}</span></span>
            </div>
            <div class="van-sku-row van-hairline--bottom">
                <div class="van-sku-row__title">位置</div>
                <span v-for="(positionNumber, index) in diningModeConf.position" :key="index"
                      :class="['van-sku-row__item',{'van-sku-row__item--active':diningModeData.position===positionNumber},{'van-sku-row__item--disabled':diningModeData.mode==='打包'}]"
                      @click="()=>{diningModeData.position=positionNumber;}">
                        <span class="van-sku-row__item-name">{{positionNumber}}</span></span>
            </div>
        </div>
    </van-dialog>
</template>

<script>
    import {Dialog, Toast} from 'vant';
    import {PopupModule} from "../../../../../store/modules/popup";
    import {ShoppingModule} from "../../../../../store/modules/shopping";

    export default {
        name: "DiningModeDialog",
        components: {[Dialog.Component.name]: Dialog.Component},
        props: {
            value: {
                default: false,
                type: Boolean
            }
        },
        watch: {
            value(value) {
                this.diningMode = value;
            }
        },
        data() {
            return {
                diningMode: false,
                diningModeData: {},
                diningModeConf: {
                    mode: ["堂食", "打包"],
                    position: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                }
            }
        },
        methods: {
            dialogOnOpen() {
                PopupModule.addPopup({
                    route: this.$route, conf: {
                        dialog: {/*就餐方式弹框*/
                            priority: 20,
                            show: true
                        }
                    }
                });
                this.diningModeData = JSON.parse(JSON.stringify(this.$store.state.shopping.diningModeData));
            },
            dialogOnClose() {
                PopupModule.closePopup({route: this.$route, popupName: 'dialog'});
            },
            dialogOnConfirm() {
                ShoppingModule.setDiningModeData(this.diningModeData);
            },
            validation(action, done) {
                if (action === 'confirm' && this.diningModeData.mode === '堂食') {
                    if (!this.diningModeConf.position.includes(this.diningModeData.position)) {
                        done(false);
                        Toast("请选择位置桌号！");
                    }
                }
                done();
            }
        }
    }
</script>

<style scoped>

</style>
