<template functional>
    <div
    v-bind="data.attrs"
    v-on="listeners"
    :class="[data.staticClass, 'j-divider', `j-divider--${props.direction}`]"
    >
        <div
            v-if="$slots.default && props.direction !== 'vertical'"
            :class="['j-divider__text',`is-${props.contentPosition}`]"
        >
            <slot/>
        </div>
    </div>
</template>

<script>
export default {
    name:'j-divider',
    props:{
        direction:{
            type: String,
            default: 'horizontal',
            validator:(val)=>['horizontal','vertical'].includes(val),
        },
        contentPosition:{
            type: String,
            default: 'center',
            validator:(val)=>['left','center','right'].includes(val),
        }
    },
}
</script>

<style>

</style>