<style scoped>
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  cursor: default;
}
html{
  padding: 0 10px;
  min-width: 1450px;
}
</style>

<template>
  <headerMenu/>
  <div class="main-content">
    <router-view></router-view>
  </div>
</template>

<script setup lang="js">
import headerMenu from "@/components/page/headerMenu.vue";
</script>