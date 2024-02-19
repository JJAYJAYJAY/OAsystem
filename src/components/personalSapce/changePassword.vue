<style scoped>
.Form{
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.form-title{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
.buttonDiv *{
  margin-left: 40px;
}
</style>

<template>
  <a-form class="Form" :rules="rules" :model="form" @submit-success="handleSubmit" @submit-failed="this.$message.error('修改失败')">
    <div class="form-title">修改密码</div>
    <a-form-item field="old_password" label="旧密码" validate-trigger="blur">
      <a-input-password v-model="form.old_password" placeholder="请输入旧密码" />
    </a-form-item>
    <a-form-item field="new_password" label="新密码" validate-trigger="blur">
      <a-input-password v-model="form.new_password" placeholder="请输入新密码" />
    </a-form-item>
    <a-form-item field="new_password_confirm" label="确认密码" required>
      <a-input-password v-model="form.new_password_confirm"  placeholder="请确认新密码"/>
    </a-form-item>
    <a-form-item>
      <a-space class="buttonDiv">
        <a-button type="primary" shape="round" html-type="submit">提交</a-button>
        <a-button type="primary" shape="round" @click="close()">关闭</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="js">
import {reactive} from "vue";
import {Message} from "@arco-design/web-vue";

import emitter from "@/utils/mitter.js";
import {changePassword} from "@/services/user.js";

const form  = reactive({
  old_password: "",
  new_password: "",
  new_password_confirm: ""
})
const rules = {
  old_password: [
    {
      required: true,
      message:'请输入旧密码',
    },
  ],
  new_password: [
    {
      required: true,
      message:'请输入新密码',
    },
  ],
  new_password_confirm: [
    {
      required: true,
      message:'请再次输入密码',
    },
    {
      validator: (value, cb) => {
        if (value !== form.new_password) {
          cb('两次输入的密码不一致')
        } else {
          cb()
        }
      }
    }
  ]
}

const close = ()=>{
  emitter.emit('closeChangePassword');
}
function handleSubmit(){
  changePassword(form).then(res=>{
    if(res.status === 200){
      Message.success("修改成功")
      close();
    }
  }).catch(()=>{
    Message.error("旧密码错误")
  })
}
</script>