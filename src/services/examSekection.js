import axios from "axios";
import {env, setToken} from "@/services/env.js";

export function withdrawExam(data){
    setToken();
    return axios.request({
        url: "/withdraw",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export function getStudentInfo(data){
    setToken()
    return axios.request({
        url: "/get_student_info",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export function examSelection(data){
    setToken()
    return axios.request({
        url:"/exam_selection",
        method:"post",
        data:data,
        baseURL:env.DEV_URL
    })
}