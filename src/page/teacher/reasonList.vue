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
        <a-menu-item @click="clickMenu(0)" key="0">理由库</a-menu-item>
        <a-menu-item @click="clickMenu(1)" key="1">新增理由</a-menu-item>
        <a-menu-item @click="clickMenu(2)" key="2">修改密码</a-menu-item>
      </a-menu>
      <a-list class="right" v-if="checkPage === 0">
        <template #header>
          可选理由
        </template>
        <a-list-item v-for="(item,index) in reasonList">{{index+1}} . {{item.content}}</a-list-item>
      </a-list>

      <a-form
          v-if="checkPage === 1"
          :model="form"
          @submit="handleSubmit"
      >
        <a-form-item field="name" tooltip="请输入你新增的理由" label="理由">
          <a-input
              v-model="form.reason"
              placeholder="请输入你新增的理由"
          />
          <a-button type="primary" html-type="submit" @click="handleSubmit">提交</a-button>
        </a-form-item>
      </a-form>

<!--      /* 修改密码 你来写 用 v-if="checkPage === 2"来切换*/  -->
    </div>
  </div>

</template>

<script setup lang="js">
import { ref,onMounted } from "vue";
import {getReasonList, setNewReason} from "@/services/reasonList.js";

const checkPage = ref(0);

const clickMenu = (index) => {
  checkPage.value = index;
}

const reasonList = ref([
  {
    content: "请假"
  },
  {
    content: "病假"
  },
  {
    content: "事假"
  }
]);

//挂载阶段访问后端获取理由库 list
onMounted(() => {
  getReasonList().then(res => {
    reasonList.value = res.data.reasons;
  })
});

const form = ref({
  reason: ""
});

const handleSubmit = () => {
  const data = {
    content: form.value.reason
  };
  setNewReason(data).then(res => {
    console.log(res);
  })
}
</script>