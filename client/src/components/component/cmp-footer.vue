<template>
  <div class="footer-wrapper">
    <ul>
      <li v-for="(n, i) in list" :key="i">
        <a :href="n.link">{{ n.text }}</a>
        <j-divider direction="vertical" v-if="n.show"></j-divider>
      </li>
    </ul>
    <p>个人博客，仅供非商业用途使用</p>
    <p>
      JXINJXFF
      <a href="https://github.com/JXFFJXIN"
        >GitHub <j-icon class="j-icon-collection-tag"></j-icon
      ></a>
    </p>
  </div>
</template>

<script>
export default {
  name: "cmp-footer",
  data() {
    return {
      list: [
        {
          text: "Vue",
          link: "https://cn.vuejs.org/",
          show: true,
        },
        {
          text: "React",
          link: "https://react.docschina.org/",
          show: true,
        },
        {
          text: "JavaScript",
          link: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript",
          show: true,
        },
        {
          text: "TypeScript",
          link: "https://www.typescriptlang.org/",
          show: true,
        },
        {
          text: "ES6",
          link: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript",
          show: true,
        },
        {
          text: "Bootstrop",
          link: "https://www.bootcss.com/",
          show: true,
        },
        {
          text: "JQuery",
          link: "https://www.w3school.com.cn/jquery/jquery_reference.asp",
          show: true,
        },
        {
          text: "Egg",
          link: "https://eggjs.org/zh-cn/intro/quickstart.html",
          show: true,
        },
        {
          text: "Node",
          link: "http://nodejs.cn/",
          show: false,
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

<style lang="scss" >
@import "./var";
.footer-wrapper {
  padding: 10px;
  background-color: $color-primary-light-6;
  width: 100%;
  height: 100%;
  text-align: center;
  color: $color-text;
  line-height: 30px;
  ul {
    li {
      display: inline-block;
      font-size: 14px;
    }
  }
  p {
    font-size: 14px;
    margin: 10px;
    a {
      list-style: none;
      text-decoration: none;
    }
  }
}
</style>