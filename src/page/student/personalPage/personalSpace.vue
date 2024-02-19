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
.background{
  min-height: 90vh;
  margin: 10px;
  background: #eef8f2;
  display: flex;
  justify-content: center;
  padding: 100px 0;
}
.content{
  width: 70%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  height: 1500px;
}
.changeButton{
  float: right;
}
.person-space-header{
  margin-top: 70px;
}
.personSpaceCard{
  margin-top: 20px;
  position: relative;
  left: 70%;
  top:-260px;
}
.goPanel{
  position: relative;
  top: 100px;
}
.detailInfo{
  position: relative;
  top: 50px;
  left: 20px;
  width: 70%;
}
.projectHonor{
  position: relative;
  top: -170px;
}
</style>

<template>
  <div class="background">
    <div class="content">
      <change-button @click="openEditForm" class="changeButton"/>
      <person-space-header class="person-space-header"/>
      <detail-info class="detailInfo"/>
      <personal-info-card class="personSpaceCard"/>
      <project-honor class="projectHonor"/>
      <personal-space-go-panel class="goPanel"/>
      <van-overlay :show="overlayShow" class="overlay">
        <edit-form class="editForm"/>
      </van-overlay>
    </div>
  </div>
</template>

<script setup lang="js">
import detailInfo from "@/components/personalSapce/detailInfo.vue";
import personalSpaceGoPanel from "@/components/personalSapce/personalSpaceGoPanel.vue";
import ChangeButton from "@/components/personalSapce/changeButton.vue";
import PersonSpaceHeader from "@/components/personalSapce/personSpaceHeader.vue";
import PersonalInfoCard from "@/components/personalSapce/personalInfoCard.vue";
import editForm from "@/components/personalSapce/editForm.vue";
import {onMounted,ref} from "vue";
import emitter from "@/utils/mitter.js";
import {getTeacherList, getUserInfo} from "@/services/user.js";
import useTeacherStore from "@/store/teacherstore.js";
import ProjectHonor from "@/components/personalSapce/projectHonor.vue";


onMounted(()=>{
  document.title = "个人空间";
  getTeacherList({
    start:0,
    end:1
  }).then((res)=>{
    useTeacherStore().setTeacherInfo(res.data.total,[]);
  })
})
const overlayShow = ref(false);

const openEditForm = ()=>{
  overlayShow.value = true;
}
emitter.on('closeEditForm',()=>{
  overlayShow.value = false;
})

</script>