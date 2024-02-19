<style scoped>
.background{
  background-color: rgb(241,238,225);
  display: flex;
  justify-content: center;
  padding: 100px 0;
}
.content{
  width: 70%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  height: 1300px;
}
</style>

<template>
  <div class="background">
    <div class="content">
      <a-button @click="goBack">返回</a-button>
      <a-form v-if="checkPage===0" :model="form" layout="vertical" :rules="rules" @submit-success="handleSubmit">
        <a-typography-title style="text-align: center" :heading="3">计算机学院本科学生导师双向选择表</a-typography-title>
        <a-row>
          <a-col :span="8">
            <a-form-item label="姓名">
              <a-input disabled v-model="personalSpaceStore.personalSpaceInfo.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="学号">
              <a-input v-model="personalSpaceStore.studentInfo.studentNumber" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="联系电话">
              <a-input v-model="personalSpaceStore.studentInfo.phone" disabled></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item field="position" label="学生任职">
              <a-input v-model="form.position"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="score" label="绩点" >
              <a-input  v-model="form.score"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="rank" label="绩点排名" >
              <a-input v-model="form.rank" :max="1000" :min="0" :precision="0" ></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item field="math_score1" label="第一学期高数成绩">
              <a-input :precision="0" :step="1" :max="100" :min="0" v-model="form.math_score1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="math_score2" label="第二学期高数成绩">
              <a-input :precision="0" :step="1" :max="100" :min="0" v-model="form.math_score2"></a-input>
            </a-form-item>
          </a-col>
          </a-row>
          <a-row>
          <a-col :span="12">
            <a-form-item field="c_score1" label="第一学期c语言成绩">
              <a-input :precision="0" :step="1" :max="100" :min="0" v-model="form.c_score1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="c_score2" label="第二学期c语言成绩">
              <a-input :precision="0" :step="1" :max="100" :min="0" v-model="form.c_score2"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item field="self_introduction" label="个人情况简介">
          <a-textarea v-model="form.self_introduction" style="height: 300px"></a-textarea>
        </a-form-item>
        <a-row>
          <a-col :span="12">
            <a-form-item label="老师姓名">
              <a-input v-model="form.teacher_name" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item field="isok" label="是否跟导师达成意向">
              <a-radio-group v-model="form.isok" >
                <a-radio :value="true" :default-checked="true">是</a-radio>
                <a-radio :value="false">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="学生电子签名">
          <a-upload
              list-type="picture"
              :action="action"
              :default-file-list="studentSign"
              :limit="1"
              :headers="{ Authorization: 'Bearer ' + loginStore.loginSession.userToken }"
          />
        </a-form-item>
        <a-form-item label="老师电子签名">
        <a-image :src="teacherSign" :width="400" :height="200"></a-image>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
      <a-result v-if="checkPage===1" status="success" title="发送成功！" style="height: 100%">
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
import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import usePersonalSpaceStore from "@/store/personalSpaceStore.js";
import {sendTwoWayTable, sendSign, getUserInfo, getSign} from "@/services/user.js";
import useLoginStore from "@/store/loginStore.js";

const personalSpaceStore = usePersonalSpaceStore();
const action = sendSign;
const loginStore = useLoginStore();

const studentSign =reactive([]);
const teacherSign = ref();

const router = useRouter()
const selectionId = router.currentRoute.value.query.selectionId;
const checkPage = ref(0)
const form=reactive({
  teacher_name: router.currentRoute.value.query.teacherName,
  score:'',
  phone_number: personalSpaceStore.studentInfo.phone,
  position: '',
  rank:'',
  math_score1: '',
  math_score2: '',
  c_score1: '',
  c_score2: '',
  self_introduction: '',
  isok: true,
  selection_id: Number(selectionId),
})
const rules={
  position: [
    { required: true, message: '请输入学生任职', trigger: 'blur' }
  ],
  score: [
    {
      required: true,
      message: '请输入绩点',
      trigger: 'blur',
    },
    {
      validator:(value,cb)=>{
        if(isNaN(value) || (value.length > 1 && /^0/.test(value))){
          cb('请输入正确的数字')
        }else {
          if(!checkNumber(5,0,value)){
            cb('绩点范围在0到5')
          }else {
            cb()
          }
        }
      }
    }
  ],
  rank: [
    { required: true, message: '请输入绩点排名', trigger: 'blur' },
    {
      validator:(value,cb)=>{
        if(isNaN(value) || (value.length > 1 && /^0/.test(value))){
          cb('请输入正确的数字')
        }else {
          cb()
        }
      }
    }
  ],
  math_score1: [
    { required: true, message: '请输入第一学期高数成绩', trigger: 'blur' },
    {
      validator:(value,cb)=>{
        if(isNaN(value) || (value.length > 1 && /^0/.test(value))){
          cb('请输入正确的数字')
        }else {
          if(!checkNumber(100,0,value)){
            cb('成绩范围在0到100')
          }else {
            cb()
          }
        }
      }
    }
  ],
  math_score2: [
    { required: true, message: '请输入第二学期高数成绩', trigger: 'blur' },
    {
      validator:(value,cb)=>{
        if(isNaN(value)){
          cb('请输入正确的数字')
        }else {
          if(isNaN(value) || (value.length > 1 && /^0/.test(value))){
            cb('成绩范围在0到100')
          }else {
            cb()
          }
        }
      }
    }
  ],
  c_score1: [
    { required: true, message: '请输入第一学期c语言成绩', trigger: 'blur' },
    {
      validator:(value,cb)=>{
        if(isNaN(value) || (value.length > 1 && /^0/.test(value))){
          cb('请输入正确的数字')
        }else {
          if(!checkNumber(100,0,value)){
            cb('成绩范围在0到100')
          }else {
            cb()
          }
        }
      }
    }
  ],
  c_score2: [
    { required: true, message: '请输入第二学期c语言成绩', trigger: 'blur' },
    {
      validator:(value,cb)=>{
        if(isNaN(value) || (value.length > 1 && /^0/.test(value))){
          cb('请输入正确的数字')
        }else {
          if(!checkNumber(100,0,value)){
            cb('成绩范围在0到100')
          }else {
            cb()
          }
        }
      }
    }
  ],
  self_introduction: [
    { required: true, message: '请输入个人情况简介', trigger: 'blur' }
  ]
}

onMounted(()=>{
  getSign({
    selection_id: selectionId
  }).then(res=>{
    teacherSign.value = "data:image/gif;base64,"+res.data.teachersign
  })
})
const checkNumber=(max,min,value)=>{
  if(value>max||value<min){
    return false
  }
  return true
}

const goBack = ()=>{
  router.push("selectTeacher")
}

const handleSubmit = ()=>{
  sendTwoWayTable({
    selection_id: form.selection_id,
    position: form.position,
    score: Number(form.score),
    rank: Number(form.rank),
    math_score1: Number(form.math_score1),
    math_score2: Number(form.math_score2),
    c_score1: Number(form.c_score1),
    c_score2: Number(form.c_score2),
    self_introduction: form.self_introduction,
    isok: form.isok

  }).then(res=>{
    checkPage.value=1
  })
}

</script>