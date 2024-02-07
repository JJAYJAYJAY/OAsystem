<style scoped>
.returnButton{
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
  width: 70px;
}
</style>

<template>
  <div>
    <a-button type="primary" class="returnButton"  @click="returnInfoHome">返回</a-button>
  </div>
  <div>
    <vue-office-docx :src="docxUrl" @rendered="renderingCompleted" />
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx';
import { useRouter } from 'vue-router';
const router = useRouter();

//赋值文档路径 此目录可以是http地址，也可以是本地文件
const docxUrl= ref("/public/浙江工业大学计算机学院本科生德育导师制实施办法.docx");
const renderingCompleted = () => {
  console.log("渲染完成");
};
const returnInfoHome = () => {
  router.push("infohome");
};
</script>