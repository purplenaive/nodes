<template>
  <main class="page home-page">
    {{todos}}
  </main>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import axios from 'axios';

  export default {
    name: "homeView",

    setup() {
      const state = reactive({
        todos: [],
      })
      // todo 가져오기
      const getTodos = async function() {
        const data = await axios.get("/api/todos");
        console.log(data);
        state.todos = data.data;
      };
      getTodos();

      return {
        ...toRefs(state),
      }
    }
  }
</script>
