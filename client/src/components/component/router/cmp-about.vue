<template>
  <j-row>
    <j-col :span="6">
        <cmp-aside></cmp-aside>
    </j-col>
    <j-col :span="18">
      这是关于页面
    </j-col>
</j-row>
</template>

<script>
import cmpAside from '../cmp-aside';

export default {
    name:'cmp-about',
    components:{
        cmpAside,
    }
}
</script>

<style>

</style>