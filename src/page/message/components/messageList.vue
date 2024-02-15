<style scoped>

</style>

<template>
  <a-table :columns="columns" :data="messageList"  :pagination="{pageSize:13}">
    <template #showDetail="{ record }">
      <a-button @click="showDetail(record)">查看详情</a-button>
    </template>
  </a-table>
</template>

<script setup lang="js">
  import {defineProps, ref, onMounted} from 'vue'
  import {getMessageDetail} from "@/services/user.js";
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
      dataIndex:"from",
      key:"from",
      align: "center"
    },
    {
      title: "接收人",
      dataIndex: "to",
      key: "to",
      align: "center"
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      align: "center"
    },
    {
      title: "查看详情",
      align: "center",
      slotName: "showDetail",
    }
  ];

  const showDetail = (record) => {
    getMessageDetail({
      message_id: record.message_id
    }).then((res) => {
      emitter.emit('showDetail', res.data.message);
    })
  }

</script>