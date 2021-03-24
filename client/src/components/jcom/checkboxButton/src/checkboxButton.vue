<template>
  <label
    class="j-checkbox-button"
    :class="[
      size ? `j-checkbox-button--${size}` : '',
      isDisabled ? `is-disabled` : '',
      isChecked ? `is-checked` : '',
      focus ? `is-focus` : '',
    ]"
    role="checkbox"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
  >
    <input
      type="checkbox"
      v-if="trueLabel || falseLabel"
      class="j-checkbox-button__original"
      :name="name"
      :disabled="isDisabled"
      :true-value="trueLabel"
      :false-value="falseLabel"
      v-model="model"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
    />
    <input
      v-else
      class="j-checkbox-button__original"
      type="checkbox"
      :disabled="isDisabled"
      :value="label"
      :name="name"
      v-model="model"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span
      class="j-checkbox-button__inner"
      v-if="$slots.default || label"
      :style="isChecked ? activeStyle : null"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import Emitter from "../../utils/emitter";

export default {
  name: "j-checkbox-button",
  mixins: [Emitter],
  inject: {
    jForm: {
      default: "",
    },
    jFormItem: {
      default: "",
    },
  },
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
  },
  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false,
    };
  },
  computed: {
    isLimitDisabled() {
      const { max, min } = this._checkboxGroup;
      return (
        (!!(max || min) && this.model.length >= max && !this.isChecked) ||
        (this.model.length <= min && this.isChecked)
      );
    },
    isDisabled() {
      return this._checkboxGroup
        ? this._checkboxGroup.disabled ||
            this.disabled ||
            (this.jForm || {}).disabled ||
            this.isLimitDisabled
        : this.disabled || (this.jForm || {}).disabled;
    },
    _jFormItemSize() {
      return (this.jFormItem || {})._jFormItemSize;
    },
    size() {
      return (
        this._checkboxGroup.checkboxGroupSize || this._elFormItemSize || {}.size
      );
    },
    activeStyle() {
      return {
        backgroundColor: this._checkboxGroup.fill || "",
        borderColor: this._checkboxGroup.fill || "",
        color: this._checkboxGroup.textColor || "",
        "box-shadow": `-1px 0 0 0 ${this._checkboxGroup.fill}`,
      };
    },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    _checkboxGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "j-checkbox-group") {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    model: {
      get() {
        return this._checkboxGroup
          ? this.store
          : this.value !== undefined
          ? this.value
          : this.selfModel;
      },
      set(val) {
        if (this._checkboxGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (this.isLimitExceeded = true);

          this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (this.isLimitExceeded = true);

          this.isLimitExceeded === false &&
            this.dispatch("j-checkbox-group", "input", [val]);
        } else if (this.value !== undefined) {
          this.$emit("input", val);
        } else {
          this.selfModel = val;
        }
      },
    },
    isChecked() {
      if ({}.toString.call(this.model) === "[object Boolean]") {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
      return false;
    },
  },
  methods:{
      addToStore(){
          if(Array.isArray(this.model) && this.model.indexOf(this.label) === -1){
              this.model.push(this.label);
          }else{
              this.model = this.trueLabel || true;
          }
      },
      handleChange(e){
          if (this.isLimitExceeded) return;
        let value;
        if (e.target.checked) {
          value = this.trueLabel === undefined ? true : this.trueLabel;
        } else {
          value = this.falseLabel === undefined ? false : this.falseLabel;
        }
        this.$emit('change', value, e);
        this.$nextTick(() => {
          if (this._checkboxGroup) {
            this.dispatch('j-checkbox-group', 'change', [this._checkboxGroup.value]);
          }
        });
      }
  },
  created(){
      this.checked && this.addToStore();
  }
};
</script>

<style>
</style>