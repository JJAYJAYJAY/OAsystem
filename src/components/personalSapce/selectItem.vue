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
      <a-select allow-clear>
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
  const props = defineProps({
    title: String,
    selectStatus: String,
    haveChoosed: Boolean,
    teacher: String,
    haveSend: Boolean
  })
  const teachers = ["张三","李四","王五","赵六","田七","周八","吴九","郑十","孙十一","杨十二","陈十三","周十四","吴十五","郑十六","孙十七","杨十八","陈十九","周二十","吴二十一","郑二十二","孙二十三","杨二十四","陈二十五","周二十六","吴二十七","郑二十八","孙二十九","杨三十","陈三十一","周三十二","吴三十三","郑三十四","孙三十五","杨三十六","陈三十七","周三十八","吴三十九","郑四十","孙四十一","杨四十二","陈四十三","周四十四","吴四十五","郑四十六","孙四十七","杨四十八","陈四十九","周五十","吴五十一","郑五十二","孙五十三","杨五十四","陈五十五","周五十六","吴五十七","郑五十八","孙五十九","杨六十","陈六十一","周六十二","吴六十三","郑六十四","孙六十五","杨六十六","陈六十七","周六十八","吴六十九","郑七十","孙七十一","杨七十二","陈七十三","周七十四","吴七十五","郑七十六","孙七十七","杨七十八","陈七十九","周八十","吴八十一","郑八十二","孙八十三","杨八十四","陈八十五","周八十六","吴八十七","郑八十八"]
</script>