<style scoped>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  .menu-title{
    width: 30%;
    font-size: xx-large;
    font-weight: bold;
    height: 70px;
    line-height: 70px;
  }
  .header-menu{
    display: flex;
    width: 100%;
    padding:0 40px;
  }
  .item-menu{
    margin-left: 20%;
    list-style: none;
    display: flex;
    width: 50%;
    justify-content: space-around;
  }
  .mine{
    width: 20%;
  }
</style>
<template>
  <div class="header-menu">
    <div class="menu-title">德育导师双向选择系统</div>
    <ol class="item-menu">
      <menu-item @click="goSelectTeacher" item-name="导师选择"/>
      <menu-item @click="goMessage" item-name="我的消息"/>
      <menu-item @click="goPersonalSpace" item-name="个人空间" selected="selected"/>
    </ol>
    <header-name class="mine" :user-name="userName" user-img="../public/test-resouce/loginbackground5.jpg"/>
  </div>
</template>

<script setup lang="js">
  import MenuItem from "@/components/menu/menuItem.vue";
  import HeaderName from "@/components/menu/headerName.vue";

  import {useRouter} from "vue-router";

  const router =new useRouter();
  //TODO 转跳需要完善
  const goSelectTeacher = () => {

  }
  const goMessage = () => {

  }
  const goPersonalSpace = () => {

  }
</script>
