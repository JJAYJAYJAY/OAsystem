<style scoped>
  li{
    height: 70px;
    line-height: 70px;
    font-size: larger;
    cursor: pointer;
  }
  li:before{
    content: "";
    display: block;
    position: relative;
    top:calc( 100% - 10px );
    left: calc( 50% - 40%);
    border-radius: 5px;
    width: 80%;
    height: 7px;
    background-color: #389663;
    opacity: 0;
    transition: 0.2s ease-in-out;
  }
  .liSelect:before{
    opacity: 1;
  }
</style>

<template>
  <li @click="selectLi" :class="{ 'liSelect': selected }">{{ itemName }}</li>
</template>

<script setup lang="js">
  import {ref,defineEmits} from "vue";
  import emitter from "@/components/utils/mitter.js";
  const props = defineProps({
    itemName: String
  })
  let selected = ref(false);
  emitter.on('menuCancelSelect', () => {
    selected.value = false;
  });
  const cancel = () => {
    selected.value = false;
  };
  const selectLi = () => {
    emitter.emit('menuCancelSelect');
    selected.value = true;
  };
</script>