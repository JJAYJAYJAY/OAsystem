<style scoped>

</style>

<template>
  <div>
    <a-space direction="vertical" style="width: 100%">
      <a-button @click="goBack">返回</a-button>
      <a-descriptions :data="table" size="middle" title="学生详细信息" bordered/>
      <a-card title="个人情况简介" style="height: 300px;">
        <a-scrollbar style="white-space: pre-wrap;height: 230px;overflow: auto" >
          {{selfIntroduction}}
        </a-scrollbar>
      </a-card>
      <a-row>
        <a-col :span="12">
          <a-card title="老师姓名">
            {{teacherName}}
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="是否跟老师达成意愿">
            {{isOk?"是":"否"}}
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-card title="学生签名">
            <a-image :src="studentSign" alt="学生签名" :height="100"></a-image>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="老师签名">
            <a-image :src="teacherSign" alt="老师签名" :height="100"></a-image>
          </a-card>
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
        <a-col :span="4" >
          <a-button status="success" @click="handleExam(true)" :disabled="buttonsDisabled">通过</a-button>
        </a-col>
      </a-row>
    </a-space>
  </div>
</template>

<script setup lang="js">

import emitter from "@/utils/mitter.js";
import {onMounted, ref} from "vue";
import {getTwoWayTable} from "@/services/admin.js";
import {getSign} from "@/services/user.js";
import useReasonListStore from "@/store/reasonListStore.js";
import {Message} from "@arco-design/web-vue";
import {examSelection} from "@/services/examSelection.js";


const props = defineProps({
 selection: Object,
});

const reasonListStore=useReasonListStore()
const reason=ref()
const handleExam=(ispass)=>{
  if (ispass){
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

const studentSign=ref()
const teacherSign=ref()
const table=ref([])
const selfIntroduction=ref("")
const teacherName=ref("")
const isOk=ref(false)

onMounted(()=>{
  getTwoWayTable(
    {
      selection_id:props.selection.selection_id
    }
  ).then((res)=>{
    table.value=[
      {
        label:"学生姓名",
        value:res.data.student_name
      },
      {
        label:"学生绩点",
        value:res.data.score
      },
      {
        label:"绩点排名",
        value:res.data.rank
      },
      {
        label:"学生手机",
        value:res.data.phone_number
      },
      {
        label:"学生任职",
        value:res.data.position
      },
      {
        label:"第一学期高数成绩",
        value:res.data.math_score1
      },
      {
        label:"第二学期高数成绩",
        value:res.data.math_score2
      },
      {
        label:"第一学期C语言成绩",
        value:res.data.c_score1
      },
      {
        label:"第二学期C语言成绩",
        value:res.data.c_score2
      }
    ]
    selfIntroduction.value=res.data.self_introduce
    teacherName.value=res.data.teacher_name
    isOk.value=res.data.isok
  })
  getSign({
    selection_id:props.selection.selection_id
  }).then((res)=>{
    studentSign.value="data:image/gif;base64,"+res.data.studentsign
    teacherSign.value="data:image/gif;base64,"+res.data.teachersign
  })
})


const goBack = () => {
  emitter.emit('goBackSelection');
}
</script>