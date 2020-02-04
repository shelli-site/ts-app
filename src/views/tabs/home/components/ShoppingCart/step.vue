<template>
    <div class="step">
        <div class="step-">-</div>
        <div class="step-count">{{value}}</div>
        <div class="step-plus"><van-icon name="plus" /></div>
    </div>
</template>

<script>
    export default {
        name: "Step",
        props: {
            value: {
                default: 1,
                type: Number
            }
        }
    }
</script>

<style lang="scss" scoped>
    .step {
        display: flex;
        min-width: 80px;
        width: 100%;

        .step-count {
            flex: 1;
        }

    }
</style>
