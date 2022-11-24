<template>
  <main-header></main-header>
  <router-view />
</template>

<script>
  import mainHeader from './components/mainHeader.vue';

  export default {
    name: "App",
    components: { mainHeader, }
  }
</script>

<style lang="scss">
  @import "@/assets/scss/common";

  html {
    font-size: 16px;
    font-family: $font;
  }
</style>