<style scoped>

</style>

<template>
  <a-button type="primary" class="returnButton"  @click="goMethod">GO</a-button>
</template>

<script setup lang="js">
import { useRouter } from 'vue-router';
const router = useRouter();
const goMethod = () => {
  router.push("method");
};
</script>