import axios from "axios";
import {env} from "@/services/env.js";
import useLoginStore from "@/store/loginStore.js";

export function setToken() {
    const loginStore=useLoginStore();
    if(loginStore.loginSession.loginType){
        axios.defaults.headers.common["Authorization"] ="Bearer "+loginStore.loginSession.userToken;
    }
}

export function getUserInfo() {
    setToken();
    return axios.request({
        url: "/get_user_info",
        method: "get",
        baseURL: env.DEV_URL
    })
}
export function changeUserInfo(data) {
    setToken();
    return axios.request({
        url: "/change_user_info",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}
export function getTeacherList(data) {
    setToken();
    return axios.request({
        url: "/get_teacher_list",
        method: "post",
        data,
        baseURL: env.DEV_URL
    })
}

export function changePassword(data){
    setToken();
    return axios.request({
        url: "/change_password",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export function sendSuggestion(data){
    setToken();
    return axios.request({
        url: "/send_suggestion",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export function getMyMessageList(){
    setToken();
    return axios.request({
        url: "/get_my_message_list",
        method: "get",
        baseURL: env.DEV_URL
    })
}
export function getToMeMessageList(){
    setToken();
    return axios.request({
        url: "/get_to_me_message_list",
        method: "get",
        baseURL: env.DEV_URL
    })
}

export function getMessageDetail(data){
    setToken();
    return axios.request({
        url: "/get_message_detail",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export const changeImgAction=env.DEV_URL+"/change_img";