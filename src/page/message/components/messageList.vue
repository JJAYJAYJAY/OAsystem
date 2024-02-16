<style scoped>

</style>

<template>
  <a-table :columns="columns" :data="messageList"  :pagination="{pageSize:11}">
    <template #showDetail="{ record }">
      <a-button @click="showDetail(record)">查看详情</a-button>
    </template>
  </a-table>
</template>

<script setup lang="js">
  import {defineProps, ref, onMounted} from 'vue'
  import emitter from "@/utils/mitter.js";

  const props = defineProps({
    messageList: {
      type: Array,
      default: []
    }
  })

  const columns = [
    {
      title:"发出人",
      dataIndex:"from_user_name",
      key:"from_user_name",
      align: "center"
    },
    {
      title: "接收人",
      dataIndex: "to_user_name",
      key: "to_user_name",
      align: "center"
    },
    {
      title: "时间",
      dataIndex: "created_at",
      key: "created_at",
      align: "center"
    },
    {
      title: "查看详情",
      align: "center",
      slotName: "showDetail",
    }
  ];

  const showDetail = (record) => {
    emitter.emit('showDetail',record);
  }

</script>