<template>
  <main class="page memo-detail-page">
    <!-- ========== content ========== -->
    <article v-show="mode === 'view'">
      <div class="page-block memo-content">
        <h1 class="memo__title">{{memo.title}}</h1>
        <p class="memo__date">{{memo.date}}</p>
      </div>
      <!-- actions -->
      <div class="action-block content-actions">
        <button 
          class="common-button modify-memo-button"
          @click="modifyMemo"
        >수정 하기</button>
      </div>
    </article>

    <!-- ========== form ========== -->
    <article v-show="mode === 'modify'">
      <form class="page-block memo-modify" role="form">
        <input 
          type="text" 
          v-model="modify.title"
          class="common-field form__field memo-title-field"
        >
        <input 
          type="text" 
          v-model="modify.date"
          class="common-field form__field memo-date-field"
        >
      </form>
      <!-- actions -->
      <div class="action-block modify-actions">
        <button 
          class="common-button button--outline cancel-modify-button"
          @click="cancelModify"
        >취소</button>
        <button 
          class="common-button complete-modify-button"
          @click="completeModify"
        >완료</button>
      </div>
    </article>
  </main>
</template>

<script>
  import { useRoute } from "vue-router";
  import { reactive, toRefs } from "vue";
  import axios from "axios";

  export default {
    name: "detailView",
    setup() {
      const route = useRoute();
      const id = route.params.id;
      const state = reactive({
        memo: {},
        modify: {
          title: "",
          date: "",
        },
        mode: "view",
      });

      // id에 맞춰서 메모 들고오기
      const getMemoData = async function() {
        try {
          const data = await axios({
            method: "get",
            url: "/api/memo/" + id,
          });

          state.memo = data.data;
        } catch(error) {
          console.log(error);
        }
      };
      getMemoData();
      // 수정하기
      const modifyMemo = function() {
        const { title, date } = state.memo;
        
        state.modify.title = title;
        state.modify.date = date;
        state.mode = "modify";
      };
      // 수정하기 취소
      const cancelModify = function() {
        state.mode = "view";
        state.modify.title = "";
        state.modify.date = "";
      };
      // 수정하기 완료
      const completeModify = async function() {
        try {
          const result = await axios({
            method: "patch",
            url: "/api/modify/",
            data: {
              _id: id,
              ...state.modify,
            }
          });
          
          getMemoData();
          state.mode = "view";
        } catch(error) {
          console.log(error);
        }
      };

      return {
        ...toRefs(state),
        modifyMemo, cancelModify, completeModify,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .memo-detail-page {
    padding: 24px;

    .page-block {
      margin-bottom: 24px;
    }
  }


  // ========== content ========== //
  .memo-content {

    .memo__title {
      margin-bottom: 8px;
      font-weight: $font-b;
      font-size: 18px;
    }
  }
  // ========== form ========== //
  .memo-modify {

    .common-field {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  // ========== actions ========== //
  .action-block {
    @include flex(false, row, nowrap, flex-end, center);

    gap: 8px;
  }
</style>