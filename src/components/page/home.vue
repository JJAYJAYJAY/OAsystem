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
  <RouterView></RouterView>
</template>

<script>
import HeaderMenu from "@/components/page/headerMenu.vue";
export default {
  components: {HeaderMenu}
}
</script>