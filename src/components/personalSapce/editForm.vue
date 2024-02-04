<style scoped>
.editForm{
  margin: 0 auto;
  display: block;
}
</style>

<template>

</template>

<script setup lang="js">
  import {reactive, ref} from "vue";
  import usePersonalSpaceStore from "@/store/personalSpaceStore.js";
  const form  = reactive(usePersonalSpaceStore().personalSpaceInfo);
</script>