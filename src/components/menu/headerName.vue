<style scoped>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  .mine{
    display: flex;
    flex-direction: row-reverse;
    line-height: 70px;
    gap: 15px;
  }
  .img-div{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin: 5px 0;
  }
  .img-div img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
</style>

<template>
  <div class="mine">
    <div>
      <span>{{ userName }}</span>
    </div>
    <div class="img-div">
      <img :src="userImg" alt=""/>
    </div>
  </div>
</template>

<script>
  export default {
    props:['userName','userImg']
  }
</script>