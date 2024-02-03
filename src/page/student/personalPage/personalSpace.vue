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
  top:-100px;
}
</style>

<template>
  <div class="background">
    <div class="content">
      <change-button class="changeButton"/>
      <person-space-header class="person-space-header"/>
      <personal-info-card class="personSpaceCard"/>
    </div>
  </div>
</template>

<script setup lang="js">
import ChangeButton from "@/components/personalSapce/changeButton.vue";
import PersonSpaceHeader from "@/components/personalSapce/personSpaceHeader.vue";
import PersonalInfoCard from "@/components/personalSapce/personalInfoCard.vue";
import {onMounted} from "vue";
import {getUserInfo} from "@/services/user.js";
import loginStore from "@/store/LoginStore.js";
import usePersonalSpaceStore from "@/store/personalSpaceStore.js";

onMounted(()=>{
  document.title = "个人空间";
  getUserInfo({
    userId:loginStore().loginSession.userId
  }).then(res=>{
    const PersonalSpaceStore = usePersonalSpaceStore();
    PersonalSpaceStore.setPersonalSpaceInfo(
        res.data.studentNumber,
        res.data.classes,
        res.data.phone,
        res.data.PoliticalStatus,
        res.data.email,
        res.data.home,
        res.data.interesting,
        res.data.careerDirection
    )
  })
})

</script>