<style scoped>

</style>

<template>
  <div>
    个人界面
  </div>
</template>

<script setup lang="js">
  import emitter from "@/components/utils/mitter.js";

  emitter.on('goToPersonalSpace', (res) => {
    console.log('goToPersonalSpace');
  });
</script>