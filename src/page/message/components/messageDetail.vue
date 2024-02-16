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
              <a-col span="8">
                <a-card title="发出人">
                  <p>{{msg.from_user_name}}</p>
                </a-card>
              </a-col>
              <a-col span="8">
                <a-card title="接收人">
                  <p>{{msg.to_user_name}}</p>
                </a-card>
              </a-col>
              <a-col span="8">
                <a-card title="时间">
                  <p>{{msg.created_at}}</p>
                </a-card>
              </a-col>
            </a-row>
          <a-card title="内容" :style="{height:'450px'}">
            <a-scrollbar  style="white-space: pre-wrap; height: 380px;overflow: auto" >{{msg.content}}</a-scrollbar>
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
  msg: {
    type: Object
  }
})

const goBack = ()=>{
  emitter.emit('goBack')
}
</script>