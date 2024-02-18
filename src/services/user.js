import axios from "axios";
import {env, setToken} from "@/services/env.js";
import useLoginStore from "@/store/loginStore.js";

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

export function getMessages(){
    setToken();
    return axios.request({
        url: "/get_messages",
        method: "get",
        baseURL: env.DEV_URL
    })
}

export function sendMessage(data){
    setToken();
    return axios.request({
        url: "/send_message",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export function getValidTeacher(){
    setToken();
    return axios.request({
        url: "/get_valid_teacher",
        method: "get",
        baseURL: env.DEV_URL
    })
}
export const changeImgAction=env.DEV_URL+"/change_img";