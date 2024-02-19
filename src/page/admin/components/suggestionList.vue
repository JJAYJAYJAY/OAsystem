<style scoped>

</style>

<template>
  <a-table :columns="columns" :data="suggestionList"  :pagination="{pageSize:11}">
    <template #showDetail="{ record }">
      <a-button @click="showSuggestionDetail(record)">查看详情</a-button>
    </template>
  </a-table>
</template>

<script setup lang="js">
import {defineProps, ref, onMounted} from 'vue'
import emitter from "@/utils/mitter.js";

const props = defineProps({
  suggestionList: {
    type: Array,
    required: true
  }
})

const columns = [
  {
    title:"发出人",
    dataIndex:"who",
    key:"who",
    align: "center"
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
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

const showSuggestionDetail = (record) => {
  emitter.emit('showSuggestionDetail',record);
}

</script>