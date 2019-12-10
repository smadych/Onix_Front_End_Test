<!-- Main component -->
<template lang="pug">
  #app
    Layout
</template>

<script lang="ts">
import Layout from './components/Layout.vue';

export default ({
  name: 'app',
  components: {
    Layout,
  },
});
</script>

<style>
#app {
  display: flex;
  width: 100%;
}
</style>
