<template>
<div>
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
    <j-button type="primary">下一页<i class="j-icon-arrow-right j-icon--right"></i></j-button>
    <j-button type="primary">下一页<i class="j-icon-arrow-right j-icon--right"></i></j-button>
  </j-button-group>
  </j-header>
  <j-main>
      <i class="j-icon-edit"></i>
      <i class="j-icon-loading"></i>
      <i class="j-icon-delete"></i>
      <j-button type="primary" icon="j-icon-search">搜索</j-button>
  </j-main>
  <j-footer>
    <j-form  :inline="true"></j-form>
  </j-footer>
</j-container>

<j-container>
  <j-aside width="200px">Aside</j-aside>
  <j-main>Main</j-main>
</j-container>

<j-container>
  <j-header>Header</j-header>
  <j-container>
    <j-aside width="200px">Aside</j-aside>
    <j-main>Main</j-main>
  </j-container>
</j-container>

<j-container>
  <j-header>Header</j-header>
  <j-container>
    <j-aside width="200px">Aside</j-aside>
    <j-container>
      <j-main>Main</j-main>
      <j-footer>Footer</j-footer>
    </j-container>
  </j-container>
</j-container>

<j-container>
  <j-aside width="200px">Aside</j-aside>
  <j-container>
    <j-header>Header</j-header>
    <j-main>Main</j-main>
  </j-container>
</j-container>

<j-container>
  <j-aside width="200px">Aside</j-aside>
  <j-container>
    <j-header>Header</j-header>
    <j-main>Main</j-main>
    <j-footer>Footer</j-footer>
  </j-container>
</j-container>


  </div>
</template>
<style lang="scss" scoped>
  .j-header, .j-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .j-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .j-main {
    background-color: #E9EEF3;
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
</style>

