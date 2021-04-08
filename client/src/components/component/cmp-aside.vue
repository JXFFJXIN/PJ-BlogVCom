<template>
  <div>
    <j-row>
      <j-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span style="float: left; padding: 3px 0">标签集合</span>
          <j-button @click="reload" style="float: right; padding: 3px 0" type="text"
            >刷新</j-button
          >
        </div>
        <router-link
          :to="{ name: 'blogTag', params: { id: o.id } }"
          v-for="o in tagList"
          :key="o.id"
          class="text item"
        >
          {{ o.tag }}
        </router-link>
      </j-card>
    </j-row>
    <j-row>
      <j-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span style="float: left; padding: 3px 0">最近热门</span>
          <j-button @click="reload" style="float: right; padding: 3px 0" type="text"
            >刷新</j-button
          >
        </div>
        <router-link
          exact
          :to="{ name: 'blogDetail', params: { id: o.id } }"
          v-for="o in blogList"
          :key="o.id"
          class="text item"
        >
          <j-row>
            <j-col :span="21">
              <span>{{ o.title }}</span>
            </j-col>
            <j-col :span="3">
              <span>{{ o.view }}</span>
            </j-col>
          </j-row>
        </router-link>
      </j-card>
    </j-row>
    <j-row>
      <j-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
          <span style="float: left; padding: 3px 0">最新评论</span>
          <j-button @click="reload" style="float: right; padding: 3px 0" type="text"
            >刷新</j-button
          >
        </div>
        <router-link
          :to="{ name: 'blogDetail', params: { id: o.blogId } }"
          v-for="o in commentList"
          :key="o.id"
          class="text item"
          v-html="o.comment"
        >
        </router-link>
      </j-card>
    </j-row>
  </div>
</template>

<script>
import BlogServe from "../../server/blog";
import TagServe from "../../server/tag";
import CommentServe from "../../server/comment";
export default {
  name: "cmp-aside",
  inject:['reload'],
  data() {
    return {
      tagList: [],
      blogList: [],
      commentList: [],
    };
  },
  created() {
    const op = {
      page: 1,
      pageSize: 5,
    };
    BlogServe.getHot(op).then((res) => {
      res.data.map((it) => {
        this.blogList.push(it);
      });
    });
    TagServe.getAll(op).then((res) => {
      res.data.map((it) => {
        this.tagList.push(it);
      });
    });
    CommentServe.getAll(op).then((res) => {
      res.data.map((it) => {
        this.commentList.push(it);
      });
    });
    console.log(this.commentList);
    console.log(this.tagList);
    console.log(this.blogList);
  },
};
</script>

<style lang="scss" >
@import "./var";

.text {
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  color: $color-text;
  display: block;
}

.item {
  margin-bottom: 5px;
  padding: 5px;
  border-bottom: 1px solid $color-primary-light-5;
  &:last-of-type {
    border-bottom: 0px;
    margin-bottom: 0px;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 10px;
  width: 100%;
}
</style>