<template>
  <main class="page write-page">
    <form 
      action="/add"
      method="POST"
      class="common-form write-memo-form"
      @submit.prevent="submitForm"
    >
      <label class="common-label to-do-label label--vertical">
        <span class="label__text">할 일</span>
        <input type="text" name="title" class="common-field" v-model="title">
      </label>
      <label class="common-label date-label label--vertical">
        <span class="label__text">Due Date</span>
        <input type="text" name="date" class="common-field" v-model="date">
      </label>
      <div class="form__actions">
        <button 
          class="common-button submit-write-button"
        >Submit</button>
      </div>
    </form>
  </main>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import axios from "axios";

  export default {
    name: "writeView",
    setup() {
      const state = reactive({
        title: "",
        date: "",
      });

      const submitForm = function() {
        const { title, date } = state;

        axios.post("/api/add",  { title, date })
          .then((response) => {
            console.log(response);
          })
      };

      return {
        ...toRefs(state),
        submitForm,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .write-memo-form {

    .common-label {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .form__actions {
    @include flex(false, row, nowrap, flex-end, center);
  }
</style>