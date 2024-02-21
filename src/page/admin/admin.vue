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
        <a-menu-item key="0">建议箱</a-menu-item>
        <a-menu-item key="2">设置起止时间</a-menu-item>
        <a-menu-item key="3">开始第二轮随机匹配</a-menu-item>
      </a-menu>
      <suggestion-list class="right" v-if="showPage === 0" :suggestion-list="suggestionList"/>
      <suggestion-detail class="right" v-if="showPage === 1" :suggestion="detailSuggestion"/>
      <set-time class="right" v-if="showPage === 2"/>
      <rand-match class="right" v-if="showPage === 3"/>
    </div>
  </div>
</template>

<script setup lang="js">
import SuggestionDetail from "@/page/admin/components/suggestionDetail.vue";
import SuggestionList from "@/page/admin/components/suggestionList.vue";
import SetTime from "@/page/admin/components/setTime.vue";
import {onMounted, ref} from "vue";
import emitter from "@/utils/mitter.js";
import {getSuggestions} from "@/services/admin.js";
import RandMatch from "@/page/admin/components/randMatch.vue";

const showPage = ref(0);
const suggestionList = ref([]);
const detailSuggestion = ref({});

const handleClick = (e) => {
  switch (e){
    case "0":
      showPage.value = 0;
      getSuggestions().then(res => {
        suggestionList.value = res.data;
      })
      break;
    case "2":
      showPage.value = 2;
      break;
    case "3":
      showPage.value = 3;
      break;
  }
}

onMounted(()=>{
  handleClick("0")
})


emitter.on('showSuggestionDetail', (data) => {
  detailSuggestion.value = data;
  showPage.value = 1;
})
emitter.on('goBackSuggestionList',()=>{
  showPage.value = 0;
})
</script>