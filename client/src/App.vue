<template>
<div>
  <j-container>
  <j-header>Header</j-header>
  <j-main>Main</j-main>
</j-container>

<j-container>
  <j-header>Header</j-header>
  <j-main>Main</j-main>
  <j-footer>Footer</j-footer>
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

