<style scoped>
li {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
}
li span {
  font-weight: 500;
  flex-basis: 25%; /* 平均分配每个span的宽度 */
  height: 50px;
  text-align: center;
  line-height: 50px; /* 设置与容器高度相同的line-height，实现垂直居中 */
}
.footerImg{
  width: 35px;
  height: 35px;
  cursor: pointer;
}
a{
  cursor: pointer;
  text-decoration: underline;
}
</style>

<template>
  <li>
    <span>第{{turn}}轮选择</span>
    <span v-if="teacherName !=='' && teacherName !== undefined">{{teacherName}}</span>
    <span v-else>
      <a-select allow-clear allow-search v-model="teacherUserId">
        <a-option v-for="(teacher,index) in teachers" :key="index" :value="teacher.user_id">{{teacher.name}}</a-option>
      </a-select>
    </span>
    <span v-if="teacherName !== undefined && teacherName !=='' ">已发送</span>
    <span v-else><img @click="handleSend" src="/public/img/火箭.png" class="footerImg"></span>
    <span v-if="status===0">等待老师审批</span>
    <a @click="goTwowayTable" v-else-if="status===1">通过老师审批，请填双向选择表</a>
    <span v-else-if="status===2">未通过老师审批</span>
    <span v-else-if="status===3">等待管理员审批</span>
    <span v-else-if="status===4">通过管理员审批</span>
    <span v-else-if="status===5">未通过管理员审批</span>
    <span v-else>未发送</span>
  </li>
</template>

<script setup lang="js">
  import {defineProps, ref} from "vue";
  import useTeacherStore from "@/store/teacherstore.js";
  import {getTeacherList, getValidTeacher, sendStudentInfo} from "@/services/user.js";
  import {useRouter} from "vue-router";
  import {Message} from "@arco-design/web-vue";
  import emitter from "@/utils/mitter.js";

  const router = useRouter()
  const turn=ref()
  const status=ref()
  const teachers=ref([])
  const teacherName=ref()
  const StudentName=ref()
  const selectionId=ref()
  const teacherUserId=ref()
  const props = defineProps({
    selection:{
      type: Object,
      required: true
    },
    haveSend:{
      type: Boolean,
      default: true
    }
  })

  turn.value=props.selection.turns
  status.value=props.selection.status
  teacherName.value=props.selection.teacher_name
  StudentName.value=props.selection.student_name
  selectionId.value=props.selection.selection_id

  getValidTeacher().then((res)=>{
    teachers.value=res.data
  })

  const handleSend=()=>{
    if (teacherUserId.value===undefined){
      Message.info("请选择老师")
      return
    }
    sendStudentInfo({
      teacher_id:teacherUserId.value
    }).then(()=>{
          Message.success("发送成功")
          emitter.emit("getSelect")
        }
    )
  }

  const goTwowayTable=()=>{
    router.push({
      name: 'twoWayTable',
      query: {
        selectionId: selectionId.value,
        teacherName: teacherName.value,
      }
    })
  }
</script>