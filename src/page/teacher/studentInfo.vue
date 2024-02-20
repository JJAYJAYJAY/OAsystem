<style scoped>

</style>

<template>
<div>
  <a-space direction="vertical" style="width: 100%">
    <a-button @click="goBack">返回</a-button>
    <a-row :gutter="80">
      <a-col :span="16">
        <a-descriptions :data="studentData" size="middle" title="学生详细信息" bordered layout="inline-vertical"/>
      </a-col>
     <a-col :span="7">
       <a-image :src="studentImg" width="100%"> </a-image>
     </a-col>
    </a-row>
    <a-card title="个人荣誉" style="height: 200px">
      <a-scrollbar style="height: 130px">
        {{ honor }}
      </a-scrollbar>
    </a-card>
    <a-card title="项目经历" style="height: 200px">
      <a-scrollbar style="height: 130px">
        {{projectExperience}}
      </a-scrollbar>
    </a-card>
    <a-row :gutter="40">
      <a-col :span="16">
        <a-form-item label="通过前请先上传电子签名">
          <a-upload
              :action="action"
              :limit="1"
              :headers="{ Authorization: 'Bearer ' + loginStore.loginSession.userToken }"
              @success="handleSuccess"
          >
          </a-upload>
        </a-form-item>
      </a-col>
      <a-col :span="4" >
        <a-button status="success" @click="handleExam(true)" :disabled="buttonsDisabled">通过</a-button>
      </a-col>
    </a-row>
    <a-row :gutter="40">
      <a-col :span="16">
        <a-form-item label="输入理由">
          <a-select allow-create v-model="reason">
            <a-option v-for="(reason) in reasonListStore.reason" :value="reason.content">{{reason.content}}</a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="2" >
        <a-button status="danger" @click="handleExam(false)" :disabled="buttonsDisabled">拒绝</a-button>
      </a-col>
    </a-row>
  </a-space>
</div>
</template>

<script setup lang="js">

import emitter from "@/utils/mitter.js";
import {onMounted, ref} from "vue";
import {examSelection, getStudentInfo} from "@/services/examSekection.js";
import useReasonListStore from "@/store/reasonListStore.js";
import {sendSign} from "@/services/user.js";
import useLoginStore from "@/store/loginStore.js";
import {Message} from "@arco-design/web-vue";

const loginStore=useLoginStore()
const reasonListStore=useReasonListStore()
const reason=ref()

const signSuccess=ref(false)
const handleSuccess=()=>{
  signSuccess.value=true
}

const props = defineProps({
  selection: {
    type: Object
  },
  disabled: {
    type: Boolean
  }
})

const buttonsDisabled = ref(props.disabled);

const action=sendSign

const goBack = ()=>{
  emitter.emit('goBackSelection')
}

const studentImg=ref()
const studentData=ref([])
const honor=ref()
const projectExperience=ref()

onMounted(()=>{
  getStudentInfo({
    selection_id:props.selection.selection_id
  }).then((res)=>{
    let student=res.data.Student
    studentData.value=[
      {
        label:"学生姓名",
        value:student.name
      },
      {
        label: "学号",
        value: student.student_id
      },
      {
        label:"班级",
        value: student.class_room
      },
      {
        label: "手机号",
        value: student.phone_number
      },
      {
        label: "政治面貌",
        value: student.political_status
      },
      {
        label: "邮箱",
        value: student.email
      },
      {
        label:"家庭住址",
        value: student.home_address
      },
      {
        label:"个人兴趣",
        value: student.interesting
      },
      {
        label: "就业意向",
        value: student.employment_intention
      }
    ]
    studentImg.value=student.image
    honor.value=student.honors
    projectExperience.value=student.project_experience
  })
})


const handleExam=(ispass)=>{
  if (ispass){
    //检测是否上传文件了
    if(!signSuccess.value){
      Message.info("请先上传电子签名")
      return;
    }
  }else {
    if(!reason.value){
      Message.info("请填写拒绝理由")
      return
    }
  }
  examSelection({
    reason:reason.value,
    ispass:ispass,
    selection_id:[props.selection.selection_id]
  }).then(
      emitter.emit('handleSuccess')
  )
}
</script>