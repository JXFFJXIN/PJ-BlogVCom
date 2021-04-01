<template>
    <div class="blogdetail">
    <j-card class="box-card">
      <div slot="header" class="clearfix">
        <a class="blog-title">{{ data.title }}</a>
      </div>
      <div class="default">
        <j-row class="util">
          <j-col :span="20" class="blog-tag">Tag：{{ data.tag }}</j-col>
          <j-col :span="4" class="blog-view">View:{{ data.view }}</j-col>
        </j-row>
        <j-row>
          <div class="blog-body" v-html="data.content"></div>
        </j-row>
      </div>
    </j-card>
    <j-card class="box-card" v-for="o in data.comments" :key="o.id">
      <div class="default">
        <j-row class="util">
          <j-col :span="20" class="blog-tag"
            >{{ o.userName }}{{ find(o.parentId).userName }}</j-col
          >
          <j-col :span="4" class="blog-view">{{ time(o.createdAt) }}</j-col>
        </j-row>
        <j-row>
          <div class="blog-body" v-html="o.comment"></div>
        </j-row>
      </div>
    </j-card>
    <j-card class="box-card">
      <j-row class="comment-info">
        <j-col :span="8">
          <input
            type="text"
            placeholder="用户名"
            id="userName"
            v-model="userName"
          />
        </j-col>
        <j-col :span="8">
          <input
            type="text"
            placeholder="邮箱"
            id="userEmail"
            v-model="userEmail"
          />
        </j-col>
        <j-col :span="8">
          <input
            type="text"
            placeholder="邮箱"
            id="userEmail"
            v-model="userEmail"
          />
        </j-col>
      </j-row>
      <j-row class="comment-body">
        <div id="demo1"></div>
      </j-row>
      <j-row class="comment-button">
        <j-button @click="getEditorData">提交</j-button>
      </j-row>
    </j-card>
  </div>
</template>

<script>
import CommentServer from "../../../server/comment";
import BlogServer from "../../../server/blog";
import wangEditor from "wangeditor";
export default {
  name: "cmp-blogdetail",
  data() {
    return {
      data: {},
      editor: null,
      comment: "",
      userName: "",
      userEmail: "",
      parentId: null,
    };
  },
  computed: {
    info() {
      const id = +this.$route.params.id || -1,
        page = +this.$route.query.page || 1,
        pageSize = +this.$route.query.pageSize || 10;
      return {
        id,
        page,
        pageSize,
      };
    },
    // blogId, userName, comment, userEmail = '未留下联系方式', parentId = -1
    commentData() {
      const {
        info,
        userName,
        comment,
        userEmail = "未留下联系方式",
        parentId = -1,
      } = this;
      return {
        blogId: info.id,
        userName,
        comment,
        userEmail,
        parentId,
      };
    },
  },
  watch: {
    $route: {
      async handler() {
        const op = { id: this.info.id };
        const res = await BlogServer.getById(op);
        this.data = res;
        console.log(this.data);
        return res;
      },
      immediate: true,
    },
  },
  methods: {
    time(datetime) {
      const date = new Date(datetime);
      return `${date.getFullYear()}-${+date.getMonth() + 1}-${date.getDate()}`;
    },
    find(parentid) {
      const [data = ""] =
        this.data.comments &&
        this.data.comments.filter((it) => it.id === parentid);
      const res = {
        show: data ? true : false,
        userName: data ? ` 回复 ${data.userName}` : "",
      };
      console.log(res);
      return res;
    },
    async getEditorData() {
      // 通过代码获取编辑器内容
      console.log(this.commentData);
      await CommentServer.setOne(this.commentData);
    },
  },
  mounted() {
    const editor = new wangEditor(`#demo1`);
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.comment = newHtml;
    };
    // 创建编辑器
    editor.create();
    this.editor = editor;
  },
  created() {},
};
</script>

<style lang="scss" scoped >
@import "../var.scss";
.blogdetail {
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
    .blog-title {
      padding: 10px;
      font-size: 18px;
      text-decoration: none;
      color: $color-text;
    }
    .default {
      .blog-body {
        padding: 10px;
        font-size: 14px;
        height: 10%;
      }
      .util {
        font-size: 12px;
        border-bottom: 1px solid $color-primary-light-6;
        padding: 5px;
      }
      .box-card {
        box-sizing: border-box;
        display: inline-block;
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
        .blog-title {
          padding: 10px;
          font-size: 18px;
          text-decoration: none;
          color: $color-text;
        }
      }
    }
    .comment-info{
      padding: 5px;
    }
    .comment-body{
      width: 100%;
    }
    .comment-button{
      padding: 5px;
    }
  }
}
</style>