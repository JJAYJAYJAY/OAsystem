<style scoped>

</style>

<template>
  <headerMenu />
  <div class="main-content">
    <Slot />
  </div>
</template>

<script setup lang="js">
  import headerMenu from "@/components/menu/headerMenu.vue";
</script>