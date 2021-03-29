<template>
  <div class="container">
    <j-row justify="space-around">
      <j-col :span="5">
        <router-link :to="{ name: 'default' }" class="title"
          >个人博客 | 前端技术博客</router-link
        >
      </j-col>
      <j-col :span="10">
        <ul class="menu">
          <li><router-link exact :to="{ name: 'default' }">首页</router-link></li>
          <li><router-link :to="{ name: 'blog' }">博客</router-link></li>
          <li><router-link exact :to="{ name: 'about' }">关于</router-link></li>
          <li><router-link exact :to="{ name: 'editBlog' }">写博</router-link></li>
          <li><router-link exact :to="{ name: 'editEveryday' }">写句</router-link></li>
        </ul>
      </j-col>
      <j-col :span="5">
        <div class="search">
          <input type="text" placeholder="请输入关键词!" />
          <j-button type="primary" plain size="mini">搜索</j-button>
        </div>
      </j-col>
    </j-row>
  </div>
</template>

<script>
export default {
  name: "cmp-header",
};
</script>

<style lang="scss">
@import "./var";
.container {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: $color-primary-light-2;
  & .title {
    display: inline-block;
    color: $color-primary-light-8;
    line-height: 50px;
    text-decoration: none;
    font-size: 18px;
  }
  & .menu {
    li {
      display: inline-block;
      height: 100%;
      width: 58px;
      font-size: 18px;
      line-height: 50px;
      text-align: center;
      &:hover {
        background-color: $color-primary-light-8;
        a {
          color: $color-primary-light-2;
        }
      }
      & a {
        display: inline-block;
        text-decoration: none;
        height: 100%;
        width: 100%;
        color: $color-primary-light-8;
        box-sizing: border-box;
        &.router-link-active {
        color: $color-primary-light-2;
        background: $color-primary-light-8;
      }
      }
    }
  }
  .search {
    line-height: 50px;
    height: 50px;
    & input {
      display: inline-block;
      height: 30px;
      padding: 2px 10px;
      border-radius: 5px 0 0 5px;
      box-sizing: border-box;
      outline: none;
      border: 1px solid #e0f6cd;
      font-size: 14px;
    }
  }
}
</style>