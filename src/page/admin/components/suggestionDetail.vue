<style scoped>

</style>

<template>
  <div>
    <div>
      <a-button @click="goBack">返回</a-button>
    </div>
    <div>
      <a-layout>
        <a-layout-header>
          <h1>消息详情</h1>
        </a-layout-header>
        <a-layout-content>
          <a-row>
            <a-col span="12">
              <a-card title="发出人">
                <p>{{suggestion.who}}</p>
              </a-card>
            </a-col>
            <a-col span="12">
              <a-card title="时间">
                <p>{{suggestion.created_at}}</p>
              </a-card>
            </a-col>
          </a-row>
          <a-row>
            <a-col span="24">
              <a-card title="标题">
                <p>{{suggestion.title}}</p>
              </a-card>
            </a-col>
          </a-row>
          <a-card title="内容" :style="{height:'370px'}">
            <a-scrollbar  style="white-space: pre-wrap; height: 300px;overflow: auto" >{{suggestion.content}}</a-scrollbar>
          </a-card>
        </a-layout-content>
      </a-layout>
    </div>
  </div>
</template>

<script setup lang="js">
import {defineProps} from 'vue'
import emitter from "@/utils/mitter.js";

const props = defineProps({
  suggestion: {
    type: Object
  }
})

const goBack = ()=>{
  emitter.emit('goBackSuggestionList')
}
</script>