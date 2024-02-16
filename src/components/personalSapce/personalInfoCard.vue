<style scoped>
.personalInfoBackground{
  height: 250px;
  width: 200px;
  background: #fcfcfd;
  border-radius: 10px;
  box-shadow: 0 15px 20px 0 #868686;
}
.nameImgDiv{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
.classIdDiv{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 10px;
}
.classIdDivItem{
  display: flex;
  align-items: start;
}
</style>

<template>
  <div class="personalInfoBackground">
    <div class="nameImgDiv">
      <div class="img-div">
        <a-space direction="vertical" :style="{ width: '100%' }">
          <a-upload
              :action="action"
              :headers="{ Authorization: 'Bearer ' + loginStore.loginSession.userToken }"
              :fileList="file ? [file] : []"
              :show-file-list="false"
              @change="onChange"
              @progress="onProgress"
              @success="onSuccess"
          >
            <template #upload-button>
              <div
                  :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
              >
                <div
                    class="arco-upload-list-picture custom-upload-avatar"
                    v-if="file && file.url"
                >
                  <img :src="file.url"/>
                  <div class="arco-upload-list-picture-mask">
                    <IconEdit />
                  </div>
                  <a-progress
                      v-if="file.status === 'uploading' && file.percent < 100"
                      :percent="file.percent"
                      type="circle"
                      size="mini"
                  />
                </div>
                <div class="arco-upload-picture-card" v-else>
                  <div class="arco-upload-picture-card-text">
                    <IconPlus />
                    <div style="margin-top: 10px; font-weight: 600">Upload</div>
                  </div>
                </div>
              </div>
            </template>
          </a-upload>
        </a-space>
      </div>
      <div>
        <span>{{ personalSpaceStore.personalSpaceInfo.name }}</span>
      </div>
    </div>
    <div style="text-align: center;color: #a1a1a1;user-select: none">
      ——————————
    </div>
    <div class="classIdDiv">
      <div class="classIdDivItem"><span style="width: 25%">学号：</span><span style="width:75%; text-align: center;font-size: small;white-space: pre-wrap;height: 25px">{{personalSpaceStore.studentInfo.studentNumber}}</span></div>
      <div class="classIdDivItem"><span style="width: 25%">班级：</span><span style="width:75%; text-align: center;font-size: small;white-space: pre-wrap;height: 40px">{{personalSpaceStore.studentInfo.classes}}</span></div>
    </div>
  </div>
</template>

<script setup lang="js">
  import usePersonalSpaceStore from "@/store/personalSpaceStore.js";
  import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';
  import {onMounted, ref, watch} from 'vue';
  import {getUserInfo} from "@/services/user.js";
  import {changeImgAction} from "@/services/user.js";
  import useLoginStore from "@/store/LoginStore.js";
  import {Message} from "@arco-design/web-vue";

  const loginStore = useLoginStore();
  const personalSpaceStore = usePersonalSpaceStore();

  const  action = changeImgAction;
  const file = ref({});
  file.value = {
    url: personalSpaceStore.personalSpaceInfo.userImg,
  }
  onMounted(()=>{
    watch(()=>personalSpaceStore.personalSpaceInfo.userImg,()=> {
      file.value = {
        url: personalSpaceStore.personalSpaceInfo.userImg,
      }
    })
  })
  const onChange = (_, currentFile) => {
    file.value = {
      ...currentFile,
    };
  };
  const onProgress = (currentFile) => {
      file.value = currentFile;
  };
  const onSuccess=()=>{
    getUserInfo().then((res)=>{
      personalSpaceStore.setPersonalSpaceStudentInfoFromRes(res)
    })
    Message.success("修改成功");
  }
</script>