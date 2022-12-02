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
    </div>
  </label>
</template>

<script>
  export default {
    name: "memoItem",
    props: {
      data: {
        type: Array,
        default: [],
      },
      wrapper: {
        type: String,
        default: "li",
      }
    },
  }
</script>

<style lang="scss" scoped>
  .memo-item {
    @include flex(false, row, nowrap, flex-start, center);

    width: 100%;
    border-radius: 8px;
    padding: 12px 16px 12px 12px;
    background-color: #eeeeee;

    .memo__content {
      width: calc(100% - 24px);

      .memo__date {
        font-weight: $font-md;
        color: darken($primary-main, 15%);
        margin-bottom: 8px;
      }
    }

    .memo__actions {
      justify-self: flex-end;
      margin-left: auto;
      
      .memo__checkbox {
        appearance: checkbox;
        accent-color: $primary-main;
      }
    }
  }
</style>