<template>
    <svg :class="svgClass" aria-hidden="true" :color="svgColor" :style="{color:svgColor}">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Icon extends Vue {
        @Prop({default: null, type: String})
        iconClass!: String;

        @Prop({default: '', type: String})
        className!: String;

        @Prop({default: '#1989fa', type: String})
        svgColor!: String;

        get iconName() {
            return `#icon-${this.iconClass}`;
        }

        get svgClass() {
            if (this.className) return `svg-icon ${this.className}`;
            return 'svg-icon';
        }

    }
</script>

<style scoped>
    .svg-icon {
        width:1em;
        height: 1em;
        vertical-align: middle;
        fill: currentColor;
        overflow: hidden;

    }
</style>
