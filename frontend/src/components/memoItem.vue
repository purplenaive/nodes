<template>
  <label 
    v-for="memo in data"
    :key="memo._id"
    class="component memo-item"
  >
    <div class="memo__content">
      <p class="memo__date">{{memo.title}}</p>
      <p class="memo__content">{{memo.date}}</p>
    </div>

    <div class="memo__actions">
      <input type="checkbox" name="todos" :id="memo._id" class="memo__checkbox">
      <button class="delete-memo-button" @click="deleteMemo(memo._id)">
        <span class="button__text sr-only">삭제하기</span>
        <i class="icon trash-can primary"></i>
      </button>
    </div>
  </label>
</template>

<script>
  import axios from "axios";

  export default {
    name: "memoItem",
    props: {
      data: {
        type: Array,
        default: [],
      },
    },
    emits: ["deleteSuccess", ],
    setup(props, {emit}) {
      // 메모 삭제하기
      const deleteMemo = function(id) {
        axios({
          method: "delete",
          url: "/api/delete",
          data: {
            _id: id,
          }
        })
          .then(response => {
            emit("deleteSuccess");
          })
          .catch(error => {
            console.log(error);
          });
      };

      return {
        deleteMemo,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .memo-item {
    @include flex(false, row, nowrap, flex-start, center);

    width: 100%;
    border-radius: 8px;
    padding: 12px 16px 12px 12px;
    background-color: #eeeeee;

    &:hover {
      
      .delete-memo-button {
        opacity: 1;
        transition: opacity .3s ease;
      }
    }

    .memo__content {
      width: calc(100% - 80px);

      .memo__date {
        font-weight: $font-md;
        color: darken($primary-main, 15%);
        margin-bottom: 8px;
      }
    }

    .memo__actions {
      @include flex(false, row-reverse, nowrap, flex-end, center);

      justify-self: flex-end;
      margin-left: auto;
      gap: 16px;
      
      .memo__checkbox {
        appearance: checkbox;
        accent-color: $primary-main;
      }
    }
    .delete-memo-button {
      opacity: 0;
      aspect-ratio: 1 / 1;
      transition: opacity .3s ease;
    }
  }
</style>