import axios from "axios";
import {env} from "@/services/env.js";

export function getUserInfo() {
    return axios.request({
        url: "/get_user_info",
        method: "get",
        baseURL: env.DEV_URL
    })
}
export function changeUserInfo(data) {
    return axios.request({
        url: "/change_user_info",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}
export function getTeacherList(data) {
    return axios.request({
        url: "/get_teacher_list",
        method: "post",
        data,
        baseURL: env.DEV_URL
    })
}

export function getSelect(data) {
    return axios.request({
        url: "/get_select",
        method: "get",
        baseURL: env.DEV_URL
    })
}

export function sendSelect(data) {
    return axios.request({
        url: "/send_select",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export function sendSelectedTable(data){
    return axios.request({
        url: "/send_selected_table",
        method: "get",
        data: data,
        baseURL: env.DEV_URL
    })
}

export const changeImgAction=env.DEV_URL+"/change_img";