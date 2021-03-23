<template>
  <div>
    <j-page-header @back="goBack" content="详情页面"> </j-page-header>
    <j-container>
      <j-header>
        <j-button type="text">文字按钮</j-button>
        <j-button type="text" disabled>文字按钮</j-button>
      </j-header>
      <j-main>
        <j-row>
          <j-button>默认按钮</j-button>
          <j-button type="primary">主要按钮</j-button>
          <j-button type="success">成功按钮</j-button>
          <j-button type="info">信息按钮</j-button>
          <j-button type="warning">警告按钮</j-button>
          <j-button type="danger">危险按钮</j-button>
        </j-row>
        <j-backtop :bottom="100"> </j-backtop>
        <j-row>
          <j-button plain>朴素按钮</j-button>
          <j-button type="primary" plain>主要按钮</j-button>
          <j-button type="success" plain>成功按钮</j-button>
          <j-button type="info" plain>信息按钮</j-button>
          <j-button type="warning" plain>警告按钮</j-button>
          <j-button type="danger" plain>危险按钮</j-button>
        </j-row>

        <j-row>
          <j-button round>圆角按钮</j-button>
          <j-button type="primary" round>主要按钮</j-button>
          <j-button type="success" round>成功按钮</j-button>
          <j-button type="info" round>信息按钮</j-button>
          <j-button type="warning" round>警告按钮</j-button>
          <j-button type="danger" round>危险按钮</j-button>
        </j-row>

        <j-row>
          <j-button icon="j-icon-search" circle></j-button>
          <j-button type="primary" icon="j-icon-edit" circle></j-button>
          <j-button type="success" icon="j-icon-check" circle></j-button>
          <j-button type="info" icon="j-icon-message" circle></j-button>
          <j-button type="warning" icon="j-icon-star-off" circle></j-button>
          <j-button type="danger" icon="j-icon-loading" circle></j-button>
        </j-row>
      </j-main>
    </j-container>

    <j-container>
      <j-header>
        <j-button-group>
          <j-button type="primary" icon="j-icon-arrow-left">上一页</j-button>
          <j-button type="primary"
            >下一页<i class="j-icon-arrow-right j-icon--right"></i
          ></j-button>
          <j-button type="primary"
            >下一页<i class="j-icon-arrow-right j-icon--right"></i
          ></j-button>
        </j-button-group>
      </j-header>
      <j-main>
        <i class="j-icon-edit"></i>
        <i class="j-icon-loading"></i>
        <i class="j-icon-djete"></i>
        <j-button type="primary" icon="j-icon-search">搜索</j-button>
      </j-main>
      <j-footer> </j-footer>
    </j-container>

    <j-container>
      <j-aside width="200px"> </j-aside>
      <j-main>
        <div>
          <span>头上一片晴天，心中一个想念</span>
          <j-divider content-position="left">少年包青天</j-divider>
          <span>饿了别叫妈, 叫饿了么</span>
          <j-divider><i class="j-icon-mobile-phone"></i></j-divider>
          <span>为了无法计算的价值</span>
          <j-divider content-position="right">阿里云</j-divider>
        </div>
      </j-main>
    </j-container>

    <j-container>
      <j-header> </j-header>
      <j-container>
        <j-aside width="200px"> </j-aside>
        <j-main>
          <j-row :gutter="12">
            <j-col :span="8">
              <j-card shadow="always"> 总是显示 </j-card>
            </j-col>
            <j-col :span="8">
              <j-card shadow="hover"> 鼠标悬浮时显示 </j-card>
            </j-col>
            <j-col :span="8">
              <j-card shadow="never"> 从不显示 </j-card>
            </j-col>
          </j-row></j-main
        >
      </j-container>
    </j-container>

    <j-container>
      <j-header>
        <j-radio-group v-model="radio">
          <j-radio :label="3">备选项</j-radio>
          <j-radio :label="6">备选项</j-radio>
          <j-radio :label="9">备选项</j-radio>
        </j-radio-group>
      </j-header>
      <j-container>
        <j-aside width="200px">
          <j-breadcrumb separator="/">
            <j-breadcrumb-item :to="{ path: '/' }">首页</j-breadcrumb-item>
            <j-breadcrumb-item><a href="/">活动管理</a></j-breadcrumb-item>
            <j-breadcrumb-item>活动列表</j-breadcrumb-item>
            <j-breadcrumb-item>活动详情</j-breadcrumb-item>
          </j-breadcrumb>
        </j-aside>
        <j-container>
          <j-main>
            <j-card class="box-card">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <j-button style="float: right; padding: 3px 0" type="text"
                  >操作按钮</j-button
                >
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{ "列表内容 " + o }}
              </div>
            </j-card>
          </j-main>
          <j-footer>
            <j-tag
              v-for="tag in tags"
              :key="tag.name"
              closable
              :type="tag.type"
            >
              {{ tag.name }}
            </j-tag>
          </j-footer>
        </j-container>
      </j-container>
    </j-container>
    <j-container>
      <j-aside width="200px">
        <j-tag closable>默认标签</j-tag>
        <j-tag size="medium" closable>中等标签</j-tag>
        <j-tag size="small" closable>小型标签</j-tag>
        <j-tag size="mini" closable>超小标签</j-tag>
      </j-aside>
      <j-container>
        <j-header>Header</j-header>
        <j-main> </j-main>
      </j-container>
    </j-container>

    <j-container>
      <j-aside width="400px"
        ><div
          class="block"
          style="
             {
              display: block;
            }
          "
        >
          <j-timeline :reverse="reverse">
            <j-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </j-timeline-item>
          </j-timeline>
        </div></j-aside
      >
      <j-container>
        <j-header>
          <div>
            <j-radio-group v-model="radio1">
              <j-radio-button label="上海"></j-radio-button>
              <j-radio-button label="北京"></j-radio-button>
              <j-radio-button label="广州"></j-radio-button>
              <j-radio-button label="深圳"></j-radio-button>
            </j-radio-group>
          </div>
          <div style="margin-top: 20px">
            <j-radio-group v-model="radio2" size="medium">
              <j-radio-button label="上海"></j-radio-button>
              <j-radio-button label="北京"></j-radio-button>
              <j-radio-button label="广州"></j-radio-button>
              <j-radio-button label="深圳"></j-radio-button>
            </j-radio-group>
          </div>
          <div style="margin-top: 20px">
            <j-radio-group v-model="radio3" size="small">
              <j-radio-button label="上海"></j-radio-button>
              <j-radio-button label="北京" disabled></j-radio-button>
              <j-radio-button label="广州"></j-radio-button>
              <j-radio-button label="深圳"></j-radio-button>
            </j-radio-group>
          </div>
          <div style="margin-top: 20px">
            <j-radio-group v-model="radio4" disabled size="mini">
              <j-radio-button label="上海"></j-radio-button>
              <j-radio-button label="北京"></j-radio-button>
              <j-radio-button label="广州"></j-radio-button>
              <j-radio-button label="深圳"></j-radio-button>
            </j-radio-group>
          </div>
        </j-header>
        <j-main> </j-main>
        <j-footer>Footer</j-footer>
      </j-container>
    </j-container>
    <j-carousel :interval="4000" type="card" height="200px">
      <j-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </j-carousel-item>
    </j-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1: "上海",
      radio2: "上海",
      radio3: "上海",
      radio4: "上海",
      radio: 3,
      tags: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" },
      ],
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
    };
  },
  methods: {
    goBack() {
      console.log("go back");
    },
  },
};
</script>

<style lang="scss" scoped>
.j-header,
.j-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.j-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.j-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .j-container {
  margin-bottom: 40px;
}

.j-container:nth-child(5) .j-aside,
.j-container:nth-child(6) .j-aside {
  line-height: 260px;
}

.j-container:nth-child(7) .j-aside {
  line-height: 320px;
}
.j-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.j-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.j-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

