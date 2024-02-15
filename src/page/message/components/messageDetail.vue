<style scoped>

</style>

<template>
  <div>
    <div>
      <a-button @click="goBack">返回</a-button>
    </div>
    <div>
      {{ msg }}
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