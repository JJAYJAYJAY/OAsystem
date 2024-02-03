<style scoped>
.changeButton{
  transition: 0.2s;
}
.changeButton:hover{
  background-color: #03b203;
  color: #fcfcfd;
  cursor: pointer;
}
</style>

<template>
  <van-button class="changeButton" plain type="success" style="padding: 5px">修改个人信息</van-button>
</template>

<script setup lang="js">
  import "vant/lib/index.css";
</script>