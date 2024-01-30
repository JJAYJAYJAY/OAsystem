import {createRouter, createWebHistory} from 'vue-router'
import app from "@/App.vue";
import home from "@/components/page/home.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: app},
        {
            path: '/home',
            component: home,
            //编写子路由
            children:[

            ]
        }

    ]
})

export default router;