<style scoped>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  .menu-title{
    width: 30%;
    font-size: xx-large;
    font-weight: bold;
    height: 70px;
    line-height: 70px;
  }
  .header-menu{
    display: flex;
    width: 100%;
    padding:0 40px;
  }
  .item-menu{
    margin-left: 20%;
    list-style: none;
    display: flex;
    width: 50%;
    justify-content: space-around;
  }
  .mine{
    width: 20%;
  }
</style>
<template>
  <div class="header-menu">
    <div class="menu-title">德育导师双向选择系统</div>
    <ol class="item-menu">
      <slot></slot>
    </ol>
    <header-name class="mine"/>
  </div>
</template>

<script setup lang="js">
  import HeaderName from "@/components/menu/headerName.vue"
</script>
