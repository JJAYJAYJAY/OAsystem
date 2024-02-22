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
import teacherApp from "@/page/teacher/teacherApp.vue";
import reasonList from "@/page/teacher/reasonList.vue";
import adminApp from "@/page/admin/adminApp.vue";
import admin from "@/page/admin/admin.vue";
import twoWayTable from "@/page/student/personalPage/twoWayTable.vue";
import examSelection from "@/page/teacher/examSelection.vue";
import successMatch from "@/page/admin/successMatch.vue";
import adminExamSelection from "@/page/admin/adminExamSelection.vue";

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
                },
                {
                    name: 'twoWayTable',
                    path: 'twoWayTable',
                    component: twoWayTable
                }
            ]
        },
        {
            path:'/teacherApp',
            component: teacherApp,
            children:[
                {
                    path: 'message',
                    component: message,
                },
                {
                    path: 'reason',
                    component: reasonList
                },
                {
                    path: 'examSelection',
                    component: examSelection
                }
            ]
        },
        {
            path:'/adminApp',
            component: adminApp,
            children:[
                {
                    path: 'message',
                    component: message,
                },
                {
                    path: 'reason',
                    component: reasonList
                },
                {
                    path: 'admin',
                    component: admin
                },
                {
                    path: 'examSelection',
                    component: adminExamSelection
                },
                {
                    path: 'successMatch',
                    component: successMatch
                }
            ]
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { top: 0 }
    }
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.getItem('Token')?true:false;
    console.log(isLogin);
    if (to.path === '/') {
        next();
    } else {
        if (isLogin) {
            console.log('已登录');
            next();
        } else {
            console.log('未登录');
            next('/');
        }
    }
})


export default router;