<style scoped>
.main-content{
  min-height: 90vh;
}
</style>
<template>
  <header-menu>
    <menu-item @click="goAdmin" item-name="管理员"/>
    <menu-item @click="goReason" item-name="理由库"/>
    <menu-item @click="goMessage" item-name="我的消息"/>
    <menu-item @click="goSuccessMatch" item-name="配对信息"/>
    <menu-item @click="goExamSelection" item-name="审批管理"/>
  </header-menu>
  <div class="main-content">
    <router-view/>
  </div>
</template>


<script setup lang="js">

import HeaderMenu from "@/components/menu/headerMenu.vue";
import MenuItem from "@/components/menu/menuItem.vue";
import {useRouter} from "vue-router";
import emitter from "@/utils/mitter.js";

const router = useRouter();

const goMessage = () => {
  router.push("message");
}
const goReason = () => {
  router.push("reason");
}
const goAdmin = () => {
  router.push("admin");
}
const goSuccessMatch = () => {
  router.push("successMatch");
}
const goExamSelection = () => {
  router.push("examSelection");
}
</script>