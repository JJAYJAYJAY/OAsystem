<style scoped>

</style>

<template>
  <a-space direction="vertical">
      <a-button @click="handleSecond">开始二次匹配</a-button>
      <a-button @click="handleSubmit">发送该次结果</a-button>
      <a-typography-title :heading="4" >二次匹配结果预览</a-typography-title>
      <a-table :columns="columns" :data="secondMatchPreview"  :pagination="{pageSize:11}"></a-table>
  </a-space>
</template>

<script setup lang="js">
import {ref} from "vue";
import {getUnmatched, setMatchedData} from "@/services/admin.js";
import {Message} from "@arco-design/web-vue";
import {getSelect} from "@/services/user.js";


const columns = [
  {
    title:"学生姓名",
    dataIndex:"studentName",
    key:"studentName",
    align: "center"
  },
  {
    title: "老师姓名",
    dataIndex: "teacherName",
    key: "teacherName",
    align: "center"
  }
];
const secondMatchPreview=ref([])
const result=ref([])
const handleSecond = () => {
  secondMatchPreview.value = [];
  getSelect().then(res => {
    if(res.data.turns !== 2){
      Message.info("第一轮选择还未结束")
    }else {
      getUnmatched().then(res => {
        if(res.data.students.length === 0){
          Message.info("没有未匹配的学生")
        }else{
          let students = res.data.students;
          let teachers = res.data.teachers;
          teachers = shuffle(teachers);
          // 将学生分配给教师
          for (let i = 0; i < students.length; i++) {
            let student = students[i];
            let teacher
            let x=i;
            while(true){
              teacher = teachers[x % teachers.length];// 如果学生比教师多，使用模运算在教师数组中循环
              if(teacher[2]>=6){
                x++
              }else{
                teacher[2]+=1;
                break
              }
            }
            secondMatchPreview.value.push(
                {
                  studentName:student[1],
                  teacherName:teacher[1]
                }
            );
            result.value.push(
                {
                  student:student,
                  teacher:[teacher[0],teacher[1]]
                }
            )
          }
        }
      })
    }
  })
}


// Fisher-Yates（也称为 Knuth）洗牌
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const handleSubmit = () => {
  if(result.value.length === 0){
    Message.info("请先进行二次匹配")
  }else{
    setMatchedData(result.value).then(res => {
      Message.success("发送成功")
    })
  }
}
</script>