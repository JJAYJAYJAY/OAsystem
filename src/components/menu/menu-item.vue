<style scoped>
  li{
    height: 70px;
    line-height: 70px;
    font-size: larger;
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

<script>
  import {ref} from "vue";
  import emitter from "@/components/utils/mitter.js";
  export default {
    setup() {
      let selected = ref(false);

      emitter.on('cancelSelect', () => {
        selected.value = false;
      });

      const selectLi = () => {
        emitter.emit('cancelSelect');
        selected.value = true;
      };

      return {
        selected,
        selectLi
      };
    },
    props:['itemName']
  }
</script>