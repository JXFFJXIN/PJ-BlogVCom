<template>
    <div class="j-page-header">
        <div 
        class="j-page-header__left"
        @click="$emit('back')"
        >
            <i class="j-icon-back"></i>
            <div class="j-page-header__title">
                <slot name="title">{{title}}</slot>
            </div>
        </div>
        <div class="j-page-header__content">
            <slot name="content">{{content}}</slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'j-page-header',
    props: {
        title: {
            type: String,
            default:'返回'
        },
        content: {
            type: String,
        }
    }
}
</script>

<style>

</style>