import axios from "axios";
import {env, setToken} from "@/services/env.js";
import useLoginStore from "@/store/loginStore.js";

export function getReasonList(){
    setToken();
    return axios.request({
        url: "/api/get_reason_list",
        method: "get",
        baseURL: env.DEV_URL
    })
}

export function setNewReason(data){
    setToken();
    return axios.request({
        url: "/api/add_reason_list",
        method: "get",
        params: data,
        baseURL: env.DEV_URL
    })
}