<template>
    <div
    :class="_class"
    >
        <div
        class="j-card__header"
        v-if="$slots.header || header"
        >
            <slot name="header">{{header}}</slot>
        </div>
        <div
        class="j-card__body"
        :style="bodyStyle"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'j-card',
    props:{
        header:{},
        bodyStyle:{},
        shadow:{
            type: String,
            validator:(val)=>['hover','always',"never"].includes(val),
        }
    },
    computed:{
        _class(){
            const {shadow} = this;
            return [
                'j-card',
                shadow?`is-${shadow}-shadow`:`is-always-shadow`,
            ]
        }
    }
}
</script>

<style>

</style>