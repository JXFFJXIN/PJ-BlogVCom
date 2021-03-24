<template>
  <div 
    class="j-checkbox-group"
    role="group"
    aria-label="checkbox-group"
  >
    <slot></slot>
  </div>
</template>

<script>
import Emitter from "../../utils/emitter";
export default {
    name: 'j-checkbox-group',
    componentName:'j-checkbox-group',
    mixins:[Emitter],
    inject:{
        jFormItem:{
            default:''
        }
    },
    props:{
        value:{},
        disabled:Boolean,
        min:Number,
        max:Number,
        size:String,
        fill:String,
        textColor:String
    },
    computed:{
        _jFormItemSize(){
            return (this.jFormItem || {}).jFormItemSize;
        },
        checkboxGroupSize(){
            return this.size || this._jFormItemSize || {}.size;
        }
    },
    watch:{
        value(value){
            this.dispatch('j-form-item','j.form.change',[value])
        }
    }
}
</script>

<style>

</style>