<style scoped>
  .form-container {
    display: grid;
    grid-template-columns: auto auto;
    grid-row-gap: 10px;
  }

  .form-container span {
    display: flex;
  }

  textarea {
    border: 1px solid transparent;
    word-wrap: break-word;
    resize: none;
  }
</style>
<template>
  <div class="form-container">
    <span>
      <label for="contact">联系方式：</label>
      <textarea id="contact" disabled>{{phone}}</textarea>
    </span>
    <span>
      <label for="politics">政治面貌：</label>
      <textarea id="politics"> {{ politics }} </textarea>
    </span>
    <span>
      <label for="email">邮箱：</label>
      <textarea id="email">{{email}}</textarea>
    </span>
    <span>
      <label for="address">家庭住址：</label>
      <textarea id="address">{{home}}</textarea>
    </span>
    <span>
      <label for="career">职业方向：</label>
      <textarea id="career">{{career}}</textarea>
    </span>
    <span>
      <label for="interest">兴趣方向：</label>
      <textarea id="interest">{{interesting}}</textarea>
    </span>
  </div>
</template>
<script setup lang="js">
  import usePersonalSpaceStore from "@/store/personalSpaceStore.js";
  const personalSpaceStore = usePersonalSpaceStore();
  const phone = personalSpaceStore.personalSpaceInfo.phone;
  const politics = personalSpaceStore.personalSpaceInfo.politicalStatus;
  const email = personalSpaceStore.personalSpaceInfo.email;
  const home = personalSpaceStore.personalSpaceInfo.home;
  const career = personalSpaceStore.personalSpaceInfo.careerDirection;
  const interesting = personalSpaceStore.personalSpaceInfo.interesting;
</script>