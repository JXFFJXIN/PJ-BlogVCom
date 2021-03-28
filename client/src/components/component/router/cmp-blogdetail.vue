<template>
  <j-row>
    <j-col :span="6">
        <cmp-aside></cmp-aside>
    </j-col>
    <j-col :span="18">
      这是博客详情
    </j-col>
</j-row>
</template>

<script>
import cmpAside from '../cmp-aside';

export default {
    name:'cmp-blogdetail',
    components:{
      cmpAside,
    }
}
</script>

<style>

</style>