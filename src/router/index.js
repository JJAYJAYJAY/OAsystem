import {createRouter, createWebHistory} from 'vue-router'
import login from "@/components/login/login.vue";
import home from "@/components/page/home.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: login},
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