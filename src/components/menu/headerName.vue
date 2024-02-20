<style scoped>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  .mine{
    display: flex;
    flex-direction: row-reverse;
    line-height: 70px;
    gap: 15px;
    padding-top: 10px;
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
  .quit{
    background: #dcdcdc;
    color: #464646;
    position: absolute;
    right: 30px;
    top:80px;
    line-height: normal;
    padding: 5px;
    font-size: x-small;
    z-index: 1;
    display: none;
  }
  .quit:hover, .changePassword:hover{
    cursor: pointer;
    background: #464646;
    color: #dcdcdc;
  }
  .changePassword{
    background: #dcdcdc;
    color: #464646;
    position: absolute;
    right: 30px;
    top:60px;
    line-height: normal;
    padding: 5px;
    font-size: x-small;
    z-index: 1;
    display: none;
  }
  .overlay{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<template>
  <div class="mine">
    <div  @mouseenter="showWindow" @mouseleave="hideWindow">
      <span>{{ personalSpaceStore.personalSpaceInfo.name }}</span>
      <span ref="quitButton" class="quit" @click="logOut">退出登录</span>
      <span ref="changePassword" class="changePassword" @click="openChangPassword">修改密码</span>
    </div>
    <div class="img-div">
      <img :src="personalSpaceStore.personalSpaceInfo.userImg" alt="加载失败"/>
    </div>
    <van-overlay :show="showChangePassword" class="overlay">
      <change-password/>
    </van-overlay>
  </div>
</template>

<script setup lang="js">
  import {getCurrentInstance,watch,ref,onMounted} from "vue";
  import {useRouter} from "vue-router";
  import useLoginStore from "@/store/loginStore.js";
  import usePersonalSpaceStore from "@/store/personalSpaceStore.js";
  import emitter from "@/utils/mitter.js";
  import ChangePassword from "@/components/personalSapce/changePassword.vue";

  const personalSpaceStore = usePersonalSpaceStore();

  const page=getCurrentInstance()

  const showWindow = () => {
    page.refs.quitButton.style.display = 'inline';
    page.refs.changePassword.style.display = 'inline';
  }
  const hideWindow = () => {
    page.refs.quitButton.style.display = 'none';
    page.refs.changePassword.style.display = 'none';
  }

  const router = useRouter();
  const logOut= () =>{
    router.push('/');
    useLoginStore().setLogin(false,'');
  }
  const openChangPassword = () => {
    emitter.emit('openChangePassword');
  }

  const showChangePassword = ref(false);
  emitter.on('closeChangePassword',()=>{
    showChangePassword.value = false;
  })
  emitter.on('openChangePassword',()=>{
    showChangePassword.value = true;
  })
</script>