<template>
  <header class="component main-header">
    <nav class="main-nav">
      <router-link 
        v-for="nav in menu"
        :key="nav.title"
        :to="{ name: nav.path }"
        class="nav__item"
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
          { title: "Write", path: "write" },
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
    padding: 0 24px;
    background-color: $primary-main;
  }
  .main-nav {
    @include flex;
    
    gap: 8px;
    padding: 8px 0;

    .nav__item {
      padding: 2px 8px;

      &:hover {
        font-weight: $font-b;
      }
    }
  }
</style>