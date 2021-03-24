<template>
  <label
    class="j-checkbox"
    :class="[
      border && checkboxSize ? `j-checkbox--${checkboxSize}` : '',
      isDisabled ? `is-disabled` : '',
      isChecked ? `is-checked` : '',
    ]"
    :id="id"
  >
    <span
      class="j-checkbox__input"
      :class="[
        isDisabled ? `is-disabled` : '',
        isChecked ? `is-checked` : '',
        indeterminate ? `is-indeterminate` : '',
        focus ? `is-focus` : '',
      ]"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? `checkbox` : false"
      :aria-checked="indeterminate ? `mixed` : false"
    >
      <span class="j-checkbox__inner"></span>
      <input
        type="checkbox"
        v-if="trueLabel || falseLabel"
        class="j-checkbox__original"
        :aria-hidden="indeterminate ? `true` : `false`"
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
        class="j-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? `true` : `false`"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        v-model="model"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span class="j-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import Emitter from "../../utils/emitter";

export default {
  name: "j-checkbox",
  mixins: [Emitter],
  inject: {
    jForm: {
      default: "",
    },
    jFormItem: {
      default: "",
    },
  },
  componentName: "j-checkbox",
  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String,
    controls: String,
    border: Boolean,
    size: String,
  },
  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false,
    };
  },
  computed: {
    model: {
      get() {
        if (this.isGroup) {
          return this.store;
        } else if (this.value !== undefined) {
          return this.value;
        } else {
          return this.selfModel;
        }
      },
      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== undefined &&
            val.length < this._checkboxGroup.min &&
            (this.isLimitExceeded = true);
          this._checkboxGroup.max !== undefined &&
            val.length > this._checkboxGroup.max &&
            (this.isLimitExceeded = true);
          this.isLimitExceeded === false &&
            this.dispatch("j-checkbox-group", "input", [val]);
        } else {
          this.$emit("input", val);
          this.selfModel = val;
        }
      },
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "j-checkbox-group") {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    isChecked() {
      if ({}.toString.call(this.model) === "[object Boolean]") {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },

    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    isLimitDisabled() {
      const { max, min } = this._checkboxGroup;
      return (
        (!!(max || min) && this.model.length >= max && !this.isChecked) ||
        (this.model.length <= min && this.isChecked)
      );
    },
    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled ||
            this.disabled ||
            (this.jForm || {}).disabled ||
            this.isLimitDisabled
        : this.disabled || (this.jForm || {}).disabled;
    },
    _jFormItemSize() {
      return (this.jFormItem || {}).jFormItemSize;
    },
    checkboxSize() {
      const temCheckboxSize = this.size || this._jFormItemSize || {}.size;
      return this.isGroup
        ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
        : temCheckboxSize;
    },
  },
  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(e) {
      if (this.isLimitExceeded) return;
      let value;
      if (e.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit("change", value, e);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch("j-checkbox-group", "change", [
            this._checkboxGroup.value,
          ]);
        }
      });
    },
  },
  created() {
    this.checked && this.addToStore();
  },
  mounted() {
    if (this.indeterminate) {
      this.$el.setAttribute("aria-controls", this.controls);
    }
  },
  watch: {
    value(value) {
      this.dispatch("j-form-item", "j.form.change", value);
    },
  },
};
</script>

<style>
</style>