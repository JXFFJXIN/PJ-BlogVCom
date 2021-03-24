<template>
  <div>
    <ul>
      <li v-for="(n, i) in list" :key="i">
        <span>{{ n.text }}</span>
        <j-divider direction="vertical" v-if="n.show"></j-divider>
      </li>
    </ul>
    <p>个人博客，仅供非商业用途使用</p>
    <p>JXINJXFF   <a href="https://github.com/JXFFJXIN">GitHub <j-icon class="j-icon-collection-tag
"></j-icon></a></p>
  </div>
</template>

<script>
export default {
  name: "cmp-footer",
  data() {
    return {
      list: [
        {
            text:"Vue",
            show:true
        },
        {
            text:"React",
            show:true
        },
        {
            text:"JavaScript",
            show:true
        },
        {
            text:"TypeScript",
            show:true
        },
        {
            text:"ES6",
            show:true
        },
        {
            text:"Boostrop",
            show:true
        },
        {
            text:"JQuery",
            show:true
        },
        {
            text:"Egg",
            show:true
        },
        {
            text:"Node",
            show:false
        },
      ],
    };
  },
  computed: {
    listLength() {
      return this.list.length;
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  margin: 10px;
  ul {
    margin: 10px;
    li {
      display: inline-block;
      font-size: 14px;
    }
  }
  p{
      font-size: 14px;
      margin: 10px;
    a{
        list-style: none;
        text-decoration: none;
    }
  }
}
</style>