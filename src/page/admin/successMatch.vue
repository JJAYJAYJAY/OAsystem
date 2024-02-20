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
  height: 600px;
  display: flex;
}
</style>

<template>
  <div class="background">
    <div class="content">
      <div style="width: 100%">
          <a-table style="width: 100%;"
                   :columns="columns"
                   :data="selectionList"
                   :row-selection="rowSelection"
                   row-key="selection_id"
                   :pagination="{pageSize:11}"
                   v-model:selectedKeys="selectedKeys"
          >
          </a-table>
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
    title: '老师姓名',
    dataIndex: 'teacher_name',
    width: '300',
  },
  {
    title: '选择状态',
    dataIndex: 'status',
    width: '300',
  }
];

const init=()=>{
  getSelect().then(res=>{
    for (const selection of res.data.selections) {
      if(selection.status===4){
        selection.status = '配对成功';
        selectionList.value.push(selection)
      }
    }
  })
}

onMounted(()=>{
  init()
})

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
</script>