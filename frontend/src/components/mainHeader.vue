<template>
  <header class="component main-header">
    <nav class="main-nav">
      <router-link 
        v-for="nav in menu"
        :key="nav.title"
        :to="{ name: nav.path }"
      >{{nav.title}}</router-link>
    </nav>
  </header>
</template>

<script>
  import { toRefs, reactive } from 'vue';

  export default {
    name: "mainHeader",
    setup() {
      const state = reactive({
        menu: [
          { title: "Home", path: "home" },
          { title: "Write", path: "home" },
        ],
      })

      return {
        ...toRefs(state),
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-header {
    height: 40px;
    padding: 0 24px;
    background-color: $primary-main;
  }
</style>