<template>
  <div class="edit-blog">
    <div id="demo1"></div>
    <h3>内容预览</h3>
    <textarea name="" id="" cols="100" rows="20" readonly v-model="blogData.content"></textarea>
    <button type="button" class="btn" @click="getEditorData">修改每日一句</button>
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from 'wangeditor';
import EverydayServe from '../../../server/everyday';
export default {
  name:'edit-everyday',
  data() {
    return {
      editor: null,
      content: '',
    }
  },
  computed:{
    blogData(){
      const {content} = this;
      return {
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
      const {data} = await EverydayServe.setOne(this.blogData)
      if(data.success){
        this.$router.push({
          name:'default'
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