<style scoped>

</style>

<template>
  <a-form class="editForm" :rules="rules" :model="form" @submit-success="handleSubmit" @submit-failed="this.$message.error('修改失败')">
    <div class="form-title">修改密码</div>
    <a-form-item field="phone_number" label="联系方式" validate-trigger="blur">
      <a-input v-model="form.old" plac eholder="请输入手机号" />
    </a-form-item>
    <a-form-item field="email" label="邮箱" validate-trigger="blur">
      <a-input v-model="form.email" placeholder="请输入邮箱" />
    </a-form-item>
    <a-form-item field="home_address" label="家庭住址" required>
      <a-input v-model="form.home_address"  placeholder="请输入家庭住址"/>
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
import {reactive, getCurrentInstance, ref} from "vue";
import {Message} from "@arco-design/web-vue";
import usePersonalSpaceStore from "@/store/personalSpaceStore.js";
import emitter from "@/utils/mitter.js";
import {changeUserInfo,getUserInfo} from "@/services/user.js";

const personalSpaceStore = usePersonalSpaceStore();
const form  = reactive({
  name: personalSpaceStore.personalSpaceInfo.name,
  phone_number: personalSpaceStore.personalSpaceInfo.phone,
  class_room: personalSpaceStore.personalSpaceInfo.classes,
  email: personalSpaceStore.personalSpaceInfo.email,
  political_status: personalSpaceStore.personalSpaceInfo.politicalStatus,
  home_address: personalSpaceStore.personalSpaceInfo.home,
  interesting: personalSpaceStore.personalSpaceInfo.interesting,
  employment_intention: personalSpaceStore.personalSpaceInfo.careerDirection,
  project_experience: personalSpaceStore.personalSpaceInfo.projectExperience,
  honors: personalSpaceStore.personalSpaceInfo.honors
})
const rules={

}

const close = ()=>{

}
function handleSubmit(){
  changeUserInfo(form).then(res=>{
    if(res.status === 200){
      Message.success("修改成功")
      close();
    }
  }).catch(err=>{
    Message.error(err.data.error)
  })
}
</script>