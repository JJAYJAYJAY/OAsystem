import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import 'vant/lib/index.css'
import pinia from "@/store/index.js";
import { Button, Overlay } from 'vant';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

const app=createApp(App)

app.use(Button).use(Overlay).use(ArcoVue)
app.use(router)
app.use(pinia)
app.mount('#app')

