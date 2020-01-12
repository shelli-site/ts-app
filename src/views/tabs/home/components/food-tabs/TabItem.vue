<template>
    <div v-if="value == $parent.value">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabItem",
        props: {
            value: {
                default: '',
                type: String
            },
            label: {
                default: '',
                type: String
            }
        },
        methods: {}
    }
</script>

<style scoped>
</style>
