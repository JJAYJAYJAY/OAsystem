import axios from "axios";
import {env, setToken} from "@/services/env.js";
import useLoginStore from "@/store/loginStore.js";

export function getReasonList(){
    setToken();
    return axios.request({
        url: "/get_reason_list",
        method: "get",
        baseURL: env.DEV_URL
    })
}

export function setNewReason(data){
    setToken();
    return axios.request({
        url: "/add_reason_list",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}

export function deleteReasonList(data){
    setToken();
    return axios.request({
        url: "/delete_reason_list",
        method: "post",
        data: data,
        baseURL: env.DEV_URL
    })
}