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
</style>

<template>
  <li>
    <span>{{title}}</span>
    <span v-if="haveChoosed">{{teacher}}</span>
    <span v-else>
      <a-select allow-clear allow-search>
        <a-option v-for="(teacher,index) in teachers" :key="index">{{teacher}}</a-option>
      </a-select>
    </span>
    <span v-if="haveSend">已发送</span>
    <span v-else><img src="/public/img/火箭.png" class="footerImg"></span>
    <span>{{selectStatus}}</span>
  </li>
</template>

<script setup lang="js">
  import {defineProps} from "vue";
  import useTeacherStore from "@/store/teacherstore.js";
  import {getTeacherList} from "@/services/user.js";

  const teachers=[]
  const props = defineProps({
    title: String,
    selectStatus: String,
    haveChoosed: Boolean,
    teacher: String,
    haveSend: Boolean
  })
  const teacherStore = useTeacherStore();
  getTeacherList({
    start:0,
    end:teacherStore.teacherInfo.total
  }).then((res)=>{
    for(let i=0;i<res.data.total;i++){
      teachers.push(res.data.teachers[i].name);
    }
    teachers.sort()
  })

</script>