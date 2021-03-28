<template>
  <j-row>
    <j-col :span="6">
        <cmp-aside></cmp-aside>
    </j-col>
    <j-col :span="18">
      这是留言页面
    </j-col>
</j-row>
</template>

<script>
import cmpAside from '../cmp-aside';

export default {
    name:'cmp-leaveMsg',
    components:{
        cmpAside,
    }
}
</script>

<style>

</style>