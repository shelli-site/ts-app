<template>
    <div class="food-tabs">
        <template v-if="childrenElement.length>0">
            <van-sticky :offset-top="45">
                <div class="food-tabs-list">
                    <div v-for="(children,index) in childrenElement" :key="`tab-${index}`"
                         class="tab-label"
                         @click="setValue(children)">

                <span style="position:relative;">
                    <transition name="slide-left">
                        <div v-if="children.value == value" class="tab-label-active"></div>
                    </transition>
                    {{children.label}}
                </span>
                    </div>
                </div>
            </van-sticky>
        </template>
        <div class="tab-content">
            <slot>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FoodTabs",
        props: {
            value: {
                default: '',
                type: String
            }
        },
        data() {
            return {
                childrenElement: []
            }
        },
        components: {},
        mounted() {
            this.$nextTick(() => {
                this.childrenElement = this.$slots.default.map(slot => ({
                    label: slot.componentInstance.label,
                    value: slot.componentInstance.value,
                }));
            })
        },
        methods: {
            setValue(data) {
                this.$emit('input', data.value);
                this.$emit('change', data);
            }
        }
    }
</script>

<style lang="scss" scoped>
    $padding-L-R: 16px;
    .food-tabs {
        margin-top: 25px;
        margin-left: -$padding-L-R;
        margin-right: -$padding-L-R;
        //padding: 0 $padding-L-R;
        position: relative;
    }
    .food-tabs-list{
        padding: 0 $padding-L-R;
        background-color: #f8f8f8;
        display: flex;
        height: 26px;
        justify-content: space-around;
        border-bottom: 1px solid #e7e7e7;
    }

    .tab-label {
        flex: 1;
        text-align: center;
        font-size: 14px;
        letter-spacing: 1px;
        line-height: 16px;
        position: relative;
    }

    .tab-label-active {
        display: inline-block;
        content: "";
        position: absolute;
        background-color: #ff4301;
        bottom: -13px;
        left: 0px;
        right: 0px;
        height: 3px;
        border-radius: 2px;
    }

    .tab-content {
        position: absolute;
        left: $padding-L-R;
        right: $padding-L-R;
        top: 33px;
        /*下移24px 为 50px*/
    }

    .slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
        transition: all .3s cubic-bezier(.25, .1, .25, 1);
    }

    .slide-left-enter, .slide-left-leave-to {
        transform: scaleX(0);
        opacity: 0;
    }

    .slide-right-enter, .slide-right-leave-to {
        transform: scaleX(1);
        opacity: 0;
    }
</style>
