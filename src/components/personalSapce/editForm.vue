<style scoped>
.editForm{
  margin: 0 auto;
  width: 600px;
  background: #ffffff;
  display: block;
  padding: 10px 20px;
  border-radius: 10px;
}
.form-title{
  width: 100%;
  text-align: center;
  font-size: xx-large;
  font-weight: bold;
  margin-bottom: 20px;
}

.buttonDiv *{
  width: 80px;
  height: 40px;
  font-size: medium;
  margin-left: 50px;
}
</style>

<template>
  <a-form class="editForm" :rules="rules" :model="form" @submit-success="handleSubmit" @submit-failed="this.$message.error('修改失败')">
    <div class="form-title">修改信息</div>
    <a-form-item field="phone_number" label="联系方式" validate-trigger="blur">
      <a-input v-model="form.phone_number" plac eholder="请输入手机号" />
    </a-form-item>
    <a-form-item field="email" label="邮箱" validate-trigger="blur">
      <a-input v-model="form.email" placeholder="请输入邮箱" />
    </a-form-item>
    <a-form-item field="political_status" label="政治面貌" required>
      <a-select v-model="form.political_status" placeholder="请选择政治面貌" allow-clear>
        <a-option value="群众">群众</a-option>
        <a-option value="团员">团员</a-option>
        <a-option value="党员">党员</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="home_address" label="家庭住址" required>
      <a-input v-model="form.home_address"  placeholder="请输入家庭住址"/>
    </a-form-item>
    <a-form-item field="interesting" label="兴趣爱好" required>
      <a-input v-model="form.interesting"  placeholder="请输入兴趣爱好"/>
    </a-form-item>
    <a-form-item field="employment_intention" label="职业方向" required>
      <a-input v-model="form.employment_intention"  placeholder="请输入职业方向" />
    </a-form-item>
    <a-form-item field="project_experience" label="项目经验">
      <a-textarea v-model="form.project_experience" placeholder="请输入项目经历" style="height: 100px;"></a-textarea>
    </a-form-item>
    <a-form-item field="honors" label="个人荣誉">
      <a-textarea v-model="form.honors"  placeholder="请输入个人荣誉" style="height: 100px;resize: none"/>
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
    phone_number: personalSpaceStore.studentInfo.phone,
    class_room: personalSpaceStore.studentInfo.classes,
    email: personalSpaceStore.studentInfo.email,
    political_status: personalSpaceStore.studentInfo.politicalStatus,
    home_address: personalSpaceStore.studentInfo.home,
    interesting: personalSpaceStore.studentInfo.interesting,
    employment_intention: personalSpaceStore.studentInfo.careerDirection,
    project_experience: personalSpaceStore.studentInfo.projectExperience,
    honors: personalSpaceStore.studentInfo.honors
  })
  const rules={
    phone_number:[
      {required:true,message:'请输入手机号'},
      {
        validator:(value,callback)=>{
          if(/^1[3-9]\d{9}$/.test(value)){
            callback();
          }else{
            callback('请输入正确的手机号');
          }
        }
      }
    ],
    email:[
      {required:true,message:'请输入邮箱'},
      {
        validator:(value,callback)=>{
          if(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)){
            callback();
          }else{
            callback('请输入正确的邮箱');
          }
        }
      }
    ],
    political_status:[
      {required:true,message:'请选择政治面貌'},
      {match:/群众|团员|党员/,message:'请选择政治面貌'}
    ],
    home_address:[
      {required:true,message:'请输入家庭住址'}
    ],
    interesting:[
      {required:true,message:'请输入兴趣爱好'}
    ],
    employment_intention:[
      {required:true,message:'请输入职业方向'}
    ]
  }
  const close = ()=>{
    emitter.emit("closeEditForm");
  }
  function handleSubmit(){
    changeUserInfo(form).then(res=>{
      if(res.status === 200){
        getUserInfo().then(res=>{
          personalSpaceStore.setPersonalSpaceStudentInfoFromRes(res)
        })
        Message.success("修改成功")
        close();
      }
    })
  }
</script>