<template>
  <main class="page home-page">
    <div class="todo-list">
      <memo-item :data="todos" wrapper="li"></memo-item>
    </div>
  </main>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import axios from 'axios';

  import memoItem from '../components/memoItem.vue';

  export default {
    name: "homeView",
    components: { memoItem },
    setup() {
      const state = reactive({
        todos: [],
      })
      // todo 가져오기
      const getTodos = async function() {
        const data = await axios.get("/api/todos");
        
        state.todos = data.data;
      };
      getTodos();

      return {
        ...toRefs(state),
      }
    }
  }
</script>

<style lang="scss" scoped>
  .todo-list {
    @include flex(false, column, nowrap, flex-start, center);

    gap: 12px;
    padding: 16px;
  }
</style>
