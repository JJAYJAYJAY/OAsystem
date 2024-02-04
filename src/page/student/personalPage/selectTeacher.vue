<style scoped>
.background{
  background-color: rgb(241,238,225);
  display: flex;
  justify-content: center;
  padding: 100px 0;
}
.content{
  width: 70%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  height: 1000px;
}
</style>

<template>
  <div class="background">
    <div class="content">
    <mutual-chose-table/>
    </div>
  </div>

</template>

<script setup lang="js">
  import mutualChoseTable from "@/components/personalSapce/mutualChoseTable.vue";
</script>