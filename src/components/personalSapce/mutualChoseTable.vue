<style scoped>
*{
  padding: 0;
  margin: 0;
}

li{
  list-style-type: none;
}

.allFont{
  color: rgba(128, 128, 128, 0.8);
  font-style: italic;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 15px;
}

.bottomFont{
  color: rgba(128, 128, 128, 0.8);
}
.out {
  width: 800px;
  height: 800px;
  padding: 5px;
  position: absolute;
  margin-top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.inner{
  border-radius: 8px;
  background-color: #fff;
  width: 800px;
  height: 600px;
  position: absolute;
  margin-top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

ul {
  background-color: rgb(241,238,225);
  width: 800px;
  margin: auto;
  padding: 0;
  list-style: none;
}

ul li {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
}

ul li span {
  font-weight: 500;
  flex-basis: 25%; /* 平均分配每个span的宽度 */
  height: 50px;
  text-align: center;
  line-height: 50px; /* 设置与容器高度相同的line-height，实现垂直居中 */
}

.innerFooter {
  border-top:2px solid rgba(128, 128, 128, 0.8);
  border-bottom:2px solid rgba(128, 128, 128, 0.8);
  width: 800px;
  height: 130px;
  position: absolute;
  bottom: 30px; /* 设置距离 .inner 下边界50px */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.innerItem{
  display: flex;
  position: relative;
  top: 20px;
  justify-content: space-between;
}
.footerImg{
  width: 35px;
  height: 35px;
}
.footerItem{
  height: 35px;
  display: flex;
}
.footerItem span{
  height: 35px;
  line-height: 35px;
}
.returnButton{
  cursor: pointer;
  text-decoration: underline;
}
.returnButton:hover{
  color: #0675e3;
}
</style>
<template>
  <div class="outerBox">
    <div class="out">
      <div class="allFont"><span @click="goPersonalSpace" class="returnButton">返回个人空间</span>>导师选择</div>
      <div class="inner">
        <a-col :flex="1">
          <a-countdown
              :title="title"
              :value="now + lastTime"
              :now="now"
              format="D 天 H 时 m 分 s 秒"
          />
        </a-col>
        <ul>
          <li>
            <span></span>
            <span>选择导师</span>
            <span>
              发送
            </span>
            <span>详情</span>
          </li>
          <select-item v-for="(selection) in selections" :selection="selection" :key="selection_id"/>
        </ul>
      </div>
      <div class="innerFooter">
        <div class="allFont">双向选择流程</div>
        <div class="innerItem">
          <span class="footerItem">
            <img src="/public/img/stuStart.png"  class="footerImg firstImgChange">
            <span class="bottomFont">学生发起</span>
          </span>
          <span class="footerItem">
            <img src="/public/img/teacherStart.png" class="footerImg">
            <span class="bottomFont">老师审核</span>
          </span>
          <span class="footerItem">
            <img src="/public/img/Table.png" class="footerImg">
            <span class="bottomFont">学生填表</span>
          </span>
          <span class="footerItem">
            <img src="/public/img/regulatorStart.png" class="footerImg">
            <span class="bottomFont">管理员审核</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="js">
import { useRouter } from "vue-router";
import {onMounted, ref, watch} from "vue";
import SelectItem from "@/components/personalSapce/mutualChoseItem.vue";
import {getSelect} from "@/services/user.js";
import emitter from "@/utils/mitter.js";

const lastTime = ref();
const now= Date.now();
const turns = ref(1);
const title = ref();
const selections= ref([]);

const teacher = ref("张三");
const router = useRouter();
const goPersonalSpace = () => {
  router.push("personalSpace");
};

onMounted(() => {
   getSelectList()
});

const getSelectList=()=>{
  selections.value=[];
  getSelect().then(res => {
    let data=res.data;
    selections.value = data.selections;
    if(calcTime(data.start_time,data.end_time,data.turns)){
      if (selections.value.length===0){
        createNewSelection();
      }
      selections.value.sort((a,b)=>{
        return a.selection_id-b.selection_id;
      })
      if(selections.value[selections.value.length-1].status===2){
        createNewSelection()
      }
    }
  })
}

emitter.on("getSelectList",getSelectList)

const calcTime=(start_time,end_time,turn)=>{
  let endDate=new Date(end_time);
  let startDate=new Date(start_time);
  if(now < startDate) {
    lastTime.value = startDate - now;
    title.value = "距离第"+turn+"轮选择开始还有";
    lastTime.value = startDate - now;
    turns.value = turn;
    return false;
  }
  else if(endDate < now){
    lastTime.value = 0;
    title.value = "第"+turn+"轮选择已结束";
    return false;
  }else {
    lastTime.value = endDate - now;
    turns.value = turn;
    title.value = "距离第"+turn+"轮选择结束还有";
    return true;
  }
}

const createNewSelection=()=>{
  selections.value.push({
    turns: turns.value,
    status: 6,
    student_name: "",
    teacher_name: "",
    selection_id: 0
  })
}
</script>