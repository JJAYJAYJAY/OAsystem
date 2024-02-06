<style scoped>
  .form-container {
    display: grid;
    grid-template-columns: auto auto;
    grid-row-gap: 10px;
  }

  .form-container span {
    display: flex;
  }

  .infoSpan {
    border: 1px solid transparent;
    white-space: pre-wrap;
    resize: none;
    width: 250px;
    height: 50px;
  }
</style>
<template>
  <div class="form-container">
    <span>
      <label for="contact">联系方式：</label>
      <span id="contact"  class="infoSpan">{{personalSpaceStore.personalSpaceInfo.phone}}</span>
    </span>
    <span>
      <label for="politics">政治面貌：</label>
      <span id="politics" class="infoSpan"> {{ personalSpaceStore.personalSpaceInfo.politicalStatus }} </span>
    </span>
    <span>
      <label for="email">邮箱：</label>
      <span id="email" class="infoSpan">{{personalSpaceStore.personalSpaceInfo.email}}</span>
    </span>
    <span>
      <label for="address">家庭住址：</label>
      <span id="address" class="infoSpan">{{personalSpaceStore.personalSpaceInfo.home}}</span>
    </span>
    <span>
      <label for="career">职业方向：</label>
      <span id="career" class="infoSpan">{{personalSpaceStore.personalSpaceInfo.careerDirection}}</span>
    </span>
    <span>
      <label for="interest">兴趣方向：</label>
      <span id="interest" class="infoSpan">{{personalSpaceStore.personalSpaceInfo.interesting}}</span>
    </span>
  </div>
</template>
<script setup lang="js">
  import usePersonalSpaceStore from "@/store/personalSpaceStore.js";
  const personalSpaceStore = usePersonalSpaceStore();

</script>