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
        <!-- 时间用v-bind?反正我这里先写死了，你们后面再改 -->
        <div class="allFont">还有{{lastTime}},抓紧选择你心仪的导师吧!</div>
        <ul>
          <li>
            <span></span>
            <span>选择导师</span>
            <span>
              发送
            </span>
            <span>详情</span>
          </li>
          <select-item title="第一轮选择" :teacher="teacher" have-send select-status="未发送"/>
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
import {ref} from "vue";
import SelectItem from "@/components/personalSapce/mutualChoseItem.vue";

const lastTime = ref("10天10小时10分钟");
const teacher = ref("张三");
const router = useRouter();
const goPersonalSpace = () => {
  router.push("personalSpace");
};
</script>