<style scoped>
.main-content{
  min-height: 90vh;
}
</style>
<template>
  <header-menu>
    <menu-item @click="goReason" item-name="理由库"/>
    <menu-item @click="goMessage" item-name="我的消息"/>
    <menu-item @click="goExamSelection" item-name="审批管理"/>
  </header-menu>
  <div class="main-content">
    <router-view/>
  </div>
</template>

<script setup lang="js">
  import MenuItem from "@/components/menu/menuItem.vue";
  import {useRouter} from "vue-router";
  import HeaderMenu from "@/components/menu/headerMenu.vue";

  const router =new useRouter();

  const goMessage = () => {
    router.push("message");
  }

  const goReason = () => {
    router.push("reason");
  }

  const goExamSelection = () => {
    router.push("examSelection");
  }
</script>
