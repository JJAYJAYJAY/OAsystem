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
  width: 70%;
}
</style>

<template>
  <div class="background">
    <div class="content">
      <a-menu
          :style="{height: '100%',width:'30%' }"
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
import {getMyMessageList, getToMeMessageList} from "@/services/user.js";
import emitter from "@/utils/mitter.js";


const messagelist = ref(true);
const showdetail = ref(false);
const shownew = ref(false);
const messageList =ref([])
const detailMessage = ref({})

onMounted(()=>{
  handleMyMessageClick()
})

const handleClick = (e) => {
  switch (e) {
    case "0":
      openSection("list")
      handleMyMessageClick()
      console.log("我发出的");
      break;
    case "1":
      openSection("list")
      handleToMeMessageClick()
      console.log("我收到的");
      break;
    case "2":
      openSection('new')
      console.log("新邮件");
      break;
  }
}

const handleMyMessageClick =()=>{
  getMyMessageList().then((res)=>{
    messageList.value = res.data.message;
  })
}

const handleToMeMessageClick =()=>{
  getToMeMessageList().then((res)=>{
    messageList.value = res.data.message;
  })
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