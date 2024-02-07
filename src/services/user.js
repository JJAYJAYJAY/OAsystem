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

export function getSelect(data) {
    setToken();
    return axios.request({
        url: "/get_select",
        method: "get",
        baseURL: env.DEV_URL
    })
}

export function sendSelect(data) {
    setToken();
    return axios.request({
        url: "/send_select",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export function sendSelectedTable(data){
    setToken();
    return axios.request({
        url: "/send_selected_table",
        method: "get",
        data: data,
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
export const changeImgAction=env.DEV_URL+"/change_img";