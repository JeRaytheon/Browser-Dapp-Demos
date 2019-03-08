<template>
    <div class="history">
      <span v-if="history_exist" class="history_exist">尚无历史交易记录</span>
    </div>
</template>

<script>
    export default {
        name: "history",
      data: function () {
        return {
          history_exist:true
        }
      }
    }
</script>

<style scoped>
  .history {
    position: relative;
  }
  .history_exist {
    margin: 30px auto 0px auto;
    width: auto;
    display: block;
    color: #ccc;
    font-size: 30px;
    text-align: center;
  }
</style>
