<template>
    <transition name="j-fade-in">
        <div
        v-if="start"
        @click.stop = "handleClick"
        class="j-backtop"
        :style="_style"
        >
            <slot>
                <j-icon name="caret-top"></j-icon>
            </slot>
        </div>
    </transition>
</template>

<script>

import {throttle} from 'throttle-debounce';

const cubic = value => Math.pow(value,3);
const easeInOutCubic = value => value < 0.5 
    ?cubic(value*2)/2
    :1-cubic((1-value)*2)/2;

export default {
    name: 'j-backtop',
    props:{
        startHeight:{
            type: Number,
            default: 200,
        },
        target: [String],
        right: {
            type: Number,
            default: 40,
        },
        bottom: {
            type: Number,
            default: 40,
        }
    },
    data(){
        return {
            el:null,
            container: null,
            start: false,
        }
    },
    computed: {
        _style(){
            const {right, bottom} = this;
            return {
                right:`${right}px`,
                bottom:`${bottom}px`,
            }
        }
    },
    mounted(){
        this.init();
        this.throttledScrollHandler = throttle(300,this.onScroll);
        this.container.addEventListener('scroll',this.throttledScrollHandler);
    },
    methods: {
        init(){
            this.container = document;
            this.el = document.documentElement;
            if(this.target){
                this.el = document.querySelector(this.target);
                if(!this.el){
                    throw new Error(`target未正确匹配:${this.target}`);
                }
                this.container = this.el;
            }
        },
        onScroll(){
            const {el:{scrollTop},startHeight} = this;
            this.start = scrollTop >= startHeight;
        },
        handleClick(e){
            this.scrollToTop();
            this.$emit('click',e);
        },
        scrollToTop(){
            const {el, el:{scrollTop}} = this;
            const beginTime = Date.now();
            const raf = window.requestAnimationFrame || (cb=>setTimeout(cb,16));
            const frameFunc = ()=>{
                const progress = (Date.now() - beginTime) / 500;
                if(progress < 1){
                    el.scrollTop = scrollTop * (1- easeInOutCubic(progress));
                    raf(frameFunc);
                }else{
                    el.scrollTop = 0;
                }
            }
            raf(frameFunc);
        }
    },
    beforeDestroy(){
        this.container.removeEventListener('scroll',this.throttle)
    }
}
</script>

<style>

</style>