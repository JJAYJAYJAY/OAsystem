<template>
  <a-form ref="formRef" :model="form"   :style="{width:'600px'}" @submit-success="handleSubmit">
    <a-form-item field="first" label="第一轮次">
      <a-range-picker show-time v-model="form[0].range"
                      :time-picker-props="{defaultValue:['00:00:00','00:00:00']}"
      />
    </a-form-item>
    <a-form-item field="second" :rules="rules" label="第二轮次">
      <a-range-picker show-time v-model="form[1].range"
                      :time-picker-props="{defaultValue:['00:00:00','00:00:00']}"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button html-type="submit">修改</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="js">
import { reactive } from 'vue';
import {setStartEndDate} from "@/services/admin.js";

const form = reactive([
  {
    turn: 1,
    range: '',
  },
  {
    turn: 2,
    range: '',
  }
]);

const rules = [
  {
    validator: (value, cb) => {
      console.log(form[0].range[1],form[1].range[0])
      let date1 = new Date(form[0].range[1])
      let date2 = new Date(form[1].range[0])
      console.log(date1,date2)
      if (date1 <= date2) {
        cb()
      } else {
        cb('第二轮次开始时间必须晚于第一轮次结束时间')
      }
    }
  }
];

const handleSubmit = () => {
  let sendForm=[
    {
      turn: 1,
      start_datetime: form[0].range[0],
      end_datetime: form[0].range[1]
    },
    {
      turn: 2,
      start_datetime: form[1].range[0],
      end_datetime: form[1].range[1]
    }
  ]
  setStartEndDate(sendForm).then(res=>{
    console.log(res)
  })
};
</script>
