<template>
  <div
    :class="[
      `j-pagination`,
      background ? `is-background` : '',
      small ? `j-pagination--small` : '',
    ]"
  >
    <button
      type="button"
      class="btn-prev"
      :disabled="disabled || intCurrentPage <= 1"
      :on-click="prev"
    >
      <span v-if="prevText">{{ prevText }}</span>
      <i v-else class="j-icon j-icon-arrow-left"></i>
    </button>
    <ul @click="onPagerClick" class="j-pager">
      <li
        :class="{ active: currentPage === 1, disabled }"
        v-if="pageCount > 0"
        class="number"
      >
        1
      </li>
      <li
        class="j-icon more btn-quickprev"
        :class="[quickprevIconClass, { disabled }]"
        v-if="showPrevMore"
        @mouseenter="onMouseenter('left')"
        @mouseleave="quickprevIconClass = 'j-icon-more'"
      ></li>
      <li
        v-for="pager in pagers"
        :key="pager"
        :class="{ active: currentPage === pager, disabled }"
        class="number"
      >
        {{ pager }}
      </li>
      <li
        class="j-icon more btn-quicknext"
        :class="[quicknextIconClass, { disabled }]"
        v-if="showNextMore"
        @mouseenter="onMouseenter('right')"
        @mouseleave="quicknextIconClass = 'j-icon-more'"
      ></li>
      <li
        :class="{ active: currentPage === pageCount, disabled }"
        class="number"
        v-if="pageCount > 1"
      >
        {{ pageCount }}
      </li>
    </ul>
    <button
      type="button"
      class="btn-next"
      :disabled="disabled || intCurrentPage === pageCount || pageCount === 0"
      :on-click="next"
    >
      <span v-if="nextText">{{ nextText }}</span>
      <i v-else class="j-icon j-icon-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "j-pagination",
  props: {
    // Pager
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pagerCount: {
      type: Number,
      validator: (value) =>
        {(value | 0) === value && value > 4 && value < 22 && value % 2 === 1},
      default: 7,
    },
    // Prev&Next
    prevText: String,
    nextText: String,
    // template
    background: Boolean,
    disabled: Boolean,
    small:Boolean,
  },
  data() {
    return {
      intCurrentPage: 1,
      intPageSize: 0,
      lastEmittedPage: -1,
      current: null,
      userChangePageSize: false,
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: "j-icon-more",
      quickprevIconClass: "j-icon-more",
    };
  },
  computed: {
    // default
    pageCount() {
      return Math.max(1, Math.ceil(this.total / this.intPageSize));
    },
    // Pager
    pagers(){
        const pagerCount = this.pagerCount,
            halfPagerCount = (pagerCount - 1) / 2,
            currentPage = this.currentPage,
            pageCount = this.pageCount,
            array = [];
        let showPrevMore = false,
            showNextMore = false;
        console.log(pagerCount,halfPagerCount,currentPage,pageCount,array,showPrevMore,showNextMore)
        if(pageCount > pagerCount){
            if(currentPage > pagerCount - halfPagerCount){
            // 当当前页面大于容器页面的一半时现实之前的more
            showPrevMore = true;
            }else if(currentPage > pagerCount - halfPagerCount){
            // 当当前页面小于于容器页面的一半时现实之后的more
            showNextMore = true;
            }
        }
        if(showPrevMore && !showNextMore){
            // 在中间偏后
            const startPage = pageCount - (pagerCount - 2);
            for(let i = startPage; i < pageCount; i ++){
                array.push(i);
            }
        }else if(!showPrevMore && showNextMore){
            // 在中间偏前
            for(let i = 2; i < pagerCount ; i ++){
                array.push(i);
            }
        }else if(showPrevMore && showNextMore){
            const offset = Math.floor(pagerCount / 2) -1;
            for(let i = currentPage - offset ; i <= currentPage + offset; i ++){
                array.push(i)
            }
        }else {
            // pageCount小于pagerCount
            for(let i = 2 ; i < pageCount ; i ++){
                array.push(i);
            }
        }

        return array;
    }
  },
  watch:{
      showPrevMore(val){
          if(!val){
              this.quickprevIconClass = 'j-icon-more';
          }
          return val;
      },
      showNextMore(val){
          if(!val){
              this.quicknextvIconClass = 'j-icon-more';
          }
          return val;
      },
      currentPage: {
      immediate: true,
      handler(val) {
        this.intCurrentPage = this.getValidCurrentPage(val);
      }
    },

    pageSize: {
      immediate: true,
      handler(val) {
        this.intPageSize = isNaN(val) ? 10 : val;
      }
    },

    intCurrentPage: {
      immediate: true,
      handler(newVal) {
        this.$emit('update:currentPage', newVal);
        this.lastEmittedPage = -1;
      }
    },

    pageCount(newVal) {
      /* istanbul ignore if */
      const oldPage = this.intCurrentPage;
      if (newVal > 0 && oldPage === 0) {
        this.intCurrentPage = 1;
      } else if (oldPage > newVal) {
        this.intCurrentPage = newVal === 0 ? 1 : newVal;
        this.userChangePageSize && this.emitChange();
      }
      this.userChangePageSize = false;
    }
  },
  methods: {
    // Pager
    onPagerClick(event){
        const target = event.target;
        if(target.tagName === "UL" || this.disabled){
            return;
        }
        // 获取数字内容并跳转
        let newPage = Number(event.target.textContent);
        const pageCount = this.pageCount,
            currentPage = this.currentPage,
            pagerCountOffset = this.pagerCount - 2;
        if(target.className.indexOf('more') !== -1){
            if(target.className.indexOf('quickprev')!== -1){
                newPage = currentPage - pagerCountOffset;
            }else if(target.className.indexOf('quicknext')!==-1){
                newPage = currentPage + pagerCountOffset;
            }
        }
        if(!isNaN(newPage)){
            if(newPage < 1){
                newPage = 1;
            }else if(newPage > pageCount){
                newPage = pageCount;
            }
        }
        if(newPage !== currentPage){
            this.$emit('change',newPage);
        }
    },
    onMouseenter(direction){
        if(this.disabled) return;
        if(direction === 'left'){
            this.quickprevIconClass = 'j-icon-d-arrow-left';
        }else if(direction === 'right'){
            this.quicknextIconClass = 'j-icon-d-arrow-right';
        }else{
            return
        }
    },
    // Prev&Next
    getValidCurrentPage(val) {
      val = parseInt(val, 10);
      if (val < 1) {
        val = 1;
      } else if (val > this.pageCount) {
        val = this.pageCount;
      }
      return val;
    },
    prev() {
      if (this.disabled) return;
      const newVal = this.intCurrentPage - 1;
      this.intCurrentPage = this.getValidCurrentPage(newVal);
      this.$emit("prev-click", this.intCurrentPage);
      this.emitChange();
    },
    next() {
      if (this.disabled) return;
      const newVal = this.intCurrentPage + 1;
      this.intCurrentPage = this.getValidCurrentPage(newVal);
      this.$emit("next-click", this.intCurrentPage);
      this.emitChange();
    },
  },
};
</script>

<style>
</style>