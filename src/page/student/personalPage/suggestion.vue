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
  height:600px;
}
.form{
  width: 90%;
  margin: 50px auto;
  justify-content: center;
}
.allFont{
  color: rgba(128, 128, 128, 0.8);
  font-style: italic;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 15px;
}
.returnButton{
  cursor: pointer;
  text-decoration: underline;
}
.returnButton:hover{
  color: #0675e3;
}
</style>

<template>
  <div class="background">
    <div class="content">
      <div class="allFont"><span @click="goPersonalSpace" class="returnButton" >返回个人空间</span>>建议箱</div>
      <a-form v-if="showForm" class="form" layout="vertical" :rules="rules" @submit-success="handleSubmit" :model="form">
        <a-form-item label="标题" field="title">
          <a-input v-model="form.title" size="large" placeholder="请输入标题"/>
        </a-form-item>
        <a-form-item label="建议内容" field="content">
          <a-textarea v-model="form.content" :auto-size="{ minRows: 10, maxRows: 15 }"  placeholder="请输入你的建议"/>
        </a-form-item>
        <a-form-item field="isanoymous">
          <a-checkbox v-model="form.isanonymous">
            匿名
          </a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
      <a-result v-if="showSuccess" status="success" title="建议提交成功！" >
        <template #extra>
          <a-space>
            <a-button type='primary' @click="goPersonalSpace">返回</a-button>
          </a-space>
        </template>
      </a-result>
    </div>
  </div>
</template>

<script setup lang="js">
  import { useRouter } from 'vue-router';
  import {reactive, ref} from "vue";
  import {message} from "ant-design-vue";
  import {sendSuggestion} from "@/services/user.js";

  const showForm=ref(true);
  const showSuccess=ref(false);
  const router = useRouter();
  const form=reactive({
    title:"",
    content:"",
    isanonymous:false
  });

  const rules = {
    title: [
      { required: true, message: "请输入标题" },
    ],
    content: [
      { required: true, message: "请输入建议"},
    ],
  };

  function handleSubmit(){
    sendSuggestion(form)
      .then((res)=>{
        if(res.status===200){
          success();
        }
      }).catch((err)=>{
        message.error("提交失败");
      });
  }

  const success=()=>{
    showForm.value=false;
    showSuccess.value=true;
  }
  const goPersonalSpace = () => {
    router.push("personalSpace");
  }
</script>