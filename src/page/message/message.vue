<style scoped>
.background{
  min-height: 90vh;
  margin: 10px;
  background: #eef8f2;
  display: flex;
  justify-content: center;
  padding: 100px 0;
}
.content{
  width: 70%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  height: 700px;
  display: flex;
}
.right{
  width: 80%;
}
</style>

<template>
  <div class="background">
    <div class="content">
      <a-menu
          :style="{height: '100%',width:'20%' }"
          :default-selected-keys="['0']"
          @menu-item-click="handleClick"
      >
        <a-menu-item key="0">我发出的</a-menu-item>
        <a-menu-item key="1">我收到的</a-menu-item>
        <a-menu-item key="2">新邮件</a-menu-item>
      </a-menu>
      <message-list class="right" v-if="messagelist" :message-list="messageList"/>
      <message-detail class="right" v-if="showdetail" :msg="detailMessage"/>
      <new-message class="right" v-if="shownew"/>
    </div>
  </div>

</template>

<script setup lang="js">
import MessageList from "@/page/message/components/messageList.vue";
import MessageDetail from "@/page/message/components/messageDetail.vue";
import NewMessage from "@/page/message/components/newMessage.vue";
import { ref,onMounted } from "vue";
import usePersonalSpaceStore from "@/store/personalSpaceStore.js";

import emitter from "@/utils/mitter.js";
import {getMessages} from "@/services/user.js";

const personalSpaceStore = usePersonalSpaceStore();
const messagelist = ref(true);
const showdetail = ref(false);
const shownew = ref(false);
const messageList =ref([])
const detailMessage = ref({})



const handleClick = (e) => {
  switch (e) {
    case "0":
      openSection("list")
      handleMessageClick(false)
      console.log("我发出的");
      break;
    case "1":
      openSection("list")
      handleMessageClick(true)
      console.log("我收到的");
      break;
    case "2":
      openSection('new')
      console.log("新邮件");
      break;
  }
}

onMounted(()=>{
    handleClick("0")
})

const handleMessageClick =(isToMe)=>{
  messageList.value=[]
  getMessages().then(
    (res)=>{
      let myName=personalSpaceStore.personalSpaceInfo.name
      for(const message of res.data){
        if(isToMe && myName === message.to_user_name){
          messageList.value.push(message)
        }
        else if(!isToMe && myName === message.from_user_name) {
          messageList.value.push(message)
        }
      }
    }
  )
}



const openSection = (section) => {
  messagelist.value = section === 'list';
  showdetail.value = section === 'detail';
  shownew.value = section === 'new';
}

emitter.on('showDetail',(message)=>{
  openSection('detail');
  detailMessage.value=message
  console.log(message);
})

emitter.on('goBack',()=>{
  openSection('list');
})
</script>