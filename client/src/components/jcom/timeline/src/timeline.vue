<script>
export default {
  name: "j-timeline",
  provide() {
    return {
      timeline: this,
    };
  },
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    _class() {
      const { reverse } = this;
      return [`j-timeline`, reverse ? `is-reverse` : ""];
    },
  },
  render() {
    const { reverse, _class } = this;
    let slots = this.$slots.default || [];
    if (reverse) {
      slots = slots.reverse();
    }
    return <ul class={_class}>{slots}</ul>;
  },
};
</script>
