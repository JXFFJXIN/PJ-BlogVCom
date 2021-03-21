<template>
    <form :class="_class" >
        <slot></slot>
    </form>
</template>

<script>
export default {
    name:"j-form",

    componentName: 'j-form',

    provide(){
        return {
            jForm: this,
        }
    },

    props:{
        model:{
            type: Object,
        },
        rules: {
            type: Object,
        },
        inline: {
            type: Boolean,
            default: false,
        },
        "label-position":{
            type: String,
            default: "right",
            validator: (val)=>['right','left','top'].includes(val),
        },
        "label-width":{
            type: String,
        },
        "label-suffix":{
            type: String,
        },
        "hide-required-asterisk":{
            type: Boolean,
            default: false,
        },
        "show-message": {
            type: Boolean,
            default: true,
        },
        "inline-message": {
            type: Boolean,
            default: false,
        },
        "status-icon": {
            type: Boolean,
            default: false,
        },
        "validate-on-rule-change":{
            type: Boolean,
            default: true,
        },
        size:{
            type: String,
            validator: (val)=>['medium','small','mini'].includes(val),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data(){
        return {
            fields:[], // 字段缓d存
            labelWidthArr:[], // 子内容的宽度缓存
        }
    },
    computed:{
        _class(){
            const {labelPosition,inline} = this;
            return [
                "j-form",
                labelPosition?`j-form--label${labelPosition}`:'',
                inline?`j-form--inline`:'',
            ]
        },
        /**
         * 获取所有子内容中的最大宽度，作为表单的宽度
         */
        autoLabelWidth(){
            const {labelWidthArr} = this;
            if(labelWidthArr.length === 0)return 0;
            const maxWidth = Math.max(...labelWidthArr);
            return maxWidth?`${maxWidth}px`:'';
        }
    },
    render(h){
        const {_class, $slots:slots} = this;
        return h(
            "form",
            {
                class:_class,
            },
            slots.default,
        )
    },
    methods:{
        /**
         *获得宽度的索引
         */
        getLabelWidthIndex(width){
            const index = this.labelWidthArr.indexOf(width);
            if(index === -1){
                throw new Error(`[JForm]宽度未匹配${index}`);
            }
            return index
        },
        /**
         * 更新宽度
         */
        updateLabelWidth(val,oldVal){
            const {getLabelWidthIndex, labelWidthArr} = this;
            if(val && oldVal){
                const index = getLabelWidthIndex(oldVal);
                labelWidthArr.splice(index,1,val);
            }else if(val){
                labelWidthArr.push(val);
            }
        },
        /**
         * 删除宽度
         */
        deleteLabelWidth(val){
            const {getLabelWidthIndex, labelWidthArr} = this;
            const index = getLabelWidthIndex(val);
            labelWidthArr.splice(index, 1);
        }
    }
}
</script>

<style>

</style>