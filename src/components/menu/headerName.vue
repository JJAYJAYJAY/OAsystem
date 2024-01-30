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
    top:60px;
    line-height: normal;
    padding: 5px;
    font-size: x-small;
    z-index: 1;
    display: none;
  }
  .quit:hover{
    cursor: pointer;
    background: #464646;
    color: #dcdcdc;
  }
</style>

<template>
  <div class="mine">
    <div  @mouseenter="showWindow" @mouseleave="hideWindow">
      <span>{{ userName }}</span>
      <span ref="quitButton" class="quit" @click="logOut">退出登录</span>
    </div>
    <div class="img-div">
      <img :src="userImg" alt=""/>
    </div>
  </div>

</template>

<script>
import {getCurrentInstance} from "vue";
  export default {
    setup(){
      const page=getCurrentInstance()
      const showWindow = () => {
        page.refs.quitButton.style.display = 'inline';
      }
      const hideWindow = () => {
        page.refs.quitButton.style.display = 'none';
      }

      //TODO:退出登录需要完善
      const logOut= () =>{

      }
      return {
        showWindow,
        hideWindow,
        logOut
      }
    },
    props:['userName','userImg']
  }
</script>