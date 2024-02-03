<style scoped>
  p{
    font-style: italic;
    font-weight: 700;
  }

  .out {
    height: 250px;
    width: 450px;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .out span {
    width: 200px;
    height: 225px;
    background-color: #e2f6e9;
    border-radius: 5px;
    position: relative;
  }

  .content {
    text-align: center;
  }

  .content p {
    margin-bottom: 10px;
  }

  .content img {
    display: block;
    margin: 0 auto;
    border-radius: 50%;
  }

  .gap{
    margin-top: 25px;
  }

  .goPanelImg{
    width: 80px;
    height: 80px;
    object-fit: cover;
    overflow: hidden;
  }

</style>

<template>
    <div class="out">
      <span>
        <div class="content">
          <div class="gap">
            <img src="/public/img/TutorPicture.png" class="goPanelImg">
          </div>
          <p class="gap">导师选择</p>
          <div class="gap">
            <go-button @click="goSelectTeacher" style="margin: auto"/>
          </div>
        </div>
      </span>
      <span>
        <div class="content">
          <div class="gap">
            <img src="/public/img/SuggestionBox.png" class="goPanelImg">
          </div>
          <p class="gap">建议箱</p>
          <div class="gap">
            <go-button @click="goSuggestion" style="margin: auto"/>
          </div>
        </div>
      </span>
    </div>
</template>
<script setup lang="js">
  import GoButton from "@/components/personalSapce/goButton.vue";
  import {useRouter} from "vue-router";
  const router = useRouter();

  function goSelectTeacher() {
    router.push("selectTeacher");
  }
  function goSuggestion() {
    router.push("suggestion");
  }
</script>