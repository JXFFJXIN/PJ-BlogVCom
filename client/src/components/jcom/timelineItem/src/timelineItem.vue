<template>
    <li class="j-timeline-item">
        <div class="j-timeline-item__tail"></div>
        <div
        v-if="!$slots.dot"
        class="j-timeline-item__node"
        :class="[
            size?`j-timeline-item__node--${size}`:'',
            type?`j-timeline-item__node--${type}`:'',
        ]"
        :style="{
            backgroundColor:color
        }"
        >
            <i 
            v-if="icon"
            class="j-timeline-item__icon"
            :class="icon"
            ></i>
        </div>
        <div v-if="$slots.dot" 
        class="j-timeline-item__dot"
        >
            <slot name="dot"></slot>
        </div>
        <div class="j-timeline-item__wrapper">
            <div v-if="!hideTimestamp && placement === 'top'"
                class="j-timeline-item__timestamp is-top">
                {{timestamp}}
            </div>
            <div class="j-timeline-item__content">
                <slot></slot>
            </div>
            <div v-if="!hideTimestamp && placement === 'bottom'"
                class="j-timeline-item__timestamp is-bottom">
                {{timestamp}}
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name:'j-timeline-item',
    inject:['timeline'],
    props:{
        timestamp: {
            type: String,
        },
        hideTimestamp:{
            type: Boolean,
            default: false,
        },
        placement: {
            type: String,
            default: 'bottom',
            validator: (val)=>['top','bottom'].includes(val),
        },
        type:{
            type: String,
        },
        color:{
            type: String,
        },
        size:{
            type: String,
            default: 'normal'
        },
        icon:{
            type:String,
        }
    }
}
</script>