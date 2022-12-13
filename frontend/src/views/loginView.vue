<template>
  <main class="page login-page">
    <h1 class="page__title">로그인</h1>
    <form class="login-form" role="form" @submit.prevent="login">
      <input 
        type="text" 
        name="id"
        v-model="id"
        class="common-field id-field" 
        placeholder="ID"
      >
      <input 
        type="password" 
        name="password"
        v-model="password"
        class="common-field password-field" 
        placeholder="PASSWORD" 
        autocomplete="true"
      >
      
      <div class="form__actions">
        <button class="common-button login-button button--full">로그인</button>
      </div>
    </form>
  </main>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  export default {
    name: "loginView",
    setup() {
      const router = useRouter();
      const state = reactive({
        id: "",
        password: "",
      });

      // 로그인 시도시
      const login = async function(e) {
        try {
          const result = await axios({
            method: "post",
            url: "/api/login",
            data: {
              id: state.id,
              password: state.password,
            }
          });
          
          router.push("/");
        } catch(error) {
          console.log("login got error", error);
        }
      };

      return {
        ...toRefs(state),
        login,
      }
    }
  }
</script>

<style lang="scss" scoped>

  .login-page {
    @include flex(false, column, nowrap, center, center);

    min-height: 100vh;
    width: 100%;
    gap: 24px;
    padding: 24px;
    background-color: #efefef;

    .page__title {
      font-size: 18px;
      font-weight: $font-b;
      color: $primary-main;
    }
  }

  .login-form {

    .common-field {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .form__actions {
    margin-top: 24px;
  }

</style>