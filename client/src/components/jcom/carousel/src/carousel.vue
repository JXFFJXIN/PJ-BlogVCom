<template>
  <div
    :class="carouselClasses"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div class="j-carousel__container" :style="{ height: height }">
      <transition v-if="arrowDisplay" name="carousel-arrow-left">
        <button
          type="button"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)"
          class="j-carousel__arrow j-carousel__arrow--left"
        >
          <i class="j-icon-arrow-left"></i>
        </button>
      </transition>
      <transition v-if="arrowDisplay" name="carousel-arrow-right">
        <button
          type="button"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)"
          class="j-carousel__arrow j-carousel__arrow--right"
        >
          <i class="j-icon-arrow-right"></i>
        </button>
      </transition>
      <slot></slot>
    </div>
    <ul v-if="indicatorPosition !== 'none'" :class="indicatorsClasses">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="[
          `j-carousel__indicator`,
          `j-carousel__indicator--${direction}`,
          index === activeIndex ? `is-active` : '',
        ]"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)"
      >
        <button class="j-carousel__button">
          <span v-if="hasLabel">
            {{ item.label }}
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { throttle } from "throttle-debounce";
import {
  addResizeListener,
  removeResizeListener,
} from "../../utils/resizeEvent";
export default {
  name: "j-carousel",
  props: {
    initialIndex: {
      type: Number,
      default: 0,
    },
    height: {
      type: String,
    },
    trigger: {
      type: String,
      default: "hover",
      validator: (val) => ["hover", "click"].includes(val),
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    interval: {
      // 自动切换时间,单位为毫秒
      type: Number,
      default: 3000,
    },
    indicatorPosition: {
      type: String,
      default: "inside",
      validator: (val) => ["outside", "none", "inside"].includes(val),
    },
    indicator: {
      type: Boolean,
      default: true,
    },
    arrow: {
      type: String,
      default: "hover",
      validator: (val) => ["hover", "always", "never"].includes(val),
    },
    type: {
      type: String,
      validator: (val) => ["card"].includes(val),
    },
    loop: {
      type: Boolean,
      default: true,
    },
    direction: {
      type: String,
      default: "horizontal",
      validator: (val) => ["horizontal", "vertical"].includes(val),
    },
  },
  data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false,
    };
  },
  computed: {
    arrowDisplay() {
      return this.arrow !== "never" && this.direction !== "vertical";
    },
    hasLabel() {
      return this.items.some((item) => item.label.toString().length > 0);
    },
    carouselClasses() {
      return [
        "j-carousel",
        `j-carousel--${this.direction}`,
        this.card ? `j-carousel--${this.card}` : "",
      ];
    },
    indicatorsClasses() {
      return [
        "j-carousel__indicators",
        `j-carousel__indicators--${this.direction}`,
        this.hasLabel ? `j-carousel__indicators--labels` : "",
        this.indicatorPosition === "outside" || this.type === "card"
          ? `j-carousel__indicators--outside`
          : "",
      ];
    },
  },
  watch: {
    items(val) {
      if (val.length > 0) {
        this.setActiveItem(this.initialIndex);
      }
    },
    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      if (oldVal > -1) {
        this.$emit("change", val, oldVal);
      }
    },
    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },
    loop() {
      this.setActiveItem(this.activeIndex);
    },
  },
  methods: {
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },
    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },
    itemInStage(item, index) {
      const length = this.items.length;
      if (
        (index === length - 1 && item.inStage && this.items[0].active) ||
        (item.inStage && this.items[index + 1] && this.items[index + 1].active)
      ) {
        return "left";
      } else if (
        (index === 0 && item.inStage && this.items[length - 1].active) ||
        (item.inStage && this.items[index - 1] && this.items[index - 1].active)
      ) {
        return "right";
      }
      return false;
    },

    handleButtonEnter(arrow) {
      if (this.direction === "vertical") return;
      this.items.forEach((item, index) => {
        if (arrow === this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },

    handleButtonLeave() {
      if (this.direction === "vertical") return;
      this.items.forEach((item) => {
        item.hover = false;
      });
    },

    updateItems() {
      this.items = this.$children.filter(
        (child) => child.$options.name === "ElCarouselItem"
      );
    },

    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    },

    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },

    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },

    setActiveItem(index) {
      if (typeof index === "string") {
        const filteredItems = this.items.filter((item) => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn("[Element Warn][Carousel]index must be an integer.");
        return;
      }
      let length = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
    },

    prev() {
      this.setActiveItem(this.activeIndex - 1);
    },

    next() {
      this.setActiveItem(this.activeIndex + 1);
    },

    handleIndicatorClick(index) {
      this.activeIndex = index;
    },

    handleIndicatorHover(index) {
      if (this.trigger === "hover" && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    },
  },
  created() {
    this.throttledArrowClick = throttle(300, true, (index) => {
      this.setActiveItem(index);
    });
    this.throttledIndicatorHover = throttle(300, (index) => {
      this.handleIndicatorHover(index);
    });
  },
  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      addResizeListener(this.$el, this.resetItemPosition);
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },
  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.resetItemPosition);
    this.pauseTimer();
  },
};
</script>

<style>
</style>