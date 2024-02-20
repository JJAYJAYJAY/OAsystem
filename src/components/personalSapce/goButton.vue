<style scoped>
.button-div{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
}
.go-button{
  width: 35px;
  height: 35px;
  background: #000000;
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0 10px #ccc;
}
.go-button .button-content{
  cursor: pointer;
  opacity: 0;
  user-select: none;
  color: #fff;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
}
.go-button::before {
  color: #ffffff;
  content: '';
  position: absolute;
  right: 14px;
  width: 10px;
  height: 10px;
  border-top: 3px solid #ffffff;
  border-right: 3px solid #ffffff;
  transform: rotate(45deg);
  transition: all 0.2s ease-in-out;
}

.go-button:hover {
  width: 100%;
  transition: width 0.2s 0.2s ease-in-out;
}

.go-button:hover::before {
  right: -10px;
  transition: all 0.2s ease-in-out;
}

.go-button:hover .button-content {
  opacity: 1;
  transition: opacity 0.2s 0.25s ease-in-out;
}
</style>

<template>
  <div class="button-div">
      <span class="go-button">
          <span class="button-content">GO！</span>
      </span>
  </div>
</template>

<script setup lang="js">

</script>