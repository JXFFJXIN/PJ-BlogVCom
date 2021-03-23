<template>
    <div 
    class="j-breadcrumb"
    aria-label="Breadcrumb"
    role="navigation"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'j-breadcrumb',
    props:{
        separator:{
            type: String,
            default:'/',
        },
        separatorClass:{
            type: String,
            default:'',
        }
    },
    provide(){
        return {
            jBreadcrumb: this,
        };
    },
    mounted(){
        const items = this.$el.querySelectorAll('.j-breadcrumb__item');
        if(items.length){
            items[items.length - 1].setAttribute('aria-current','page');
        }
    }
}
</script>

<style>

</style>