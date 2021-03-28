<template>
  <j-container>
    <j-backtop></j-backtop>
    <j-header>
      <cmp-header></cmp-header>
    </j-header>
    <j-container>
      <j-main>
        <router-view></router-view>
      </j-main>
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
export default {
  components:{
    cmpFooter,
    cmpHeader,
  },
  data() {
    return {};
  },
  methods: {},
  created(){
  }
};
</script>

