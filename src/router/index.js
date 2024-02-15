import {createRouter, createWebHistory} from 'vue-router'
import login from "@/components/login/login.vue";
import studentPersonalSpace from "@/page/student/personalPage/personalSpace.vue";
import message from "@/page/message/message.vue";
import method from "@/page/student/information/method.vue";
import teacherList from "@/page/student/information/teacherList.vue";
import infohome from "@/page/student/information/infohome.vue";
import studentApp from "@/page/student/studentApp.vue";
import selectTeacher from "@/page/student/personalPage/selectTeacher.vue";
import suggestion from "@/page/student/personalPage/suggestion.vue";
import newMessage from "@/page/message/components/newMessage.vue";
import messageDetail from "@/page/message/components/messageDetail.vue"


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: login
        },
        {
            path: '/studentApp',
            component: studentApp,
            children: [
                {
                    name: 'PersonalSpace',
                    path: 'PersonalSpace',
                    component: studentPersonalSpace,
                },
                {
                    path: 'infoHome',
                    component: infohome
                },
                {
                    path: 'teacherList',
                    component: teacherList
                },
                {
                    path: 'method',
                    component: method
                },
                {
                    path: 'message',
                    component: message,
                },
                {
                    path: 'selectTeacher',
                    component: selectTeacher
                },
                {
                    path: 'suggestion',
                    component: suggestion
                }
            ]
        },

    ],
    scrollBehavior (to, from, savedPosition) {
        return { top: 0 }
    }
})

export default router;