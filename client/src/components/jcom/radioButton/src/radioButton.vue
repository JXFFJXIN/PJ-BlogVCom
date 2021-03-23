<template>
  <label
    class="j-radio-button"
    :class="[
      size ? `j-radio-button--${size}` : '',
      value === label ? `is-active` : '',
      isDisabled ? `is-disabled` : '',
      focus ? `is-focus` : '',
    ]"
    role="radio"
    :aria-checked="value === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="value = isDisabled ? value : label"
  >
    <input
      class="j-radio-button__orig-radio"
      :value="label"
      type="radio"
      v-model="value"
      :name="name"
      @change="handleChange"
      :disabled="isDisabled"
      tabindex="-1"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span
      class="j-radio-button__inner"
      :style="value === label ? activeStyle : null"
      @keydown.stop
    >
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import Emitter from "../../utils/emitter";
export default {
  name: "j-radio-button",
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
    label: {},
    disabled: Boolean,
    name: String,
  },
  data() {
    return {
      focus: false,
    };
  },
  computed: {
    _radioGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "j-radio-group") {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    },
    value: {
      get() {
        return this._radioGroup.value;
      },
      set(val) {
        this._radioGroup && this._radioGroup.$emit("input", val);
      },
    },
    
    activeStyle() {
      return {
        backgroundColor: this._radioGroup.fill || "",
        borderColor: this._radioGroup.fill || "",
        boxShadow: this._radioGroup.fill
          ? `-1px 0 0 0 ${this._radioGroup.fill}`
          : "",
        color: this._radioGroup.textColor || "",
      };
    },
    _jFormItemSize() {
      return (this.jFormItem || {}).jFormItemSize;
    },
    size() {
      return this._radioGroup.radioGroupSize || this._jFormItemSize || {}.size;
    },
    isDisabled() {
      return (
        this.disabled ||
        this._radioGroup.disabled ||
        (this.jForm || {}).disabled
      );
    },
    tabIndex() {
      return this.isDisabled || (this._radioGroup && this.value !== this.label)
        ? -1
        : 0;
    },
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.dispatch("jRadioGroup", "handleChange", this.value);
      });
    },
  },
};
</script>

<style>
</style>