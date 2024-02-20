import axios from "axios";
import {env, setToken} from "@/services/env.js";

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

export function getSelect(){
    setToken();
    return axios.request({
        url: "/get_select",
        method: "get",
        baseURL: env.DEV_URL
    })
}

export function sendStudentInfo(data){
    setToken()
    return axios.request({
        url:'/send_student_info',
        method:"post",
        data:data,
        baseURL:env.DEV_URL
    })
}

export function sendTwoWayTable(data){
    setToken()
    return axios.request({
        url:'/send_two_way_table',
        method:"post",
        data:data,
        baseURL:env.DEV_URL
    })
}

export function getSign(data){
    setToken()
    return axios.request({
        url:'/get_sign',
        method:"post",
        data:data,
        baseURL:env.DEV_URL
    })
}

export const changeImgAction=env.DEV_URL+"/change_img";
export const sendSign=env.DEV_URL+"/send_sign";