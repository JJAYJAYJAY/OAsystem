<style scoped>
.background{
  background: url(" /public/img/向日葵——图书馆.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  min-height: 800px;
}
.panel1{
  top:200px;
  left: 200px;
}
.panel2{
  top:200px;
  left: 800px;
}
</style>

<template>
  <div class="background">
    <div class="filter">
      <info-go-panel class="panel1" background-color="#eaebf0" img-src="/public/img/樱花.png" title="查看实施办法" :go-fun="goMethod"/>
      <info-go-panel class="panel2" background-color="#feecdd" img-src="/public/img/教学楼.jpg" title="查看德育导师名单"  :go-fun="goTeacherList"/>
    </div>
  </div>
</template>

<script setup lang="js">
import { useRouter } from 'vue-router';
import InfoGoPanel from "@/components/personalSapce/infoGoPanel.vue";
const router = useRouter();
const goMethod = () => {
  router.push("method");
};
const goTeacherList = () => {
  router.push("teacherList");
};
</script>