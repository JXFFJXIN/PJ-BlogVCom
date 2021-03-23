<template>
  <i :class="'j-icon-' + name"></i>
</template>

<script>
  export default {
    name: 'j-icon',

    props: {
      name: String
    }
  };
</script>