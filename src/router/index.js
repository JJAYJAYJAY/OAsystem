import {createRouter, createWebHistory} from 'vue-router'
import login from "@/components/login/login.vue";
import studentPersonalSpace from "@/page/student/personalPage/personalSpace.vue";
import studentInfo from "@/page/student/information/info.vue";
import message from "@/page/student/message/message.vue";
import method from "@/page/student/information/method.vue";
import teacherList from "@/page/student/information/teacherList.vue";
import infohome from "@/page/student/information/infohome.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: login
        },
        {
            name: 'studentPersonalSpace',
            path: '/StudentPersonalSpace',
            component: studentPersonalSpace,
        },
        {
            name:'studentInfo',
            path: '/studentInfo',
            component: studentInfo,
            children: [
                {
                    path: 'home',
                    component: infohome
                },
                {
                    path: 'teacherList',
                    component: teacherList
                },
                {
                    path: 'method',
                    component: method
                }
            ]
        },
        {
            path: '/message',
            component: message
        }
    ]
})

export default router;