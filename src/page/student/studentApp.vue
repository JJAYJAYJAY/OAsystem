<style scoped>
</style>
<template>
  <header-menu>
    <menu-item @click="goInfo" item-name="相关信息"/>
    <menu-item @click="goMessage" item-name="我的消息"/>
    <menu-item @click="goPersonalSpace" item-name="个人空间" selected="selected"/>
  </header-menu>
  <div class="main-content">
    <router-view/>
  </div>
</template>

<script setup lang="js">
  import MenuItem from "@/components/menu/menuItem.vue";
  import HeaderName from "@/components/menu/headerName.vue";

  import {useRouter} from "vue-router";
  import HeaderMenu from "@/components/menu/headerMenu.vue";

  const router =new useRouter();
  const goInfo = () => {
    router.push("infoHome");
  }
  const goMessage = () => {
    router.push("message");
  }
  const goPersonalSpace = () => {
    router.push("personalSpace");
  }
</script>
