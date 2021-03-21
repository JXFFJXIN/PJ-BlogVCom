
<template>
    <div :calss="_class">
        <label-wrap
        :is-auto-width="labelStyle && labelStyle.width === 'auto'"
        :update-all="form.labelWidth === 'auto'"
        >
            <label :for="labelFor" calss="j-form-item__label" :style="labelStyle" v-if="label || $slots.label">
                <slots name="label">{{label + form.labelSuffix}}</slots>
            </label>
        </label-wrap>
        <div class="j-form-item__content" :style="contentStyle">
            <slot></slot>
            <transition name="j-zoom-in-top">
                <slot 
                v-if="validateState === 'error' && showMessage && form.showMessage"
                name="error"
                :error="validateMessage"
                >
                    <div
                    class="j-form-item__error"
                    :class="{
                        'j-form-item__error--inline':typeof inlineMessage === 'boolean'
                        ? inlineMessage
                        : (jForm && jForm.inlineMessage || false)
                    }"
                    >
                    {{validateMessage}}
                    </div>
                </slot>
            </transition>
        </div>
    </div>
</template>

<script>
import LabelWrap from '../../label-wrap';
export default {
    name:'j-form-item',

    componentName: 'j-form-item',

    provide(){
        return {
            jFormItem: this,
        }
    },
    inject:['jForm'],
    props:{
        prop:{
            type:String,
        },
        label:{
            type:String,
        },
        "label-width":{
            type:String,
        },
        required:{
            type:Boolean,
            default:false,
        },
        rules:{
            type:[Object,Array]
        },
        error:{
            type:String,
        },
        validateStatus:{
            type:String,
        },
        for:{
            type: String,
        },
        "show-message":{
            type:Boolean,
            default:true,
        },
        "inline-message":{
            type:[Boolean,String],
            default:'',
        },
        size:{
            type:String,
            validator:(val)=>['medium','small','mini'].includes(val),
        }
    },
    data(){
        return {
            validateState:'',
            validateMessage:'',
            validateDisabled: false,
            validator:{},
            isNested: false,
            computedLabelWidth: '',
        }
    },
    components:{
        LabelWrap,
    },
    computed:{
        labelFor(){
            return this.for || this.prop;
        },
        form(){
            let parent = this.$parent;
            let parentName = parent.$options.componentName;
            while (parentName !== 'jForm'){
                if(parentName === 'jFormItem'){
                    this.isNested = true;
                }
                parent = parent.$parent;
                parentName = parent.$options.componentName;
            }
            return parent;
        },
        labelStyle(){
            const res = {};
            if (this.form.labelPosition === 'top') return res;
            const labelWidth = this.labelWidth || this.form.labelWidth;
            if (labelWidth) {
            res.width = labelWidth;
            }
            return res;
        },
        contentStyle(){
            const ret = {};
            const label = this.label;
            if (this.form.labelPosition === 'top' || this.form.inline) return ret;
            if (!label && !this.labelWidth && this.isNested) return ret;
            const labelWidth = this.labelWidth || this.form.labelWidth;
            if (labelWidth === 'auto') {
            if (this.labelWidth === 'auto') {
                ret.marginLeft = this.computedLabelWidth;
            } else if (this.form.labelWidth === 'auto') {
                ret.marginLeft = this.elForm.autoLabelWidth;
            }
            } else {
            ret.marginLeft = labelWidth;
            }
            return ret;
        },
        isRequired(){
            let rules = this.getRules();
            let isRequired = false;
            if(rules && rules.length){
                rules.every(rule => {
                    if(rule.required){
                        isRequired = true;
                        return false;
                    }
                    return true;
                })
            }
            return isRequired;
        },
        _formSize(){
            return this.jForm.size;
        },
        jFormItemSize(){
            return this.size || this._formSize;
        },
        sizeClass(){
            return this.jFormItemSize;
        },
        _class(){
            const {jForm, jForm:{statusIcon},validateState,isRequired,required,jForm:{hideRequiredAsterisk},sizeClass} = this;
            return [
                'j-form-item',
                jForm&&statusIcon?`j-form-item--feedback`:'',
                validateState === 'error'?`is-error`:'',
                validateState === 'validating'?`is-validating`:'',
                validateState === 'success'?`is-success`:'',
                isRequired || required ? `is-required`:'',
                jForm && hideRequiredAsterisk ? `is-no-asterisk`: '',
                sizeClass ? `j-form-item--${sizeClass}`:''
            ]
        }
    },
    methods:{
        updateComputedLabelWidth(width){
            this.computedLabelWidth = width ? `${width}px` : ''
        },

    },
    mounted(){

    },
    watch: {
        error: {
            immediate: true,
            handler(value){
                this.validateMessage = value;
                this.validateState = value ? 'error' : '';
            }
        },
        validateStatus(value){
            this.validateStatus = value;
        }
    }
}
</script>

<style>

</style>