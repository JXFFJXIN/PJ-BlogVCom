<template>
  <j-container>
    <j-backtop></j-backtop>
    <j-header>
      <cmp-header></cmp-header>
    </j-header>
    <j-container>
      <j-col :span="6" v-show="show">
      <cmp-aside></cmp-aside>
    </j-col>
      <j-col :span="show?18:24">
        <router-view></router-view>
      </j-col>
    </j-container>
    <j-container>
      <j-footer
      :height="140"
        >
        <cmp-footer></cmp-footer>
        </j-footer
      >
    </j-container>
  </j-container>
</template>

<script>
import cmpFooter from './components/component/cmp-footer';
import cmpHeader from './components/component/cmp-header';
import cmpAside from './components/component/cmp-aside';
export default {
  components:{
    cmpFooter,
    cmpHeader,
    cmpAside,
  },
  data() {
    return {
      show:true
    };
  },
  watch:{
    $route:{
      handler(){
        const info = this.$route.fullPath !== '/';
        this.show = info;
      },
      immediate:true
    }
  },
  computed:{
  },
  methods: {},
};
</script>

