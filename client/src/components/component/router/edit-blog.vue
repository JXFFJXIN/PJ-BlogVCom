<template>
  <div class="edit-blog">
    <j-row>
      <j-col :span="12">
        <span>标题</span><input type="text" v-model="title" placeholder="标题" id="title"/>
      </j-col>
      <j-col :span="12">
        <span>标签</span><input type="text" v-model="tag" placeholder="标签，用逗号隔开" id="tags"/>
      </j-col>
    </j-row>
    <div id="demo1"></div>
    <h3>内容预览</h3>
    <textarea name="" id="" cols="100" rows="20" readonly v-model="blogData.content"></textarea>
    <j-row>
      <j-button  class="btn" @click.native="getEditorData">提交博客</j-button>
    </j-row>
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from 'wangeditor';
import BlogServe from '../../../server/blog';
export default {
  name:'edit-blog',
  data() {
    return {
      editor: null,
      content: '',
      title:'',
      tag:'',
    }
  },
  computed:{
    blogData(){
      const {title,tag,content} = this;
      return {
        title,
        tag,
        content,
      }
    }
  },
  mounted() {
    const editor = new wangEditor(`#demo1`)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
       this.content = newHtml
    }
    // 创建编辑器
    editor.create()
    this.editor = editor
  },
  methods: {
    async getEditorData() {
      // 通过代码获取编辑器内容
      const {data} = await BlogServe.setOne(this.blogData)
      if(data.success){
        this.$router.push({
          name:'blog'
        })
      }

    }
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>

<style lang="scss">
  .edit-blog {
    display:inline-block;
    width: 100%;
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    span{
      margin: 0 20px 0 0;
    }
    input {
            width: 200px;
            height: 20px;
            font-size: 16px;
            padding: 3px 10px 3px 10px;
            border-radius: 5px;
            margin: 0px 0px 20px 0px;
        }
    .btn {
      padding: 5px 10px;
      cursor: pointer;
      display: inline-block;
    }
    h3 {
      margin: 30px 0 15px;
    }
  }
</style>