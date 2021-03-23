<template>
  <label
    class="j-radio"
    :class="[
    border && radioSize ? `el-radio--${radioSize}`:'',
    isDisabled ? `is-disabled`:'',
    focus ? `is-focus`:'',
    border ? `is-bordered`:'',
    model === label ? `is-checked`:'',
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span
    class="j-radio__input"
    :class="[
    isDisabled ? `is-disabled`:'',
    model === label ? `is-checked`:'',
    ]"
    >
        <span class="j-radio__inner"></span>
        <input 
        type="radio"
        ref="radio"
        class="j-radio__original"
        :value="label"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
        >
    </span>
    <span 
    class="j-radio__label"
    @keydown.stop
    >
        <slot></slot>
        <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script>
import Emitter from "../../utils/emitter";
export default {
  name: "j-radio",
  mixins: [Emitter],
  inject: {
    jForm: {
      default: "",
    },
    jFormItem: {
      default: "",
    },
  },
  componentName: "j-radio",
  props: {
    value: {},
    label: {},
    disabled: Boolean,
    name: String,
    border: Boolean,
    size: String,
  },
  data() {
    return {
      focus: false,
    };
  },
  computed: {
    isGroup() {
      let { $parent: parent } = this;
      while (parent) {
        if (parent.$options.componentName !== "j-radio-group") {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("j-radio-group", "input", [val]);
        } else {
          this.$emit("input", val);
        }
        this.$refs.radio &&
          (this.$refs.radio.checked = this.model === this.label);
      },
    },
    _jFromItemSize() {
      return (this.JFormItem || {}).jFormItemSize;
    },
    radioSize() {
      const temRadioSize = this.size || this._jFromItemSize;
      return this.isGroup
        ? this._radioGroup.radioGroupSize || temRadioSize
        : temRadioSize;
    },
    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disable ||
            this.disable ||
            (this.jForm || {}).disabled
        : this.disabled || (this.jForm || {}).disabled;
    },
    tabIndex() {
      return this.isDisabled || (this.isGroup && this.model !== this.label)
        ? -1
        : 0;
    },
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
        this.isGroup &&
          this.dispatch("jRadioGroup", "handleChange", this.model);
      });
    },
  },
};
</script>

<style>
</style>