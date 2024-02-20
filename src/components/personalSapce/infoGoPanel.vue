<style scoped>
.goPanel{
  width: 500px;
  height: 350px;
  box-shadow: rgba(51, 51, 51, 0.82) 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: rgba(234, 235, 240, 0.81);
  border-radius: 30px;
  gap: 10px;
}
.photo-div{
  width: 80%;
  height: 200px;
  overflow: hidden;
}
.photo{
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
}
.photo-div::before {
  content: "";
  position: absolute;
  display: inline-block;
  top: 25px;
  left: 50px;
  width: 400px;
  height: 200px;
  background: radial-gradient(circle, transparent, rgba(234, 235, 240, 0.67));
  z-index: 1;
}
.title{
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
  z-index: 2;
}
.buttonDiv{
  width: 400px;
  display: flex;
  justify-content: center;
}
</style>

<template>
  <div class="goPanel" >
    <div class="photo-div">
      <img :src="imgSrc" alt="加载失败" class="photo"/>
    </div>
    <div class="title">
        {{title}}
    </div>
    <div class="buttonDiv">
      <gobutton @click="goFun"/>
    </div>
  </div>
</template>

<script setup lang="js">
import {defineProps} from "vue";
import Gobutton from "@/components/personalSapce/goButton.vue";

const props = defineProps({
  title: String,
  goFun: Function,
  imgSrc: String
});
</script>