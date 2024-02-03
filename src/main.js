import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import 'vant/lib/index.css'
import pinia from "@/store/index.js";
import { Button } from 'vant';

const app=createApp(App)

app.use(Button)
app.use(router)
app.use(pinia)
app.mount('#app')

