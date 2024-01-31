import {createRouter, createWebHistory} from 'vue-router'
import login from "@/components/login/login.vue";
import home from "@/components/page/home.vue";
import personalSpace from "@/components/mainContent/personalSpace.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: login
        },
        {
            name: 'home',
            path: '/home',
            component: home,
            //编写子路由
            children:[
                {
                    path:'personalSpace',
                    component: personalSpace
                }
            ]
        }

    ]
})

export default router;