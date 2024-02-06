<style scoped>
.outer{
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.outerBox{
  margin-top: 20px;
  position: relative;
  left: 20px;
  width: 1000px;
  border-radius: 10px;
  background-color: rgba(241, 240, 240, 0.96);
  padding: 10px;
}

.small-title{
  font-size: 20px;
  font-weight: 600;
  padding: 10px;
}
.content{
  height: 150px;
  margin-top: 20px;
  padding: 10px;
}
</style>

<template>
  <div class="outer">
    <div class="outerBox">
      <div>
        <span class="small-title">项目经历：</span>
        <div class="content">{{personalSpaceStore.personalSpaceInfo.projectExperience ? personalSpaceStore.personalSpaceInfo.projectExperience:"无"}}</div>
      </div>
    </div>
    <div class="outerBox">
      <div>
        <span class="small-title">荣誉奖励：</span>
        <div class="content">{{personalSpaceStore.personalSpaceInfo.honors ? personalSpaceStore.personalSpaceInfo.honors : "无"}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
  import usePersonalSpaceStore from "@/store/personalSpaceStore.js";
  const personalSpaceStore = usePersonalSpaceStore();

</script>