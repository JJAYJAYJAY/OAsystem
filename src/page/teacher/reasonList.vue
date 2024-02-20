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
.button{
  float: right;

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
        <a-menu-item key="0">理由库</a-menu-item>
        <a-menu-item key="1">新增理由</a-menu-item>
      </a-menu>
      <a-list class="right" v-if="checkPage === 0">
        <template #header>
          可选理由
        </template>
        <a-list-item v-for="(item,index) in reasonList">
          {{index+1}} . {{item.content}}
          <a-button class="button" @click="deleteReason(item.content)"> 删除</a-button>
        </a-list-item>
      </a-list>
      <a-form
          v-if="checkPage === 1"
          :model="form"
          @submit="handleSubmit"
      >
        <a-form-item field="name" tooltip="请输入你新增的理由" label="理由">
          <a-input
              v-model="form.content"
              placeholder="请输入你新增的理由"
          />
          <a-button type="primary" html-type="submit">添加</a-button>
        </a-form-item>
      </a-form>
      <a-result v-if="checkPage === 2" status="success" title="添加成功！" >
        <template #extra>
          <a-space>
            <a-button type='primary' @click="goBack">返回</a-button>
          </a-space>
        </template>
      </a-result>
    </div>
  </div>
</template>

<script setup lang="js">
import {ref, onMounted, reactive} from "vue";
import {deleteReasonList, getReasonList, setNewReason} from "@/services/reasonList.js";
import useReasonListStore from "@/store/reasonListStore.js";
import {Message} from "@arco-design/web-vue";

const ReasonListStore = useReasonListStore();

const checkPage = ref(0);

const handleClick = (e) => {
  switch (e){
    case "0":
      checkPage.value = 0;
      getReason()
      break;
    case "1":
      checkPage.value = 1;
      break;
  }
}

//默认理由库 list 测试用，挂载阶段会自动更新成后端的理由库
const reasonList = ref([]);

//挂载阶段访问后端获取理由库 list
onMounted(() => {
  handleClick("0")
});

const form = reactive({
  content: ""
});

const handleSubmit = () => {
  setNewReason(form).then(res => {
    console.log(res);
  }).then(
    checkPage.value = 2
  )
}

const goBack = () => {
  checkPage.value = 1;
}

const getReason=()=>{
  getReasonList().then(res => {
    reasonList.value = res.data.reasons;
    //将获取到的理由库存入store
    ReasonListStore.setReason(reasonList.value);
  })
}

const deleteReason=(content)=>{
  deleteReasonList({
    content
  }).then(res=>{
    Message.success("删除成功")
    getReason()
  })
}
</script>