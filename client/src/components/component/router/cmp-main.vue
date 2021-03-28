<template>
  <div>
    <j-row>
      <j-col :span="8" class="left-top">
        <span>VUE | Egg | VUE-ROUTER | VUEX | SCSS</span>
      </j-col>
      <j-col :span="16" class="center-top">
        <span>个人博客</span>
      </j-col>
    </j-row>
    <j-row>
      <j-col :span="16" class="left-bottom">
        <span>左下</span>
      </j-col>
      <j-col :span="8" class="center-bottom">
        <span>{{ed[0]}}</span>
      </j-col>
    </j-row>
  </div>
</template>

<script>
import EverydayServe from "../../../server/everyday";

export default {
  name: "cmp-main",
  data() {
    return {
      ed: [],
    };
  },
  computed: {
    length() {
      return this.ed.length - 1;
    },
  },
  created() {
    EverydayServe.getOne().then((res) => {
      this.ed.push(res.content);
    });
  },
};
</script>

<style lang="scss">
@import "../var.scss";
.left-top,
.center-top,
.left-bottom,
.center-bottom{
  height: 35vh;
  margin: 0;
  padding: 0;
  color: white;
  text-align: left;
  
}
.left-top{
  background: $color-primary-light-5;
  position:relative;
  span{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
.center-top{
  background: $color-primary-light-3;
  position:relative;
  span{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  
}
.left-bottom{
  background: $color-primary-light-4;
  position:relative;
  span{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
.center-bottom{
  background: $color-primary-light-2;
  position:relative;
  span{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>