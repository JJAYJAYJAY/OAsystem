<style scoped>
.returnButton{
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
  width: 70px;
}
.content{
  width: 90%;
  margin:0 auto;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
}
</style>

<template>
  <div>
    <a-button type="primary" class="returnButton"  @click="returnInfoHome">返回</a-button>
    <h1 style="text-align: center">德育导师名单</h1>
  </div>
  <div class="content">
    <a-table :columns="columns" :data="teacherList"  :pagination="{pageSize:13}"></a-table>
  </div>
</template>

<script setup lang="js">
import {useRouter} from "vue-router";
import {getTeacherList} from "@/services/user.js";
import useTeacherStore from "@/store/teacherstore.js";
import {Teacher} from "@/store/teacherstore.js";
import {onMounted, ref} from "vue";

const teacherList = ref([]);
const teacherStore = useTeacherStore();

onMounted(() => {
  getTeacherList({
    start: 0,
    end:teacherStore.teacherInfo.total
  })
  .then((res) => {
    for (const t of res.data.teachers) {
      let teacher = new Teacher(t.user_id, t.name, t.department, t.office, t.phone_number, t.email);
      teacherList.value.push(teacher)
    }
    teacherStore.setTeacherInfo(res.data.total, teacherList.value);
  });
});
console.log(teacherList.value);
const columns = [
  {
    title: "姓名",
    dataIndex: "teacherName",
    key: "teacherName",
    width: 50,
    align: "center"
  },
  {
    title: "新部门或研究所",
    dataIndex: "department",
    key: "department",
    width: 100,
    align: "center"
  },
  {
    title: "办公室",
    dataIndex: "office",
    key: "office",
    width: 100,
    align: "center"
  },
  {
    title: "办公电话",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 100,
    align: "center"
  },
  {
    title: "电子邮箱",
    dataIndex: "email",
    key: "email",
    width: 100,
    align: "center"
  }
];
const router = useRouter();
const returnInfoHome = () => {
  router.push("infohome");
};
</script>