<style scoped>

</style>

<template>

  <div>
    <a-form v-if="showForm" class="form" layout="vertical" :rules="rules" @submit-success="handleSubmit" :model="form">
      <a-form-item label="接收方" field="target">
        <a-select style="width: 100%;" allow-search v-model="form.target">
          <a-option v-for="(user,index) in userList" :key="index"  :value="user.user_id">{{user.username}}</a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="邮件内容" field="content">
        <a-textarea v-model="form.content" :auto-size="{ minRows: 10, maxRows: 15 }"  placeholder="请输入你的建议"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">发送</a-button>
      </a-form-item>
    </a-form>
    <a-result v-if="showSuccess" status="success" title="发送成功！" >
      <template #extra>
        <a-space>
          <a-button type='primary' @click="goBack">返回</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="js">

import {onMounted, reactive, ref} from "vue";
import useTeacherStore, {Teacher} from "@/store/teacherstore.js";
import {getTeacherList, sendMessage} from "@/services/user.js";
import {getUserList} from "@/services/message.js";


const teacherStore = useTeacherStore();
const userList = ref([]);
const showForm=ref(true);
const showSuccess=ref(false);

const form=reactive({
  target:"",
  content:"",
});

const rules = {
  target: [
    { required: true, message: "请选择接受方" },
  ],
  content: [
    { required: true, message: "请输入内容"},
  ],
};

const handleSubmit=()=>{
  sendMessage(form).then(()=>{
    showForm.value=false;
    showSuccess.value=true;
  })
}

onMounted(() => {
  getUserList().then((res) => {
    userList.value = res.data;
    userList.value.sort((a, b) => {
      return a.username.localeCompare(b.username);
    });
  });
});

const goBack=()=>{
  showForm.value=true;
  showSuccess.value=false;
}
</script>