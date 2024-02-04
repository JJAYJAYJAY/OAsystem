<style scoped>
.personSpaceHeaderBackground{
  height: 100px;
  background: linear-gradient(90deg, #5fccb0 0%, #4ed795 100%);
  border-radius: 20px;
}
.welcomeFont1{
  color: #fafdfc;
  font-size: 25px;
  font-weight: bold;
  position: relative;
  left: 20px;
  top:50px;
}
.welcomeFont2{
  color: #fafdfc;
  font-family: 华文彩云,serif;
  font-size: 25px;
  position: relative;
  left: 35px;
  top: 50px;
}
</style>

<template>
  <div class="personSpaceHeaderBackground">
    <span class="welcomeFont1">你好，{{name}}!</span>
    <span class="welcomeFont2">欢迎来到德育导师双向选择系统!</span>
  </div>
</template>

<script setup lang="js">
  import usePersonalSpaceStore from "@/store/personalSpaceStore.js";
  const name = usePersonalSpaceStore().personalSpaceInfo.name
</script>