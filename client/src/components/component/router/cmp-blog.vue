<template>
  <div class="blog-box">
      <j-card class="box-card" v-for="o in blogList" :key="o.id" >
        <div slot="header" class="clearfix">
          <router-link exact :to="{name:'blogDetail',params:{id:o.id}}" class="blog-title">{{ o.title }}</router-link>
        </div>
        <div class="default">
          <div class="blog-body" v-html="o.content"></div>
          <j-row class="util">
            <j-col :span="20" class="blog-tag">Tag：{{ o.tag }}</j-col>
            <j-col :span="4" class="blog-view">View:{{ o.view }}</j-col>
          </j-row>
        </div>
      </j-card>
  </div>
</template>

<script>
import BlogServe from "../../../server/blog";
export default {
  name: "cmp-blog",
  data() {
    return {
      blogList: [],
    };
  },
  created() {
    const op = {
      page: 1,
      pageSize: 10,
    };
    BlogServe.getAll(op).then((res) => {
      res.data.map((it) => {
        this.blogList.push(it);
      });
      console.log(this.blogList);
    });
  },
};
</script>

<style lang="scss">
@import '../var.scss';
.blog-box {
  .box-card {
    box-sizing: border-box;
    width: 95%;
    text-align: left;
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
    .blog-title{
        padding: 10px;
        font-size: 18px;
        text-decoration: none;
        color: $color-text;
    }
    .default{
        .blog-body{
            padding: 10px;
            font-size: 14px;
            height: 10%;
        }
        .util{
            font-size: 12px;
            border-top: 1px solid $color-primary-light-6;
            margin-top: 10px;
            padding: 5px;
        }
    }
  }
}
</style>