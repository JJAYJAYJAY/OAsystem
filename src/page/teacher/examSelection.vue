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
  height: 900px;
  display: flex;
}
</style>

<template>
  <div class="background">
    <div class="content">
      <div style="width: 100%">
        <a-space direction="vertical" style="width: 100%" v-if="checkPage===0">
          <a-countdown
              :title="title"
              :value="now + lastTime"
              :now="now"
              format="D 天 H 时 m 分 s 秒"
          />
          <a-row>
            <a-button type="primary"  @click="handleSetTimeButton">设置审批时间</a-button>
            <a-time-picker type="time-range" v-if="showSetTime" v-model="timeRange"></a-time-picker>
            <a-button  v-if="showSetTime" @click="handleSetTime" type="primary">设置</a-button>
          </a-row>
          <a-row>
            <a-button type="primary" v-if="!bulkOperation" @click="changeRowSelection">开启批量操作</a-button>
            <a-row v-else :gutter="100">
              <a-col :span="4">
                <a-button  @click="changeRowSelection">关闭批量操作</a-button>
              </a-col>
              <a-col :span="12">
                <a-form-item label="选择理由">
                  <a-select style="width: 300px" allow-create v-model="reason" >
                    <a-option v-for="(reason) in reasonList" :value="reason.content">{{reason.content}}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="4">
                <a-button  v-if="bulkOperation" :disabled="buttonsDisabled" type="primary" status="danger" @click="handleExam(false)">批量拒绝</a-button>
              </a-col>
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
              <a-col :span="4">
                <a-button  v-if="bulkOperation" :disabled="buttonsDisabled" type="primary" status="success" @click="handleExam(true)">批量通过</a-button>
              </a-col>
            </a-row>
          </a-row>
          <a-table style="width: 100%;"
                   :columns="columns"
                   :data="selectionList"
                   :row-selection="rowSelection"
                   row-key="selection_id"
                   :pagination="{pageSize:11}"
                   v-model:selectedKeys="selectedKeys"
          >
            <template #studentInfo="{record}">
              <a-button type="primary" @click="showStudentInfo(record)">查看学生信息</a-button>
            </template>
            <template #withdraw="{record}">
              <a-button
                  type="primary"
                  status="danger"
                  @click="withdraw(record)"
                  :disabled="buttonsDisabled || record.status!=='通过老师审批' && record.status!=='未通过老师审批'"
              >
                撤回
              </a-button>
            </template>
          </a-table>
        </a-space>
        <student-info :selection="detailStudentInfo" v-if="checkPage===1" :disabled="buttonsDisabled"/>
        <a-result v-if="checkPage===2" status="success" title="审批成功！" >
          <template #extra>
            <a-space>
              <a-button type='primary' @click="emitter.emit('goBackSelection')">返回</a-button>
            </a-space>
          </template>
        </a-result>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import {onMounted, reactive, ref, watch} from 'vue';
import {getSelect} from "@/services/user.js";
import {getReasonList} from "@/services/reasonList.js";
import {examSelection, setExamTime, withdrawExam} from "@/services/examSelection.js";
import {Message} from "@arco-design/web-vue";
import StudentInfo from "@/page/teacher/studentInfo.vue";
import emitter from "@/utils/mitter.js";
import useReasonListStore from "@/store/reasonListStore.js";
import {sendSign} from "@/services/user.js";
import useLoginStore from "@/store/loginStore.js";

const loginStore=useLoginStore()
const action = sendSign;
const reasonListStore=useReasonListStore()
const selectionList = ref([]);
const rowSelection = ref(null);
const bulkOperation = ref(false);

const selectedKeys = ref([]);
const changeRowSelection = () => {
  bulkOperation.value = !bulkOperation.value;
  if(rowSelection.value!==null) {
    rowSelection.value = null;
  }
  else {
    rowSelection.value = {
      type: 'checkbox',
      showCheckedAll: true,
      onlyCurrent: false,
    };
  }
};

const columns = [
  {
    title: '学生姓名',
    dataIndex: 'student_name',
    width: '300',
  },
  {
    title: '选择状态',
    dataIndex: 'status',
    width: '400',
  },
  {
    title: '查看学生信息',
    slotName: 'studentInfo',
  },
  {
    title: '撤回',
    slotName: 'withdraw',
  }
];

const init=()=>{
  selectedKeys.value=[]
  getSelect().then(res=>{
    selectionList.value = res.data.selections;
    calcTime(res.data.start_time,res.data.end_time,res.data.turns);
  })
  getReason()
}

onMounted(()=>{
  init()
  watch(selectionList,()=>{
    for (let i = 0; i < selectionList.value.length; i++) {
      switch (selectionList.value[i].status) {
        case 0:
          selectionList.value[i].status = '等待老师审批';
          break;
        case 1:
          selectionList.value[i].status = '通过老师审批';
          selectionList.value[i].disabled = true;
          break;
        case 2:
          selectionList.value[i].status = '未通过老师审批';
          selectionList.value[i].disabled = true;
          break;
        case 3:
          selectionList.value[i].status = '等待管理员审批';
          break;
        case 4:
          selectionList.value[i].status = '通过管理员审批';
          break;
        case 5:
          selectionList.value[i].status = '未通过管理员审批';
          break;
        default:
          break;
      }
    }
  })
})

const reasonList=ref([])
const getReason=()=>{
  getReasonList().then(res => {
    reasonList.value = res.data.reasons;
    reasonListStore.setReason(reasonList.value)
  })
}

const withdraw=(record)=>{
  withdrawExam({
    selection_id:record.selection_id
  }).then(res=>{
    getSelect().then(res=>{
      selectionList.value = res.data.selections;
    })
    Message.success("撤回成功")
  })
}

const lastTime = ref();
const now= Date.now();
const turns = ref(1);
const title = ref();
const buttonsDisabled = ref(false);

const calcTime=(start_time,end_time,turn)=>{
  let endDate=new Date(end_time);
  let startDate=new Date(start_time);
  if(now < startDate) {
    lastTime.value = startDate - now;
    title.value = "距离第"+turn+"轮选择开始还有";
    lastTime.value = startDate - now;
    turns.value = turn;
    buttonsDisabled.value = true
  }
  else if(endDate < now){
    lastTime.value = 0;
    title.value = "第"+turn+"轮选择已结束";
    buttonsDisabled.value = true
  }else {
    lastTime.value = endDate - now;
    turns.value = turn;
    title.value = "距离第"+turn+"轮选择结束还有";
  }
}
const detailStudentInfo=ref({})
const checkPage=ref(0)
const showStudentInfo=(record)=>{
  detailStudentInfo.value = record;
  checkPage.value = 1;
}
emitter.on('goBackSelection',()=>{
  checkPage.value = 0;
})
emitter.on('handleSuccess',()=>{
  checkPage.value = 2;
  init()
})

const handleExam=(ispass)=>{
  if (selectedKeys.value.length===0){
    Message.info("请选择要操作的项")
    return
  }
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
    reason:reason.value?reason.value:"",
    ispass:ispass,
    selection_id:selectedKeys.value
  }).then(()=>{
        init()
        emitter.emit('handleSuccess')
  }
  ).catch((res)=>{
    Message.error(res.data.error)
  })
}
const reason=ref()
const signSuccess=ref(false)
const handleSuccess=()=>{
  signSuccess.value=true
}

const showSetTime=ref(false)
const timeRange=ref([])
const handleSetTimeButton=()=>{
  showSetTime.value=!showSetTime.value
}
const handleSetTime=()=>{
  if(timeRange.value.length===0){
    Message.info("请选择时间")
    return
  }
  setExamTime({
    start_time:timeRange.value[0],
    end_time:timeRange.value[1]
  }).then(res=>{
    Message.success("设置成功")
    init()
  })
}
</script>