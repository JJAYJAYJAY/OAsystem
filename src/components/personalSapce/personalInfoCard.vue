<style scoped>
.personalInfoBackground{
  height: 250px;
  width: 200px;
  background: #fcfcfd;
  border-radius: 10px;
  box-shadow: 0 15px 20px 0 #868686;
}
.nameImgeDiv{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.img-div{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin: 5px 0;
}
.img-div img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.classIdDiv{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 10px;
}
</style>

<template>
  <div class="personalInfoBackground">
    <div class="nameImgeDiv">
      <div class="img-div">
        <img :src="personalSpaceStore.personalSpaceInfo.userImg" alt="加载失败"/>
      </div>
      <div>
        <span>{{ personalSpaceStore.personalSpaceInfo.name }}</span>
      </div>
    </div>
    <div style="text-align: center;color: #a1a1a1;user-select: none">
      ——————————
    </div>
    <div class="classIdDiv">
      <div style="display:flex;"><span style="width: 30%">学号：</span><span style="text-align: center;font-size: small;white-space: pre-wrap;height: 40px">{{personalSpaceStore.personalSpaceInfo.studentNumber}}</span></div>
      <div style="display:flex;"><span style="width: 30%">班级：</span><span style="text-align: center;font-size: small;white-space: pre-wrap;height: 40px">{{personalSpaceStore.personalSpaceInfo.classes}}</span></div>
    </div>
  </div>
</template>

<script setup lang="js">
  import usePersonalSpaceStore from "@/store/personalSpaceStore.js";
  const personalSpaceStore = usePersonalSpaceStore();
</script>